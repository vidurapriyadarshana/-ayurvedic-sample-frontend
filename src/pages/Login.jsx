import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGoogleLogin = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    window.location.href = `${serverUrl}/api/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="flex flex-col w-80 gap-3">
        <h2 className="text-xl font-bold text-center mb-2">Login</h2>
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
