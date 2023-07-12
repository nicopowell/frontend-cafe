import { Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import ItemUsuario from "./usuarios/ItemUsuario";
import { useEffect, useState } from "react";
import { consultaListaProductos, consultaListaUsuarios } from "../helpers/queries";
import { Link } from "react-router-dom";


const Administrador = () => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    consultaListaProductos().then((respuesta) => {
      setProductos(respuesta);
    });
    consultaListaUsuarios().then((respuesta) => {
      setUsuarios(respuesta)
    })
  }, []);

    return (
      <div className="container mainSection my-4">
      <section>
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h1 className="display-4 ">Productos disponibles</h1>
          <Link className="btn btn-primary" to="/administrador/crear-producto">
            Agregar
          </Link>
        </div>
        <hr />
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Cod</th>
              <th>Producto</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>URL de Imagen</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ItemProducto key={producto._id} producto={producto} setProductos={setProductos}></ItemProducto>
            ))}
          </tbody>
        </Table>
      </section>
      <hr />
      <section>
        <h1 className="display-4 mt-5">Usuarios</h1>
        <hr />
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <ItemUsuario key={usuario._id} usuario={usuario} setUsuarios={setUsuarios}></ItemUsuario>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
    );
};

export default Administrador;