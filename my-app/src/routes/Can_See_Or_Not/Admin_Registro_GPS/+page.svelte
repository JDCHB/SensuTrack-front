<script>
    import NavBarCanSeeOrNot from "$lib/components/NavBarCanSeeOrNot.svelte";
    import { onMount } from "svelte";
    let numero_serie = "";
    let id_mascota_vinculada = "";
    let v_nivel_bateria = 100;
    let v_estado = true;
    let mensaje = null;
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

    // Función para manejar el envío del formulario
    async function registrarCollar() {
        try {
            showLoader(registerLoader);
            const response = await fetch(
                "https://proyectomascotas.onrender.com/create_collar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        numero_serie: numero_serie,
                        id_mascota_vinculada: parseInt(id_mascota_vinculada),
                        nivel_bateria: v_nivel_bateria,
                        nivel_bateria: v_nivel_bateria,
                        estado: v_estado,
                    }),
                },
            );

            const data = await response.json();
            hideLoader(registerLoader);
            if (response.ok) {
                mensaje = data.resultado; // Mensaje exitoso
                error = null; // Limpia el error si lo hubo
                numero_serie = "";
                id_mascota_vinculada = "";
                Swal.fire({
                    title: "El Collar ha sido Registrado Exitosamente!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                swalWithBootstrapButtons.fire({
                    title: "Parece que ha ocurrido un error",
                    text: "Revise que todo este correcto porfavor :(",
                    icon: "error",
                });
                throw new Error(data.detail || "Ocurrió un error");
            }
        } catch (e) {
            mensaje = null; // Limpia el mensaje si hubo un error
            error = e.message;
        }
    }
</script>

<NavBarCanSeeOrNot></NavBarCanSeeOrNot>
<div class="main">
    <h2>Registrar Collar GPS</h2>
    <form on:submit|preventDefault={registrarCollar}>
        <div class="form-group">
            <label for="numero_serie">Número de Serie:</label>
            <input
                id="numero_serie"
                type="text"
                bind:value={numero_serie}
                placeholder="Ingrese el Serial del CollarGPS"
                required
            />
        </div>

        <div class="form-group">
            <label for="id_mascota">ID de la Mascota Vinculada:</label>
            <input
                id="id_mascota"
                type="text"
                bind:value={id_mascota_vinculada}
                placeholder="Ingrese el ID de la mascota"
                required
            />
        </div>

        <button type="submit">Registrar Collar</button>
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

    {#if mensaje}
        <p class="success-message">{mensaje}</p>
    {/if}
    {#if error}
        <p class="error-message">{error}</p>
    {/if}
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
    /* Estilos generales */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .main {
        max-width: 600px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 1px solid #e1e5ea;
    }

    h2 {
        text-align: center;
        color: #2a3d66;
        font-size: 24px;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    label {
        font-size: 14px;
        font-weight: 600;
        color: #2a3d66;
    }

    input {
        padding: 12px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 6px;
        background-color: #f9f9f9;
        transition: border-color 0.3s;
    }

    input:focus {
        border-color: #4a90e2;
        outline: none;
        background-color: #fff;
    }

    button {
        padding: 12px;
        font-size: 16px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #357ab8;
    }

    .success-message {
        color: #28a745;
        font-size: 16px;
        text-align: center;
        margin-top: 15px;
    }

    .error-message {
        color: #dc3545;
        font-size: 16px;
        text-align: center;
        margin-top: 15px;
    }
</style>
