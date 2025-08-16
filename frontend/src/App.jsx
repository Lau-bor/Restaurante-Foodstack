import "bootstrap/dist/css/bootstrap.min.css";
import {
  Login,
  Register,
  About,
  Home,
  NotFoundPage,
  Orders,
  Admin
} from "./pages";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Array de rutas donde el Navbar y Footer SÍ deben ser visibles
  const visiblePaths = ["/", "/menu", "/about", "/contact", "/orders"];

  // Lógica para determinar si el Navbar/Footer deben mostrarse
  const showHeaderFooter = visiblePaths.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {showHeaderFooter && <NavBar />}

      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;