<nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
  <a class="navbar-brand d-flex align-items-center" href="/">
    <img
      src="/logo.jpg"
      width="56"
      height="60"
      class="d-inline-block align-top rounded-circle ml-1"
      alt="PetTracker logo"
    />
    <span class="ms-2 text-white fw-bold">PetTracker</span>
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
      <li class="nav-item active">
        <a class="nav-link text-white fw-bold" href="/sobre_nosotros"
          >Sobre Nosotros</a
        >
      </li>
      <li class="nav-item active">
        <a class="nav-link text-white fw-bold" href="/preguntas_frecuentes"
          >Preguntas Frecuentes</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link text-white fw-bold" href="/contacto">Contáctenos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white fw-bold" href="/login">Iniciar Sesión</a>
      </li>
    </ul>
  </div>
</nav>

<!-- Estilos CSS -->
<style>
  /* Navbar Styling */
  .navbar {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para el navbar */
  }

  .navbar-brand img {
    border-radius: 50%; /* Redondear el logo */
  }

  .navbar-nav .nav-link {
    transition: all 0.3s ease; /* Efecto de transición suave en los enlaces */
    padding: 8px 15px; /* Espaciado adecuado entre los enlaces */
  }

  .navbar-nav .nav-link:hover {
    color: #ff8c00 !important; /* Color de hover */
    text-decoration: underline; /* Subrayado en hover */
  }

  .navbar-nav .nav-item.active .nav-link {
    color: #ff8c00 !important; /* Color destacado para la página activa */
  }

  .navbar-toggler {
    border: 1px solid #ffffff; /* Contorno blanco para el botón */
  }

  .navbar-toggler-icon {
    background-color: #ffffff; /* Icono blanco para el menú */
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
