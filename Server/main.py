import os

import spotipy
from spotipy.oauth2 import SpotifyOAuth
from pprint import pprint
from time import sleep
from flask import Flask
from dotenv import load_dotenv

app = Flask(__name__)

# load credentials for spotify api
load_dotenv()
SPOTIPY_CLIENT_ID = os.environ.get("SPOTIPY_CLIENT_ID")
SPOTIPY_CLIENT_SECRET = os.environ.get("SPOTIPY_CLIENT_SECRET")
SPOTIPY_REDIRECT_URI = os.environ.get("SPOTIPY_REDIRECT_URI")

# spotipy
scope = "user-read-playback-state,user-modify-playback-state"
sp_oath = SpotifyOAuth(
    client_id=SPOTIPY_CLIENT_ID,
    client_secret=SPOTIPY_CLIENT_SECRET,
    redirect_uri=SPOTIPY_REDIRECT_URI,
    scope=scope
)
sp = spotipy.Spotify(
    client_credentials_manager=sp_oath
)

# predefined genres
GENRE_ROCK, GENRE_POP, GENRE_HOUSE, GENRE_DIVERS = range(4)

genre_playlists = []

# Shows playing devices
res = sp.devices()
pprint(res)

# Change track

# sp.start_playback(uris=[
#     'spotify:track:6gdLoMygLsgktydTQ71b15'
# ])

@app.route("/add-track/<playlist_id>/<track_item>")
def add_track_to_playlist(playlist_id: str, track_item: str):
    # check if playlist_id is available
    if playlist_id == "":
        pass

    sp.playlist_add_items('playlist_id', ['list_of_items'])
    pass

@app.route("/add-track/<track_item>")
def add_track_to_playlist_automated(track_item: str):
    # get genres by main artist
    
    
    pass

@app.route("/change-playlist/<playlist_id>")
def change_playlist(playlist_id: str):
    global GENRE_HOUSE, GENRE_ROCK, GENRE_POP
    # change to playlist and start it
    if int(playlist_id) == GENRE_ROCK:
        playlist_uri = ""

    elif int(playlist_id) == GENRE_HOUSE:
        playlist_uri = ""

    elif int(playlist_id) == GENRE_POP:
        playlist_uri = ""
    else:
        pass

@app.route("/search-track/<track_name>")
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
        main_artist = item.get("artists")[0]
        artist_name = main_artist.get("name")
        artist_uri = main_artist.get("uri")

        entry = {
            "user": "",
            "uri": item.get("uri", "None"),
            "song": item.get("name", "undefined"),
            "artist_name": artist_name or "",
            "artist_uri": artist_uri,
        }

        found_tracks.append(entry)

    return found_tracks

@app.route("/search-artist/<artist_uri>")
def search_artist(artist_uri: str):
    artist = sp.artist(artist_uri)
    return artist

@app.route("/")
def home():
    pass
