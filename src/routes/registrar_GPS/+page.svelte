<script>
    import Footer from "../../lib/components/footer.svelte";
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import { onMount } from "svelte";

    let v_nombre = "";
    let v_genero = "";
    let v_tpmascota = "";
    let v_idpropietario = "";
    let v_estado = true;
    let error = null;

    onMount(() => {
        let miStorage = window.localStorage;
        const storedUser = JSON.parse(miStorage.getItem("user_data"));
        if (storedUser) {
            let id_p = storedUser.id;
            v_idpropietario = id_p;
            console.log("Propietario", v_idpropietario);
        }
    });

    // Referencias a los contenedores de los loader
    let registerLoader;

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

    async function RegisterMascota() {
        try {
            showLoader(registerLoader);
            const response = await fetch(
                "https://proyectomascotas.onrender.com/create_mascota",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: v_nombre,
                        id_genero_mascota: v_genero,
                        id_tipo_mascota: v_tpmascota,
                        id_propietario: v_idpropietario,
                        estado: v_estado,
                    }),
                },
            );

            const data = await response.json();
            console.log(data);

            hideLoader(registerLoader);

            if (response.ok) {
                Swal.fire({
                    title: "Mascota Registrada Exitosamente!",
                    text: "¡Le damos la bienvenida a la familia!",
                    icon: "success",
                    confirmButtonText: "OK",
                    background: "white", // Fondo blanco
                    color: "black",
                });
            } else {
                alert("Error al registrar la mascota");
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader);
            alert("Error en la solicitud: " + error);
        }
    }
</script>

<NavbarUser></NavbarUser>

<main class="container py-5" style="margin-bottom: 50px;">
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div
                class="card shadow-lg p-4 rounded"
                style="background-color: #f9f9f9;"
            >
                <div class="text-center mb-4">
                    <i
                        class="bi bi-paw-fill text-primary"
                        style="font-size: 60px;"
                    ></i>
                    <h3 class="text-primary mt-3">¡Registra un nuevo GPS!</h3>
                    <p class="text-muted">
                        Completa los detalles en el siguiente formulario.
                    </p>
                </div>
                <form on:submit|preventDefault={RegisterMascota}>
                    <div class="mb-3">
                        <label for="nombre" class="form-label text-primary"
                            >Nombre del incapacitado
                        </label>
                        <input
                            type="text"
                            class="form-control shadow-sm"
                            id="nombre"
                            placeholder="Nombre de la mascota"
                            bind:value={v_nombre}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="genero" class="form-label text-primary"
                            >Género</label
                        >
                        <select
                            class="form-select shadow-sm"
                            id="genero"
                            bind:value={v_genero}
                            required
                        >
                            <option value="" disabled selected
                                >Seleccionar género</option
                            >
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label
                            for="tipo_mascota"
                            class="form-label text-primary"
                            >Tipo de Mascota</label
                        >
                        <select
                            class="form-select shadow-sm"
                            id="tipo_mascota"
                            bind:value={v_tpmascota}
                            required
                        >
                            <option value="" disabled selected
                                >Seleccionar tipo de mascota</option
                            >
                            <option value="1">Perro</option>
                            <option value="2">Gato</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-100 mt-4 shadow-sm rounded-pill"
                    >
                        🐶 Registrar Mascota 🐱
                    </button>

                    <!-- Loader -->
                    <div class="loader-container" bind:this={registerLoader}>
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
                </form>
            </div>
        </div>
    </div>
</main>

<Footer></Footer>

<!-- Estilos CSS -->
<style>
    /* Estilo principal para el formulario */
    .card {
        background-color: #ffe9d6; /* Fondo claro para la tarjeta */
        border-radius: 15px; /* Bordes redondeados */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    }

    .card .form-label {
        color: #0079fa; /* Títulos en azul */
    }

    .btn-primary {
        background-color: #0079fa; /* Botón de registro en azul */
        border-color: #0079fa;
        font-weight: 600;
        text-transform: uppercase;
    }

    .btn-primary:hover {
        background-color: #005f89; /* Color azul oscuro al pasar el cursor */
        border-color: #005f89;
    }

    .form-control {
        border-radius: 10px; /* Bordes redondeados en los inputs */
        box-shadow: none;
    }

    .form-select {
        border-radius: 10px; /* Bordes redondeados en los select */
        box-shadow: none;
    }

    .form-control:focus,
    .form-select:focus {
        border-color: #0079fa; /* Borde azul al enfocar */
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
    }

    .text-primary {
        color: #0079fa !important; /* Color de texto azul */
    }

    .loader-container {
        display: none; /* Inicialmente oculto */
        text-align: center;
        margin-top: 20px;
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
