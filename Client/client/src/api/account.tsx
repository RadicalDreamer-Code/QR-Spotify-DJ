import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getQrDj = async (id: string) => {
  const res = await axios.get(`${API_URL}/qr-dj/${id}`);
  return res.data;
};