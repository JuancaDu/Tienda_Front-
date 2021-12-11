import './menu.css';
function Menu() {
  return (
    <div className="menu_Contenedor_Menu">
      
       <a href="/Inicio" className="bi-house">Inicio </a>
        <a href="/Usuario" className="bi-people ">Usuarios </a>
        <a href="/Cliente" className="bi-people ">Clientes </a>
        <a href="/Proveedor" className="bi-people ">Proveedores </a>
        <a href="/Producto" className="bi-people ">Productos </a>
        <a href="/Factura" className="bi-people ">Facturas </a>
        <button class="dropdown-btn">Reportes<i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="Usuario">Usuarios</a><br></br><br></br>
          <a href="Cliente">Clientes</a><br></br><br></br>
          <a href="Proveedor">Proveedores</a><br></br><br></br>
          <a href="Producto">Productos</a><br></br><br></br>
          <a href="Factura">Facturas</a><br></br><br></br>
        </div>
				     
        <a href="/" className="bi-door-closed">Cerrar Sesion </a>
      </div>
  );
}

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "active") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

export default Menu;
