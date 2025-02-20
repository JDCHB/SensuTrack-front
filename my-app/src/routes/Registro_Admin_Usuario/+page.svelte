<script>
    import NavbarAd from "../../lib/components/NavbarAD.svelte";

    let v_password = "";
    let v_nombre = "";
    let v_apellido = "";
    let v_documento = "";
    let v_telefono = "";
    let v_email = "";
    let v_rol = "";
    let v_estado = true;
    let error = null;

    let registerLoader;

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
                hideLoader(registerLoader);

                if (response.ok) {
                    Swal.fire({
                        title: "¡Registrado!,¡Bienvenid@ " + v_nombre + "!",
                        icon: "success",
                        customClass: {
                            popup: "swal-popup",
                            title: "custom-title",
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
            hideLoader(registerLoader);
            alert("Error en la solicitud: " + error);
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
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_apellido}
            placeholder="Apellido"
            type="text"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_documento}
            placeholder="Documento"
            type="text"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_telefono}
            placeholder="Telefono"
            type="text"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_email}
            placeholder="Correo Electronico"
            type="text"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_password}
            placeholder="Contraseña"
            type="password"
            required
        />
        <div class="form__input-wrapper">
            <label for="role">Seleccione el Rol:</label>
            <select id="role" class="form__input" bind:value={v_rol} required>
                <option value="" disabled selected>Selecciona un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
                <option value="3">Super Admin</option>
            </select>
        </div>
        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>
    <!-- Loader del registro -->
    <div class="loader-container" bind:this={registerLoader}>
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

<style>
    /* Estilos para el loader de la cara de un perrito */

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

    /* Efecto al hacer clic */
    .flip-card__btn:active {
        transform: translateY(2px);
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
