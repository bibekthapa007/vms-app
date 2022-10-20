import axios from "axios";
import { SigninResponse, User } from "../types/auth";

const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signin = async (
  email: string,
  password: string
): Promise<SigninResponse | null> => {
  try {
    const data = JSON.stringify({ email, password });
    const response = await authApi.post("/auth/signin", data);
    if (response && response.status === 200) {
      const responseData = response.data;
      if (responseData) {
        return responseData;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    }
    return null;
  } catch (error: Error | any) {
    throw new Error(error.message || "Login failed");
  }
};

export const signup = async (
  email: string,
  password: string
): Promise<SigninResponse | null> => {
  try {
    const data = JSON.stringify({ email, password });
    const response = await authApi.post("/auth/signup", data);
    if (response && response.status === 200) {
      const responseData = response.data;
      if (responseData) {
        return responseData;
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    }
    return null;
  } catch (error: Error | any) {
    throw new Error(error.message || "Signup failed");
  }
};

export const getUserData = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await authApi.get(`/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      if (responseData) {
        return responseData.user;
      } else {
        throw new Error(response.data.message || "Failed to fetch user data");
      }
    }
    return null;
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to fetch user data");
  }
};
