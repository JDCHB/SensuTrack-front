<script>
    import Navbar from "../../lib/components/Navbar.svelte";
    import { onMount } from "svelte";

    let v_usuario = "";
    let v_password = "";
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

    async function Register() {
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
                console.log("Registro Cancelado");
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader); // Ocultar loader si ocurre algun error
            alert("Error en la solicitud: " + error);
        }
    }
</script>

<Navbar></Navbar>
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
                                        on:submit|preventDefault={Register}
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
                                                    type="tel"
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
                                                condiciones en: <a href="#!"
                                                    >Terminos y condiciones</a
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
                                        <div class="loader-dog-head">
                                            <div class="ear left-ear"></div>
                                            <div class="ear right-ear"></div>
                                            <div class="eye left-eye">
                                                <div class="pupil"></div>
                                            </div>
                                            <div class="eye right-eye">
                                                <div class="pupil"></div>
                                            </div>
                                            <div class="nose"></div>
                                            <div class="mouth"></div>
                                            <div class="tongue"></div>
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

    .loader-dog-head {
        position: relative;
        width: 120px;
        height: 120px;
        background-color: #f4a261; /* Color de piel */
        border-radius: 50%; /* Forma de la cara */
        display: flex;
        justify-content: center;
        align-items: center;
        animation: bounce 2s infinite;
    }

    .ear {
        position: absolute;
        background-color: #f4a261;
        width: 40px;
        height: 60px;
        border-radius: 50%;
        top: 10px;
    }

    .left-ear {
        left: -20px;
        transform: rotate(-30deg);
    }

    .right-ear {
        right: -20px;
        transform: rotate(30deg);
    }

    .eye {
        position: absolute;
        background-color: #fff;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        top: 35px;
    }

    .left-eye {
        left: 30px;
    }

    .right-eye {
        right: 30px;
    }

    .pupil {
        position: absolute;
        background-color: #000;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        top: 6px;
        left: 6px;
        animation: blink 3s infinite;
    }

    .nose {
        position: absolute;
        background-color: #2d3436;
        width: 20px;
        height: 15px;
        border-radius: 50%;
        bottom: 45px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .mouth {
        position: absolute;
        width: 40px;
        height: 20px;
        border: 2px solid #2d3436;
        border-top: none;
        border-radius: 0 0 20px 20px;
        bottom: 30px;
    }

    .tongue {
        position: absolute;
        background-color: #e76f51;
        width: 16px;
        height: 24px;
        border-radius: 50%;
        bottom: 15px;
        animation: waggle 1.5s infinite ease-in-out;
    }

    /* Animaciones */
    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    @keyframes blink {
        0%,
        80%,
        100% {
            transform: scaleY(1);
        }
        90% {
            transform: scaleY(0.1);
        }
    }

    @keyframes waggle {
        0%,
        100% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(10deg);
        }
    }
</style>
