import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/v1";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  if(response.status === 401){
    throw new Error("Invalid token");
  }
  else if (!response.data) {
    throw new Error("Failed to log in.");
  }
  return response.data;
};
