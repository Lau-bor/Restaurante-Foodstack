import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function NotFoundPage() {

  const navigate = useNavigate();

  return (
    <div>
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
  <Row className="text-center">
    <Col>
      <h1 
        className="display-1 fw-bold mb-5 text-center" 
        style={{ fontSize: '5rem', color: '#AC011F' }}>ERROR 404</h1>

      <p className="text-center fs-3"> La página que estás buscando no existe o fue removida</p>

      <Button onClick={() => navigate('/')} variant="success" size="lg" className='btn btn-danger btn-lg fw-bold'>
        Volver al Inicio
      </Button>
    </Col>
  </Row>
</Container>

    </div>
  )
}

export default NotFoundPage
