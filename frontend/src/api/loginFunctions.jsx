import axios from "axios";
const API_URL = "http://localhost:3333/api";

async function login(username, password) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
}

export default { login };
