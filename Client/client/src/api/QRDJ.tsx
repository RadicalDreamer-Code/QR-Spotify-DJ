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
    const res = await axios.post(`${API_URL}/add_track`, song);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}