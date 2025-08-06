
import "./NavBar.css";


function NavBar (){ 
 return<div className="container">
  <nav>
    <div className="logo">
     <img src="frontend/public/logo" alt="" />
    </div>
    <ul className="nav-link">

      <li><a href="/">Home</a></li>
      <li><a href="/Menu">Menu</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="contact">Contact</a></li>
      <li><a href="/orders">Orders</a></li>
    </ul>
  </nav>
 </div>


}


export default NavBar;
