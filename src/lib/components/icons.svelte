<section class="section-icons">
    <div class="container">
        <div class="row">
            <!-- Envio Gratis -->
            <div
                class="col-12 col-md-6 col-lg-4 box-icons"
                style="padding-left: 5%;"
            >
                <div class="d-flex align-items-center">
                    <i class="bi bi-airplane display-4 icon"></i>
                    <div class="ms-4">
                        <h3 class="fw-bold">Envío Gratis</h3>
                        <p>
                            Envíos totalmente gratis a cualquier parte.
                            ¡Aprovecha ahora!
                        </p>
                    </div>
                </div>
            </div>

            <!-- Rembolsos -->
            <div
                class="col-12 col-md-6 col-lg-4 box-icons"
                style="padding-left: 5%;"
            >
                <div class="d-flex align-items-center">
                    <i class="bi bi-cash-coin display-4 icon"></i>
                    <div class="ms-4">
                        <h3 class="fw-bold">Rembolsos</h3>
                        <p>
                            Si no estás satisfecho, te devolvemos el dinero sin
                            preguntas.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Gran Regalo -->
            <div
                class="col-12 col-md-6 col-lg-4 box-icons"
                style="padding-left: 5%;"
            >
                <div class="d-flex align-items-center">
                    <i class="bi bi-gift-fill display-4 icon"></i>
                    <div class="ms-4">
                        <h3 class="fw-bold">Un Gran Regalo</h3>
                        <p>
                            El mejor regalo para tu peludo amigo. ¡Hazlo feliz
                            hoy!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

    * {
        font-family: "Poppins", sans-serif;
        margin: 0;
        padding: 0;
    }

    .section-icons {
        background-color: #f8f9fa; /* Fondo claro para la sección */
        padding: 60px 0;
        padding-bottom: 4%;
    }

    .box-icons {
        padding: 20px;
        transition: transform 0.3s ease-in-out;
    }

    .box-icons:hover {
        transform: translateY(-10px); /* Efecto de elevación en hover */
        cursor: pointer;
    }

    .icon {
        color: #ff8c00; /* Color naranja para los iconos */
        font-size: 3rem; /* Aumenta el tamaño del icono */
        transition: color 0.3s ease;
    }

    .box-icons:hover .icon {
        color: #e67e00; /* Cambio de color en hover */
    }

    .box-icons h3 {
        color: #333;
        font-size: 1.5rem;
        margin-top: 15px;
        margin-bottom: 10px;
    }

    .box-icons p {
        color: #666;
        font-size: 1rem;
        line-height: 1.5;
        text-align: justify;
    }

    /* Estilos para asegurar buena responsividad */
    @media (max-width: 767px) {
        .icon {
            font-size: 2.5rem; /* Ajuste del tamaño del icono en móviles */
        }

        .box-icons h3 {
            font-size: 1.25rem;
        }

        .box-icons p {
            font-size: 0.875rem;
        }
    }

    /* Estilos para cuando la pantalla es mediana (tabletas) */
    @media (max-width: 991px) {
        .icon {
            font-size: 2.8rem; /* Ajuste para tabletas */
        }
    }
</style>
