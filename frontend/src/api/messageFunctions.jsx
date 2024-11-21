import axios from "axios";
const API_URL = "http://localhost:3333/api";

async function getMessageList(token) {
  try {
    const response = await axios.get(`${API_URL}/messages`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting messages : ", error);
    throw error;
  }
}

async function getMessages(token, receiverId) {
  try {
    const response = await axios.get(`${API_URL}/messages/${receiverId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting messages : ", error);
    throw error;
  }
}

export default { getMessageList, getMessages };
