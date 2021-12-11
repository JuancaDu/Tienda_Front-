import "./proveedor.css";
import Menu from "../Menu/Menu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormProveedor() {
 
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  let params = useParams(); // captura parameetros de la url { cedula }

  const InicializarForm = async () => {
    // validar si hay algo en el parametro cedula
    if (params.nit) {
      // hacer un get por cedula para traer los datos
      // despues de tener los datos asociales a los input los datos correspondientes
      const response = await fetch(
        "http://localhost:8080/Proveedor/" + params.nit
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("nit_Proveedores").value = data.nit_Proveedor;
      document.getElementById("ciudad_Proveedores").value = data.ciudad_Proveedor;
      document.getElementById("direccion_Proveedores").value = data.direccion_Proveedor;
      document.getElementById("nombre_Proveedores").value = data.nombre_Proveedor;
      document.getElementById("telefono_Proveedores").value = data.telefono_Proveedor;
    }
  };
  useEffect(() => {
    //sirve para ejecutar esa funcion apenas carga o cuando cambia una variable dentro de la funcion
    InicializarForm();
  }, []);

  const crearNuevoProveedor = async (e) => {
    e.preventDefault();

    const nitProveedor = document.getElementById("nit_Proveedores").value;
    const ciudadProveedor = document.getElementById("ciudad_Proveedores").value;
    const direccionProveedor = document.getElementById("direccion_Proveedores").value;
    const nombreProveedor = document.getElementById("nombre_Proveedores").value;
    const telefonoProveedor = document.getElementById("telefono_Proveedores").value;

    if (
      nitProveedor &&
      ciudadProveedor &&
      direccionProveedor &&
      nombreProveedor &&
      telefonoProveedor
    ) {
      const proveedorCompleto = {
        nit_Proveedor: nitProveedor,
        ciudad_Proveedor: ciudadProveedor,
        direccion_Proveedor: direccionProveedor,
        nombre_Proveedor: nombreProveedor,
        telefono_Proveedor: telefonoProveedor,
      
      };
      const response = await fetch("http://localhost:8080/saveProveedor", {
        //aqui envia la inf
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedorCompleto), // body data type must match "Content-Type" header
      });
      const respuesta = await response.json();

      if (respuesta) {
        MySwal.fire(
          "Proveedor agregado",
          "El proveedor se agregado correctamente",
          "success"
        );

        navigate("/proveedor");
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
            <div className="ProveedorTitulo">
              <h1>Ingresar Proveedor</h1>
            </div>
            <div className="Contenido_Proveedores">
              <div className="Contenido_Proveedores_div">
                <div className="Contenido_Proveedores_cuadros">
                  <label htmlFor="Nit"> NIT </label>
                  <input
                    id="nit_Proveedores"
                    type="text"
                    name="nit_Proveedores"
                    placeholder="Digite el nit"
                  />
                  <br />
                </div>

                <div className="Contenido_Clientes_cuadros">
                  <label htmlFor="Proveedor"> Nombre proveedor </label>
                  <input
                    id="nombre_Proveedores"
                    type="text"
                    name="nombre_Proveedores"
                    placeholder="Digite el nombre del proveedor"
                  />
                  <br />
                </div>
              </div>

              <div className="Contenido_Proveedores_div">
                <div className="Contenido_Proveedores_cuadros">
                  <label htmlFor="Direccion"> Dirección </label>
                  <input
                    type="text"
                    id="direccion_Proveedores"
                    name="direccion_Proveedores"
                    placeholder="Digite la direccion"
                  />
                  <br />
                </div>

                <div className="Contenido_Proveedores_cuadros">
                  <label htmlFor="Telefono"> Telefono </label>
                  <input
                    type="text"
                    id="telefono_Proveedores"
                    name="telefono_Proveedores"
                    placeholder="Digite el telefono"
                  />
                  <br />
                </div>
                </div>

              <div className="Contenido_Proveedores_div">
                <div className="Contenido_Proveedores_cuadros">
                  <label htmlFor="Ciudad"> Ciudad</label>
                  <input
                    type="text"
                    id="ciudad_Proveedores"
                    name="ciudad_Proveedores"
                    placeholder="Ingrese la ciudad"
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="botones_Proveedores">
              <div className="botones_Proveedores_conte">
                <button
                  type="submit"
                  id="consultar_Proveedores"
                  className="btn btn-dark btn-lg active"
                  onClick={crearNuevoProveedor}
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

export default FormProveedor;
