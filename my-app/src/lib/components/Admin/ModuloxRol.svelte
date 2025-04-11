<script>
    import { onMount } from "svelte";
    let v_id_rol = "";
    let v_estado = true;
    let v_modulos = [];
    let v_roles = [];

    //ESTOS 3 DE AQUI SON PARA LA TABLA
    let todos = {};
    let todos2 = {};
    let loading = true;
    let error = null;

    // Referencias a los contenedores de los loader
    let registerLoader;

    onMount(async () => {
        const response = await fetch(
            "https://proyectomascotas.onrender.com/get_modulos/",
        );
        const data = await response.json();
        todos = data.resultado;
        console.log(todos);

        const response2 = await fetch(
            "https://proyectomascotas.onrender.com/get_roles/",
        );
        const data2 = await response2.json();
        todos2 = data2.resultado;
        console.log(todos2);
    });

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

    async function RegisterModuloxRol() {
        console.log(v_modulos);
        console.log(v_roles);
        v_id_rol = document.getElementById("roles").value;
        try {
            // Muestra el cuadro de confirmación antes de proceder con el registro
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡Desea registrar el siguiente ModuloxRol!?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, registrar!",
                customClass: {
                    popup: "swal-popup", // Clase para personalizar el popup de la alerta
                    title: "custom-title", // Clase personalizada para el título
                },
            });
            // Si el usuario confirma, continuamos con el registro
            if (result.isConfirmed) {
                showLoader(registerLoader); // Mostrar loader al comenzar el registro
                const response = await fetch(
                    "https://proyectomascotas.onrender.com/create_moduloXrol",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id_modulo: v_modulos,
                            id_rol: v_id_rol,
                            estado: v_estado,
                        }),
                    },
                );

                const data = await response.json();
                console.log(data);

                hideLoader(registerLoader); // Ocultar loader al terminar el registro

                if (response.ok) {
                    Swal.fire({
                        title: "¡Se ha registrado el ModuloxRol con exito ",
                        icon: "success",
                        customClass: {
                            popup: "swal-popup", // Clase para personalizar el popup de la alerta
                            title: "custom-title", // Clase personalizada para el título
                        },
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 3500);
                } else {
                    alert("Error en el registro");
                }
            } else {
                console.log("Registro Cancelado");
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader); // Ocultar loader si ocurre un error
            alert("Error en la solicitud: " + error);
        }
    }
</script>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRO DE MODULOSXROL
    </div>
    <form on:submit|preventDefault={RegisterModuloxRol} class="class-form">
        <span>Roles:</span>

        <!-- Selector de roles -->
        <select id="roles" class="form__input" required>
            <option value="" disabled selected>Selecciona un rol</option>
            {#each todos2 as todo}
                <option value={todo.id}>{todo.nombre}</option>
            {/each}
        </select>

        <!-- Sección de selección de módulos -->
        <fieldset class="checkbox-group">
            <legend>Módulos:</legend>
            <span>Selecciona los Modulos que tendra el Rol seleccionado:</span>
            <div class="checkbox-container">
                {#each todos as todo}
                    <label class="checkbox-label">
                        <input
                            type="checkbox"
                            id="modulo-{todo.id}"
                            name="modulo"
                            value={todo.id}
                            bind:group={v_modulos}
                        />
                        {todo.nombre}
                    </label>
                {/each}
            </div>
        </fieldset>

        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>

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
    /* ESTILOS PARA EL CHECKBOX */
    .checkbox-group {
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        margin-top: 15px;
        background: #f9f9f9;
    }

    .checkbox-group legend {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 1.1em;
    }

    .checkbox-container {
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(150px, 1fr)
        ); /* Múltiples columnas */
        gap: 10px;
        margin-top: 10px;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95em;
        cursor: pointer;
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
