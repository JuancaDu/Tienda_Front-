import "./usuario.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Usuario() {
  const [infoUsuarios, modificarInfoUsuarios] = useState([]); //useState sirve para renderizar al notar un cambio
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function FormUsuarios() {
    navigate("/formUsuario");
  }

  const cargarUsuarios = async () => {
    const response = await fetch("http://localhost:8080/listarUsuario");
    const data = await response.json();
    modificarInfoUsuarios(data);
  };

  const eliminarUsuario = async (cedula) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar el usuario?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then ( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8080/eliminarUsuario/" + cedula,
          {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:3000",
            },
          }
        );
        const respuesta = await response.json();
        if (respuesta) {
          const foundUsuario = infoUsuarios.filter(
            (element) => element.cedula_Usuario != cedula
          );
          modificarInfoUsuarios(foundUsuario);
        }

        MySwal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        
      }
    });
  };

  const redireccionForUsuario = (cedula) => {
    navigate("/formUsuario/"+cedula);
  }
  const generarTabla = () => {
    return infoUsuarios.map((element) => (
      <tr key={element.cedula_Usuario}>
        <td> {element.cedula_Usuario} </td>
        <td> {element.nombre_Usuario} </td>
        <td> {element.correo_Usuario} </td>
        <td> {element.usuario} </td>
        <td> {element.clave_Usuario} </td>
        <td>
          <button 
          className="btn btn-outline-dark btn-sm marginButtonUsuario bi bi-pencil-fill"
          onClick={(e) => redireccionForUsuario (element.cedula_Usuario) }
          ></button>
          <button
            className="btn btn-dark btn-sm marginButtonUsuario bi bi-trash "
            onClick={(e) => eliminarUsuario(element.cedula_Usuario)}
          ></button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="flex">
        <Menu></Menu>
        <div className="anchoMenu">
          <div className="UsuarioTabla">
            <div className="UsuarioTitulo">
              <h1>Usuarios</h1>
            </div>

            <table className="UsuarioTablaAncho table table-striped mx-auto">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Correo</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{generarTabla()}</tbody>
            </table>
            <div className="UsuarioTablaAncho mx-auto">
              <a>
                <button className="btn btn-dark" onClick={FormUsuarios}>
                  Nuevo
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Usuario;
