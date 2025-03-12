<div
    id="carouselE1"
    class="carousel slide"
    data-bs-ride="carousel"
    style="margin-bottom: 11%;"
>
    <!-- Indicadores de carrusel -->
    <div class="carousel-indicators">
        <button
            type="button"
            data-bs-target="#carouselE1"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
        ></button>
        <button
            type="button"
            data-bs-target="#carouselE1"
            data-bs-slide-to="1"
            aria-label="Slide 2"
        ></button>
        <button
            type="button"
            data-bs-target="#carouselE1"
            data-bs-slide-to="2"
            aria-label="Slide 3"
        ></button>
    </div>

    <!-- Contenido del carrusel -->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img
                src="/ciego-1.png"
                class="d-block w-100"
                alt="Dispositivos GPS para personas ciegas"
            />
            <div class="carousel-caption">
                <h5>Dispositivos GPS de última generación</h5>
                <p>
                    Navega con confianza y seguridad con nuestros dispositivos
                    GPS diseñados para personas ciegas.
                </p>
                <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
            </div>
        </div>
        <div class="carousel-item">
            <img
                src="/ciego-2.png"
                class="d-block w-100"
                alt="Dispositivos GPS para personas ciegas"
            />
            <div class="carousel-caption">
                <h5>Independencia y seguridad</h5>
                <p>
                    Facilitamos la movilidad y la independencia de las personas
                    ciegas con tecnología avanzada.
                </p>
                <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
            </div>
        </div>
        <div class="carousel-item">
            <img
                src="/ciego-3.png"
                class="d-block w-100"
                alt="Dispositivos GPS para personas ciegas"
            />
            <div class="carousel-caption">
                <h5>Tecnología accesible</h5>
                <p>
                    Diseñamos dispositivos GPS fáciles de usar y adaptados a las
                    necesidades de las personas ciegas.
                </p>
                <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
            </div>
        </div>
    </div>

    <!-- Botones de control del carrusel -->
    <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselE1"
        data-bs-slide="prev"
    >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
    </button>
    <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselE1"
        data-bs-slide="next"
    >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
    </button>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");

    * {
        font-family: "Poppins", sans-serif;
        font-weight: 100;
        font-style: normal;
    }

    .carousel-item img {
        height: 500px; /* Ajusta la altura de las imágenes */
        object-fit: contain; /* Asegura que la imagen se vea completa sin recortes */
        width: 100%; /* Asegura que la imagen ocupe todo el ancho disponible */
        transition: opacity 0.5s ease-in-out; /* Suaviza la transición de imagen */
    }

    .carousel-item {
        position: relative; /* Necesario para la leyenda */
    }

    .carousel-caption {
        bottom: 30px; /* Ajustamos la posición de la leyenda */
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
        color: white;
        padding: 20px;
        border-radius: 8px; /* Bordes redondeados */
        z-index: 2;
        text-align: center;
    }

    .carousel-caption h5 {
        font-size: 30px; /* Tamaño de fuente más pequeño */
        font-weight: 600;
        text-transform: uppercase;
        margin-top: 10px;
    }

    .carousel-caption p {
        width: 80%; /* Ajusta el ancho */
        margin: 10px auto;
        font-size: 16px;
        line-height: 1.5;
    }

    /* Mejoras para la responsividad */
    @media (max-width: 768px) {
        .carousel-item img {
            height: 300px; /* Ajusta la altura en dispositivos móviles */
        }

        .carousel-caption h5 {
            font-size: 24px;
        }

        .carousel-caption p {
            font-size: 14px;
        }
    }

    /* Estilo para los controles del carrusel */
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro para los iconos */
        border-radius: 50%;
        padding: 10px;
    }

    .carousel-control-prev,
    .carousel-control-next {
        top: 50%;
        transform: translateY(-50%); /* Centra los controles verticalmente */
    }

    .carousel-control-prev-icon {
        width: 50px;
        height: 50px;
    }

    .carousel-control-next-icon {
        width: 50px;
        height: 50px;
    }
</style>
