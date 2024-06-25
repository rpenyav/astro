import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      auth?.login(response.data.accessToken);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
