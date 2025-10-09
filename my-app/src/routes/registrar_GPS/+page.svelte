<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import { onMount } from "svelte";

    import { createClient } from "@supabase/supabase-js"; //PARA SUPABASE

    let v_nombre = "";
    let v_documento = "";
    let v_genero = "";
    let v_tipo_ceguera = "";
    let v_id_cuidador = "";
    let v_estado = true;
    let error = null;

    //MODAL
    let showModal = false;
    let paso = 1;
    const totalPasos = 5;

    onMount(() => {
        let miStorage = window.localStorage;
        const storedUser = JSON.parse(miStorage.getItem("user_data"));
        if (storedUser) {
            let id_p = storedUser.id;
            v_id_cuidador = id_p;
            console.log("Propietario", v_id_cuidador);
        }
        showModal = true;
    });

    function siguiente() {
        if (paso < totalPasos) paso++;
    }

    function anterior() {
        if (paso > 1) paso--;
    }

    function cerrar() {
        showModal = false;
        paso = 1;
    }

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

            // 1. Subir el archivo y obtener la URL
            const urlDocumento = await subirPDF(v_nombre, archivoSeleccionado);
            if (!urlDocumento) {
                throw new Error("No se pudo subir el archivo de verificación.");
            }

            // 2. Hacer el POST incluyendo la URL
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
                        documento_verificacion: urlDocumento,
                    }),
                },
            );

            const data = await response.json();
            hideLoader(registerLoader);

            if (response.ok) {
                Swal.fire({
                    title: "Peticion de Registro enviada exitosamente!!",
                    text: "Se le notificara por correo si se acepta o rechaza la solicitud",
                    icon: "success",
                    confirmButtonText: "OK",
                    background: "white",
                    color: "black",
                });
            } else {
                Swal.fire({
                    title: "Registro Cancelado",
                    icon: "error",
                    confirmButtonText: "OK",
                    background: "white",
                    color: "black",
                });
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader);
            alert("Error en la solicitud: " + error);
        }
    }

    // PARA SUBIR LOS DOCUMENTOS
    let archivoSeleccionado = null;

    function handleArchivo(event) {
        archivoSeleccionado = event.target.files[0];
    }

    // Configura tu Supabase
    const supabaseUrl = "https://htrhxtphbszurzztjbim.supabase.co";
    const supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cmh4dHBoYnN6dXJ6enRqYmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzYyMjAsImV4cCI6MjA2NjkxMjIyMH0.PfXvci3rJHAfTj9ZKfH5LEygs2E4De75xxojfgZU6_E"; // La anon pública
    const supabase = createClient(supabaseUrl, supabaseKey);

    async function subirPDF(nombreDiscapacitado, archivo) {
        const nombreArchivo = `${nombreDiscapacitado.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}.pdf`;

        const { data, error } = await supabase.storage
            .from("verificaciones") // tu bucket
            .upload(nombreArchivo, archivo, {
                contentType: "application/pdf",
                upsert: true,
            });

        if (error) {
            console.error("Error al subir:", error.message);
            return null;
        }

        const urlPublica = `${supabaseUrl}/storage/v1/object/public/verificaciones/${nombreArchivo}`;
        console.log("✅ URL del archivo:", urlPublica);
        return urlPublica;
    }
</script>

<NavbarUser></NavbarUser>
<ChatBot></ChatBot>

