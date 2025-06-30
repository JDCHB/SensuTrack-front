<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import { onMount } from "svelte";

    let v_nombre = "";
    let v_documento = "";
    let v_genero = "";
    let v_tipo_ceguera = "";
    let v_id_cuidador = "";
    let v_estado = true;
    let error = null;

    onMount(() => {
        let miStorage = window.localStorage;
        const storedUser = JSON.parse(miStorage.getItem("user_data"));
        if (storedUser) {
            let id_p = storedUser.id;
            v_id_cuidador = id_p;
            console.log("Propietario", v_id_cuidador);
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

    async function RegisterDiscapacitadoV() {
        try {
            showLoader(registerLoader);
            const response = await fetch(
                "https://proyectomascotas.onrender.com/create_discapacitadoV",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: v_nombre,
                        documento: v_documento,
                        id_genero_discapacitado: v_genero,
                        id_tipo_ceguera: v_tipo_ceguera,
                        id_cuidador: v_id_cuidador,
                        estado: v_estado,
                    }),
                },
            );

            const data = await response.json();
            console.log(data);

            hideLoader(registerLoader);

            if (response.ok) {
                Swal.fire({
                    title: "Discapacitado Registrado Exitosamente!",
                    text: "¡Le damos la bienvenida a la familia!",
                    icon: "success",
                    confirmButtonText: "OK",
                    background: "white", // Fondo blanco
                    color: "black",
                });
            } else {
                Swal.fire({
                    title: "Registro Cancelado",
                    icon: "error",
                    confirmButtonText: "OK",
                    background: "white", // Fondo blanco
                    color: "black",
                });
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader);
            alert("Error en la solicitud: " + error);
        }
    }
</script>

<NavbarUser></NavbarUser>
<ChatBot></ChatBot>

<main class="container py-5" style="margin-bottom: 50px;">
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10">
            <div class="card shadow-lg p-4 rounded bg-light">
                <div class="text-center mb-4">
                    <i
                        class="bi bi-paw-fill text-primary"
                        style="font-size: 48px;"
                    ></i>
                    <h3 class="text-primary mt-3 fw-bold">
                        Registrar Discapacitado
                    </h3>
                    <p class="text-muted">
                        Completa los detalles del formulario.
                    </p>
                </div>

                <form on:submit|preventDefault={RegisterDiscapacitadoV}>
                    <div class="mb-3">
                        <label
                            for="nombre"
                            class="form-label text-primary fw-semibold"
                        >
                            Nombre del Discapacitado
                        </label>
                        <input
                            type="text"
                            class="form-control shadow-sm"
                            id="nombre"
                            placeholder="Nombre"
                            bind:value={v_nombre}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label
                            for="nombre"
                            class="form-label text-primary fw-semibold"
                        >
                            Documento
                        </label>
                        <input
                            type="text"
                            class="form-control shadow-sm"
                            id="Documento"
                            placeholder="Documento de Identidad"
                            bind:value={v_documento}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label
                            for="genero"
                            class="form-label text-primary fw-semibold"
                        >
                            Género
                        </label>
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
                            class="form-label text-primary fw-semibold"
                        >
                            Tipo de Ceguera
                        </label>
                        <select
                            class="form-select shadow-sm"
                            id="tipo_mascota"
                            bind:value={v_tipo_ceguera}
                            required
                        >
                            <option value="" disabled selected>
                                Seleccione el tipo de ceguera
                            </option>
                            <option value="1">Ceguera Total</option>
                            <option value="2">Ceguera Parcial</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-100 mt-4 shadow-sm rounded-pill"
                    >
                        🐶 Registrar 🐱
                    </button>

                    <!-- Loader -->
                    <div class="loader-container" bind:this={registerLoader}>
                        <div class="loader-text">
                            <span>S</span><span>e</span><span>n</span><span
                                >s</span
                            ><span>u</span>
                            <span>T</span><span>r</span><span>a</span><span
                                >c</span
                            ><span>k</span>
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
    .card {
        background-color: #ffe9d6;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .card .form-label {
        color: #0079fa;
    }

    .btn-primary {
        background-color: #0079fa;
        border-color: #0079fa;
        font-weight: 600;
        text-transform: uppercase;
    }

    .btn-primary:hover {
        background-color: #005f89;
        border-color: #005f89;
    }

    .form-control,
    .form-select {
        border-radius: 10px;
        box-shadow: none;
    }

    .form-control:focus,
    .form-select:focus {
        border-color: #0079fa;
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
    }

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
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #007bff;
        animation: fadeIn 1.5s infinite alternate;
    }

    .loader-text span {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: calc(0.1s * var(--i));
    }

    .loader-text span:nth-child(n) {
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

    /* Responsive optimización para celulares */
    @media (max-width: 576px) {
        .card {
            padding: 1.5rem;
        }

        .loader-text {
            font-size: 28px;
            letter-spacing: 3px;
        }
    }
</style>
