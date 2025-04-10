<script>
    import { onMount } from "svelte";

    let todos = {};
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            console.log("2");
            const response = await fetch(
                "https://proyectomascotas.onrender.com/get_discapacitadosVCOMPLETOS",
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

        let mostrar = document.getElementById("MostrarDiscapacitado");
        mostrar.removeAttribute("class");
        location.reload();
    }

    var vid = 1;
    async function editar(id, a) {
        console.log("Editando a " + a);
        const v_editar = document.getElementById("nav-listado");
        v_editar.removeAttribute("class");
        console.log(v_editar);
        vid = id;
        console.log(Number.isInteger(vid));

        console.log(vid);
        let ocultar = document.getElementById("MostrarDiscapacitado");
        ocultar.setAttribute("class", "fade");
        console.log(ocultar);

        const cambiar = ocultar.parentElement;
        console.log(cambiar);

        cambiar.insertBefore(v_editar, ocultar);
        console.log("NO Entra al try de buscar");

        try {
            console.log("Entra al try de buscar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_discapacitadoV/${vid}`,
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
            console.log("Buscando al usuario seleccionado");
            todos = data.nombre;
            console.log(todos);
            document.getElementById("nombres").value = data.nombre;

            document.getElementById("genero").value =
                data.id_genero_discapacitado;

            document.getElementById("tipo_ceguera").value =
                data.id_tipo_ceguera;

            console.log("verificando el estado: " + data.estado);

            const estado_v = data.estado ? "1" : "0"; //condicion ? valorSiVerdadero : valorSiFalso

            document.getElementById("estado").value = estado_v;

            const v_edit_nombre = document.getElementById("nombres");
            v_edit_nombre.removeAttribute("readonly");
            v_edit_nombre.focus();

            const v_edit_genero = document.getElementById("genero");
            v_edit_genero.removeAttribute("readonly");

            const v_edit_tipo_ceguera = document.getElementById("tipo_ceguera");
            v_edit_tipo_ceguera.removeAttribute("readonly");

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
        let vnombre = document.getElementById("nombres").value;
        let vgenero = document.getElementById("genero").value;
        let vtipoceguera = document.getElementById("tipo_ceguera").value;
        let vestado = document.getElementById("estado").value;

        console.log("ID DE ESTADO ENVIADO A LA BASE DE DATOS ES " + vestado);

        try {
            console.log("Entra al try de actualzar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_user/${vid}`, // Incluye el user_id en la URL
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: vnombre,
                        genero: vgenero,
                        tipo_ceguera: vtipoceguera,
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
                title: "Discapacitado actualizado con exito",
            });

            setTimeout(() => {
                const v_editar = document.getElementById("nav-listado");
                v_editar.setAttribute("class", "fade");

                let ocultar = document.getElementById("MostrarDiscapacitado");
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
        let estadoBooleano = vestado !== 0;
        //console.log("Correo" + email);
        try {
            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_estado_discapacitado/${vid}`,
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
                    title: "El Discapacitado a sido desactivado de manera exitosa",
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
                `https://proyectomascotas.onrender.com/update_estado_discapacitado/${vid}`,
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
                    title: "El Discapacitado se ha activado de manera exitosa",
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

<div id="MostrarDiscapacitado">
    <div class="container py-4 bg-light rounded shadow">
        <h2
            class="text-center mb-4 pb-2 border-bottom border-3 border-primary fw-bold"
        >
            <i class="bi bi-people-fill me-2"></i>Lista de discapacitados
        </h2>
        {#if loading}
            <div class="row justify-content-center text-center">
                <div class="col-12 mb-2">Cargando datos...</div>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else if error}
            <div class="alert alert-danger text-center">{error}</div>
        {:else}
            <div class="table-responsive">
                <table
                    class="table table-hover table-bordered align-middle"
                    id="myTable"
                >
                    <thead class="thead-light text-center">
                        <tr>
                            <th class="px-4 py-2 border">Nombre</th>
                            <th class="px-4 py-2 border">Genero</th>
                            <th class="px-4 py-2 border">Tipo_Ceguera</th>
                            <th class="px-4 py-2 border">Estado</th>
                            <th class="px-4 py-2 border">Opcion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each todos as todo}
                            <tr>
                                <td>{todo.nombre}</td>
                                <td>{todo.genero}</td>
                                <td>{todo.tipo_ceguera}</td>
                                <td class="text-center">
                                    <span
                                        class="badge {todo.estado
                                            ? 'bg-success'
                                            : 'bg-danger'}"
                                    >
                                        {todo.estado ? "Activo" : "Desactivado"}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <div
                                        class="d-flex flex-wrap gap-1 justify-content-center"
                                    >
                                        <button
                                            class="btn btn-sm btn-outline-primary"
                                            on:click={() =>
                                                editar(todo.id, todo.nombre)}
                                        >
                                            <i class="bi bi-pencil"></i>
                                            <span class="d-none d-md-inline"
                                                >Editar</span
                                            >
                                        </button>
                                        {#if todo.estado}
                                            <button
                                                class="btn btn-sm btn-outline-danger"
                                                on:click={() =>
                                                    desactivar(todo.id)}
                                            >
                                                <i class="bi bi-lock"></i>
                                                <span class="d-none d-md-inline"
                                                    >Desactivar</span
                                                >
                                            </button>
                                        {:else}
                                            <button
                                                class="btn btn-sm btn-outline-success"
                                                on:click={() =>
                                                    activar(todo.id)}
                                            >
                                                <i class="bi bi-unlock"></i>
                                                <span class="d-none d-md-inline"
                                                    >Activar</span
                                                >
                                            </button>
                                        {/if}
                                    </div>
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
        <p class="text-warning"></p>
    </div>

    <div
        class="card border-dark shadow-lg"
        style="width: 50%; margin: 5% auto;"
    >
        <div
            class="card-header d-flex justify-content-between align-items-center"
        >
            <h5 class="card-title mb-0"><b>Editando Discapacitado</b></h5>
            <button
                class="btn btn-close"
                aria-label="Cerrar edición de usuario"
                on:click={() => Ocultar()}
            ></button>
        </div>

        <div class="card-body">
            <!-- Nombre -->
            <div class="mb-3 row">
                <label for="nombres" class="col-lg-3 col-form-label"
                    ><b>Nombre:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="nombres"
                        class="form-control"
                        placeholder="Nombres"
                        maxlength="100"
                        readonly
                    />
                </div>
            </div>

            <!-- Género -->
            <div class="mb-3 row">
                <label for="genero" class="col-lg-3 col-form-label"
                    ><b>Género:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="genero"
                        class="form-control"
                        placeholder="Género"
                        readonly
                    />
                </div>
            </div>

            <!-- Tipo de Ceguera -->
            <div class="mb-3 row">
                <label for="tipo_ceguera" class="col-lg-3 col-form-label"
                    ><b>Tipo de Ceguera:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="tipo_ceguera"
                        class="form-control"
                        placeholder="Tipo de Ceguera"
                        readonly
                    />
                </div>
            </div>

            <!-- Estado -->
            <div class="mb-3 row">
                <label for="estado" class="col-lg-3 col-form-label"
                    ><b>Estado:</b></label
                >
                <div class="col-lg-9">
                    <select id="estado" class="form-control">
                        <option value="1">Activar</option>
                        <option value="0">Desactivar</option>
                    </select>
                </div>
            </div>

            <!-- Notificación y botón de actualización -->
            <div class="d-flex justify-content-between align-items-center">
                <div class="col-lg-9 text-muted">
                    ¡Al terminar de editar, haga clic en actualizar para guardar
                    los cambios!
                </div>
                <div class="col-lg-3 text-end">
                    <button on:click={actualizar} class="btn btn-outline-info">
                        <b>Actualizar</b>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
