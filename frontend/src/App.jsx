import "bootstrap/dist/css/bootstrap.min.css";
import {
  Login,
  Register,
  About,
  Home,
  NotFoundPage,
  Orders,
} from "./pages";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./components";
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Definimos las rutas donde NO queremos mostrar el NavBar
  const noNavbarPaths = ["/login", "/register"];

  // Lógica para determinar si el NavBar debe ser visible
  const showNavBar = !noNavbarPaths.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      {/* Condicional para mostrar el NavBar solo si no estamos en una de las rutas prohibidas */}
      {showNavBar && <NavBar />}

      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Condicional para mostrar el Footer*/}
      {showNavBar && <Footer />}
    </>
  );
}
export default App;
