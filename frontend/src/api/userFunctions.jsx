import axios from "axios";
const API_URL = "http://localhost:3333/api";

async function getUser(accessToken) {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
}

export default { getUser };
