import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="nav-header">
      <div className="container">
        <nav>
          <div className="logo-container">
            <NavLink to="/">
              <img src="logo-sinfondo.png" alt="Logo" />
            </NavLink>
          </div>

          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={`nav-link ${isOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>

            {currentUser && (
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
            )}

            {currentUser && role === "admin" && (
              <li>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            )}

            {currentUser ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-warning"
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
                <li>
                  <NavLink to="/login" className="btn btn-warning">Iniciar Sesión</NavLink>
                </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
