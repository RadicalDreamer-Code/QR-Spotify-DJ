import json
import os

import spotipy
from spotipy.oauth2 import SpotifyOAuth
from pprint import pprint
from time import sleep
from dotenv import load_dotenv

from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from django.conf import settings

from accounts.models import HashUser
from .models import Track

MAX_SONG_COUNT = 40

# predefined genres / key from json
GENRE_ROCK = "Rock"
GENRE_POP = "Pop"
GENRE_ELECTRONIC = "Electronic"
GENRE_90S_ELECTRONIC = "90s Electronic"
GENRE_HIP_HOP = "Hip Hop"
GENRE_METAL = "Metal"
GENRE_COUNTRY = "Country"
GENRE_DIVERS = "DIVERS"

# sample data
sample_track_uri = settings.SAMPLE_TRACK_URI
sample_artist_uri = settings.SAMPLE_ARTIST_URI

SELECTED_GENRES = [
    GENRE_POP,
    GENRE_ROCK,
    GENRE_ELECTRONIC,
    GENRE_90S_ELECTRONIC,
    GENRE_HIP_HOP
]

# write genre json
file_data_path = "genre_data.json"
genre_json = None

# with open(file_data_path, 'r', encoding='utf-8') as file:
#     content = file.read()
#     genre_json = json.loads(content)


# spotipy
scope = "user-read-playback-state,user-modify-playback-state"
sp_oath = SpotifyOAuth(
    client_id=settings.SPOTIPY_CLIENT_ID,
    client_secret=settings.SPOTIPY_CLIENT_SECRET,
    redirect_uri=settings.SPOTIPY_REDIRECT_URI,
    scope=scope,
)
sp = spotipy.Spotify(
    client_credentials_manager=sp_oath
)

class ListUsers(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)
    
class GetPlayLists(APIView):
    """
    View to get the playlist.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        # get user from request
        user = request.user

        # get username
        username = user.username

        # get playlists
        # playlists = sp.current_user_playlists()
        return Response([])
    

def change_playlist(playlist_id: str):
    global GENRE_ROCK, GENRE_POP
    # change to playlist and start it
    if int(playlist_id) == GENRE_ROCK:
        playlist_uri = settings.SPOTIFY_PLAYLIST_2_URI

    elif int(playlist_id) == GENRE_ELECTRONIC:
        playlist_uri = settings.SPOTIFY_PLAYLIST_URI

    elif int(playlist_id) == GENRE_90S_ELECTRONIC:
        playlist_uri = settings.SPOTIFY_PLAYLIST_2_URI

    elif int(playlist_id) == GENRE_POP:
        playlist_uri = ""
    else:
        pass

    sp.start_playback(context_uri=playlist_uri)
    return "changed playlist"

class ChangePlaylist(APIView):
    """
    View to change the playlist.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, format=None):
        """
        Change the playlist.
        """
        # execute function
        

        playlist_id = request.data.get("playlist_id")
        return Response(change_playlist(playlist_id))
    

def add_track_to_playlist_automated_test():
    # artist: get genres by main artist
    artist = sp.artist(sample_artist_uri)
    genres = artist.get("genres")

    genre_counter = {}
    for selected_genre in SELECTED_GENRES:
        for genre in genres:
            if genre in genre_json[selected_genre]:
                genre_counter[selected_genre] = genre_counter.get(selected_genre, 0) + 1

    return genre_counter

class GetAllTracks(APIView):
    """
    View to get all tracks.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Get all tracks.
        """
        tracks = Track.objects.all().values()
        return Response(tracks)

