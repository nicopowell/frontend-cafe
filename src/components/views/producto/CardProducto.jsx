import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProducto = ({producto}) => {
  console.log(producto)
  return (
    <Col md={4} ld={3} className="mb-3">
      <Card className="h-100">
        <div className="overflow-hidden">
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombreProducto}
            className="imagenCard"
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombreProducto}</Card.Title>
          <Card.Text className="flex-grow-1">
          {producto.descripcion}
          </Card.Text>
          <div className="d-flex justify-content-between lead fs-6 text-secondary">
            <p>${producto.precio}</p>
            <p>{producto.cantidad}</p>
          </div>
          <hr />
          <Link className="btn btn-dark" to={"/detalle/" + producto._id}>
          Ver detalle
        </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
