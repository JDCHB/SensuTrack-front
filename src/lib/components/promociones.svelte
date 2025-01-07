<section class="banner">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
                <h2 class="display-4 text-primary">
                    Navega con confianza y seguridad.
                </h2>
                <p class="lead text-muted mb-4">
                    Nuestros dispositivos GPS para personas ciegas te permiten
                    vivir con independencia y libertad.
                </p>
                <a href="/login" class="btn btn-primary btn-lg rounded-pill"
                    >Descubre más</a
                >
            </div>
            <div class="col-md-6 text-center">
                <img
                    src="/banner.jpg"
                    alt="BANNER"
                    class="img-fluid rounded-3 shadow-lg"
                />
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

    .banner {
        background-color: #f8f9fa;
        padding: 60px 0;
        background-size: cover;
        background-position: center;
        color: #343a40;
        position: relative;
    }

    .banner h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #007bff; /* Color azul para el título */
        line-height: 1.3;
    }

    .banner p {
        font-size: 1.1rem;
        color: #6c757d;
    }

    .banner .btn-primary {
        background-color: #007bff;
        padding: 12px 30px;
        font-size: 1.1rem;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        transition: background-color 0.3s ease;
    }

    .banner .btn-primary:hover {
        background-color: #0056b3;
    }

    .banner img {
        max-width: 90%;
        height: auto;
        border-radius: 15px;
        transition: transform 0.3s ease;
    }

    .banner img:hover {
        transform: scale(1.05); /* Efecto hover para la imagen */
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .banner {
            text-align: center;
        }

        .banner h2 {
            font-size: 2rem;
        }

        .banner p {
            font-size: 1rem;
        }

        .banner .btn-primary {
            font-size: 1rem;
        }

        .banner img {
            max-width: 100%;
            margin-top: 20px;
        }
    }
</style>
