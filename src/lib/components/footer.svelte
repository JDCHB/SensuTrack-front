<footer class="footer bg-dark text-white py-5">
    <div class="container">
        <div class="row">
            <!-- Sección de la marca -->
            <div class="col-12 col-md-4 mb-4 mb-md-0">
                <h3 class="fw-bold text-primary">PETTRACKER</h3>
                <p class="pt-2">Mascota segura, dueño tranquilo.</p>
                <p><strong>Teléfonos:</strong></p>
                <p>0987654321</p>
                <p>1234567890</p>
            </div>

            <!-- Menú de navegación -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-primary">Menú</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a
                            href="/"
                            class="text-white text-decoration-none nav-link"
                            >Principal</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/preguntas_frecuentes"
                            class="text-white text-decoration-none nav-link"
                            >Preguntas Frecuentes</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/sobre_nosotros"
                            class="text-white text-decoration-none nav-link"
                            >Sobre Nosotros</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/contacto"
                            class="text-white text-decoration-none nav-link"
                            >Contáctenos</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Más información -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-primary">Más</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a
                            href="/login"
                            class="text-white text-decoration-none nav-link"
                            >Iniciar Sesión/Registrarse</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Categorías -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-primary">Categorías</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a
                            href="/"
                            class="text-white text-decoration-none nav-link"
                            >Navbars</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/"
                            class="text-white text-decoration-none nav-link"
                            >Cards</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/"
                            class="text-white text-decoration-none nav-link"
                            >Buttons</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/"
                            class="text-white text-decoration-none nav-link"
                            >Carousels</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <!-- Línea divisoria -->
        <hr class="my-4 border-white" />

        <!-- Redes Sociales -->
        <div class="row justify-content-center mb-4">
            <div class="col-auto">
                <a href="/" class="text-white mx-3" aria-label="Facebook">
                    <i class="fab fa-facebook fa-2x"></i>
                </a>
                <a href="/" class="text-white mx-3" aria-label="Twitter">
                    <i class="fab fa-twitter fa-2x"></i>
                </a>
                <a href="/" class="text-white mx-3" aria-label="Instagram">
                    <i class="fab fa-instagram fa-2x"></i>
                </a>
            </div>
        </div>

        <!-- Copyright -->
        <div class="row">
            <div class="col text-center">
                <p>&copy; 2024 PETTRACKER. Todos los derechos reservados.</p>
            </div>
        </div>
    </div>
</footer>

<!-- Estilos CSS -->
<style>
    /* Estilo del Footer */
    .footer {
        background-color: #000000; /* Fondo negro */
        color: white;
        padding-top: 40px;
        padding-bottom: 40px;
        border-radius: 8px; /* Bordes suaves */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
    }

    /* Títulos en el Footer */
    .footer h3,
    .footer h4 {
        color: #0079fa; /* Azul para los títulos */
    }

    /* Estilo para los párrafos */
    .footer p {
        color: rgba(255, 255, 255, 0.8); /* Blanco sutil */
    }

    /* Enlaces en el footer */
    .footer .nav-link {
        color: white !important;
        font-size: 16px;
        padding: 5px 0;
        transition:
            color 0.3s,
            transform 0.3s ease; /* Transición suave */
    }

    /* Hover en los enlaces */
    .footer .nav-link:hover {
        color: #0079fa !important; /* Azul brillante al pasar el ratón */
        text-decoration: underline; /* Subrayado */
        transform: scale(1.05); /* Efecto de agrandado */
    }

    /* Línea divisoria */
    .footer hr {
        border-color: #ffffff; /* Línea blanca */
    }

    /* Redes sociales */
    .fab {
        transition: transform 0.3s ease; /* Transición suave */
    }

    .fab:hover {
        transform: scale(1.2); /* Aumenta el tamaño de los iconos */
        color: #0079fa; /* Azul para iconos al pasar el ratón */
    }

    /* Responsividad */
    @media (max-width: 991px) {
        .footer .col-md-2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .footer .col-auto {
            text-align: center;
        }

        .footer h3,
        .footer h4 {
            text-align: center;
        }

        .footer .nav-link {
            font-size: 14px; /* Reducir el tamaño de los enlaces en pantallas pequeñas */
        }

        .footer .fab {
            font-size: 1.5rem; /* Reducir el tamaño de los iconos en pantallas pequeñas */
        }
    }
</style>
