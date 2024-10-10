import axios from "axios";
const API_URL = "http://localhost:3333/api";

async function login(username, password) {
  try {
    await axios.post(`${API_URL}/login`, { username, password });
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
}

export default { login };
