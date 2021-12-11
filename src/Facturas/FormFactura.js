import "./factura.css";
import Menu from "../Menu/Menu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormFactura() {
 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  let params = useParams(); // captura parameetros de la url { cedula }

  const InicializarForm = async () => {
    // validar si hay algo en el parametro cedula
    if (params.codigo) {
      // hacer un get por cedula para traer los datos
      // despues de tener los datos asociales a los input los datos correspondientes
      const response = await fetch(
        "http://localhost:8080/Factura/" + params.codigo
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("codigo_Vta").value = data.codigo_Vta;
      document.getElementById("cedula_Usu_Vta").value = data.cedula_Usu_Vta;
      document.getElementById("cedula_Cli_Vta").value = data.cedula_Cli_Vta;
      document.getElementById("nombre_Cli_Vta").value = data.nombre_Cli_Vta;
      document.getElementById("valor_Vta").value = data.valor_Vta;
      document.getElementById("valor_IVA").value = data.valor_IVA;
      document.getElementById("valor_Total").value = data.valor_Total;
    }
  };
  useEffect(() => {
    //sirve para ejecutar esa funcion apenas carga o cuando cambia una variable dentro de la funcion
    InicializarForm();
  },[]);

  const crearNuevaFactura = async (e) => {
    e.preventDefault();

    const codigoVta = document.getElementById("codigo_Vta").value;
    const cedulaUsuVta = document.getElementById("cedula_Usu_Vta").value;
    const cedulaCliVta = document.getElementById("cedula_Cli_Vta").value;
    const nombreCliVta = document.getElementById("nombre_Cli_Vta").value;
    const valorVta = document.getElementById("valor_Vta").value;
    const valorIVA = document.getElementById("valor_IVA").value;
    const valorTotal = document.getElementById("valor_Total").value;

    if (
      codigoVta &&
      cedulaUsuVta &&
      cedulaCliVta &&
      nombreCliVta &&
      valorVta &&
      valorIVA &&
      valorTotal
    ) {
      const facturaCompleto = {
        codigo_Vta: codigoVta,
        cedula_Usu_Vta: cedulaUsuVta,
        cedula_Cli_Vta: cedulaCliVta,
        nombre_Cli_Vta: nombreCliVta,
        valor_Vta: valorVta,
        valor_IVA: valorIVA,
        valor_Total: valorTotal,
      
      };
      const response = await fetch("http://localhost:8080/saveFactura", {
        //aqui envia la inf
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facturaCompleto), // body data type must match "Content-Type" header
      });
      const respuesta = await response.json();

      if (respuesta) {
        MySwal.fire(
          "Factura agregada",
          "La factura se agregado correctamente",
          "success"
        );

        navigate("/factura");
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
            <div className="FacturaTitulo">
              <h1>Ingresar Factura</h1>
            </div>
            <div className="Contenido_Facturas">
              <div className="Contenido_Facturas_div">
                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="Codigo"> Codigo </label>
                  <input
                    id="codigo_Vta"
                    type="text"
                    name="codigo_Vta"
                    placeholder="Digite el codigo"
                  />
                  <br />
                </div>

                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="cedula_Usu_Vta"> cedula_Usu_Vta </label>
                  <input
                    id="cedula_Usu_Vta"
                    type="text"
                    name="cedula_Usu_Vta"
                    placeholder="Digite cedula del usuario"
                  />
                  <br />
                </div>
              </div>

              <div className="Contenido_Facturas_div">
                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="cedula_Cli_Vta"> cedula_Cli_Vta </label>
                  <input
                    type="text"
                    id="cedula_Cli_Vta"
                    name="cedula_Cli_Vta"
                    placeholder="Digite cedula del cliente"
                  />
                  <br />
                </div>

                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="nombre_Cli_Vta"> nombre_Cli_Vta </label>
                  <input
                    type="text"
                    id="nombre_Cli_Vta"
                    name="nombre_Cli_Vta"
                    placeholder="Digite el nombre del cliente"
                  />
                  <br />
                </div>
                </div>

              <div className="Contenido_Facturas_div">
                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="valor_Vta">valor_Vta</label>
                  <input
                    type="text"
                    id="valor_Vta"
                    name="valor_Vta"
                    placeholder="Digite el valor de la venta"
                  />
                  <br />
                </div>
                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="valor_IVA"> valor_IVA </label>
                  <input
                    type="text"
                    id="valor_IVA"
                    name="valor_IVA"
                    placeholder="Digite el IVA"
                  />
                  <br />
                </div>
                </div>
                <div className="Contenido_Facturas_div">
                <div className="Contenido_Facturas_cuadros">
                  <label htmlFor="valor_Total">valor_Total</label>
                  <input
                    type="text"
                    id="valor_Total"
                    name="valor_Total"
                    placeholder="Digite el valor total de la venta"
                  />
                  <br />
                </div>
                </div>
              </div>
        

            <div className="botones_Facturas">
              <div className="botones_Facturas_conte">
                <button
                  type="submit"
                  id="consultar_Facturas"
                  className="btn btn-dark btn-lg active"
                  onClick={crearNuevaFactura}
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

export default FormFactura;
