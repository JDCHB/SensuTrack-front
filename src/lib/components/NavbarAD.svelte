<nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
    <a class="navbar-brand d-flex align-items-center" href="/administrador">
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
                <a class="nav-link text-dark fw-bold" href="/administrador">
                    <i class="bi bi-house-door"></i> Volver al menu
                </a>
            </li>
        </ul>
    </div>
</nav>

<!-- Inclusión de los iconos de Bootstrap (por ejemplo, para los iconos de la barra de navegación) -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

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
