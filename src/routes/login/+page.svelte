<script>
  import Navbar from "../../lib/components/Navbar.svelte";
  import { onMount } from "svelte";

  let v_usuario = "";
  let v_password = "";
  let error = null;

  // Referencias a los contenedores de los loader
  let loginLoader;

  // Función para mostrar el loader
  // Función para mostrar el loader
  function showLoader(loader) {
    if (loader) {
      loader.style.display = "flex";
    }
  }

  // Función para ocultar el loader
  function hideLoader(loader) {
    if (loader) {
      loader.style.display = "none";
    }
  }

  async function Login() {
    const v_usuario = document.getElementById("correo").value;
    const v_password = document.getElementById("contraseña").value;

    try {
      showLoader(loginLoader); // Mostrar loader
      const response = await fetch(
        "https://proyectomascotas.onrender.com/login_generate_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: v_usuario,
            password: v_password,
          }),
        },
      );

      const data = await response.json();
      hideLoader(loginLoader); // Ocultar loader

      if (response.ok) {
        const { access_token, user_data } = data; // Extraer token y datos del usuario

        // Guardar token y datos en localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_data", JSON.stringify(user_data));

        if (user_data.id_rol == 1) {
          Swal.fire({
            title: "Inicio de Sesión Exitoso",
            text: "¡Bienvenido al Sistema de Administración!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "/administrador";
          });
        } else if (user_data.id_rol == 2) {
          Swal.fire({
            title: "Inicio de Sesión Exitoso",
            text: "¡Bienvenido al Sistema!",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal-popup", // Clase para personalizar el popup de la alerta
              title: "custom-title", // Clase personalizada para el título
            },
          }).then(() => {
            window.location.href = "/usuario";
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.detail || "Usuario o Contraseña Incorrecto!",
          customClass: {
            popup: "swal-popup", // Clase para personalizar el popup de la alerta
            title: "custom-title", // Clase personalizada para el título
          },
        });
      }
    } catch (e) {
      console.error("Error en la solicitud:", e.message);
      hideLoader(loginLoader);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema con el inicio de sesión. Intenta nuevamente.",
      });
    }
  }
</script>

<Navbar></Navbar>

<section
  class="vh-100 pt-5"
  style="background-color: #eee; padding-bottom: 50%;"
>
  <div class="wrapper d-flex align-items-center justify-content-center vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <!-- Columna para la imagen -->
                <div
                  class="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    class="img-fluid"
                    alt=""
                    style="max-width: 110%;"
                  />
                </div>

                <!-- Columna para el formulario -->
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    INICIAR SESIÓN
                  </p>

                  <form on:submit|preventDefault={Login} class="mx-1 mx-md-4">
                    <!-- Campos del formulario -->
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="bi bi-envelope fa-lg me-3 fa-fw"></i>
                      <div
                        data-mdb-input-init
                        class="form-outline flex-fill mb-0"
                      >
                        <input
                          type="email"
                          id="correo"
                          class="form-control form-control-lg"
                          bind:value={v_usuario}
                          placeholder="Correo Electronico"
                          required
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="bi bi-lock fa-lg me-3 fa-fw"></i>
                      <div
                        data-mdb-input-init
                        class="form-outline flex-fill mb-0"
                      >
                        <input
                          type="password"
                          id="contraseña"
                          class="form-control form-control-lg"
                          bind:value={v_password}
                          placeholder="Contraseña"
                          required
                        />
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-around align-items-center mb-4"
                    >
                      <a href="#!">Olvidaste la contraseña?</a>
                    </div>

                    <div
                      class="d-flex justify-content-around align-items-center mb-4"
                    >
                      <a href="/Registro_User">No tienes cuenta? Registrate!!</a
                      >
                    </div>

                    <div class="text-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-primary btn-lg btn-block"
                        >Iniciar Sesión</button
                      >
                    </div>

                    <div class="divider d-flex align-items-center my-4">
                      <p class="text-center fw-bold mx-3 mb-0 text-muted">
                        TAMBIEN PUEDES INICIAR SESION CON:
                      </p>
                    </div>

                    <div class="d-flex justify-content-between">
                      <a
                        data-mdb-ripple-init
                        class="btn btn-primary btn-lg"
                        style="background-color: #3b5998"
                        href="#!"
                        role="button"
                      >
                        <i class="bi bi-facebook me-2"></i>
                        Facebook
                      </a>
                      <a
                        data-mdb-ripple-init
                        class="btn btn-primary btn-lg"
                        style="background-color: #0082fb"
                        href="#!"
                        role="button"
                      >
                        <i class="bi bi-google me-2"></i>Google
                      </a>
                    </div>
                  </form>
                  <!-- Loader del login -->
                  <div class="loader-container" bind:this={loginLoader}>
                    <div class="loader-dog-head">
                      <div class="ear left-ear"></div>
                      <div class="ear right-ear"></div>
                      <div class="eye left-eye">
                        <div class="pupil"></div>
                      </div>
                      <div class="eye right-eye">
                        <div class="pupil"></div>
                      </div>
                      <div class="nose"></div>
                      <div class="mouth"></div>
                      <div class="tongue"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .divider:after,
  .divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
  }

  /* Estilos para Sweet Alert */
  /* Fondo blanco para la alerta SweetAlert */
  .swal-popup {
    background-color: white !important;
  }

  /* Fondo blanco para la alerta de éxito */
  .swal-popup-success {
    background-color: white !important;
  }
  /* Cambiar el color del título a negro */
  .custom-title {
    color: black !important; /* Asegúrate de que el color se aplique */
    text-align: center; /* Centrar el título */
  }

  /* Estilos para el loader de la cara de un perrito */
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Contenedor para el loader */
  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente */
    display: none; /* Oculto por defecto */
    justify-content: center;
    align-items: center;
    z-index: 100; /* Asegúrate de que esté encima de otros elementos */
  }

  .loader-dog-head {
    position: relative;
    width: 120px;
    height: 120px;
    background-color: #f4a261; /* Color de piel */
    border-radius: 50%; /* Forma de la cara */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bounce 2s infinite;
  }

  .ear {
    position: absolute;
    background-color: #f4a261;
    width: 40px;
    height: 60px;
    border-radius: 50%;
    top: 10px;
  }

  .left-ear {
    left: -20px;
    transform: rotate(-30deg);
  }

  .right-ear {
    right: -20px;
    transform: rotate(30deg);
  }

  .eye {
    position: absolute;
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 35px;
  }

  .left-eye {
    left: 30px;
  }

  .right-eye {
    right: 30px;
  }

  .pupil {
    position: absolute;
    background-color: #000;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 6px;
    left: 6px;
    animation: blink 3s infinite;
  }

  .nose {
    position: absolute;
    background-color: #2d3436;
    width: 20px;
    height: 15px;
    border-radius: 50%;
    bottom: 45px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .mouth {
    position: absolute;
    width: 40px;
    height: 20px;
    border: 2px solid #2d3436;
    border-top: none;
    border-radius: 0 0 20px 20px;
    bottom: 30px;
  }

  .tongue {
    position: absolute;
    background-color: #e76f51;
    width: 16px;
    height: 24px;
    border-radius: 50%;
    bottom: 15px;
    animation: waggle 1.5s infinite ease-in-out;
  }

  /* Animaciones */
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes blink {
    0%,
    80%,
    100% {
      transform: scaleY(1);
    }
    90% {
      transform: scaleY(0.1);
    }
  }

  @keyframes waggle {
    0%,
    100% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(10deg);
    }
  }
</style>
