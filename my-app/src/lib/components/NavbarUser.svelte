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
            usuario = JSON.parse(miStorage.getItem("user_data"));
            v_id = usuario?.id || "";
            console.log(
                "ESSSSSSSSTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
                v_id,
            );
            if (!v_id) return;

            //AHORA BUSQUEMOS LOS DATOS DEL USUARIO

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_user/${v_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(
                "PARECE QUE SI ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            );
            usuario = await response.json();
            console.log(
                "DATOS TOMADOS DEL USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
                usuario,
            );
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
                    <i class="bi bi-pin-map"></i> Tracker Now
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark fw-bold" href="/usuario">
                    <i class="bi bi-gear"></i> Servicios
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
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="Perfil_UsuarioLabel">
                    Perfil de usuario
                </h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div class="mb-2 d-flex align-items-center">
                    <div class="mb-2 d-flex align-items-center">
                        <label
                            class="form-label"
                            style="padding-right: 6px;"
                            for="">Nombre</label
                        >
                        <input
                            type="text"
                            id="v_nombre"
                            class="form-control"
                            bind:value={usuario.nombre}
                        />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Close</button
                >
                <button type="button" class="btn btn-primary">Understood</button
                >
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
