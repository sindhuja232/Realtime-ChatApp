import axios from "axios";

export const getMessages = async (id) => {
  try {
    const res = await axios.get(`/api/messages/${id}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching messages");
  }
};

export const sendMessage = async (receiverId, messageData) => {
  try {
    const res = await axios.post(`/api/messages/send/${receiverId}`, messageData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error sending message");
  }
};
