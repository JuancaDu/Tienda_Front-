import "./App.css";
import Menu from "./Menu/Menu";
import Inicio from "./Inicio";
import Usuario from "./Usuarios/Usuario";
import FormUsuario from "./Usuarios/FormUsuario";

import Clientes from "./Clientes/Clientes";
import FormCliente from "./Clientes/FormCliente";

import Proveedores from "./Proveedores/Proveedor";
import FormProveedor from "./Proveedores/FormProveedor";

import Productos from "./Productos/Producto";
import FormProducto from "./Productos/FormProducto";

import Facturas from "./Facturas/Factura";
import FormFactura from "./Facturas/FormFactura";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Usuario" element={<Usuario />} />
        <Route path="/formUsuario" element={<FormUsuario />} />
        <Route path="/formUsuario/:cedula" element={<FormUsuario />} />
        
        <Route path="/Cliente" element={<Clientes />} />
        <Route path="/formCliente" element={<FormCliente />} />
        <Route path="/formCliente/:cedula" element={<FormCliente />} />

        <Route path="/Proveedor" element={<Proveedores />} />
        <Route path="/formProveedor" element={<FormProveedor />} />
        <Route path="/formProveedor/:nit" element={<FormProveedor />} />

        <Route path="/Producto" element={<Productos />} />
        <Route path="/formProducto" element={<FormProducto />} />
        <Route path="/formProducto/:codigo" element={<FormProducto />} />

        <Route path="/Factura" element={<Facturas />} />
        <Route path="/formFactura" element={<FormFactura />} />
        <Route path="/formFactura/:codigo" element={<FormFactura />} />

        {/* /* path es la ruta href  y elemnt el nombre del componente*/}
      </Routes>
    </Router>
  );
}

export default App;
