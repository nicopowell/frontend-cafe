import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { consultaBorrarUsuario, consultaListaUsuarios } from '../../helpers/queries';
import Swal from 'sweetalert2';

const ItemUsuario = ({usuario, setUsuarios}) => {
  const borrarUsuario = ()=>{
    Swal.fire({
      title: `¿Esta seguro de borrar el usuario ${usuario.nombreUsuario}?`,
      text: "No se puede revertir este paso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        consultaBorrarUsuario(usuario.id).then((respuesta)=>{
          if(respuesta.status === 200){
            Swal.fire(
              'Usuario eliminado',
              `El usuario ${usuario.nombreUsuario} fue eliminado correctamente`,
              'success'
            );
            //actualizar la tabla de productos
            consultaListaUsuarios().then((respuesta)=> setUsuarios(respuesta))
          }else{
            Swal.fire(
              'Ocurrió un error',
              `Intente realizar esta operación nuevamente mas tarde`,
              'success'
            )
          }
        })
      }
    })
  }

  return (
    <tr>
      <td>{usuario.nombreUsuario}</td>
      <td>{usuario.email}</td>
      <td className="d-flex justify-content-evenly">
        <Link className="btn btn-warning m-1" to={"/administrador/editar-usuario/" + usuario._id}>
          Editar
        </Link>
        <Button variant="danger" className="m-1" onClick={borrarUsuario}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;