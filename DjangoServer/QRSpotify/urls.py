# add urls for views
from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.ListUsers.as_view()),
    #path('add-track/<playlist_id>/<track_item>', views.add_track_to_playlist),
    path('add_track', views.AddTrackToPlaylistAutomated.as_view()),
    path('change-playlist/<playlist_id>', views.ChangePlaylist.as_view()),
    path('search_track/<track_name>', views.SearchTrack.as_view()),
]