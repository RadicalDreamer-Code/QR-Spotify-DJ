import re
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login
from .serializers import ChangePasswordSerializer, HashSerializer, QuickRegisterSerializer, UsernameSerializer
from django.contrib.auth.models import User
from rest_framework import status
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
import json
from django.http.response import JsonResponse
from knox.auth import TokenAuthentication

from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView

from accounts.models import HashUser, UserData
from .serializers import UserDataSerializer, UserSerializer, RegisterSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Add User Data
        UserData.create(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class QuickRegisterAPI(generics.GenericAPIView):
    serializer_class = QuickRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # TODO
        user = serializer.save()
    
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token_response = super(LoginAPI, self).post(request, format=None)
        token_response.data['username'] = user.username
        return token_response
        # TODO: Check how to get more user information


class RequestLogMiddleWare(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if isinstance(response, Response):
            response.data['detail'] = 'I have been edited'
            # you need to change private attribute `_is_render`
            # to call render second time
            response._is_rendered = False
            response.render()
        return response


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RetrieveUserData(generics.RetrieveAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserDataSerializer
    
    def get(self, request, pk = None):
        if pk is None:
            instance, created = UserData.objects.get_or_create(user=self.request.user)
            serializer = UserDataSerializer(instance)
            
            return Response({
                'status': 'success',
                'data': serializer.data
            })
        
        try:
            user = User.objects.get(id=pk)
            instance, created = UserData.objects.get_or_create(user=user)
            serializer = UserDataSerializer(instance)
        except:
            return Response({
                'status': 'fail',
                'message': 'user not found'
            })
            
        if self.request.user.id is user.id:
            return Response({
                'status': 'success',
                'data': serializer.data
            })
            
        # check if pk is user itself or friend of user
        # if not FriendConnection.objects.filter(owner=user, users__in=[self.request.user.id]).exists():
        #     return Response({
        #         'status': 'fail',
        #         'message': 'Not befriended with user'
        #     })
        
        instance, created = UserData.objects.get_or_create(user=user)
        serializer = UserDataSerializer(instance)   
            
        return Response({
            'status': 'success',
            'data': serializer.data
        })


class SearchUserAPI(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_queryset(self):
        # TODO: Validation of url parameters
        value = self.kwargs.get("value")

        qs = User.objects.filter(username__contains=value)
        return qs

class UsernameCheckAPI(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = UsernameSerializer

    def post(self, request):
        # TODO: Validation of url parameters
        username = request.data.get("username")
        try:
            user = User.objects.get(username=username)
            print("False")
            return Response({"valid": False})
        except:
            print("True")
            return Response({"valid": True})

class AuthenticateHashAPI(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = HashSerializer

    def post(self, request):
        # username = request.data.get("username")
        hash = request.data.get("hash")
        print(hash)
        try:
            hash_user = HashUser.objects.get(hash=hash)

            return Response({
                "username": hash_user.username,
                "valid": True
            })
        except:
            print("Hashuser not found")
            return Response({"valid": False})
        
class SetUsernameForHashAPI(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = HashSerializer

    def post(self, request):
        username = request.data.get("username")
        birth_year = request.data.get("birthyear")
        hash = request.data.get("hash")
        try:
            hash_user = HashUser.objects.get(hash=hash)
            hash_user.username = username
            hash_user.birth_year = birth_year
            hash_user.save()
            return Response({
                "username": hash_user.username,
                "valid": True
            })
        except:
            print("Hashuser not found")
            return Response({"valid": False})