import json
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

# predefined genres / key from json
GENRE_ROCK = "Rock"
GENRE_POP = "Pop"
GENRE_ELECTRONIC = "Electronic"
GENRE_HIP_HOP = "Hip Hop"
GENRE_METAL = "Metal"
GENRE_COUNTRY = "Country"
GENRE_DIVERS = "DIVERS"

SELECTED_GENRES = [GENRE_POP, GENRE_ROCK, GENRE_ELECTRONIC, GENRE_HIP_HOP]

genre_playlists = []

# Shows playing devices
res = sp.devices()
pprint(res)

# Change track

# sp.start_playback(uris=[
#     'spotify:track:6gdLoMygLsgktydTQ71b15'
# ])

# write genre json
file_data_path = "genre_data.json"
genre_json = None

with open(file_data_path, 'r', encoding='utf-8') as file:
    content = file.read()
    genre_json = json.loads(content)

# sample data
sample_track_uri = "spotify:track:2d1MywHy6FwKdzxFuSJnwl"
sample_artist_uri = "spotify:artist:53XhwfbYqKCa1cC15pYq2q"

@app.route("/add-track/<playlist_id>/<track_item>")
def add_track_to_playlist(playlist_id: str, track_item: str):
    # check if playlist_id is available
    if playlist_id == "":
        pass

    sp.playlist_add_items('playlist_id', ['list_of_items'])
    pass

@app.route("/add-track-auto/<track_uri>/<artist_uri>")
def add_track_to_playlist_automated(track_uri: str, artist_uri: str):
    # artist: get genres by main artist
    artist = sp.artist(artist_uri)
    genres = artist.get("genres")

    genre_counter = {}
    for selected_genre in SELECTED_GENRES:
        for genre in genres:
            if genre in genre_json[selected_genre]:
                genre_counter[selected_genre] = genre_counter.get(selected_genre, 0) + 1

    return genres

@app.route("/add-track-auto")
def add_track_to_playlist_automated_test():
    # artist: get genres by main artist
    artist = sp.artist(sample_artist_uri)
    genres = artist.get("genres")

    genre_counter = {}
    for selected_genre in SELECTED_GENRES:
        for genre in genres:
            if genre in genre_json[selected_genre]:
                genre_counter[selected_genre] = genre_counter.get(selected_genre, 0) + 1
    
    # decide on a genre and add it to the spotify playlist
    

    return genre_counter

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
