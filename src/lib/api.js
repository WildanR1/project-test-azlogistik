import axios from "axios";
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
