<script>
    import { onMount } from "svelte";
    import NavbarAd from "../../lib/components/NavbarAD.svelte";

    let v_nombre = "";
    let v_apellido = "";
    let v_password = "";
    let Confirmar_Contraseña = "";
    let v_documento = "";
    let v_telefono = "";
    let v_email = "";
    let v_rol = "";
    let roles = [];
    let v_estado = true;
    let error = null;
    let registerLoader;

    onMount(async () => {
        const response = await fetch(
            "https://proyectomascotas.onrender.com/get_roles/",
        );
        const data = await response.json();
        roles = data.resultado;
        console.log(roles);
    });

    function showLoader(loader) {
        if (loader) {
            loader.style.display = "flex";
        }
    }

    function hideLoader(loader) {
        if (loader) {
            loader.style.display = "none";
        }
    }

    async function Register() {
        Confirmar_Contraseña = document.getElementById(
            "Confirmar_Contraseña",
        ).value;

        if (Confirmar_Contraseña === v_password) {
            try {
                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Desea registrar un nuevo Usuario a SensuTrack!?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, registrar!",
                    customClass: {
                        popup: "swal-popup",
                        title: "custom-title",
                    },
                });

                // Convertir el rol seleccionado a número entero
                const id_rol = parseInt(v_rol, 10);

                // Validar que el rol es un número válido
                if (isNaN(id_rol)) {
                    alert("Por favor, seleccione un rol válido.");
                    hideLoader(registerLoader);
                    return;
                }

                if (result.isConfirmed) {
                    showLoader(registerLoader);
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
                    console.log("Respuesta del servidor:", data);
                    hideLoader(registerLoader);

                    if (data.resultado === "Usuario creado") {
                        Swal.fire({
                            title: "¡Registrado!,¡Bienvenid@ " + v_nombre + "!",
                            icon: "success",
                            customClass: {
                                popup: "swal-popup",
                                title: "custom-title",
                            },
                        });
                    } else if (data.resultado === "El usuario ya existe") {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Lo sentimos, el usuario ya existe.",
                        });
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
                hideLoader(registerLoader);
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

<NavbarAd></NavbarAd>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRO DE USUARIOS
    </div>
    <form on:submit|preventDefault={Register} class="class-form">
        <input
            class="form__input small-input"
            bind:value={v_nombre}
            placeholder="Nombre"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_apellido}
            placeholder="Apellido"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_documento}
            placeholder="Documento"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_telefono}
            placeholder="Telefono"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_email}
            placeholder="Correo Electronico"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_password}
            placeholder="Contraseña"
            type="password"
            autocomplete="off"
            required
        />

        <input
            class="form__input small-input"
            id="Confirmar_Contraseña"
            placeholder="Contraseña"
            type="password"
            autocomplete="off"
            required
        />
        <!-- Select para elegir el rol -->
        <select id="roles" class="form__input-wrapper" bind:value={v_rol}>
            <option value="" disabled selected>Seleccione el Rol:</option>
            {#each roles as rol}
                <option value={rol.id}>{rol.nombre}</option>
            {/each}
        </select>
        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>
    <!-- Loader del registro -->
    <div class="loader-container" bind:this={registerLoader}>
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

<style>
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

    /* Contenedor principal */
    .wrapper {
        width: 100%;
        max-width: 700px;
        margin: 60px auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 15px;
        border: 1px solid #e2e6e9;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        background-image: linear-gradient(135deg, #f3f4f8, #ffffff);
        position: relative;
        overflow: hidden;
    }

    /* Título */
    .title {
        font-size: 2.5em;
        font-weight: bold;
        color: #4b4f58;
        text-align: center;
        margin-bottom: 30px;
        font-family: "Roboto", sans-serif;
        letter-spacing: -0.5px;
    }

    /* Subtítulo */
    .small-title {
        font-size: 1.6em;
        color: #6c757d;
        text-align: center;
        font-family: "Roboto", sans-serif;
        margin-bottom: 20px;
    }

    /* Estilos generales del formulario */
    .class-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    /* Estilo de los inputs */
    .form__input {
        padding: 14px 18px;
        font-size: 1.05em;
        color: #495057;
        background-color: #f7f8fa;
        border: 1px solid #d0d4db;
        border-radius: 10px;
        transition: all 0.3s ease-in-out;
        position: relative;
        box-sizing: border-box;
    }

    /* Estilo de los inputs al hacer foco */
    .form__input:focus {
        outline: none;
        border-color: #17a2b8;
        background-color: #ffffff;
        box-shadow: 0 0 8px rgba(23, 162, 184, 0.5);
    }

    /* Placeholder en los inputs */
    .form__input::placeholder {
        color: #9b9b9b;
        font-size: 1.1em;
    }

    /* Campos con tamaño reducido */
    .small-input {
        font-size: 0.95em;
    }

    /* Botón de acción */
    .flip-card__btn {
        padding: 16px 24px;
        background-color: #17a2b8; /* Azul fresco */
        color: white;
        font-size: 1.15em;
        font-weight: bold;
        text-transform: uppercase;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition:
            background-color 0.3s ease-in-out,
            transform 0.3s ease;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        letter-spacing: 0.5px;
    }

    /* Hover para el botón */
    .flip-card__btn:hover {
        background-color: #138496;
        transform: translateY(-4px);
    }

    /* Estilo para el fondo del formulario */
    .wrapper {
        background-color: #fafafa;
        background-image: radial-gradient(circle, #f3f4f8, #ffffff);
    }

    /* Bordes y sombras sutiles para los inputs */
    .form__input {
        border: 1px solid #d0d4db;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    }

    /* Foco en los inputs */
    .form__input:focus {
        box-shadow: 0 0 10px rgba(23, 162, 184, 0.5);
    }

    /* Diseño responsivo */
    @media screen and (max-width: 600px) {
        .wrapper {
            padding: 20px;
        }

        .title {
            font-size: 1.8em;
        }

        .form__input {
            padding: 12px;
        }

        .flip-card__btn {
            font-size: 1em;
            padding: 14px 20px;
        }
    }
</style>
