from django.db import models

# Create your models here.

class Playlist(models.Model):
    name = models.CharField(max_length=200)
    uri = models.CharField(max_length=200)
    tracks = models.ManyToOneRel("Track", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Track(models.Model):
    name = models.CharField(max_length=200)
    uri = models.CharField(max_length=200)
    artist_name = models.CharField(max_length=200)
    artist_uri = models.CharField(max_length=200)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)

    def __str__(self):
        return self.name