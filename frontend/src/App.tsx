import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import logoMC from "./assets/logoMC-blanco.png";


function ProtectedDashboard() {
  const { isAuthenticated } = useAuth();
  return (
    <PrivateRoute isAuthenticated={isAuthenticated}>
      <Dashboard />
    </PrivateRoute>
  );
}

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const enHome = location.pathname === "/";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + título */}
        <div className="flex items-center gap-4">
          <img
            src={logoMC}
            alt="Movimiento Ciudadano"
            className="h-20 w-auto"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">
              Plataforma de Peticiones Ciudadanas
            </h1>
            <h2 className="text-sm md:text-base font-semibold">
              Soledad Del Valle
            </h2>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex gap-4 text-sm md:text-base font-medium flex-wrap justify-center md:justify-end">
          <Link to="/" className="hover:underline hover:opacity-90">
            Inicio
          </Link>
          <a href="/#formulario" className="hover:underline hover:opacity-90">
            Petición
          </a>
          <a href="/#sobre" className="hover:underline hover:opacity-90">
            Sobre mí
          </a>

          {!isAuthenticated && !enHome && (
            <Link to="/login" className="hover:underline hover:opacity-90">
              Login
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hover:underline hover:opacity-90"
            >
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-orange-50 to-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
          </Routes>
          <footer className="text-center p-4 text-sm text-primary">
            © 2025 Plataforma Ciudadana. Todos los derechos reservados.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
