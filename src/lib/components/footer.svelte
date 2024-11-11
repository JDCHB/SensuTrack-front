<footer class="bg-dark text-white py-5">
    <div class="container">
        <div class="row">
            <!-- Sección de la marca -->
            <div class="col-12 col-md-4 mb-4 mb-md-0">
                <h3 class="fw-bold text-warning">PETTRACKER</h3>
                <p class="pt-2">Mascota segura, dueño tranquilo.</p>
                <p class="mb-2"><strong>Teléfonos:</strong></p>
                <p>0987654321</p>
                <p>1234567890</p>
            </div>

            <!-- Menú de navegación -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-warning">Menú</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a href="/" class="text-white text-decoration-none"
                            >Principal</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/preguntas_frecuentes"
                            class="text-white text-decoration-none"
                            >Preguntas Frecuentes</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/sobre_nosotros"
                            class="text-white text-decoration-none"
                            >Sobre Nosotros</a
                        >
                    </li>
                    <li class="py-1">
                        <a
                            href="/contacto"
                            class="text-white text-decoration-none"
                            >Contáctenos</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Más información -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-warning">Más</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a href="/login" class="text-white text-decoration-none"
                            >Iniciar Sesión/Registrarse</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Categorías -->
            <div class="col-6 col-md-2 mb-4 mb-md-0">
                <h4 class="fw-bold text-warning">Categorías</h4>
                <ul class="list-unstyled">
                    <li class="py-1">
                        <a href="/" class="text-white text-decoration-none"
                            >Navbars</a
                        >
                    </li>
                    <li class="py-1">
                        <a href="/" class="text-white text-decoration-none"
                            >Cards</a
                        >
                    </li>
                    <li class="py-1">
                        <a href="/" class="text-white text-decoration-none"
                            >Buttons</a
                        >
                    </li>
                    <li class="py-1">
                        <a href="/" class="text-white text-decoration-none"
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

<style>
    /* Estilos generales para el footer */
    footer {
        background-color: #343a40; /* Fondo oscuro */
        color: white;
    }

    /* Sección de la marca */
    footer h3 {
        color: #ff8c00; /* Color de la marca */
    }

    footer p {
        color: rgba(255, 255, 255, 0.8);
    }

    footer a {
        transition: color 0.3s ease;
    }

    footer a:hover {
        color: #ff8c00; /* Color de los enlaces al pasar el cursor */
        text-decoration: underline; /* Subrayado en el hover */
    }

    footer hr {
        border-color: #fff; /* Línea divisoria blanca */
    }

    /* Estilos para las redes sociales */
    .fab {
        transition: transform 0.3s ease;
    }

    .fab:hover {
        transform: scale(
            1.1
        ); /* Aumenta ligeramente el tamaño del icono al hacer hover */
    }

    /* Espaciado mejorado entre los elementos */
    footer .row {
        margin-bottom: 30px;
    }

    /* Responsividad */
    @media (max-width: 768px) {
        footer .col-md-2 {
            text-align: center; /* Centrar los elementos en pantallas pequeñas */
            margin-bottom: 20px;
        }

        footer .col-auto {
            text-align: center;
        }

        footer h3,
        footer h4 {
            text-align: center;
        }
    }
</style>