class GetSelectedTracks(APIView):
    """
    View to get the selected tracks.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def post(self, request, format=None):
        """
        Get the selected tracks by user.
        """

        data = request.data
        hashuser = data.get("hashUser")

        # check if hashuser exists in db
        try:
            user = HashUser.objects.get(hash=hashuser)
        except HashUser.DoesNotExist:
            response = {
                "status": "error",
                "message": "hashuser not found"
            }
            return Response(response)

        # get tracks
        tracks = Track.objects.filter(added_by_hash_user=user).values()
        print(tracks)

        return Response(tracks)


class AddTrackToPlaylistAutomated(APIView):
    """
    View to add a track to a playlist.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]
    permission_classes = []

    def post(self, request, format=None):
        """
        Add a track.
        """
        # get request body
        data = request.data
        hashuser = data.get("hashUser")

        # check if hashuser exists in db
        try:
            user = HashUser.objects.get(hash=hashuser)
        except HashUser.DoesNotExist:
            response = {
                "status": "error",
                "message": "hashuser not found"
            }
            return Response(response)
        
        # only allow tracks with less than duration of 6 minutes^
        print(data.get("durationMs"))
        if data.get("durationMs") > 360000:
            response = {
                "status": "error",
                "message": "track can't be longer than 6 minutes"   
            }
            return Response(response, status=400)
        

        
        # check how many tracks user has already added
        tracks = Track.objects.filter(added_by_hash_user=user)
        if len(tracks) >= MAX_SONG_COUNT:
            response = {
                "status": "error",
                "message": "max song count reached"
            }
            return Response(response)
        
        # check if track is arleady in db by the user
        track = Track.objects.filter(
            uri=data.get("uri"),
            added_by_hash_user=user
        )

        print(track)

        if track:
            response = {
                "status": "error",
                "message": "track already added"
            }
            return Response(response, status=400)
        
        entry_type = data.get("type")
        
        Track.objects.create(
            name=data.get("songName"),
            uri=data.get("uri"),
            duration_ms=data.get("durationMs"),
            release_date=data.get("releaseDate"),
            added_by_hash_user=user,
            trash = data.get("trash"),
            chill = data.get("chill")
        )

        response = {
            "status": "success",
            "message": "track added",
            "current_song_count": len(tracks) + 1
        }

        return Response(response)
    
class RemoveTrackFromPlaylist(APIView):
    """
    View to remove a track from a playlist.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def post(self, request, format=None):
        """
        Remove a track.
        """
        # get request body
        data = request.data
        hashuser = data.get("hashUser")

        # check if hashuser exists in db
        try:
            user = HashUser.objects.get(hash=hashuser)
        except HashUser.DoesNotExist:
            response = {
                "status": "error",
                "message": "hashuser not found"
            }
            return Response(response)
        
        # check if track is arleady in db by the user
        track = Track.objects.filter(uri=data.get("uri"), added_by_hash_user=user)
        print(track)
        if not track:
            response = {
                "status": "error",
                "message": "track not found"
            }
            return Response(response, status=400)
        
        track.delete()

        tracks = Track.objects.filter(added_by_hash_user=user)
        response = {
            "status": "success",
            "message": "track removed",
            "current_song_count": len(tracks)
        }

        return Response(response)

def search_track(track_name: str):
    result = sp.search(track_name)

    tracks = result.get("tracks")
    if not tracks:
        return "no tracks found"

    items = tracks.get("items")
    if not items:
        return "no tracks found"
    
    found_tracks = []
    for item in items:
        # TODO: concat all artists
        album = item.get("album")
        # artists = item.get("artists")

        release_date = album.get("release_date")
        #print(item.get("artists"))

        entry = {
            "user": "",
            "uri": item.get("uri", "None"),
            "name": item.get("name", "undefined"),
            "album": item.get("album", "undefined"), # "album": item.get("album", "undefined"),
            "artists": item.get("artists", "undefined"),
            "release_date": release_date or "",
            "duration_ms": item.get("duration_ms", -1)
        }

        found_tracks.append(entry)

    return found_tracks

class SearchTrack(APIView):
    """
    View to search a track.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def get(self, request, track_name, format=None):
        """
        Search a track.
        """
        # get track name from request
        print(track_name)
        return Response(search_track(track_name))
    
# TODO:
class GetDurationForEachDecade(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = []

    def get(self, request):
        tracks = Track.objects.get()

        # remove non unique track uri
        filtered_tracks = []
        for track in tracks:
            if track.uri not in filtered_tracks:
                filtered_tracks.append(track.uri)

        # get duration for each decade
        duration_dict = {}
        for track in filtered_tracks:
            release_date = track.release_date
            duration = track.duration_ms

            decade = release_date[:3] + "0"
            duration_dict[decade] = duration_dict.get(decade, 0) + duration

        return Response(duration_dict)
