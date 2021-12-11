import "./cliente.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Cliente() {
  const [infoClientes, modificarInfoClientes] = useState([]); //useState sirve para renderizar al notar un cambio
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarClientes();
  }, []);

  function FormClientes() {
    navigate("/formCliente");
  }

  const cargarClientes = async () => {
    const response = await fetch("http://localhost:8080/listarCliente");
    const data = await response.json();
    modificarInfoClientes(data);
  };

  const eliminarCliente = async (cedula) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar el Cliente?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then ( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8080/eliminarCliente/" + cedula,
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
          const foundCliente = infoClientes.filter(
            (element) => element.cedula_Cliente != cedula
          );
          modificarInfoClientes(foundCliente);
        }

        MySwal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        
      }
    });
  };

  const redireccionForCliente = (cedula) => {
    navigate("/formCliente/"+cedula);
  }
  const generarTabla = () => {
    return infoClientes.map((element) => (
      <tr key={element.cedula_Cliente}>
        <td> {element.cedula_Cliente} </td>
        <td> {element.correo_Cliente} </td>
        <td> {element.direccion_Cliente} </td>
        <td> {element.nombre_Cliente} </td>
        <td> {element.telefono_Cliente} </td>
        <td>
          <button 
          className="btn btn-outline-dark btn-sm marginButtonCliente bi bi-pencil-fill"
          onClick={(e) => redireccionForCliente (element.cedula_Cliente) }
          ></button>
          <button
            className="btn btn-dark btn-sm marginButtonCliente bi bi-trash "
            onClick={(e) => eliminarCliente(element.cedula_Cliente)}
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
          <div className="ClienteTabla">
            <div className="ClienteTitulo">
              <h1>Clientes</h1>
            </div>

            <table className="ClienteTablaAncho table table-striped mx-auto">
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Nombres</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{generarTabla()}</tbody>
            </table>
            <div className="ClienteTablaAncho mx-auto">
            <a>
                <button className="btn btn-dark" onClick={FormClientes}>
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
export default Cliente;
