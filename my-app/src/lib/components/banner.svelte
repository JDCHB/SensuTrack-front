<script>
    import { onMount } from "svelte";

    onMount(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
        document.head.appendChild(link);
    });
</script>

<section class="benefits py-5">
    <div class="container">
        <h2 class="text-center mb-5" style="color:#006aff ;">
            Beneficios del GPS para Personas con Discapacidad Visual
        </h2>
        <div class="row justify-content-center">
            <!-- Beneficio 1: Rastreo en Tiempo Real -->
            <div class="col-12 col-md-4 mb-4">
                <div class="benefit-card shadow rounded-lg">
                    <div class="icon-container bg-gradient-1 text-white">
                        <!-- Ícono de mapa (cambiado por fa-map) -->
                        <i class="fas fa-map fa-1x"></i>
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">Rastreo en Tiempo Real</h4>
                        <p class="card-text text-muted">
                            Conoce en todo momento la ubicación exacta de la
                            persona, brindando mayor seguridad y tranquilidad.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Beneficio 2: Duración de Batería Prolongada -->
            <div class="col-12 col-md-4 mb-4">
                <div class="benefit-card shadow rounded-lg">
                    <div class="icon-container bg-gradient-2 text-white">
                        <i class="fas fa-battery-three-quarters fa-1x"></i>
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">Batería de Larga Duración</h4>
                        <p class="card-text text-muted">
                            Hasta 7 días de funcionamiento continuo para que no
                            tengas que preocuparte por cargarlo constantemente.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Beneficio 3: Resistente al Agua -->
            <div class="col-12 col-md-4 mb-4">
                <div class="benefit-card shadow rounded-lg">
                    <div class="icon-container bg-gradient-3 text-white">
                        <i class="fas fa-tint fa-1x"></i>
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">Resistencia al Agua</h4>
                        <p class="card-text text-muted">
                            Ideal para cualquier clima. El dispositivo continúa
                            funcionando incluso bajo la lluvia o en condiciones
                            húmedas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section
    class="banner bg-dark text-white text-center py-5 position-relative"
    style="margin-bottom: 5%;"
>
    <div class="container position-relative z-index-2">
        <h2 class="display-4 font-weight-bold mb-4">
            ¡Seguridad y tranquilidad, estés donde estés!
        </h2>
        <p class="lead mb-4">
            SensuTrack permite monitorear en tiempo real a personas ciegas,
            enviando alertas si se alejan de zonas seguras. Garantiza su
            bienestar mientras te brinda total confianza y control.
            <br /><br />
            ¿No estás satisfecho? Te devolvemos tu dinero en los primeros 30 días.
            ¡Compra sin riesgos!
        </p>
        <a href="/login" class="btn btn-warning btn-lg btn-cta rounded-pill"
            >Compra Ahora</a
        >
    </div>
    <div class="banner-image position-absolute top-0 left-0 w-100 h-100"></div>
</section>

<style>
    /* Estilos generales del banner */
    .banner {
        background-color: #93927c; /* Fondo oscuro */
        color: white;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .banner h2 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 20px;
        letter-spacing: 2px;
        color: #006aff; /* Color del texto (Naranja brillante) */
    }

    .banner p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        color: rgba(255, 255, 255, 0.8);
    }

    /* Botón destacado */
    .btn-cta {
        border-color: #006aff;
        font-size: 1.2rem;
        padding: 10px 25px;
        border-radius: 30px;
        background-color: #ffffff;
        color: rgb(0, 0, 0);
        transition:
            background-color 0.3s,
            transform 0.3s ease;
    }

    .btn-cta:hover {
        background-color: #006aff;
        transform: translateY(-5px);
    }

    .banner-image {
        background-image: url("/logo.jpg"); /* Imagen de fondo */
        background-position: center;
        background-size: cover;
        background-attachment: fixed; /* Efecto parallax */
        z-index: -1;
    }

    /* Responsividad */
    @media (max-width: 768px) {
        .banner h2 {
            font-size: 2rem;
        }

        .banner p {
            font-size: 1rem;
        }
    }

    /* Sección de Beneficios */
    .benefits {
        background-color: #f4f7fa; /* Fondo claro */
        padding-top: 80px;
        padding-bottom: 80px;
    }

    .benefit-card {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .benefit-card:hover {
        transform: translateY(-10px); /* Efecto de flotado */
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }

    /* Iconos con fondo de gradiente */
    .icon-container {
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto 20px;
        font-size: 2.5rem;
    }

    .bg-gradient-1 {
        background: linear-gradient(135deg, #ff8c00, #ffb74d); /* Naranja */
    }

    .bg-gradient-2 {
        background: linear-gradient(135deg, #28a745, #5cb85c); /* Verde */
    }

    .bg-gradient-3 {
        background: linear-gradient(135deg, #007bff, #33b5e5); /* Azul */
    }

    .card-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 15px;
    }

    .card-text {
        font-size: 1rem;
        color: #666;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 50px;
    }

    /* Responsividad */
    @media (max-width: 768px) {
        .benefits {
            padding-top: 60px;
            padding-bottom: 60px;
        }

        h2 {
            font-size: 2rem;
        }
    }
</style>
