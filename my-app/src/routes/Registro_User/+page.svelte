<script>
    import Navbar from "../../lib/components/Navbar.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import { onMount } from "svelte";

    let v_usuario = "";
    let v_password = "";
    let Confirmar_Contraseña = "";
    let v_nombre = "";
    let v_apellido = "";
    let v_documento = "";
    let v_telefono = "";
    let v_email = "";
    let v_rol = 2;
    let v_estado = true;
    let error = null;

    // Referencias a los contenedores de los loader
    let registerLoader;

    // Función para mostrar el loader
    // Función para mostrar el loader
    function showLoader(loader) {
        if (loader) {
            loader.style.display = "flex";
        }
    }

    // Función para ocultar el loader
    function hideLoader(loader) {
        if (loader) {
            loader.style.display = "none";
        }
    }

    let captchaElement;

    onMount(() => {
        // Al cargar la página, inicializamos el reCAPTCHA
        grecaptcha.render(captchaElement, {
            sitekey: "6Lf0vdUqAAAAAN51836FYzxSTExokw1cl2HB426y",
        });
    });

    async function RegisterUser() {
        // Referencia al Captcha

        const captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, verifica el reCAPTCHA.",
            });
            return;
        }

        Confirmar_Contraseña = document.getElementById(
            "Confirmar_Contraseña",
        ).value;

        if (Confirmar_Contraseña === v_password) {
            try {
                // Muestra el cuadro de confirmación antes de proceder con el registro
                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Desea registrarse a SensuTrack!?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, registrarse!",
                    customClass: {
                        popup: "swal-popup", // Clase para personalizar el popup de la alerta
                        title: "custom-title", // Clase personalizada para el título
                    },
                });
                // Si el usuario confirma, continuamos con el registro
                if (result.isConfirmed) {
                    showLoader(registerLoader); // Mostrar loader al comenzar el registro
                    const response = await fetch(
                        "https://proyectomascotas.onrender.com/create_user",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: v_email,
                                password: v_password,
                                nombre: v_nombre,
                                apellido: v_apellido,
                                documento: v_documento,
                                telefono: v_telefono,
                                id_rol: v_rol,
                                estado: v_estado,
                            }),
                        },
                    );

                    const data = await response.json();
                    console.log(data);

                    hideLoader(registerLoader); // Ocultar loader al terminar el registro

                    if (response.ok) {
                        grecaptcha.reset(); // Restablece el CAPTCHA después de una respuesta exitosa
                        Swal.fire({
                            title: "¡Registrado!,¡Bienvenido " + v_nombre + "!",
                            icon: "success",
                            customClass: {
                                popup: "swal-popup", // Clase para personalizar el popup de la alerta
                                title: "custom-title", // Clase personalizada para el título
                            },
                        });
                    } else {
                        alert("Error en el registro");
                    }
                } else {
                    Swal.fire({
                        title: "REGISTRO CANCELADO",
                        icon: "error",
                        customClass: {
                            popup: "swal-popup", // Clase para personalizar el popup de la alerta
                            title: "custom-title", // Clase personalizada para el título
                        },
                    });
                }
            } catch (e) {
                error = e.message;
                hideLoader(registerLoader); // Ocultar loader si ocurre algun error
                alert("Error en la solicitud: " + error);
            }
        } else {
            Swal.fire({
                title: "Parece que ha ocurrido un error",
                text: "No son iguales las contraseñas, porfavor intente de nuevo :]",
                icon: "error",
                customClass: {
                    popup: "swal-popup", // Clase para personalizar el popup de la alerta
                    title: "custom-title", // Clase personalizada para el título
                },
            });
        }
    }
</script>

<Navbar></Navbar>
<ChatBot></ChatBot>
<section
    class="vh-100 pt-5"
    style="background-color: #eee; padding-bottom: 60%; "
