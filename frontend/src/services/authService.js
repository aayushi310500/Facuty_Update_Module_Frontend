import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/login"; // Make sure this matches your backend URL

const login = async (loginRequest) => {
  try {
    const response = await axios.post(API_URL, loginRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.token; // Assuming response contains token field
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed. Please try again.");
    } else {
      throw new Error("An error occurred. Please check your network connection.");
    }
  }
};

const authService = {
  login,
};

export default authService;
