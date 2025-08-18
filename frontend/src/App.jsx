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
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const { loading } = useAuth();
  const location = useLocation();

  // Array de rutas donde el Navbar y Footer SÍ deben ser visibles
  const visiblePaths = ["/", "/menu", "/about", "/contact", "/orders"];

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
        {/* rutas publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* rutas para los usuaros comunes */}
        {/* 'allowedRoles' determina quién puede acceder a estas rutas */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* rutas para los admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;