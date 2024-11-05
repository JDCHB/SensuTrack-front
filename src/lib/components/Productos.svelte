<section class="Product">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="section-header text-center pb-5">
                    <h2 class="display-4 text-uppercase text-primary">
                        Productos
                    </h2>
                    <p class="lead text-muted">
                        Esta es nuestra línea de productos. Escoge el que más te
                        guste y asegura el bienestar de tu mascota.
                    </p>
                </div>
            </div>
        </div>

        <!-- Fila de productos -->
        <div class="row g-4">
            <!-- Producto 1 -->
            <div class="col-12 col-md-4">
                <div class="card bg-light shadow-sm border-0 rounded-4">
                    <div class="text-center mb-3">
                        <img
                            src="/producto1.jpg"
                            class="img-fluid rounded-4"
                            alt="Collares"
                        />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title text-primary">Collares</h5>
                        <p class="card-text text-muted">
                            Los collares hechos con última tecnología para
                            brindarte seguridad y tranquilidad.
                        </p>
                        <a
                            href="#!"
                            class="btn btn-primary rounded-pill px-4 py-2"
                            >Saber más</a
                        >
                    </div>
                </div>
            </div>

            <!-- Producto 2 -->
            <div class="col-12 col-md-4">
                <div class="card bg-light shadow-sm border-0 rounded-4">
                    <div class="text-center mb-3">
                        <img
                            src="/Producto3.jpg"
                            class="img-fluid rounded-4"
                            alt="Collares"
                        />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title text-primary">Collares</h5>
                        <p class="card-text text-muted">
                            Los collares hechos con última tecnología para
                            brindarte seguridad y tranquilidad.
                        </p>
                        <a
                            href="#!"
                            class="btn btn-primary rounded-pill px-4 py-2"
                            >Saber más</a
                        >
                    </div>
                </div>
            </div>

            <!-- Producto 3 -->
            <div class="col-12 col-md-4">
                <div class="card bg-light shadow-sm border-0 rounded-4">
                    <div class="text-center mb-3">
                        <img
                            src="/producto5.jpeg"
                            class="img-fluid rounded-4"
                            alt="Collares"
                        />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title text-primary">Collares</h5>
                        <p class="card-text text-muted">
                            Los collares hechos con última tecnología para
                            brindarte seguridad y tranquilidad.
                        </p>
                        <a
                            href="#!"
                            class="btn btn-primary rounded-pill px-4 py-2"
                            >Saber más</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap");

    * {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
    }

    .section-header h2 {
        font-size: 2.5rem;
        font-weight: 600;
        color: #343a40; /* Un gris oscuro para el título */
    }

    .section-header p {
        font-size: 1.125rem;
        color: #6c757d;
    }

    .card {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    .card-title {
        font-size: 1.25rem;
        color: #007bff; /* Color azul de énfasis para los títulos */
    }

    .card-text {
        font-size: 1rem;
    }

    .btn-primary {
        background-color: #007bff;
        border-radius: 30px;
        font-weight: 500;
    }

    .btn-primary:hover {
        background-color: #0056b3;
    }

    .img-fluid {
        border-radius: 12px;
    }

    /* Estilos para dispositivos móviles */
    @media (max-width: 767px) {
        .section-header h2 {
            font-size: 2rem;
        }

        .card-title {
            font-size: 1.1rem;
        }

        .btn-primary {
            font-size: 0.875rem;
            padding: 10px 20px;
        }
    }
</style>
