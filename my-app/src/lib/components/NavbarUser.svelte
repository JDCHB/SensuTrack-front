<script>
    import { onMount } from "svelte";

    let v_id = "";
    let usuario = "";
    let error = "";
    let loading = true;

    function logout() {
        // Limpiar los datos de inicio de sesión en el LocalStorage
        localStorage.clear();
        window.location.href = "/login"; // Redirigir a la página de login
    }

    onMount(async () => {
        try {
            let miStorage = window.localStorage;
            let userData = miStorage.getItem("user_data");

            if (!userData) {
                console.warn("No se encontró user_data en localStorage");
                loading = false;
                return;
            }

            usuario = JSON.parse(userData);
            v_id = usuario?.id || "";

            if (!v_id) {
                console.warn("El usuario no tiene un ID válido");
                loading = false;
                return;
            }

            // AHORA BUSQUEMOS LOS DATOS DEL USUARIO
            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_user/${v_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            usuario = await response.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
    <a
        class="navbar-brand d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#Perfil_Usuario"
        href="#"
    >
        <img
            src="/logo.jpg"
            width="56"
            height="60"
            class="d-inline-block align-top rounded-circle"
            alt="PetTracker logo"
        />
        <span class="ms-2 text-dark fw-bold">SensuTrack</span>
    </a>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/usuario">
                    <i class="bi bi-house"></i> Inicio
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/registrar_GPS">
                    <i class="bi bi-house-door"></i> Registrar GPS
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/tracking">
                    <i class="bi bi-geo-alt-fill"></i>
                    Ubicación en vivo
                </a>
            </li>

            <!-- Dropdown para Usuario -->
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle text-black fw-bold"
                    href="#!"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Usuario
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <!-- Opción para Cerrar sesión -->
                    <a class="dropdown-item" href="#!" on:click={logout}
                        >Cerrar sesión</a
                    >
                </div>
            </li>
        </ul>
    </div>
</nav>

<!-- Inclusión de los iconos de Bootstrap (por ejemplo, para los iconos de la barra de navegación) -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

<!-- Modal -->
<div
    class="modal fade"
    id="Perfil_Usuario"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Perfil_UsuarioLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <!-- Encabezado del modal -->
            <div class="modal-header bg-primary text-white">
                <h1 class="modal-title fs-5" id="Perfil_UsuarioLabel">
                    Perfil de Usuario
                </h1>
                <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>

            <!-- Cuerpo del modal -->
            <div class="modal-body">
                {#if loading}
                    <div class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando....</span>
                        </div>
                        <p class="mt-2">Cargando datos del perfil....</p>
                    </div>
                {:else}
                    <div class="mb-3">
                        <label for="v_nombre" class="form-label fw-bold"
                            >Nombre</label
                        >
                        <input
                            type="text"
                            id="v_nombre"
                            class="form-control"
                            bind:value={usuario.nombre}
                            readonly
                        />
                    </div>

                    <!-- Apellido -->
                    <div class="mb-3">
                        <label for="v_apellido" class="form-label fw-bold"
                            >Apellido</label
                        >
                        <input
                            type="text"
                            id="v_apellido"
                            class="form-control"
                            bind:value={usuario.apellido}
                            readonly
                        />
                    </div>

                    <!-- Correo -->
                    <div class="mb-3">
                        <label for="v_correo" class="form-label fw-bold"
                            >Correo</label
                        >
                        <input
                            type="text"
                            id="v_correo"
                            class="form-control"
                            bind:value={usuario.email}
                            readonly
                        />
                    </div>

                    <!-- Documento -->
                    <div class="mb-3">
                        <label for="v_documento" class="form-label fw-bold"
                            >Documento</label
                        >
                        <input
                            type="text"
                            id="v_documento"
                            class="form-control"
                            bind:value={usuario.documento}
                            readonly
                        />
                    </div>

                    <!-- Teléfono -->
                    <div class="mb-3">
                        <label for="v_telefono" class="form-label fw-bold"
                            >Teléfono</label
                        >
                        <input
                            type="text"
                            id="v_telefono"
                            class="form-control"
                            bind:value={usuario.telefono}
                            readonly
                        />
                    </div>
                {/if}
            </div>

            <!-- Pie del modal -->
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary">
                    Guardar Cambios
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Estilos CSS -->
<style>
    /* Navbar Styling */
    .navbar {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para el navbar */
        border-radius: 10px; /* Bordes redondeados */
    }

    .navbar-brand img {
        border-radius: 50%; /* Logo redondeado */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil al logo */
    }

    .navbar-nav .nav-link {
        transition: all 0.3s ease; /* Efecto de transición suave en los enlaces */
        padding: 8px 20px; /* Espaciado adecuado entre los enlaces */
        font-size: 16px; /* Tamaño de fuente moderado */
    }

    .navbar-nav .nav-link:hover {
        color: #0079fa !important; /* Color de hover */
        text-decoration: underline; /* Subrayado en hover */
        transform: scale(1.1); /* Efecto de agrandado en hover */
    }

    .navbar-toggler {
        border: 1px solid #0079fa; /* Contorno anaranjado para el botón */
        border-radius: 5px;
    }

    .navbar-toggler-icon {
        background-color: #0079fa; /* Icono anaranjado para el menú */
    }

    .nav-item i {
        margin-right: 8px; /* Espaciado entre el icono y el texto */
    }

    /* Estilos para la responsividad */
    @media (max-width: 991px) {
        .navbar-brand {
            text-align: center; /* Centrar el logo en pantallas pequeñas */
        }

        .navbar-nav {
            text-align: center;
        }

        .navbar-nav .nav-item {
            margin-bottom: 15px; /* Espaciado vertical entre los elementos en móviles */
        }
    }
</style>
