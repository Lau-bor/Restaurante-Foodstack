import { useState } from 'react'; // Importa useState
import "./NavBar.css";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='nav-header'>
      <div className="container">
        <nav>
          <div className="logo-container">
            <a href="/">
              <img src="../../../public/logo-sinfondo.png" alt="Logo" />
            </a>
          </div>

          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={`nav-link ${isOpen ? 'open' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;