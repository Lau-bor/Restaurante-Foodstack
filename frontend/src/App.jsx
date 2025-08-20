import "bootstrap/dist/css/bootstrap.min.css";
import {
  Login,
  Register,
  About,
  Home,
  NotFoundPage,
  Orders,
  Admin,
  VerifyEmail,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/cartContext.jsx'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';


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
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />

        
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}
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