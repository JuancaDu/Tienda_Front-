import "./usuario.css";
import Menu from "../Menu/Menu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormUsuario() {
  //const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  let params = useParams(); // captura parameetros de la url { cedula }

  const InicializarForm = async () => {
    // validar si hay algo en el parametro cedula
    if (params.cedula) {
      // hacer un get por cedula para traer los datos
      // despues de tener los datos asociales a los input los datos correspondientes
      const response = await fetch(
        "http://localhost:8080/Usuario/" + params.cedula
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("cedula_Usuarios").value = data.cedula_Usuario;
      document.getElementById("usuario").value = data.usuario;
      document.getElementById("nombre_Usuarios").value = data.nombre_Usuario;
      document.getElementById("clave_Usuarios").value = data.clave_Usuario;
      document.getElementById("correo_Usuarios").value = data.correo_Usuario;
    }
  };
  useEffect(() => {
    //sirve para ejecutar esa funcion apenas carga o cuando cambia una variable dentro de la funcion
    InicializarForm();
  }, []);

  const crearNuevoUsuario = async (e) => {
    e.preventDefault();

    const cedulaUsuario = document.getElementById("cedula_Usuarios").value;
    const usuario = document.getElementById("usuario").value;
    const nombreUsuario = document.getElementById("nombre_Usuarios").value;
    const claveUsuario = document.getElementById("clave_Usuarios").value;
    const correoUsuario = document.getElementById("correo_Usuarios").value;

    if (
      cedulaUsuario &&
      nombreUsuario &&
      usuario &&
      claveUsuario &&
      correoUsuario
    ) {
      const usuarioCompleto = {
        cedula_Usuario: cedulaUsuario,
        nombre_Usuario: nombreUsuario,
        correo_Usuario: correoUsuario,
        usuario: usuario,
        clave_Usuario: claveUsuario,
        // usuario, clave_Usuario son las variables del modelo en eclipse mismo nombre
      };
      const response = await fetch("http://localhost:8080/saveUsuario", {
        //aqui envia la inf
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioCompleto), // body data type must match "Content-Type" header
      });
      const respuesta = await response.json();

      if (respuesta) {
        MySwal.fire(
          "Usuario agregado",
          "El usuario se agregado correctamente",
          "success"
        );

        navigate("/usuario");
      } else {
        MySwal.fire(
          "Datos Incompletos",
          "Por favor complete todos los campos", "error"
        );
      }
    }
  };

  return (
    <>
      <div className="flex">
        <Menu></Menu>
        <div className="anchoMenu">
          <form>
            <div className="UsuarioTitulo">
              <h1>Ingresar Usuarios</h1>
            </div>
            <div className="Contenido_Usuarios">
              <div className="Contenido_Usuarios_div">
                <div className="Contenido_Usuarios_cuadros">
                  <label htmlFor="Cédula"> Cédula </label>
                  <input
                    id="cedula_Usuarios"
                    type="text"
                    name="cedula_Usuarios"
                    placeholder="Digite la cédula"
                  />
                  <br />
                </div>

                <div className="Contenido_Usuarios_cuadros">
                  <label htmlFor="Usuario"> Usuario </label>
                  <input
                    id="usuario"
                    type="text"
                    name="usuario_Usuarios"
                    placeholder="Digite el usuario"
                  />
                  <br />
                </div>
              </div>

              <div className="Contenido_Usuarios_div">
                <div className="Contenido_Usuarios_cuadros">
                  <label htmlFor="Nombre_Completo"> Nombre Completo </label>
                  <input
                    type="text"
                    id="nombre_Usuarios"
                    placeholder="Digite el nombre"
                  />
                  <br />
                </div>

                <div className="Contenido_Usuarios_cuadros">
                  <label htmlFor="Contraseña"> Contraseña </label>
                  <input
                    type="text"
                    id="clave_Usuarios"
                    placeholder="Digite la contrasena"
                  />
                  <br />
                </div>
              </div>

              <div className="Contenido_Usuarios_div">
                <div className="Contenido_Usuarios_cuadros">
                  <label htmlFor="Correo_Electronico">
                    {" "}
                    Correo Electronico{" "}
                  </label>
                  <input
                    type="text"
                    id="correo_Usuarios"
                    placeholder="Digite el correo"
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="botones_Usuarios">
              <div className="botones_Usuarios_conte">
                <button
                  type="submit"
                  id="consultar_Usuarios"
                  className="btn btn-dark btn-lg active"
                  onClick={crearNuevoUsuario}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormUsuario;
