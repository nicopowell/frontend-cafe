//llamar a mis variables de entorno

const URLUsuario = import.meta.env.VITE_API_USUARIO;
const URLProducto = import.meta.env.VITE_API_PRODUCTO;

export const login = async (usuario) => {
    try {
        const respuesta = await fetch(URLUsuario+"login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });
        const datos = await respuesta.json();
        return {
            status: respuesta.status,
            nombreUsuario: datos.nombreUsuario,
        };
    } catch (error) {
        console.log(error);
    }
};

/*
GET obtener un listado de elementos o un elemento
POST crear un elemento nuevo en la BD
PUT / PATCH editar un elemento nuevo en la BD
DELETE borra un elemento de la BD 
*/

export const consultaListaProductos = async () => {
    try {
        const respuesta = await fetch(URLProducto);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
};
export const consultaProducto = async (id) => {
    try {
        const respuesta = await fetch(URLProducto + "/" + id);
        const producto = await respuesta.json();
        return producto;
    } catch (error) {
        console.log(error);
    }
};

export const consultaBorrarProducto = async (id) => {
    try {
        const respuesta = await fetch(`${URLProducto}/${id}`, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
export const consultaAgregarProducto = async (producto) => {
    try {
        const respuesta = await fetch(URLProducto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
export const consultaEditarProducto = async (producto, id) => {
    try {
        const respuesta = await fetch(URLProducto + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const consultaListaUsuarios = async () => {
    try {
        const respuesta = await fetch(URLUsuario);
        const listaUsuarios = await respuesta.json();
        return listaUsuarios;
    } catch (error) {
        console.log(error);
    }
};

export const consultaUsuario = async (id) => {
    try {
        const respuesta = await fetch(URLUsuario + id);
        const usuario = await respuesta.json();
        return usuario;
    } catch (error) {
        console.log(error);
    }
};

export const consultaAgregarUsuario = async (usuario) => {
    try {
        const usuarioNuevo = {
            ...usuario,
            administrador: false,
        };
        const respuesta = await fetch(URLUsuario, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioNuevo),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const consultaEditarUsuario = async (usuario, id) => {
    try {
        const respuesta = await fetch(URLUsuario + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const consultaBorrarUsuario = async (id) => {
    try {
        const respuesta = await fetch(`${URLUsuario}/${id}`, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
