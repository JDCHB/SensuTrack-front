<script>
    import { onMount } from "svelte";

    let todos = {};
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            console.log("2");
            const response = await fetch(
                "https://proyectomascotas.onrender.com/get_users",
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

        let mostrar = document.getElementById("Mostrarusuario");
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
        let ocultar = document.getElementById("Mostrarusuario");
        ocultar.setAttribute("class", "fade");
        console.log(ocultar);

        const cambiar = ocultar.parentElement;
        console.log(cambiar);

        cambiar.insertBefore(v_editar, ocultar);
        console.log("NO Entra al try de buscar");

        try {
            console.log("Entra al try de buscar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_user/${vid}`,
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
            todos = data.apellido;
            console.log(todos);
            document.getElementById("nombres").value = data.nombre;
            document.getElementById("apellidos").value = data.apellido;
            document.getElementById("documento").value = data.documento;
            document.getElementById("telefono").value = data.telefono;
            document.getElementById("correo").value = data.email;
            console.log("verificando el estado: " + data.estado);
            const estado_v = data.estado ? "1" : "0"; //condicion ? valorSiVerdadero : valorSiFalso
            document.getElementById("estado").value = estado_v;

            const v_edit_nombre = document.getElementById("nombres");
            v_edit_nombre.removeAttribute("readonly");
            v_edit_nombre.focus();

            const v_edit_apellido = document.getElementById("apellidos");
            v_edit_apellido.removeAttribute("readonly");

            const v_edit_documento = document.getElementById("documento");
            v_edit_documento.removeAttribute("readonly");

            const v_edit_telefono = document.getElementById("telefono");
            v_edit_telefono.removeAttribute("readonly");

            const v_edit_usuario = document.getElementById("correo");
            v_edit_usuario.removeAttribute("readonly");

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
        let vapellidos = document.getElementById("apellidos").value;
        let vdocumento = document.getElementById("documento").value;
        let vtelefono = document.getElementById("telefono").value;
        let vcorreo = document.getElementById("correo").value;
        let vestado = document.getElementById("estado").value;

        // Convertir el valor de "estado" a booleano
        vestado = vestado === "1" ? true : false;

        console.log("ID DE ESTADO ENVIADO A LA BASE DE DATOS ES " + vestado);

        try {
            console.log("Entra al try de actualzar");

            const response = await fetch(
                `https://proyectomascotas.onrender.com/update_user_admin/${vid}`, // Incluye el user_id en la URL
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: vcorreo,
                        nombre: vnombre,
                        apellido: vapellidos,
                        documento: vdocumento,
                        telefono: vtelefono,
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
                title: "usuario actualizado con exito",
            });

            setTimeout(() => {
                const v_editar = document.getElementById("nav-listado");
                v_editar.setAttribute("class", "fade");

                let ocultar = document.getElementById("Mostrarusuario");
                ocultar.removeAttribute("class");

                const cambiar = v_editar.parentElement;
                cambiar.insertBefore(ocultar, v_editar);
                location.reload();
            }, 3000);
        } catch (e) {
            console.error("Error al actualizar el usuario:", e);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: e.message,
            });
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
                `https://proyectomascotas.onrender.com/update_estado_user/${vid}`,
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
                    title: "El Usuario a sido desactivado de manera exitosa",
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
                `https://proyectomascotas.onrender.com/update_estado_user/${vid}`,
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
                    title: "El usuario se ha activado de manera exitosa",
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

<div id="Mostrarusuario">
    <div class="container py-4 bg-light rounded shadow">
        <h2
            class="text-center mb-4 pb-2 border-bottom border-3 border-primary fw-bold"
        >
            <i class="bi bi-people-fill me-2"></i>USUARIOS
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
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Documento</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each todos as todo}
                            <tr>
                                <td>{todo.email}</td>
                                <td>{todo.nombre}</td>
                                <td>{todo.apellido}</td>
                                <td>{todo.documento}</td>
                                <td>{todo.telefono}</td>
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
                                            on:click={() => editar(todo.id)}
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

<!-- Modal de Edición -->
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
            <h5 class="card-title mb-0"><b>Editando Usuario</b></h5>
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

            <!-- Apellido -->
            <div class="mb-3 row">
                <label for="apellidos" class="col-lg-3 col-form-label"
                    ><b>Apellido:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="apellidos"
                        class="form-control"
                        placeholder="Apellidos"
                        readonly
                    />
                </div>
            </div>

            <!-- Documento -->
            <div class="mb-3 row">
                <label for="documento" class="col-lg-3 col-form-label"
                    ><b>Documento:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="documento"
                        class="form-control"
                        placeholder="Documento de identidad"
                        readonly
                    />
                </div>
            </div>

            <!-- Teléfono -->
            <div class="mb-3 row">
                <label for="telefono" class="col-lg-3 col-form-label"
                    ><b>Teléfono:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="telefono"
                        class="form-control"
                        placeholder="Teléfono"
                        maxlength="20"
                        readonly
                    />
                </div>
            </div>

            <!-- Correo -->
            <div class="mb-3 row">
                <label for="correo" class="col-lg-3 col-form-label"
                    ><b>Correo:</b></label
                >
                <div class="col-lg-9">
                    <input
                        type="text"
                        id="correo"
                        class="form-control"
                        placeholder="Correo electrónico"
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
