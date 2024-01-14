from datetime import datetime
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.db import models

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar_url = models.TextField(default="", blank=True)
    
    def __str__(self) -> str:
        return self.user.username
    
    @classmethod
    def create(cls, user):
        data = cls.objects.create(user=user)
        return data
    
    @classmethod
    def create_with_ingredients(cls, user):
        data = cls.objects.create(user=user)
        return data