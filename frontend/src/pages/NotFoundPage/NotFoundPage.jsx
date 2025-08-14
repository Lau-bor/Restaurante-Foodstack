import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Container
        fluid
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            'url("public/hamburguesa-carne-parrilla-salada-verde-queso-tomate-dia-hamburguese-espacio-copiar_742418-16865.avif")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Row className="text-center">
          <Col>
            <h1 className="display-1 fw-bold text-danger">ERROR 404</h1>
            <h2 className="mb-3 text-light">Ups! pagina no encontrada</h2>
            <p className="text-light">La pagina que esta buscando no existe o fué removida</p>
            <Button onClick={() => navigate("/")} variant="warning" size="lg">
              Probemos otro pedido
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NotFoundPage;
