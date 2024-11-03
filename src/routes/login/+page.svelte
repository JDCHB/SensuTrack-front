<script>
  import Footer from "../../lib/components/footer.svelte";
  import Navbar from "../../lib/components/Navbar.svelte";
  import { onMount } from "svelte";

  let v_usuario = "";
  let v_password = "";
  let v_nombre = "";
  let v_apellido = "";
  let v_documento = "";
  let v_telefono = "";
  let v_email = "";
  let v_rol = 1;
  let v_estado = true;
  let error = null;

  async function Login() {
    var v_usuario = document.getElementById("correo").value;
    var v_password = document.getElementById("contraseña").value;
    console.log(v_usuario);
    console.log(v_password);
    try {
      const response = await fetch(
        "https://proyectomascotas.onrender.com/login",
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
      console.log(data);

      if (response.ok) {
        let miStorage = window.localStorage;
        miStorage.setItem("usuario", JSON.stringify(encontrado));
        alert("Inicio de sesión exitoso. Bienvenido a PetTracker");
        window.location.href = "../../usuario/+page.svelte";
      } else {
        console.error("Error de autenticación:", data); // Muestra la respuesta del servidor
        alert("Error de autenticación: " + (data.message || "Datos inválidos"));
      }
    } catch (e) {
      error = e.message;
      alert("Error en la solicitud: " + error);
    }
  }

  async function Register() {
    try {
      const response = await fetch(
        "https://proyectomascotas.onrender.com/create_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: v_email,
            password: v_password,
            nombre: v_nombre,
            apellido: v_apellido,
            documento: v_documento,
            telefono: v_telefono,
            id_rol: v_rol,
            estado: v_estado,
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Registro exitoso. Bienvenido " + v_nombre);
        window.location.href = "../login/+page.svelte";
      } else {
        alert("Error en el registro");
      }
    } catch (e) {
      error = e.message;
      alert("Error en la solicitud: " + error);
    }
  }
</script>

<Navbar></Navbar>
<section>
  <div class="wrapper d-flex align-items-center justify-content-center vh-100">
    <div class="card-switch">
      <label class="switch">
        <input type="checkbox" class="toggle" />
        <span class="slider"></span>
        <span class="card-side"></span>
        <div class="flip-card__inner">
          <div class="flip-card__front">
            <div class="title">INICIO DE SESION</div>
            <form on:submit|preventDefault={Login} class="flip-card__form">
              <input
                id="correo"
                class="flip-card__input"
                bind:value={v_usuario}
                placeholder="Email"
                type="email"
                required
              />
              <input
                id="contraseña"
                class="flip-card__input"
                bind:value={v_password}
                placeholder="Password"
                type="password"
                required
              />
              <button class="flip-card__btn">Ingrese</button>
            </form>
          </div>
          <div class="flip-card__back small-card">
            <div class="title small-title">REGISTRO</div>
            <form on:submit|preventDefault={Register} class="flip-card__form">
              <input
                class="flip-card__input small-input"
                bind:value={v_nombre}
                placeholder="Name"
                type="text"
                required
              />
              <input
                class="flip-card__input small-input"
                bind:value={v_apellido}
                placeholder="Apellido"
                type="text"
                required
              />
              <input
                class="flip-card__input small-input"
                bind:value={v_documento}
                placeholder="Documento"
                type="text"
                required
              />
              <input
                class="flip-card__input small-input"
                bind:value={v_telefono}
                placeholder="Teléfono"
                type="tel"
                required
              />
              <input
                class="flip-card__input small-input"
                bind:value={v_email}
                placeholder="Email"
                type="email"
                required
              />
              <input
                class="flip-card__input small-input"
                bind:value={v_password}
                placeholder="Password"
                type="password"
                required
              />
              <button class="flip-card__btn small-btn">Confirmar</button>
            </form>
          </div>
        </div>
      </label>
    </div>
  </div>
  <style>
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
    /* switch card */
    .switch {
      transform: translateY(-200px);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
      width: 50px;
      height: 20px;
    }
    .card-side::before {
      position: absolute;
      content: "Log in";
      left: -70px;
      top: 0;
      width: 100px;
      text-decoration: underline;
      color: var(--font-color);
      font-weight: 600;
    }
    .card-side::after {
      position: absolute;
      content: "Sign up";
      left: 70px;
      top: 0;
      width: 100px;
      text-decoration: none;
      color: var(--font-color);
      font-weight: 600;
    }
    .toggle {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      box-sizing: border-box;
      border-radius: 5px;
      border: 2px solid var(--main-color);
      box-shadow: 4px 4px var(--main-color);
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--bg-colorcolor);
      transition: 0.3s;
    }
    .slider:before {
      box-sizing: border-box;
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      border: 2px solid var(--main-color);
      border-radius: 5px;
      left: -2px;
      bottom: 2px;
      background-color: var(--bg-color);
      box-shadow: 0 3px 0 var(--main-color);
      transition: 0.3s;
    }
    .toggle:checked + .slider {
      background-color: var(--input-focus);
    }
    .toggle:checked + .slider:before {
      transform: translateX(30px);
    }
    .toggle:checked ~ .card-side:before {
      text-decoration: none;
    }
    .toggle:checked ~ .card-side:after {
      text-decoration: underline;
    }
    /* card */
    .flip-card__inner {
      width: 300px;
      height: 350px;
      position: relative;
      background-color: transparent;
      perspective: 1000px;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }
    .toggle:checked ~ .flip-card__inner {
      transform: rotateY(180deg);
    }
    .toggle:checked ~ .flip-card__front {
      box-shadow: none;
    }
    .flip-card__front,
    .flip-card__back {
      padding: 20px;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      background: lightgrey;
      gap: 20px;
      border-radius: 5px;
      border: 2px solid var(--main-color);
      box-shadow: 4px 4px var(--main-color);
    }
    .flip-card__back {
      width: 100%;
      transform: rotateY(180deg);
    }
    .flip-card__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .title {
      margin: 20px 0 20px 0;
      font-size: 25px;
      font-weight: 900;
      text-align: center;
      color: var(--main-color);
    }
    .flip-card__input {
      width: 250px;
      height: 40px;
      border-radius: 5px;
      border: 2px solid var(--main-color);
      background-color: var(--bg-color);
      box-shadow: 4px 4px var(--main-color);
      font-size: 15px;
      font-weight: 600;
      color: var(--font-color);
      padding: 5px 10px;
      outline: none;
    }
    .flip-card__input::placeholder {
      color: var(--font-color-sub);
      opacity: 0.8;
    }
    .flip-card__input:focus {
      border: 2px solid var(--input-focus);
    }
    .flip-card__btn:active,
    .button-confirm:active {
      box-shadow: 0px 0px var(--main-color);
      transform: translate(3px, 3px);
    }
    .flip-card__btn {
      margin: 20px 0 20px 0;
      width: 120px;
      height: 40px;
      border-radius: 5px;
      border: 2px solid var(--main-color);
      background-color: var(--bg-color);
      box-shadow: 4px 4px var(--main-color);
      font-size: 17px;
      font-weight: 600;
      color: var(--font-color);
      cursor: pointer;
    }

    /* Ajustes de tamaño específicos para flip-card__back */
    .small-card {
      width: 280px;
      height: 300px;
    }
    .small-title {
      font-size: 22px;
    }
    .small-input {
      width: 220px;
      height: 35px;
      padding: 4px 8px;
    }
    .small-btn {
      width: 100px;
      height: 35px;
      font-size: 15px;
    }
  </style>
</section>

<Footer></Footer>
