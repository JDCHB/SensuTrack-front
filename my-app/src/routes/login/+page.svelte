<script>
  import Navbar from "../../lib/components/Navbar.svelte";
  import ChatBot from "$lib/components/ChatBot.svelte";
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

  let captchaElement;

  onMount(() => {
    // Al cargar la página, inicializamos el reCAPTCHA
    grecaptcha.render(captchaElement, {
      sitekey: "6Lf0vdUqAAAAAN51836FYzxSTExokw1cl2HB426y",
    });
  });

  async function Login() {
    const v_usuario = document.getElementById("correo").value;
    const v_password = document.getElementById("contraseña").value;
    // Referencia al Captcha
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, verifica el reCAPTCHA.",
      });
      return;
    }

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
        grecaptcha.reset(); // Restablece el CAPTCHA después de una respuesta exitosa

        // Lógica de autenticación
        // Guardar token y datos en localStorage
        const { access_token, user_data } = data; // Extraer token y datos del usuario
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_data", JSON.stringify(user_data));
        console.log(user_data);
        if (user_data.id_rol == 3) {
          todos = user_data;
          let v_nombre = user_data.nombre;
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
            text: "¡Bienvenido al Sistema de Usuario!",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              popup: "swal-popup", // Clase para personalizar el popup de la alerta
              title: "custom-title", // Clase personalizada para el título
            },
          }).then(() => {
            window.location.href = "/usuario";
          });
        } else {
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
            window.location.href = "/Can_See_Or_Not";
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

  document
    .getElementById("google-login-btn")
    .addEventListener("click", async () => {
      try {
        const res = await fetch("/OAuth2", { method: "POST" });
        if (res.redirected) {
          window.location.href = res.url; // Redirige al usuario a la URL de Google
        }
      } catch (error) {
        console.error("Error al iniciar sesión con Google", error);
      }
    });
</script>

<Navbar></Navbar>
<ChatBot></ChatBot>
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

                  <!-- Formulario de inicio de sesión -->
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
                      <a href="/Cambio_Clave">Olvidaste la contraseña?</a>
                    </div>

                    <div
                      class="d-flex justify-content-around align-items-center mb-4"
                    >
                      <a href="/Registro_User">No tienes cuenta? Registrate!!</a
                      >
                    </div>

                    <div class="d-flex justify-content-center mb-4">
                      <div class="g-recaptcha" bind:this={captchaElement}></div>
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
                  </form>

                  <!-- Botones de autenticación externa (Facebook y Google) -->
                  <div class="d-flex justify-content-between">
                    <!-- Botón de Facebook -->
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

                    <!-- Formulario para el botón de Google -->
                    <button
                      id="google-login-btn"
                      class="btn btn-primary btn-lg"
                      style="background-color: #0082fb"
                    >
                      <i class="bi bi-google me-2"></i>Google
                    </button>
                  </div>

                  <!-- Loader del login -->
                  <div class="loader-container" bind:this={loginLoader}>
                    <div class="loader-text">
                      <span>S</span>
                      <span>e</span>
                      <span>n</span>
                      <span>s</span>
                      <span>u</span>
                      <span>T</span>
                      <span>r</span>
                      <span>a</span>
                      <span>c</span>
                      <span>k</span>
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
    background: rgba(255, 255, 255, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .loader-text {
    display: flex;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 5px;
    color: #007bff; /* Color azul principal */
    animation: fadeIn 1.5s infinite alternate;
  }

  .loader-text span {
    animation: bounce 1.5s infinite ease-in-out;
    animation-delay: calc(0.1s * var(--i));
  }

  .loader-text span:nth-child(1) {
    --i: 1;
  }
  .loader-text span:nth-child(2) {
    --i: 2;
  }
  .loader-text span:nth-child(3) {
    --i: 3;
  }
  .loader-text span:nth-child(4) {
    --i: 4;
  }
  .loader-text span:nth-child(5) {
    --i: 5;
  }
  .loader-text span:nth-child(6) {
    --i: 6;
  }
  .loader-text span:nth-child(7) {
    --i: 7;
  }
  .loader-text span:nth-child(8) {
    --i: 8;
  }
  .loader-text span:nth-child(9) {
    --i: 9;
  }
  .loader-text span:nth-child(10) {
    --i: 10;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-15px);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
</style>
