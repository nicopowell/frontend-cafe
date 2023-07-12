import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { consultaProducto } from "../helpers/queries";
import Swal from "sweetalert2";

const DetalleProducto = () => {
  const { id } = useParams();
  const navegacion = useNavigate();
  const [producto, setProducto] = useState();
  const [existeProducto, setExisteProducto] = useState(true);

  useEffect(() => {
    consultaProducto(id).then((respuesta) => {
      if (respuesta._id) {
        setExisteProducto(true);
        setProducto(respuesta);
      } else {
        Swal.fire("Ocurrio un error", `No pudimos encontrar el producto que buscas`, "error");
        setExisteProducto(false);
      }
    });
  }, [id]);
  if (!producto) {
    return null;
  }

  return (
    <>
      {existeProducto ? (
        <Container className="mainSection">
          <Card className="my-5">
            <Row>
              <Col md={6}>
                <Card.Img className="imagenDetalle" variant="top" src={producto.imagen} alt={producto.nombreProducto} />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{producto.nombreProducto}</Card.Title>
                  <hr />
                  <Card.Text>
                    {producto.descripcion}
                    <br />
                    <span className="fw-bold ">Categoria:</span> {producto.categoria}
                    <br />
                    <span className="fw-bold ">Precio:</span> {producto.precio}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      ) : (
        navegacion("/404")
      )}
    </>
  );
};

export default DetalleProducto;
