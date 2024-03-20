import json
import os

import spotipy
from spotipy.oauth2 import SpotifyOAuth
from pprint import pprint
from time import sleep
from flask import Flask
from flask_limiter import Limiter
from dotenv import load_dotenv

from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from django.conf import settings

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
    scope=scope
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
        Add a track to a playlist.
        """
        # get request body
        print(request.data)

        # get user from request
        user = request.user

        # get username
        username = user.username

        track_uri = request.data.get("uri")
        artist_uri = request.data.get("artist_uri")
        print(track_uri)
        # print(artist_uri)

        # artist: get genres by main artist
        # genre_counter = add_track_to_playlist_automated_test()
        release_date = sp.track(track_uri).get("album").get("release_date")
        print(release_date)

        # depending on release_date add to playlist
        if "1980" < release_date <= "1990":
            # add to pop playlist
            
            pass

        elif "1990" < release_date <= "2000":
            # add to pop playlist
            
            pass

        elif "2000" < release_date <= "2010":
            pass

        elif "2010" < release_date <= "2020":
            pass

        else:
            pass

        # decide on a genre and add it to the spotify playlist
        # return new playlist
        return "genre_counter"
    
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
        release_date = album.get("release_date")
        main_artist = item.get("artists")[0]
        artist_name = main_artist.get("name")
        artist_uri = main_artist.get("uri")

        entry = {
            "user": "",
            "uri": item.get("uri", "None"),
            "song": item.get("name", "undefined"),
            "artist_name": artist_name or "",
            "artist_uri": artist_uri,
            "release_date": release_date or "",
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