{#if showModal}
    <div
        class="modal fade show d-block"
        tabindex="-1"
        style="background: rgba(0,0,0,0.6); backdrop-filter: blur(3px);"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div
                class="modal-content border-0 shadow-lg rounded-5 tutorial-modal animate-modal"
            >
                <!-- HEADER -->
                <div
                    class="modal-header border-0 py-3 px-4 text-white position-relative"
                >
                    <h4 class="modal-title fw-bold text-center w-100 m-0">
                        🧭 Guía de Registro 🧭
                    </h4>
                    <button
                        type="button"
                        class="btn-close btn-close-white position-absolute end-0 me-3"
                        on:click={cerrar}
                        aria-label="Cerrar guía de registro"
                    ></button>
                </div>

                <!-- BODY -->
                <div class="modal-body px-5 pb-4">
                    <div class="text-center mb-4">
                        {#if paso === 1}
                            <i
                                class="bi bi-person-bounding-box display-4 text-primary"
                            ></i>
                        {:else if paso === 2}
                            <i
                                class="bi bi-credit-card-2-front-fill display-4 text-primary"
                            ></i>
                        {:else if paso === 3}
                            <i
                                class="bi bi-file-earmark-check-fill display-4 text-primary"
                            ></i>
                        {:else if paso === 4}
                            <i
                                class="bi bi-gender-ambiguous display-4 text-primary"
                            ></i>
                        {:else if paso === 5}
                            <i class="bi bi-eye-fill display-4 text-primary"
                            ></i>
                        {/if}
                    </div>

                    <div class="text-center">
                        {#if paso === 1}
                            <h5 class="fw-bold mb-2 text-primary">
                                Paso 1: Nombre Completo
                            </h5>
                            <p class="text-muted">
                                Ingresa el nombre completo del discapacitado,
                                tal como aparece en su documento de identidad.
                            </p>
                        {:else if paso === 2}
                            <h5 class="fw-bold mb-2 text-primary">
                                Paso 2: Documento de Identidad
                            </h5>
                            <p class="text-muted">
                                Escribe el número sin puntos ni comas.
                            </p>
                        {:else if paso === 3}
                            <h5 class="fw-bold mb-2 text-primary">
                                Paso 3: Documento de Verificación
                            </h5>
                            <p class="text-muted">
                                Sube un documento médico o constancia oficial
                                que certifique la discapacidad visual.
                            </p>
                        {:else if paso === 4}
                            <h5 class="fw-bold mb-2 text-primary">
                                Paso 4: Género
                            </h5>
                            <p class="text-muted">
                                Selecciona el género de la persona registrada.
                            </p>
                        {:else if paso === 5}
                            <h5 class="fw-bold mb-2 text-primary">
                                Paso 5: Tipo de Ceguera
                            </h5>
                            <p class="text-muted">
                                Elige entre <strong>ceguera total</strong> o
                                <strong>ceguera parcial</strong> según corresponda.
                            </p>
                        {/if}
                    </div>
                </div>

                <!-- FOOTER -->
                <div
                    class="modal-footer border-0 d-flex justify-content-between px-5 pb-4"
                >
                    <button
                        class="btn btn-outline-primary rounded-pill px-4"
                        on:click={anterior}
                        disabled={paso === 1}
                    >
                        ⬅️ Anterior
                    </button>

                    {#if paso < totalPasos}
                        <button
                            class="btn btn-primary rounded-pill px-4 shadow-sm"
                            on:click={siguiente}
                        >
                            Siguiente ➡️
                        </button>
                    {:else}
                        <button
                            class="btn btn-success rounded-pill px-4 shadow-sm"
                            on:click={cerrar}
                        >
                            ¡Entendido!
                        </button>
                    {/if}
                </div>

                <!-- PROGRESS -->
                <div class="progress" style="height: 8px;">
                    <div
                        class="progress-bar bg-primary"
                        role="progressbar"
                        style="width: {(paso / totalPasos) *
                            100}%; transition: width 0.4s ease;"
                    ></div>
                </div>
            </div>
        </div>
    </div>
{/if}

<main class="container py-5" style="margin-bottom: 50px;">
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10">
            <div class="card shadow-lg p-4 rounded-4 bg-white border-0">
                <div class="text-center mb-4">
                    <img
                        src="/logo.jpg"
                        alt="Logo"
                        class="img-fluid rounded-circle border border-2"
                        style="width: 80px; height: 80px; object-fit: cover;"
                    />
                    <h3 class="text-primary mt-3 fw-bold">
                        Registrar Persona con Discapacidad Visual
                    </h3>
                    <p class="text-muted">
                        Por favor, completa los campos requeridos.
                    </p>
                </div>

                <form on:submit|preventDefault={RegisterDiscapacitadoV}>
                    <div class="mb-3">
                        <label
                            for="nombre"
                            class="form-label fw-semibold text-secondary"
                            >Nombre Completo</label
                        >
                        <input
                            type="text"
                            id="nombre"
                            class="form-control form-control-lg shadow-sm"
                            placeholder="Ej: Juan Pérez"
                            bind:value={v_nombre}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label
                            for="documento"
                            class="form-label fw-semibold text-secondary"
                            >Documento de Identidad</label
                        >
                        <input
                            type="text"
                            id="documento"
                            class="form-control form-control-lg shadow-sm"
                            placeholder="Ej: 1234567890"
                            bind:value={v_documento}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label for="archivo" class="form-label"
                            >Documento de Verificación</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="archivo"
                            on:change={handleArchivo}
                        />
                    </div>

                    <div class="mb-3">
                        <label
                            for="genero"
                            class="form-label fw-semibold text-secondary"
                            >Género</label
                        >
                        <select
                            id="genero"
                            class="form-select form-select-lg shadow-sm"
                            bind:value={v_genero}
                            required
                        >
                            <option value="" disabled selected
                                >Seleccionar</option
                            >
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label
                            for="tipo_ceguera"
                            class="form-label fw-semibold text-secondary"
                            >Tipo de Ceguera</label
                        >
                        <select
                            id="tipo_ceguera"
                            class="form-select form-select-lg shadow-sm"
                            bind:value={v_tipo_ceguera}
                            required
                        >
                            <option value="" disabled selected
                                >Seleccionar</option
                            >
                            <option value="1">Ceguera Total</option>
                            <option value="2">Ceguera Parcial</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-100 mt-4 py-3 fs-5 shadow rounded-pill"
                    >
                        Registrar
                    </button>

                    <!-- Loader -->
                    <div class="loader-container" bind:this={registerLoader}>
                        <div class="loader-text">
                            <span>S</span><span>e</span><span>n</span><span
                                >s</span
                            >
                            <span>u</span><span>T</span><span>r</span><span
                                >a</span
                            ><span>c</span><span>k</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

<Footer />

<style>
    .tutorial-modal {
        background: #ffffff;
        overflow: hidden;
    }

    .modal-header {
        background: linear-gradient(135deg, #007bff, #6610f2);
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
    }

    .animate-modal {
        animation: fadeInUp 0.4s ease;
    }

    @keyframes fadeInUp {
        from {
            transform: translateY(40px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .btn {
        font-weight: 500;
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .progress-bar {
        border-bottom-left-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;
    }

    .card {
        background-color: #ffffff;
        border-radius: 1rem;
    }

    .btn-primary {
        background-color: #0d6efd;
        border-color: #0d6efd;
        font-weight: 600;
        text-transform: uppercase;
    }

    .btn-primary:hover {
        background-color: #0b5ed7;
        border-color: #0a58ca;
    }

    .form-control,
    .form-select {
        border-radius: 0.75rem;
        box-shadow: none;
    }

    .form-control:focus,
    .form-select:focus {
        border-color: #0d6efd;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
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
        color: #0d6efd;
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
