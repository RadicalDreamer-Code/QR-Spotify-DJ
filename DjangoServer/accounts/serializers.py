from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User

from accounts.models import UserData

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

class QuickRegisterSerializer(serializers.ModelSerializer):
    undesired_ingredients = serializers.ListField(
        child = serializers.IntegerField()
    )
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['email'] = ""
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserDataSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = UserData
        fields = ('user', 'description', 'avatar_url')

class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField()
