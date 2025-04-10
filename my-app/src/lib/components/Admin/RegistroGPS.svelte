<script>
    import { onMount, createEventDispatcher } from "svelte";
    let numero_serie = "";
    let v_nivel_bateria = 100;
    let id_ciego_vinculado = "";
    let v_estado = true;
    let mensaje = null;
    let error = null;

    //ESTOS 3 DE AQUI SON PARA LA TABLA
    let todos = {};
    let todos2 = {};

    onMount(async () => {
        const response2 = await fetch(
            "https://proyectomascotas.onrender.com/get_discapacitadosV_SIN_GPS/",
        );
        const data2 = await response2.json();
        todos2 = data2.resultado;
        console.log(todos2);
    });

    const dispatch = createEventDispatcher();

    // Función para manejar el envío del formulario
    async function RegistrarGPS() {
        try {
            dispatch("showLoader"); // 🔥 emitir evento personalizado
            const response = await fetch(
                "https://proyectomascotas.onrender.com/create_gps",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        numero_serie: numero_serie,
                        nivel_bateria: v_nivel_bateria,
                        id_ciego_vinculado: parseInt(id_ciego_vinculado),
                        estado: v_estado,
                    }),
                },
            );

            const data = await response.json();
            console.log(data);
            dispatch("hideLoader"); // 🔥 cuando termina
            if (response.ok) {
                mensaje = data.resultado; // Mensaje exitoso
                error = null; // Limpia el error si lo hubo
                numero_serie = "";
                id_ciego_vinculado = "";
                Swal.fire({
                    title: "El GPS ha sido Registrado Exitosamente!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                swalWithBootstrapButtons.fire({
                    title: "Parece que ha ocurrido un error",
                    text: "Revise que todo este correcto porfavor :]",
                    icon: "error",
                });
                throw new Error(data.detail || "Ocurrió un error");
            }
        } catch (e) {
            error = e.message;
            dispatch("hideLoader"); // 🔥 cuando termina
            mensaje = null; // Limpia el mensaje si hubo un error
        }
    }
</script>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRAR GPS
    </div>
    <form on:submit|preventDefault={RegistrarGPS} class="class-form">
        <div class="form-group">
            <label for="numero_serie">Número de Serie:</label>
            <span>Registre el Número de Serie del GPS:</span>
            <input
                id="numero_serie"
                type="text"
                bind:value={numero_serie}
                class="form__input"
                placeholder="Ingrese el Serial del GPS"
                required
            />
        </div>
        <span>Usuarios Discapacitados Resgistrados:</span>
        <!-- Selector de usuarios discapacitados -->
        <select
            id="ciegos"
            class="form__input"
            bind:value={id_ciego_vinculado}
            required
        >
            <option value="" disabled selected
                >Selecciona el Discapacitado que tendra el GPS</option
            >
            {#each todos2 as todo}
                <option value={todo.id}>{todo.nombre}</option>
            {/each}
        </select>

        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>
</div>

<style>
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
        padding: 12px 15px;
        font-size: 1em;
        width: 100%;
        border: 1px solid #ced4da;
        border-radius: 8px;
        background: #f8f9fa;
        transition: 0.3s ease-in-out;
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
