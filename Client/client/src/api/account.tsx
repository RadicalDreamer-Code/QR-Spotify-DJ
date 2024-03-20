import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getQrDj = async (id: string) => {
  const res = await axios.get(`${API_URL}/qr-dj/${id}`);
  return res.data;
};

export const loginWithHashedKey = async (hashedKey: string) => {
  const res = await axios.get(`${API_URL}/login/${hashedKey}`);
  return res.data;
}

export const setUsername = async (username: string) => {
  const res = await axios.post(`${API_URL}/set-username`, { username });
  return res.data;
}