from knox import views as knox_views
from .views import (
    RegisterAPI,
    QuickRegisterAPI,
    LoginAPI,
    ChangePasswordView,
    SearchUserAPI,
    RetrieveUserData,
    UsernameCheckAPI,
    AuthenticateHashAPI
)
from django.urls import path

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('quickregister/', QuickRegisterAPI.as_view(), name='quick-register'),
    # TODO: reset password
    path('username-check/', UsernameCheckAPI.as_view()),
    path('hash-check/', AuthenticateHashAPI.as_view()),
]