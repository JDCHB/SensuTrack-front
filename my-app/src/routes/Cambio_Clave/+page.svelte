<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";

    const serviceID = "service_j9bousa";
    const templateID = "template_zszjdla";
    const apikey = "dFD1OdFitzwQblEX0";
    let cn1 = "";
    let vl_correo = "";
    let vr = 0;

    // Referencias a los contenedores de los loader
    let registerLoader;

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

    //Can change 7 to 2 for longer results.
    function codigo() {
        vr = (Math.random() + 1).toString(36).substring(4);
        return vr;
    }

    async function buscar_correo() {
        vl_correo = document.getElementById("correo").value; //

        try {
            showLoader(registerLoader); // Mostrar loader al comenzar el registro
            const response = await fetch(
                "https://proyectomascotas.onrender.com/Validar_Correo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: vl_correo, // Enviar el valor como JSON
                    }),
                },
            );

            const data = await response.json();
            console.log(data);
            hideLoader(registerLoader); // Ocultar loader al terminar el registro
            if (data.email) {
                codigo(vr);

                emailjs.init(apikey);
                emailjs
                    .send(serviceID, templateID, {
                        r: vr,
                        email: vl_correo,
                    })
                    .then((result) => {})
                    .catch((error) => {});

                mostrarModalValidacion();
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Correo no encontrado",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function cambiar_contrasena() {
        try {
            showLoader(registerLoader); // Mostrar loader al comenzar el registro
            const response = await fetch(
                "https://proyectomascotas.onrender.com/update_contraseña",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: vl_correo,
                        password: cn1,
                    }),
                },
            );
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            hideLoader(registerLoader); // Ocultar loader al terminar el registro
            if (data.mensaje == "Contraseña actualizada exitosamente") {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "success",
                    iconColor: "white",
                    color: "white",
                    background: "green",
                    title: "Contraseñass cambiada exitosamente",
                });

                setTimeout(() => {
                    window.location.href = "/";
                }, 3500);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al cambiar la contraseña.",
                    icon: "error",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    function mostrarModalValidacion() {
        Swal.fire({
            title: "Validacion",
            html: `
                        <div class="card-header">Ingrese la clave enviada al correo<div/>
                        <input class="mt-2 form-control" id="ingaturrona"></input>
                    `,
            icon: "warning",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Validar",
        }).then((result) => {
            const f = document.getElementById("ingaturrona").value;
            if (result.isConfirmed) {
                if (f == vr) {
                    Swal.fire({
                        title: "Cambio de clave",
                        html: `
                                    <div class="card-header">Ingrese su nueva clave<div/>
                                    <input class="mt-2 form-control" id="clave_nueva_1"></input>
                                `,
                        icon: "warning",
                        allowOutsideClick: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Validar",
                    }).then((result) => {
                        cn1 = document.getElementById("clave_nueva_1").value;
                        if (result.isConfirmed) {
                            cambiar_contrasena(cn1);
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "El codigo es incorrecto... Por favor, intentalo de nuevo.",
                        icon: "error",
                    }).then(() => {
                        mostrarModalValidacion();
                    });
                }
            } else if (result.isDismissed) {
            }
        });
    }
</script>

<Navbar></Navbar>
<ChatBot></ChatBot>
<div class="wrapper">
    <div class="container py-5">
        <div class="text-center mb-4">
            <h2 class="title text-primary">🔒 Cambio de Contraseña</h2>
            <p class="lead text-muted">
                Ingresa tu correo electrónico registrado para restablecer tu
                contraseña.
            </p>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="form-floating mb-4">
                    <input
                        type="email"
                        class="form-control"
                        placeholder="ejemplo@correo.com"
                        id="correo"
                        bind:value={vl_correo}
                        required
                    />
                    <label for="correo">Correo Electrónico</label>
                </div>
            </div>
        </div>

        <div class="text-center mt-3">
            <button
                on:click={buscar_correo}
                type="button"
                class="btn btn-lg btn-gradient px-5 shadow"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Enviar Solicitud
            </button>
        </div>
    </div>

    <!-- Loader -->
    <div class="loader-container" bind:this={registerLoader}>
        <div class="loader-text">
            <span>S</span><span>e</span><span>n</span><span>s</span><span
                >u</span
            >
            <span>T</span><span>r</span><span>a</span><span>c</span><span
                >k</span
            >
        </div>
    </div>
</div>

<style>
    .wrapper {
        position: relative;
        max-width: 550px;
        margin: 100px auto;
        padding: 50px 40px;
        background: #ffffff;
        border-radius: 1rem;
        border: 1px solid #dee2e6;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
        transition: all 0.3s ease-in-out;
    }

    .title {
        font-size: 2.2rem;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
    }

    .form-control {
        padding: 1rem;
        border-radius: 0.75rem;
        font-size: 1rem;
    }

    .btn-gradient {
        background: linear-gradient(90deg, #4f46e5, #3b82f6);
        color: white;
        border: none;
        border-radius: 0.75rem;
        font-weight: 600;
        transition: 0.3s ease-in-out;
    }

    .btn-gradient:hover {
        background: linear-gradient(90deg, #4338ca, #2563eb);
        transform: translateY(-2px);
    }

    .loader-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.85);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10;
        border-radius: 1rem;
    }

    .loader-text {
        display: flex;
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #3b82f6;
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
            transform: translateY(-10px);
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
