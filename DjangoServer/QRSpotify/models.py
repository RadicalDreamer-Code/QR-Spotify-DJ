from django.db import models
from accounts.models import HashUser

# Create your models here.

class Playlist(models.Model):
    name = models.CharField(max_length=200)
    uri = models.CharField(max_length=200)
    tracks = models.ManyToOneRel("Track", on_delete=models.CASCADE, to="Track", field_name="playlist")

    def __str__(self):
        return self.name
    
class Track(models.Model):
    name = models.CharField(max_length=200)
    uri = models.CharField(max_length=200)
    added_by_hash_user = models.ForeignKey(HashUser, on_delete=models.CASCADE)
    duration_ms = models.IntegerField(default=-1)
    release_date = models.CharField(max_length=200, default="")
    trash = models.BooleanField(default=False)
    chill = models.BooleanField(default=False)

    def __str__(self):
        return self.name