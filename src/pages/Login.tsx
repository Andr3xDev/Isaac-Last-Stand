import React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

export const Login = () => {
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simulando inicio de sesión...");
    login();
  };

  return (
    <div>
      <h1>Login Sara-Bi</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" name="email" placeholder="user@sara.bi" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Contraseña</label>
          <br />
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
