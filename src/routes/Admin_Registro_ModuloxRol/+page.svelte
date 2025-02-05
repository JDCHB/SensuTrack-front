<script>
    import NavbarAD from "../../lib/components/NavbarAD.svelte";
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
        v_id_modulo = document.getElementById("modulo").value;
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

    //DE AQUI PARA ABAJO SON SCRIPTS DE LAS TABLAS

    onMount(async () => {
        try {
            console.log("2");
            const response = await fetch(
                "https://proyectomascotas.onrender.com/get_modulos",
            );
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            console.log(todos);

            setTimeout(() => {
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    var id = 1;
    var a = "";

    async function Ocultar() {
        const v_editar = document.getElementById("nav-listado");
        v_editar.setAttribute("class", "fade");

        let mostrar = document.getElementById("MostrarModulos");
        mostrar.removeAttribute("class");

        location.reload();
    }

    var vid = 1;
    async function editar(id, a) {
        console.log("Editando el modulo " + a);
        const v_editar = document.getElementById("nav-listado");
        v_editar.removeAttribute("class");
        console.log(v_editar);
        vid = id;
        console.log(Number.isInteger(vid));

        console.log(vid);
        let ocultar = document.getElementById("MostrarModulos");
        ocultar.setAttribute("class", "fade");
        console.log(ocultar);

        const cambiar = ocultar.parentElement;
        console.log(cambiar);

        cambiar.insertBefore(v_editar, ocultar);
        console.log("NO Entra al try de buscar");

        try {
            console.log("Entra al try de buscar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_modulo/${vid}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const data = await response.json();
            console.log(response);
            console.log(data);
            console.log("Buscando el Modulo seleccionado");
            todos = data.nombre;
            console.log(todos);
            document.getElementById("nombre").value = data.nombre;
            document.getElementById("descripcion").value = data.descripcion;
            console.log("verificando el estado: " + data.estado);
            const estado_v = data.estado ? "1" : "0"; //condicion ? valorSiVerdadero : valorSiFalso
            document.getElementById("estado").value = estado_v;

            const v_edit_nombre = document.getElementById("nombre");
            v_edit_nombre.removeAttribute("readonly");
            v_edit_nombre.focus();

            const v_edit_descripcion = document.getElementById("descripcion");
            v_edit_descripcion.removeAttribute("readonly");

            const v_edit_estado = document.getElementById("estado");
            v_edit_estado.removeAttribute("readonly");
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function actualizar() {
        console.log(vid);
        let v_nombre = document.getElementById("nombre").value;
        let v_descripcion = document.getElementById("descripcion").value;
        let vestado = document.getElementById("estado").value;

        console.log("ID DE ESTADO ENVIADO A LA BASE DE DATOS ES " + vestado);

        try {
            console.log("Entra al try de actualzar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_modulo/${vid}`, // Incluye el user_id en la URL
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: v_nombre,
                        descripcion: v_descripcion,
                        estado: vestado,
                    }),
                },
            );
            console.log("Actualizado");

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
                background: "#00bdff",
                title: "Modulo actualizado exitosamente",
            });

            setTimeout(() => {
                const v_editar = document.getElementById("nav-listado");
                v_editar.setAttribute("class", "fade");

                let ocultar = document.getElementById("MostrarModulos");
                ocultar.removeAttribute("class");

                const cambiar = v_editar.parentElement;
                cambiar.insertBefore(ocultar, v_editar);
                location.reload();
            }, 3000);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    /*const serviceID = "service_acpug5r";
    const templateID = "template_bloqueouser";
    const apikey = "3bmpPn1S0SLhgotWj";*/

    async function desactivar(id /*nombre, email*/) {
        let vestado = 0;
        let vid = id;

        // Convertir el valor a booleano
        let estadoBooleano = vestado !== 0;
        //console.log("Correo" + email);
        try {
            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_estado_modulo/${vid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estado: estadoBooleano, // Envía el valor booleano
                    }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "error",
                    iconColor: "white",
                    color: "white",
                    background: "#ff4e4e",
                    title: "El Modulo a sido desactivado de manera exitosa",
                });
                //sendEmail()

                /*function sendEmail() {
                    emailjs.init(apikey);
                    emailjs
                        .send(serviceID, templateID, {
                            nombre: nombre,
                            email: email,
                        })
                        .then((result) => {
                            console.log("Correo enviado con exito");
                        })
                        .catch((error) => {
                            console.log(
                                "Error al enviar el correo:",
                                error.text,
                            );
                        });
                }*/

                setTimeout(() => {
                    location.reload();
                }, 3500);
            } else {
                alert(
                    "Error al desactivar: " + data.message ||
                        "Error desconocido",
                );
            }
        } catch (e) {
            alert("Error en la solicitud: " + e.message);
        }
    }

    async function activar(id) {
        let vestado = 1;
        let vid = id;

        // Convertir el valor a booleano
        let estadoBooleano = vestado === 1;

        try {
            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_estado_modulo/${vid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estado: estadoBooleano, // Envía el valor booleano
                    }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
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
                    iconColor: "#000000",
                    color: "black",
                    background: "#76fa78",
                    title: "El Modulo se ha activado de manera exitosa",
                });

                setTimeout(() => {
                    location.reload();
                }, 3500); //en milisegundos
            } else {
                alert(
                    "Error al Activar: " + data.message || "Error desconocido",
                );
            }
        } catch (e) {
            alert("Error en la solicitud: " + e.message);
        }
    }
