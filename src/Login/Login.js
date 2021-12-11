import "./login.css";
import {useNavigate} from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const iniciarSesion = async (e) => {
    e.preventDefault();
    const nombreUsuario = document.getElementById("nombre").value;
    const claveUsuario = document.getElementById("clave").value;
    
    const usuarioCompleto = {
      usuario: nombreUsuario,
      clave_Usuario: claveUsuario, // usuario, clave_Usuario son las variables del modelo en eclipse mismo nombre
    };
    const response = await fetch("http://localhost:8080/validar", {
      //aqui envia la inf
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json"
      },  
      body: JSON.stringify(usuarioCompleto), // body data type must match "Content-Type" header
    });
    const respuesta = await response.json();

    if (respuesta) {
      navigate('/Inicio')
    } else {
      alert("Clave Incorrecta")
    }


  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div className="row">
              <div className="col-lg-6 col-md-8 mx-auto">
                <div className="card rounded shadow shadow-sm">
                  <div className="card-body">
                    <form autoComplete="off" id="formLogin" noValidate="">
                      <input type="hidden" name="tipo" value="iniciarSesion" />
                      <div className="form-group">
                        <label htmlFor="nombre">Usuario</label>{" "}
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-0"
                          id="nombre"
                          placeholder="Nombre de usuario"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Ingresa tu nombre de usuario.
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="clave">Contraseña</label>{" "}
                        <input
                          type="password"
                          className="form-control form-control-lg rounded-0"
                          id="clave"
                          required=""
                          placeholder="Contraseña"
                          autoComplete="new-password"
                        />
                        <div className="invalid-feedback">
                          ¡Ingresa tu contraseña también!
                        </div>
                      </div>
                      <div>
                        <br />
                      </div>

                      <p align="right">
                        <button
                          type="submit"
                          className="btn btn-outline-primary btn-lg float-right"
                          id="btnLogin"
                          onClick={iniciarSesion}
                        >
                          Iniciar sesión
                        </button>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <h1 className="estilo_Footer_Login">Proyecto tienda genérica </h1>
              <h2 className="estilo_Footer_Login">Universidad El Bosque</h2>
              <h2 className="estilo_Footer_Login">Ciclo 4 Desarrollo Web.</h2>
              <h2 className="estilo_Footer_Login">Grupo 14</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;