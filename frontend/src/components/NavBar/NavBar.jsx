import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
  return (
    <Navbar expand="md" className="fixed-top shadow" >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-danger fw-bold">
          Restaurante Foodstack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end w-100">
            <Nav.Link as={Link} to="/" className="active">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="active">
              Menú
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="active">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="active">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" className="active">
              Pedidos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
