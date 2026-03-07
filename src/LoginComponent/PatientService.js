import axios from "axios";

// Backend base URL
const baseURL = "https://localhost:7077/api/Regester";

const axiosInstance = axios.create({
  baseURL,
  timeout: 50000, // 50 seconds
});

// Register API
export const registerPatient = async (data) => {
  try {
    const response = await axiosInstance.post("/Register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API
export const loginPatient = async (data) => {
  try {
    const response = await axiosInstance.post("/Login", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Forget Password API
export const forgetPasswordPatient = async (data) => {
  try {
    const response = await axiosInstance.post("/ForgetPassword", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};