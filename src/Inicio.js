import Menu from './Menu/Menu'

function Inicio() {
  const estilos = {
    padre: {
      height: "90vh",
    },

    card: {
      width: "30%",
    },

	flex:{
		display: "flex",
	},

	ancho:{
		width: "86vw",

	}
  };

  

  return (
    <div style={estilos.flex}>
      <Menu></Menu>
      <div style={estilos.ancho}>
        <div
          className="row row-cols-1 row-cols-md-3 g-4 mx-5 my-3 "
          style={estilos.padre}
        >
          <div className="col " style={estilos.card}>
            <div className="card h-100">
              <img
                src="https://misionticueb.myopenlms.net/pluginfile.php/1/tool_themeassets/assets/0/logo-mision-ubosque.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {" "}
                  <strong>Ciclo 4 Desarrollo de software - MINTIC</strong>
                </h5>
                <p className="card-text">
                  Cadena de Tiendas la "Generica". Proyecto de curso.</p>
              </div>
            </div>
          </div>

          <div className="col" style={estilos.card}>
            <div className="card h-100">
              <img
                src="https://blog.trello.com/hubfs/Imported%20images/Global%20Footer%20CTA%20Image.png"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Avance del proyecto</strong>
                </h5>
                <p className="card-text">
                  Tablero de trello.
                </p>
              </div>
              <div className="card-footer bg-transparent border-white">
                <a
                  href="https://trello.com/b/ZfWM1RCl/equipo-14-del-grupo-50"
                  target="blank"
                  className="btn btn-primary"
                >
                  Ir al tablero del equipo.
                </a>
              </div>
            </div>
          </div>

          <div className="col" style={estilos.card}>
            <div className="card h-100">
              <img
                src="https://github.githubassets.com/images/modules/site/icons/footer/github-logo.svg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Repositorio</strong>
                </h5>
                <p className="card-text">
                  Este es nuestro repositorio en Github.com para este proyecto.
                </p>
              </div>
              <div className="card-footer bg-transparent border-white">
                <a href="https://github.com/JuancaDu/Tienda_Back.git" target="blank" className="btn btn-primary">
                  Ir al repo Back
                </a>
              </div>
              <div className="card-footer bg-transparent border-white">
                <a href="https://github.com/JuancaDu/Tienda_Front.git" target="blank" className="btn btn-primary">
                  Ir al repo Front
                </a>
              </div>
            </div>
          </div>

          <div className="col" style={estilos.card}>
            <div className="card h-100">
              <img
                src="https://misionticueb.myopenlms.net/pluginfile.php/91348/theme_snap/coverimage/1630177066/course-image.jpg"
                class="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Equipo #</strong>
                </h5>
                <h5>Juan Carlos Dueñas Castro</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;