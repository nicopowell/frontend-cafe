import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { consultaEditarUsuario, consultaUsuario } from "../../helpers/queries";

const EditarUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const {id} = useParams();
  const navegacion = useNavigate()

  useEffect(()=>{
    consultaUsuario(id).then((respuesta)=>{
      if(respuesta){
        setValue('nombreUsuario', respuesta.nombreUsuario);
        setValue('email', respuesta.email);
        setValue('password', respuesta.password);
        setValue('administrador', respuesta.administrador);
      }else{
        Swal.fire('Ocurrio un error', `No se puede editar el usuario, intentelo mas tarde`, 'error');
      }
    })
  }, [])

  const onSubmit = (usuarioEditado) => {
    consultaEditarUsuario(usuarioEditado, id).then((respuestaCreated) => {
      if (respuestaCreated && respuestaCreated.status === 200) {
        Swal.fire(
          "Usuario editado",
          `El usuario ${usuarioEditado.nombre} fue editado correctamente`,
          "success"
        );
        navegacion('/administrador')
        reset();
      } else {
        Swal.fire(
          "Ocurrió un error",
          `El usuario ${usuarioEditado.nombre} no fue editado, intentelo mas tarde`,
          "error"
        );
      }
    });
  };

  return (
    <section className="container py-5 mainSection">
      <h1 className="display-4">Editar Usuario</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre de usuario*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: usuario_rolling"
            {...register("nombreUsuario", {
              required: "El usuario es un dato obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9_]{4,16}$/,
                message:
                  "El usuario debe contener unicamente letras, numeros y guiones bajos entre 4 y 16 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.nombreUsuario?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: email@rollingcode.com"
            {...register("email", {
              required: "El email es un dato obligatorio",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "El email debe cumplir con el formato mail@dominio.com",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ej: password"
            {...register("password", {
              required: "El password es un dato obligatorio",
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message:
                  "El password debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAdministrador">
          <Form.Label>Administrador*</Form.Label>
          <Form.Select
            {...register("administrador", {
              required: "Debes indicar si el usuario es administrador",
              validate: (value) => value !== "",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Select>
          <Form.Text className="text-danger">{errors.administrador?.message}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarUsuario;
