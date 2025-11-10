import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setToken(res.data.data.accessToken);
      localStorage.setItem("accessToken", res.data.data.accessToken);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      await registerUser(email, password);
      alert("Registered successfully. Please log in.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return { token, loading, login, register, logout };
}
