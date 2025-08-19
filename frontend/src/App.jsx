import "bootstrap/dist/css/bootstrap.min.css";
import {
  Login,
  Register,
  About,
  Home,
  NotFoundPage,
  Orders,
  Admin,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";

// ✅ Importa los proveedores de contexto
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/cartContext.jsx'; 

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

// ✅ Envuelve el componente App con los proveedores de contexto
// Esto asegura que useAuth y useCart funcionen en toda la aplicación
function AppContent() {
  const { loading } = useAuth();
  const location = useLocation();

  const visiblePaths = ["/", "/menu", "/about", "/contact", "/orders", "/admin"];
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
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Rutas para los usuarios comunes */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* Rutas para los admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

// ✅ Este es el componente principal que exportas y envuelve a AppContent
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;