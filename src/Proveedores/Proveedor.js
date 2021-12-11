import "./proveedor.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Proveedor() {
  const [infoProveedores, modificarInfoProveedores] = useState([]); //useState sirve para renderizar al notar un cambio
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarProveedores();
  }, []);

  function FormProveedor() {
    navigate("/formProveedor");
  }

  const cargarProveedores = async () => {
    const response = await fetch("http://localhost:8080/listarProveedor");
    const data = await response.json();
    modificarInfoProveedores(data);
  };

  const eliminarProveedor = async (nit) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar el Proveedor?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then ( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8080/eliminarProveedor/" + nit,
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
          const foundProveedor = infoProveedores.filter(
            (element) => element.nit_Proveedor != nit
          );
          modificarInfoProveedores(foundProveedor);
        }

        MySwal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        
      }
    });
  };

  const redireccionForProveedor = (nit) => {
    navigate("/formProveedor/"+nit);
  }
  const generarTabla = () => {
    return infoProveedores.map((element) => (
      <tr key={element.nit_Proveedor}>
        <td> {element.nit_Proveedor} </td>
        <td> {element.ciudad_Proveedor} </td>
        <td> {element.direccion_Proveedor} </td>
        <td> {element.nombre_Proveedor} </td>
        <td> {element.telefono_Proveedor} </td>
        <td>
          <button 
          className="btn btn-outline-dark btn-sm marginButtonProveedor bi bi-pencil-fill"
          onClick={(e) => redireccionForProveedor (element.nit_Proveedor)}
          ></button>
          <button
            className="btn btn-dark btn-sm marginButtonProveedor bi bi-trash "
            onClick={(e) => eliminarProveedor(element.nit_Proveedor)}
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
          <div className="ProveedorTabla">
            <div className="ProveedorTitulo">
              <h1>Proveedor</h1>
            </div>

            <table className="ProveedorTablaAncho table table-striped mx-auto">
              <thead>
                <tr>
                  <th>Nit</th>
                  <th>Ciudad</th>
                  <th>Dirección</th>
                  <th>Nombre</th>
                  <th>Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{generarTabla()}</tbody>
            </table>
            <div className="ProveedorTablaAncho mx-auto">
            <a>
                <button className="btn btn-dark" onClick={FormProveedor}>
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
export default Proveedor;
