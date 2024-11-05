<section class="faq py-5">
    <div class="container">
        <h2 class="text-center mb-4">Preguntas Frecuentes</h2>
        <div class="row">
            <div class="col-md-12">
                <!-- Acordeón de preguntas frecuentes -->
                <div class="accordion" id="faqAccordion">
                    <!-- Pregunta 1 -->
                    <div class="faq-item mb-3">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button
                                        class="btn btn-link collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                    >
                                        ¿Cómo funciona el rastreo en tiempo
                                        real?
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseOne"
                                class="collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#faqAccordion"
                            >
                                <div class="card-body">
                                    El collar GPS se conecta a tu teléfono móvil
                                    mediante nuestra aplicación, y te permite
                                    rastrear la ubicación exacta de tu mascota
                                    en tiempo real.
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Pregunta 2 -->
                    <div class="faq-item mb-3">
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button
                                        class="btn btn-link collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        ¿El collar es resistente al agua?
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseTwo"
                                class="collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#faqAccordion"
                            >
                                <div class="card-body">
                                    Sí, el collar es resistente al agua, por lo
                                    que puede ser usado incluso bajo la lluvia o
                                    mientras tu mascota se baña.
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Pregunta 3 -->
                    <div class="faq-item mb-3">
                        <div class="card">
                            <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button
                                        class="btn btn-link collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        ¿Cómo se carga el collar?
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseThree"
                                class="collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#faqAccordion"
                            >
                                <div class="card-body">
                                    El collar se carga mediante un cable USB que
                                    viene incluido en el paquete. La carga
                                    completa se logra en 2 horas.
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Pregunta 4 -->
                    <div class="faq-item mb-3">
                        <div class="card">
                            <div class="card-header" id="headingFour">
                                <h5 class="mb-0">
                                    <button
                                        class="btn btn-link collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour"
                                        aria-expanded="false"
                                        aria-controls="collapseFour"
                                    >
                                        ¿Cuál es la duración de la batería?
                                    </button>
                                </h5>
                            </div>
                            <div
                                id="collapseFour"
                                class="collapse"
                                aria-labelledby="headingFour"
                                data-bs-parent="#faqAccordion"
                            >
                                <div class="card-body">
                                    La batería del collar dura hasta 7 días
                                    dependiendo del uso. Puedes verificar el
                                    estado de la batería a través de la app.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .faq h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #333;
    }

    .accordion .card-header {
        background-color: #f7f7f7;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 1rem;
    }

    .accordion .card-header button {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        text-decoration: none;
        background-color: transparent;
        border: none;
        width: 100%;
        text-align: left;
    }

    .accordion .card-header button:focus {
        outline: none;
    }

    .accordion .card-body {
        background-color: #fafafa;
        padding: 1rem;
        border-top: 1px solid #ddd;
        font-size: 1rem;
        color: #555;
    }

    .accordion .btn-link.collapsed {
        color: #007bff;
    }

    .accordion .btn-link.collapsed:hover {
        color: #0056b3;
        text-decoration: none;
    }

    .accordion .btn-link {
        text-decoration: none;
    }

    .faq-item {
        margin-bottom: 1.5rem;
    }
</style>
