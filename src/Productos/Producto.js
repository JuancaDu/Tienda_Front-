import "./producto.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Producto() {
  const [infoProductos, modificarInfoProductos] = useState([]); //useState sirve para renderizar al notar un cambio
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarProductos();
  }, []);

  function FormProductos() {
    navigate("/formProducto");
  }

  const cargarProductos = async () => {
    const response = await fetch("http://localhost:8080/listarProducto");
    const data = await response.json();
    modificarInfoProductos(data);
  };

  const eliminarProducto = async (codigo) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar el producto?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then ( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8080/eliminarProducto/" + codigo,
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
          const foundProducto = infoProductos.filter(
            (element) => element.codigo_Producto != codigo
          );
          modificarInfoProductos(foundProducto);
        }

        MySwal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        
      }
    });
  };

  const redireccionForProducto = (codigo) => {
    navigate("/formProducto/"+codigo);
  }
  const generarTabla = () => {
    return infoProductos.map((element) => (
      <tr key={element.codigo_Producto}>
        <td> {element.codigo_Producto} </td>
        <td> {element.nombre_Producto} </td>
        <td> {element.nit_Proveedor} </td>
        <td> {element.precio_Compra} </td>
        <td> {element.iva_Producto} </td>
        <td> {element.precio_Venta_Producto} </td>
        <td>
          <button 
          className="btn btn-outline-dark btn-sm marginButtonProducto bi bi-pencil-fill"
          onClick={(e) => redireccionForProducto (element.codigo_Producto) }
          ></button>
          <button
            className="btn btn-dark btn-sm marginButtonProducto bi bi-trash "
            onClick={(e) => eliminarProducto(element.codigo_Producto)}
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
          <div className="ProductoTabla">
            <div className="ProductoTitulo">
              <h1>Productos</h1>
            </div>

            <table className="ProductoTablaAncho table table-striped mx-auto">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre Producto</th>
                  <th>NIT Proveedor</th>
                  <th>Precio Compra</th>
                  <th>IVA producto</th>
                  <th>Precio Venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{generarTabla()}</tbody>
            </table>
            <div className="ProductoTablaAncho mx-auto">
              <a>
                <button className="btn btn-dark" onClick={FormProductos}>
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
export default Producto;
