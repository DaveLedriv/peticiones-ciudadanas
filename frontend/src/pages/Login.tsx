"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://peticiones-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");
      const data = await res.json();

      if (!data.access_token) throw new Error("Token no recibido");

      login(data.access_token); // 👈 Guardar token y autenticar
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-white p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-border text-foreground"
      >
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          🔐 Acceso de Administrador
        </h1>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-muted-foreground mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
