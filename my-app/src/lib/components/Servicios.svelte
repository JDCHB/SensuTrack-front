<section class="services">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center mb-5">
                <div class="secction-header">
                    <h2 class="display-4 text-primary">Información General</h2>
                    <p class="lead text-muted">
                        Conoce las funciones clave que hacen de <strong
                            >SensuTrack</strong
                        > una herramienta esencial para mejorar la seguridad y autonomía
                        de personas ciegas en su día a día.
                    </p>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Card 1: Rastreo en tiempo real -->
            <div class="col-12 col-md-4 mb-3">
                <div class="card text-center shadow-lg border-0 rounded-3">
                    <div class="card-img-top bg-car1"></div>
                    <div class="card-body">
                        <h3 class="card-title text-primary">
                            Rastreo en Tiempo Real
                        </h3>
                        <p class="card-text text-muted">
                            Visualiza en el mapa la ubicación exacta de la
                            persona en todo momento. Gracias a la tecnología GPS
                            integrada, puedes monitorear su recorrido con total
                            precisión y tranquilidad.
                        </p>
                        <a
                            href="/login"
                            class="btn btn-outline-primary mt-3 rounded-pill"
                        >
                            Leer más
                        </a>
                    </div>
                </div>
            </div>

            <!-- Card 2: Zonas Seguras -->
            <div class="col-12 col-md-4 mb-3">
                <div class="card text-center shadow-lg border-0 rounded-3">
                    <div class="card-img-top bg-car2"></div>
                    <div class="card-body">
                        <h3 class="card-title text-primary">
                            Zonas Seguras Inteligentes
                        </h3>
                        <p class="card-text text-muted">
                            Crea zonas seguras personalizadas y recibe alertas
                            instantáneas cuando la persona salga de estos
                            espacios definidos, ayudando a prevenir situaciones
                            de riesgo.
                        </p>
                        <a
                            href="/login"
                            class="btn btn-outline-primary mt-3 rounded-pill"
                        >
                            Leer más
                        </a>
                    </div>
                </div>
            </div>

            <!-- Card 3: Accesibilidad y Adaptabilidad -->
            <div class="col-12 col-md-4 mb-3">
                <div class="card text-center shadow-lg border-0 rounded-3">
                    <div class="card-img-top bg-car3"></div>
                    <div class="card-body">
                        <h3 class="card-title text-primary">
                            Accesibilidad y Adaptabilidad
                        </h3>
                        <p class="card-text text-muted">
                            SensuTrack se adapta a diversas necesidades. Ya sea
                            en casa o en exteriores, ofrece soporte inteligente
                            para mejorar la orientación, autonomía y seguridad
                            de las personas ciegas.
                        </p>
                        <a
                            href="/login"
                            class="btn btn-outline-primary mt-3 rounded-pill"
                        >
                            Leer más
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap");

    * {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
    }

    .services {
        padding: 80px 0;
        background-color: #f9f9f9;
    }

    .secction-header h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #007bff;
    }

    .secction-header p {
        font-size: 1.2rem;
        color: #6c757d;
    }

    .card {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        border-radius: 15px;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.1);
    }

    .card .card-img-top {
        height: 200px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .bg-car1 {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
            ),
            url(/rastreo.jpg);
    }

    .bg-car2 {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
            ),
            url(/asignaciones.jpg);
    }

    .bg-car3 {
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
            ),
            url(/para_todas_las_necesidades.jpg);
    }

    .btn-outline-primary {
        border: 2px solid #007bff;
        color: #007bff;
        padding: 10px 20px;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        transition:
            background-color 0.3s ease,
            color 0.3s ease;
    }

    .btn-outline-primary:hover {
        background-color: #007bff;
        color: #fff;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .card {
            margin-bottom: 20px;
        }
    }
</style>