</script>

<NavbarAD></NavbarAD>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRO DE MODULOS
    </div>
    <form on:submit|preventDefault={RegisterModuloxRol} class="class-form">
        <span>MODULOSXUSUARIO:</span>
        <select id="roles" class="form__input" required>
            <option value="" disabled selected>Selecciona un rol</option>
            {#each todos2 as todo}
                <option value={todo.id}>{todo.nombre}</option>
            {/each}
        </select>
        <p>SELECCIONE LOS MODULOS:</p>
        {#each todos as todo}
            <label for="">
                <br /><input
                    type="checkbox"
                    id="modulo"
                    name="modulo"
                    value={todo.id}
                    bind:group={v_modulos}
                />
                {todo.nombre}
            </label>
        {/each}
        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>
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

<div id="MostrarModulos">
    <div class="container py-4">
        <h2 class="mb-4">Lista de Modulos</h2>
        {#if loading}
            <!---->
            <div class="row g-2 justify-content-center">
                <p
                    class="text-center col-lg-2 col-md-2 col-sm-2 col-12 col-xl-2"
                >
                    Cargando datos...
                </p>
                <div
                    class="spinner-border col-lg-4 col-md-4 col-sm-4 col-12 col-xl-4"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else if error}
            <p class="text-red-500">Error: {error}</p>
        {:else}
            <div class="overflow-x-auto">
                <table
                    class="min-w-full bg-white border border-gray-300"
                    id="myTable"
                >
                    <thead>
                        <tr>
                            <th class="px-4 py-2 border">Nombre</th>
                            <th class="px-4 py-2 border">Descripcion</th>
                            <th class="px-4 py-2 border">Estado</th>
                            <th class="px-4 py-2 border">Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each todos as todo}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-2 border">{todo.nombre}</td>
                                <td class="px-4 py-2 border"
                                    >{todo.descripcion}</td
                                >
                                <td class="px-4 py-2 border">
                                    <span
                                        class={todo.estado
                                            ? "text-green-600"
                                            : "text-red-600"}
                                    >
                                        {todo.estado ? "Activo" : "Desactivado"}
                                    </span>
                                </td>
                                <td class="px-4 py-2 border">
                                    <button
                                        class="btn btn-info"
                                        on:click={() =>
                                            editar(todo.id, todo.nombre)}
                                        >Editar</button
                                    >
                                    {#if todo.estado}
                                        <!-- Mostrar botón "Desactivar" si el usuario está activo -->
                                        <button
                                            class="btn btn-danger"
                                            on:click={() =>
                                                desactivar(
                                                    todo.id,
                                                    /*todo.nombre,
                                                    todo.email,*/
                                                )}
                                        >
                                            Desactivar
                                        </button>
                                    {:else}
                                        <!-- Mostrar botón "Activar" si el usuario está desactivado -->
                                        <button
                                            class="btn btn-success"
                                            on:click={() => activar(todo.id)}
                                        >
                                            Activar
                                        </button>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</div>
<div
    class="fade"
    id="nav-listado"
    role="tabpanel"
    aria-labelledby="nav-listado-tab"
>
    <div class="container text-center">
        <p class="text-orange"></p>
    </div>
    <div class="card border-dark shadow" style="width: 60%; margin-left: 20%;">
        <div class="card-header row g-2">
            <h5 class="card-title col-lg-11"><b>Editando Modulo</b></h5>
            <button
                class="btn btn-close col-lg-1"
                aria-label="Cerrar edición de usuario"
                on:click={() => Ocultar()}
            ></button>
        </div>
        <div class="card-body" style="margin-left: 10%;">
            <div class="row">
                <div class="col-lg-2">
                    <p class="card-text"><b>Nombre:</b></p>
                </div>

                <div class="col-lg-10">
                    <input
                        type="text"
                        placeholder="Nombre del Modulo"
                        id="nombre"
                        maxlength="100"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>Descripcion:</b></p>
                </div>

                <div class="col-lg-10">
                    <input
                        type="text"
                        placeholder="Descripcion del Modulo"
                        id="descripcion"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>Estado:</b></p>
                </div>
                <div class="col-lg-10">
                    <select
                        id="estado"
                        name="opciones"
                        style="border: none; width: 55%;"
                    >
                        <option value="1">Activar</option>
                        <option value="0">Desactivar</option>
                    </select>
                </div>
            </div>

            <div class="row" style="margin-top: 4%;">
                <div class="col-lg-9">
                    ¡Al terminar de editar, darle click en actualizar para
                    guardar los cambios!
                </div>
                <div class="col-lg-3 text-end">
                    <button on:click={actualizar} class="btn btn-outline-info"
                        ><b>Actualizar</b></button
                    >
                </div>
                <div id="estado" class="col-lg-10"></div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Estilos para Sweet Alert */
    /* Fondo blanco para la alerta SweetAlert */
    .swal-popup {
        background-color: white !important;
    }

    /* Fondo blanco para la alerta de éxito */
    .swal-popup-success {
        background-color: white !important;
    }
    /* Cambiar el color del título a negro */
    .custom-title {
        color: black !important; /* Asegúrate de que el color se aplique */
        text-align: center; /* Centrar el título */
    }

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
