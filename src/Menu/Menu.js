import './menu.css';
function Menu() {
  return (
    <div className="menu_Contenedor_Menu">
      
       <a href="/Inicio" className="bi-house">Inicio </a>
        <a href="/Usuario" className="bi-person-check">Usuarios </a>
        <a href="/Cliente" className="bi-people ">Clientes </a>
        <a href="/Proveedor" className="bi-truck ">Proveedores </a>
        <a href="/Producto" className="bi-cart4 ">Productos </a>
        <a href="/Factura" className="bi-receipt ">Ventas </a>
        <a href="/Factura" className="bi-journal-check ">Reportes </a>
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
