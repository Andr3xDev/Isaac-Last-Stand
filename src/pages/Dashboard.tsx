import { useAuth } from '../contexts/AuthContext.tsx';

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard Principal</h1>
      <p>¡Bienvenido al panel de control de Sara-Bi!</p>
      <p>Este contenido es protegido.</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
