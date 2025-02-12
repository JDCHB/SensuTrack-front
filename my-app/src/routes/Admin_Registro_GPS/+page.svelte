<script>
    import NavbarAD from "$lib/components/NavbarAD.svelte";
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

<NavbarAD></NavbarAD>
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
            <label for="id_mascota">Seleccione el correcto: </label>
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

    {#if mensaje}
        <p class="success-message">{mensaje}</p>
    {/if}
    {#if error}
        <p class="error-message">{error}</p>
    {/if}
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
