<script>
    import Navbaradmin from "../../lib/components/NavbarAD.svelte";
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
                    title: "usuario desactivado con exito",
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
                    title: "usuario activado con exito",
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

<Navbaradmin></Navbaradmin>

<div id="Mostrarusuario">
    <div class="container py-4">
        <h2 class="mb-4">Lista de usuarios</h2>
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
                            <th class="px-4 py-2 border">Usuario</th>
                            <th class="px-4 py-2 border">Nombre</th>
                            <th class="px-4 py-2 border">Apellido</th>
                            <th class="px-4 py-2 border">Documento</th>
                            <th class="px-4 py-2 border">Telefono</th>
                            <th class="px-4 py-2 border">Estado</th>
                            <th class="px-4 py-2 border">Opcion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each todos as todo}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-2 border">{todo.email}</td>
                                <td class="px-4 py-2 border">{todo.nombre}</td>
                                <td class="px-4 py-2 border">{todo.apellido}</td
                                >
                                <td class="px-4 py-2 border"
                                    >{todo.documento}</td
                                >
                                <td class="px-4 py-2 border">{todo.telefono}</td
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
            <h5 class="card-title col-lg-11"><b>Editando Usuario</b></h5>
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
                        placeholder="Nombres"
                        id="nombres"
                        maxlength="100"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>Apellido:</b></p>
                </div>

                <div class="col-lg-10">
                    <input
                        type="text"
                        placeholder="Apellidos"
                        id="apellidos"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>documento:</b></p>
                </div>
                <div class="col-lg-10">
                    <input
                        type="text"
                        id="documento"
                        placeholder="Documento de identidad"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>Telefono:</b></p>
                </div>
                <div class="col-lg-10">
                    <input
                        type="text"
                        id="telefono"
                        placeholder="Telefono"
                        maxlength="20"
                        style="border: none; width: 55%;"
                        readonly
                    />
                </div>
            </div>

            <div class="row pt-3">
                <div class="col-lg-2">
                    <p class="card-text"><b>Correo:</b></p>
                </div>
                <div class="col-lg-10">
                    <input
                        type="text"
                        placeholder="Correo electronico"
                        id="correo"
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
