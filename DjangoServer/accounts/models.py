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
    
class HashUser(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.TextField(default="", blank=True)
    birth_year = models.TextField(default="", blank=True)
    hash = models.TextField(default="", blank=True)
    created_at = models.DateTimeField(default=now)
    
    def __str__(self) -> str:
        username = self.username if self.username else "Anonymous"
        return username + " - " + self.hash
    
    @classmethod
    def create(cls, username, hash):
        data = cls.objects.create(username=username, hash=hash)
        return data