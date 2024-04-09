import axios from "axios";
import { SpotifySong } from "../interfaces";

const API_URL = "http://localhost:8000/qr-spotify";

export const getQrDj = async (id: string) => {
  try {
    const res = await axios.get(`${API_URL}/qr-dj/${id}`);
    return res.data;  
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchSong = async (query: string): Promise<SpotifySong[]> => {
  try {
    const res = await axios.get(`${API_URL}/search_track/${query}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const addSong = async (song: SpotifySong): Promise<boolean> => {
  try {
    const data = {
      songName: song.name,
      uri: song.uri,
      hashUser: song.user,
      durationMs: song.duration_ms,
      releaseDate: song.release_date
    }
    const res = await axios.post(`${API_URL}/add_track/`, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const removeSong = async (song: SpotifySong): Promise<boolean> => {
  try {
    const data = {
      songName: song.name,
      uri: song.uri,
      hashUser: song.user,
    }
    console.log(data)

    const res = await axios.post(`${API_URL}/remove_track/`, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getDurationFromEachDecade = async (): Promise<boolean> => {
  try {
    const res = await axios.get(`${API_URL}/get_duration_for_each_decade/`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getSelectedSongsFromUser = async (hashUser: string): Promise<SpotifySong[]> => {
  try {
    const data = {
      hashUser: hashUser
    }
    console.log(data)
    const res = await axios.post(`${API_URL}/get_selected_tracks/`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}