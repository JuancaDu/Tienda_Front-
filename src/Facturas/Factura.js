import "./factura.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Factura() {
  const [infoFacturas, modificarInfoFacturas] = useState([]); 
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    cargarFacturas();
  }, []);

  function FormFacturas() {
    navigate("/formFactura");
  }

  const cargarFacturas = async () => {
    const response = await fetch("http://localhost:8080/listarFactura");
    const data = await response.json();
    modificarInfoFacturas(data);
  };

  const eliminarFactura = async (codigo) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar la factura?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then ( async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await fetch(
          "http://localhost:8080/eliminarFactura/" + codigo,
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
          const foundFactura = infoFacturas.filter(
            (element) => element.codido_Vta !== codigo
          );
          modificarInfoFacturas(foundFactura);
        }

        MySwal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        
      }
    });
  };

  const redireccionForFactura = (codigo) => {
    navigate("/formFactura/"+codigo);
  }
  const generarTabla = () => {
    return infoFacturas.map((element) => (
      <tr key={element.codigo_Vta}>
        <td> {element.codigo_Vta} </td>
        <td> {element.cedula_Usu_Vta} </td>
        <td> {element.cedula_Cli_Vta} </td>
        <td> {element.nombre_Cli_Vta} </td>
        <td> {element.valor_Vta} </td>
        <td> {element.valor_IVA} </td>
        <td> {element.valor_Total} </td>
        <td>
          {/*<button 
          className="btn btn-outline-primary btn-sm marginButtonFactura bi bi-pencil-fill"
          onClick={(e) => redireccionForFactura (element.codigo_Vta) }
          ></button>*/}
          <button
            className="btn btn-dark btn-sm marginButtonFactura bi bi-trash "
            onClick={(e) => eliminarFactura(element.codigo_Vta)}
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
          <div className="FacturaTabla">
            <div className="FacturaTitulo">
              <h1>Vetas</h1>
            </div>

            <table className="FacturaTablaAncho table table-striped mx-auto">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>cedula Cliente</th>
                  <th>cedula usuario</th>
                  <th>nombre_Cliente</th>
                  <th>Iva</th>
                  <th>Total</th>
                  <th>Total_venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{generarTabla()}</tbody>
            </table>
            <div className="FacturaTablaAncho mx-auto">
            <a>
                <button className="btn btn-dark" onClick={FormFacturas}>
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
export default Factura;
