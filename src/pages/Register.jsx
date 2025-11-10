import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="flex flex-col w-80 gap-3">
        <h2 className="text-xl font-bold text-center mb-2">Register</h2>
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
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
