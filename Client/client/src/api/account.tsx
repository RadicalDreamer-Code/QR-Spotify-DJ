import axios from "axios";

const API_URL = "http://localhost:8000/accounts";

export const getQrDj = async (id: string) => {
  const res = await axios.get(`${API_URL}/qr-dj/${id}`);
  return res.data;
};

export const loginWithHashedKey = async (hashedKey: string) => {
  const res = await axios.get(`${API_URL}/login/${hashedKey}`);
  return res.data;
}

interface CheckHashKeyResponse {
  valid: boolean;
  username: string;
}

export const setUsername = async (hash: string, username: string): Promise<CheckHashKeyResponse> => {
  const res = await axios.post(`${API_URL}/set-username/`, { hash, username });
  return res.data;
}


export const checkHashedKey = async (hashedKey: string): Promise<CheckHashKeyResponse> => {
  // add hashedKey to the request body
  const res = await axios.post(`${API_URL}/hash-check/`, { hash: hashedKey });
  return res.data;
}