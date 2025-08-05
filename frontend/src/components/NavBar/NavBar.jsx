
import "./NavBar.css";


function NavBar (){ 
 return<div className="container">
  <nav>
    <div className="logo">
      <h2>FoodStack</h2>
    </div>
    <ul className="nav-link">

      <li><a href="/Inicio">Inicio</a></li>
      <li><a href="/Menu">Menu</a></li>
      <li><a href="/Nosotros">Nosotros</a></li>
      <li><a href="/Contacto">Contacto</a></li>
      <li><a href="/Pedido">Pedido</a></li>
    </ul>
  </nav>
 </div>


}


export default NavBar;