>
    <div
        class="wrapper d-flex align-items-center justify-content-center vh-100"
    >
        <div class="container h-100">
            <div
                class="row d-flex justify-content-center align-items-center h-100"
            >
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div
                                    class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                                >
                                    <p
                                        class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                    >
                                        FORMULARIO DE REGISTRO
                                    </p>

                                    <form
                                        on:submit|preventDefault={RegisterUser}
                                        class="mx-1 mx-md-4"
                                    >
                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-person fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    bind:value={v_nombre}
                                                    placeholder="Nombre"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-person fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    bind:value={v_apellido}
                                                    placeholder="Apellido"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-card-list fa-lg me-3 fa-fw"
                                            ></i>

                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    bind:value={v_documento}
                                                    placeholder="Documento"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-telephone fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    bind:value={v_telefono}
                                                    placeholder="Teléfono"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-envelope fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    bind:value={v_email}
                                                    placeholder="Correo Electronico"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-lock fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="password"
                                                    class="form-control"
                                                    bind:value={v_password}
                                                    placeholder="Contraseña"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex flex-row align-items-center mb-4"
                                        >
                                            <i
                                                class="bi bi-lock fa-lg me-3 fa-fw"
                                            ></i>
                                            <div
                                                data-mdb-input-init
                                                class="form-outline flex-fill mb-0"
                                            >
                                                <input
                                                    type="password"
                                                    class="form-control"
                                                    id="Confirmar_Contraseña"
                                                    placeholder="Confirmar Contraseña"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="d-flex justify-content-center mb-4"
                                        >
                                            <div
                                                class="g-recaptcha"
                                                bind:this={captchaElement}
                                                data-sitekey="6Lf0vdUqAAAAAN51836FYzxSTExokw1cl2HB426y"
                                            ></div>
                                        </div>

                                        <div
                                            class="form-check d-flex justify-content-center mb-5"
                                        >
                                            <input
                                                class="form-check-input me-2"
                                                type="checkbox"
                                                value=""
                                                id="form2Example3c"
                                                required
                                            />
                                            <label
                                                class="form-check-label"
                                                for="form2Example3"
                                            >
                                                Acepto los terminos y
                                                condiciones en: <button
                                                    class="btn btn-link p-0"
                                                    href="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#terminosYcondiciones"
                                                >
                                                    Términos y condiciones</button
                                                >
                                            </label>
                                        </div>

                                        <div
                                            class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                                        >
                                            <button
                                                type="submit"
                                                data-mdb-button-init
                                                data-mdb-ripple-init
                                                class="btn btn-primary btn-lg"
                                                >Registrarse</button
                                            >
                                        </div>
                                    </form>
                                    <div
                                        class="loader-container"
                                        bind:this={registerLoader}
                                    >
                                        <div class="loader-text">
                                            <span>S</span>
                                            <span>e</span>
                                            <span>n</span>
                                            <span>s</span>
                                            <span>u</span>
                                            <span>T</span>
                                            <span>r</span>
                                            <span>a</span>
                                            <span>c</span>
                                            <span>k</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                                >
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div
        class="modal fade"
        id="terminosYcondiciones"
        tabindex="-1"
        aria-labelledby="terminosYcondicionesLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5
                        class="modal-title fw-bold"
                        id="terminosYcondicionesLabel"
                    >
                        Términos y Condiciones de SensuTrack
                    </h5>
                    <button
                        type="button"
                        class="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body p-4">
                    <p class="text-muted">
                        <strong>Fecha de entrada en vigor:</strong> 18/03/2025
                    </p>
                    <p>
                        Bienvenido a <strong>SensuTrack</strong>. Estos Términos
                        y Condiciones establecen las reglas y regulaciones para
                        el uso de nuestra plataforma, que permite el monitoreo y
                        gestión de personas ciegas mediante tecnología GPS.
                    </p>
                    <p>
                        Al acceder y utilizar SensuTrack, aceptas cumplir con
                        estos términos. Si no estás de acuerdo con alguna parte,
                        te recomendamos no utilizar nuestros servicios.
                    </p>

                    <h2 class="h5 mt-4 text-primary">1. Uso del Servicio</h2>
                    <ul class="list-unstyled ps-3">
                        <li>
                            ✅ SensuTrack está diseñado para facilitar el
                            monitoreo seguro de personas con discapacidad visual
                            mediante dispositivos con GPS.
                        </li>
                        <li>
                            ✅ El usuario es responsable de proporcionar
                            información precisa y actualizada en la plataforma.
                        </li>
                        <li>
                            ✅ El acceso al sistema puede estar restringido a
                            usuarios autorizados y sujetos a verificación.
                        </li>
                    </ul>

                    <h2 class="h5 mt-4 text-primary">2. Registro y Cuentas</h2>
                    <ul class="list-unstyled ps-3">
                        <li>
                            📌 Para utilizar SensuTrack, es posible que debas
                            crear una cuenta proporcionando información válida y
                            verificada.
                        </li>
                        <li>
                            📌 Eres responsable de la seguridad de tu cuenta y
                            de no compartir tus credenciales con terceros.
                        </li>
                        <li>
                            📌 Nos reservamos el derecho de suspender o eliminar
                            cuentas que incumplan estos términos.
                        </li>
                    </ul>

                    <h2 class="h5 mt-4 text-primary">
                        3. Privacidad y Protección de Datos
                    </h2>
                    <ul class="list-unstyled ps-3">
                        <li>
                            🔒 SensuTrack recopila y almacena datos de ubicación
                            con el consentimiento del usuario para garantizar la
                            funcionalidad del servicio.
                        </li>
                        <li>
                            🔒 No compartiremos información personal con
                            terceros sin el consentimiento expreso del usuario,
                            salvo requerimientos legales.
                        </li>
                        <li>
                            🔒 Puedes consultar nuestra <strong
                                >Política de Privacidad</strong
                            > para conocer más detalles sobre el tratamiento de tus
                            datos.
                        </li>
                    </ul>

                    <h2 class="h5 mt-4 text-primary">
                        4. Responsabilidades y Limitaciones
                    </h2>
                    <ul class="list-unstyled ps-3">
                        <li>
                            ⚠️ SensuTrack se esfuerza por mantener la
                            disponibilidad del servicio, pero no garantiza que
                            esté libre de errores o interrupciones.
                        </li>
                        <li>
                            ⚠️ No somos responsables de problemas técnicos
                            ajenos a nuestra plataforma, como fallos en
                            dispositivos GPS o en la conexión a Internet.
                        </li>
                        <li>
                            ⚠️ SensuTrack no se hace responsable del mal uso de
                            la información proporcionada por los usuarios.
                        </li>
                    </ul>

                    <h2 class="h5 mt-4 text-primary">
                        5. Modificaciones y Terminación
                    </h2>
                    <ul class="list-unstyled ps-3">
                        <li>
                            🔄 Nos reservamos el derecho de actualizar estos
                            Términos y Condiciones en cualquier momento. Se
                            notificará a los usuarios sobre cambios
                            significativos.
                        </li>
                        <li>
                            🔄 Podemos suspender o descontinuar el servicio en
                            caso de incumplimiento de estos términos.
                        </li>
                    </ul>

                    <h2 class="h5 mt-4 text-primary">6. Contacto</h2>
                    <p>
                        Si tienes preguntas sobre estos Términos y Condiciones,
                        puedes contactarnos a través de nuestro correo
                        electrónico:
                        <strong class="text-primary"
                            >SensuTrack@gmail.com</strong
                        > o desde la pagina en el apartado de contacto.
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* Estilos para el loader de la cara de un perrito */
    .wrapper {
        --input-focus: #2d8cf0;
        --font-color: #323232;
        --font-color-sub: #666;
        --bg-color: #fff;
        --bg-color-alt: #666;
        --main-color: #323232;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    /* Contenedor para el loader */
    .loader-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente */
        display: none; /* Oculto por defecto */
        justify-content: center;
        align-items: center;
        z-index: 100; /* Asegúrate de que esté encima de otros elementos */
    }

    /* Contenedor para el loader */
    .loader-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .loader-text {
        display: flex;
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #007bff; /* Color azul principal */
        animation: fadeIn 1.5s infinite alternate;
    }

    .loader-text span {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: calc(0.1s * var(--i));
    }

    .loader-text span:nth-child(1) {
        --i: 1;
    }
    .loader-text span:nth-child(2) {
        --i: 2;
    }
    .loader-text span:nth-child(3) {
        --i: 3;
    }
    .loader-text span:nth-child(4) {
        --i: 4;
    }
    .loader-text span:nth-child(5) {
        --i: 5;
    }
    .loader-text span:nth-child(6) {
        --i: 6;
    }
    .loader-text span:nth-child(7) {
        --i: 7;
    }
    .loader-text span:nth-child(8) {
        --i: 8;
    }
    .loader-text span:nth-child(9) {
        --i: 9;
    }
    .loader-text span:nth-child(10) {
        --i: 10;
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-15px);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0.7;
        }
        100% {
            opacity: 1;
        }
    }
</style>
