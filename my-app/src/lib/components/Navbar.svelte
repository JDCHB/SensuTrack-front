<nav class="navbar navbar-expand-lg navbar-light bg-light py-3 mb-4">
  <div class="container-fluid">
    <!-- Logo con modal -->
    <a
      class="navbar-brand d-flex align-items-center gap-2"
      href="#"
      data-bs-toggle="modal"
      data-bs-target="#Perfil_Usuario"
    >
      <img
        src="/logo.jpg"
        width="50"
        height="50"
        class="rounded-circle shadow-sm"
        alt="Logo SensuTrack"
      />
    </a>

    <!-- Nombre SensuTrack como enlace independiente -->
    <a href="/" class="text-decoration-none">
      <span class="fw-bold text-dark h5 mb-0">SensuTrack</span>
    </a>

    <!-- Botón hamburguesa -->
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

    <!-- Menú -->
    <div
      class="collapse navbar-collapse justify-content-end mt-2 mt-lg-0"
      id="navbarNav"
    >
      <ul class="navbar-nav align-items-center gap-2">
        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="/sobre_nosotros">
            <i class="bi bi-house-door"></i> Sobre Nosotros
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link fw-semibold text-dark"
            href="/preguntas_frecuentes"
          >
            <i class="bi bi-question-circle"></i> Preguntas Frecuentes
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="/contacto">
            <i class="bi bi-envelope"></i> Contáctenos
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-semibold text-dark" href="/login">
            <i class="bi bi-person-circle"></i> Iniciar Sesión
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Estilos CSS -->
<style>
  .navbar {
    backdrop-filter: blur(8px); /* efecto glass suave */
    background-color: rgba(
      255,
      255,
      255,
      0.95
    ); /* fondo blanco semitransparente */
    transition: all 0.3s ease;
    z-index: 1000;
    border: none;
  }

  .navbar-brand img {
    transition: transform 0.3s ease;
  }
  .navbar-brand img:hover {
    transform: scale(1.05);
  }

  .navbar-nav .nav-link {
    transition: all 0.3s ease;
    padding: 8px 14px;
    border-radius: 6px;
  }
  .navbar-nav .nav-link:hover {
    color: #0d6efd !important;
    background-color: rgba(13, 110, 253, 0.1);
    text-decoration: none;
  }

  .navbar-toggler {
    background-color: transparent;
    border: none;
    outline: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 991px) {
    .navbar-nav {
      text-align: center;
      gap: 10px;
    }
    .navbar-brand {
      margin-bottom: 10px;
    }
  }
</style>
