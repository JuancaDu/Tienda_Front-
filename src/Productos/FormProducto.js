import "./producto.css";
import Menu from "../Menu/Menu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormProducto() {
  //const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  let params = useParams(); // captura parameetros de la url { cedula }

  const InicializarForm = async () => {
    // validar si hay algo en el parametro código
    if (params.codigo) {
      // hacer un get por codigo para traer los datos
      // despues de tener los datos asociales a los input los datos correspondientes
      const response = await fetch(
        "http://localhost:8080/Producto/" + params.codigo
      );
      const data = await response.json();
      console.log(data);
      document.getElementById("codigo_Productos").value = data.codigo_Producto;
      document.getElementById("nombre_Productos").value = data.nombre_Producto;
      document.getElementById("nit_Proveedor").value = data.nit_Proveedor;
      document.getElementById("precio_Compra").value = data.precio_Compra;
      document.getElementById("iva_Productos").value = data.iva_Producto;
      document.getElementById("precio_Venta_Productos").value = data.precio_Venta_Producto;
    }
  };
  useEffect(() => {
    //sirve para ejecutar esa funcion apenas carga o cuando cambia una variable dentro de la funcion
    InicializarForm();
  }, []);

  const crearNuevoProducto = async (e) => {
    e.preventDefault();

    const codigoProducto = document.getElementById("codigo_Productos").value;
    const nombreProducto = document.getElementById("nombre_Productos").value;
    const nitProveedor = document.getElementById("nit_Proveedor").value;
    const precioCompra = document.getElementById("precio_Compra").value;
    const ivaProducto = document.getElementById("iva_Productos").value;
    const precioVentaProducto = document.getElementById("precio_Venta_Productos").value;

    if (
      codigoProducto &&
      nombreProducto &&
      nitProveedor &&
      precioCompra &&
      ivaProducto &&
      precioVentaProducto
    ) {
      const productoCompleto = {
        codigo_Producto: codigoProducto,
        nombre_Producto: nombreProducto,
        nit_Proveedor: nitProveedor,
        precio_Compra: precioCompra,
        iva_Producto: ivaProducto,
        precio_Venta_Producto: precioVentaProducto
        // usuario, clave_Usuario son las variables del modelo en eclipse mismo nombre
      };
      const response = await fetch("http://localhost:8080/saveProducto", {
        //aqui envia la inf
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoCompleto), // body data type must match "Content-Type" header
      });
      const respuesta = await response.json();

      if (respuesta) {
        MySwal.fire(
          "Producto agregado",
          "El producto se ha agregado correctamente",
          "success"
        );

        navigate("/Producto");
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
            <div className="ProductoTitulo">
              <h1>Ingresar Productos</h1>
            </div>
            <div className="Contenido_Productos">
              <div className="Contenido_Producto_div">
              <div className="Contenido_Productos_div">
                <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Código"> Código </label>
                  <input
                    id="codigo_Productos"
                    type="text"
                    name="codigo_Productos"
                    placeholder="Ingrese el código del producto"
                  />
                  <br />
                </div>

                <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Nombre_Producto"> Descripcion Producto </label>
                  <input
                    id="nombre_Productos"
                    type="text"
                    name="nombre_Productos"
                    placeholder="Digite el nombre del producto"
                  />
                  <br />
                </div>

              </div>
              
              <div className="Contenido_Productos_div">
                <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Nit_Proveedor"> Nit del Proveedor </label>
                  <input
                    type="text"
                    id="nit_Proveedor"
                    name="nit_Proveedor"
                    placeholder="Digite el NIT del Proveedor del producto"
                  />
                  <br />
                </div>

                <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Precio_Compra"> Precio de compra </label>
                  <input
                    type="text"
                    id="precio_Compra"
                    name="precio_Compra"
                    placeholder="Precio de compra del producto"
                  />
                  <br />
                </div>
              </div>
              
              <div className="Contenido_Productos_div">
                <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Iva_Producto"> Iva del producto</label>
                  <input
                    type="text"
                    id="iva_Productos"
                    name="precio_Compra"
                    placeholder="Precio de compra del producto"
                  />
                  <br />
                </div>
              

              <div className="Contenido_Productos_cuadros">
                  <label htmlFor="Precio_Venta_Productos"> Precio de venta </label>
                  <input
                    type="text"
                    id="precio_Venta_Productos"
                    name="precio_Venta_Productos"
                    placeholder="Precio de venta del producto"
                  />
                  <br />
                </div>
              </div>
              </div>
            </div>

            <div className="botones_Productos">
              <div className="botones_Productos_conte">
                <button
                  type="submit"
                  id="consultar_Productos"
                  className="btn btn-dark btn-lg active"
                  onClick={crearNuevoProducto}
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

export default FormProducto;