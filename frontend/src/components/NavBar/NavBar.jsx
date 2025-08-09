
import "./NavBar.css";


function NavBar (){ 
 return (
  
    <div className="container">
  <nav>
    <img src="" alt="FoodStack"  />
    <div className="logo">
     
    </div>
    <ul className="nav-link">

      <li><a href="/">Home</a></li>
      
      <li><a href="/about">About</a></li>
      
      <li><a href="/orders">Orders</a></li>

      <li><a href="/admin">Admin</a></li>
    </ul>
  </nav>
 </div>
  
 );

}


 
export default NavBar;
