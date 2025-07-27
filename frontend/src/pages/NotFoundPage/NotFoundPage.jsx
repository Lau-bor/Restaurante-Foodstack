import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

  const navigate = useNavigate();

  return (
    <div>
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <Row className="text-center">
          <Col>
            <h1 className="display-1 fw-bold text-success">ERROR 404</h1>
            <h2 className="mb-3">Ups! pagina no encontrada</h2>
            <p>La pagina que esta buscando no existe o fué removida</p>
            <Button onClick={() => navigate('/')} variant="success" size="lg">Go Back Home</Button>
          </Col>
        </Row>
      </Container>    
    </div>
  )
}

export default NotFoundPage
