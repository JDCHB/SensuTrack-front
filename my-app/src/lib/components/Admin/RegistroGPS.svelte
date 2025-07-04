<script>
    import { onMount } from "svelte";

    let todos = {};
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            console.log("2");
            const response = await fetch(
                "https://proyectomascotas.onrender.com/get_discapacitadosV_SIN_VERIFICAR",
            );
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            todos = data.resultado;
            console.log(todos);

            setTimeout(() => {
                globalThis.$("#myTable").DataTable();
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    const serviceID = "service_r884bhj";
    const templateID = "template_w6dr1lr"; //REGISTRO RECHAZADO
    const apikey = "_i5SKyKzZVH6mFnaE";

    async function rechazar(
        id,
        nombreDiscapacitado,
        Usuario_Cuidador,
        Nombre_Cuidador,
        documento,
    ) {
        const confirmar = await Swal.fire({
            title: `¿Rechazar solicitud de ${Nombre_Cuidador}?`,
            text: "Esta acción eliminará al discapacitado no verificado y notificará al cuidador.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, rechazar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmar.isConfirmed) return;

        try {
            Swal.fire({
                title: "Procesando...",
                text: "Rechazando solicitud y enviando notificación",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const res = await fetch(
                `https://proyectomascotas.onrender.com/delete_discapacitadoV/${id}`,
                { method: "DELETE" },
            );
            if (!res.ok) throw new Error("No se pudo rechazar la solicitud");

            await emailjs.send(
                serviceID,
                templateID,
                {
                    usuario_cuidador: Nombre_Cuidador,
                    nombre_discapacitado: nombreDiscapacitado,
                    email: Usuario_Cuidador,
                    documento_discapacitado: documento,
                },
                apikey,
            );

            Swal.fire({
                icon: "success",
                title: "Solicitud rechazada",
                text: `Se notificó al cuidador ${Nombre_Cuidador}.`,
                confirmButtonColor: "#198754",
                confirmButtonText: "Aceptar",
            }).then(() => {
                location.reload();
            });
        } catch (err) {
            console.error("Error al rechazar:", err);
            Swal.fire({
                icon: "error",
                title: "Error al rechazar",
                text: err.message,
                confirmButtonColor: "#d33",
            });
        }
    }

    const serviceID2 = "service_sn9rsbj";
    const templateID2 = "template_wj891mo"; //REGISTRO ACEPTADO
    const apikey2 = "0HqykyND9qAnGl1Va";

    async function aceptar(
        id,
        nombreDiscapacitado,
        Usuario_Cuidador,
        Nombre_Cuidador,
        documento,
    ) {
        const confirmar = await Swal.fire({
            title: `¿Aceptar solicitud de ${Nombre_Cuidador}?`,
            text: "Se registrará el discapacitado y se enviará un correo con sus credenciales.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, aceptar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmar.isConfirmed) return;

        try {
            Swal.fire({
                title: "Procesando...",
                text: "Registrando y enviando credenciales al cuidador",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const usuarioDiscapacitado = nombreDiscapacitado
                .toLowerCase()
                .replace(/\s+/g, "_");
            const passwordDiscapacitado = documento.slice(-4);

            const res = await fetch(
                "https://proyectomascotas.onrender.com/create_gps",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usuario: usuarioDiscapacitado,
                        password: passwordDiscapacitado,
                        id_ciego_vinculado: id,
                        estado: true,
                    }),
                },
            );

            if (!res.ok)
                throw new Error(
                    "No se pudo registrar el GPS del discapacitado",
                );

            await emailjs.send(
                serviceID2,
                templateID2,
                {
                    email: Usuario_Cuidador,
                    usuario_cuidador: Nombre_Cuidador,
                    nombre_discapacitado: nombreDiscapacitado,
                    documento_discapacitado: documento,
                    Usuario_Discapacitado: usuarioDiscapacitado,
                    Password_Discapacitado: passwordDiscapacitado,
                },
                apikey2,
            );

            Swal.fire({
                icon: "success",
                title: "Solicitud aceptada",
                text: `Se enviaron las credenciales al cuidador ${Nombre_Cuidador}.`,
                confirmButtonColor: "#198754",
                confirmButtonText: "Aceptar",
            }).then(() => {
                location.reload();
            });
        } catch (err) {
            console.error("Error al aceptar:", err);
            Swal.fire({
                icon: "error",
                title: "Error al aceptar",
                text: err.message,
                confirmButtonColor: "#d33",
            });
        }
    }

    let pdfUrl = null;

    function mostrarModalPDF(url) {
        pdfUrl = url;
    }

    function cerrarModalPDF() {
        pdfUrl = null;
    }
</script>

<div id="MostrarDiscapacitado">
    <div class="container py-4 bg-light rounded shadow">
        <h2 class="text-center mb-4 pb-2 fw-bold">
            <i class="bi bi-eye-slash-fill me-2 text-primary"></i>
            Discapacitados por Verificar
            <i class="bi bi-eye-slash-fill ms-2 text-primary"></i>
        </h2>

        {#if loading}
            <div
                class="d-flex flex-column align-items-center justify-content-center py-5"
            >
                <div
                    class="spinner-border text-primary"
                    style="width: 3rem; height: 3rem;"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">
                    Cargando discapacitados por verificar...
                </p>
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
                            <th class="px-4 py-2 border"
                                >Nombre del Discapacitado</th
                            >
                            <th class="px-4 py-2 border"
                                >Documento del Discapacitado</th
                            >
                            <th class="px-4 py-2 border"
                                >Género del Discapacitado</th
                            >
                            <th class="px-4 py-2 border">Tipo de Ceguera</th>
                            <th class="px-4 py-2 border"
                                >Cuidador Responsable</th
                            >
                            <th class="px-4 py-2 border"
                                >Archivo de Verificación</th
                            >
                            <th class="px-4 py-2 border">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each todos as todo}
                            <tr>
                                <td>{todo.nombre}</td>
                                <td>{todo.documento}</td>
                                <td>{todo.genero}</td>
                                <td>{todo.tipo_ceguera}</td>
                                <td>{todo.Usuario_Cuidador}</td>
                                <td>
                                    {#if todo.documento_verificacion}
                                        <button
                                            class="btn btn-outline-primary btn-sm"
                                            on:click={() =>
                                                mostrarModalPDF(
                                                    todo.documento_verificacion,
                                                )}
                                        >
                                            Ver Documento
                                        </button>
                                    {:else}
                                        <span class="text-muted"
                                            >No disponible</span
                                        >
                                    {/if}
                                </td>
                                <td class="text-center">
                                    <div
                                        class="d-flex flex-wrap gap-2 justify-content-center"
                                    >
                                        <button
                                            class="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                                            on:click={() =>
                                                aceptar(
                                                    todo.id,
                                                    todo.nombre,
                                                    todo.Usuario_Cuidador,
                                                    todo.Nombre_Cuidador,
                                                    todo.documento,
                                                )}
                                        >
                                            <i class="bi bi-check-circle-fill"
                                            ></i>
                                            <span class="d-none d-md-inline"
                                                >Aceptar</span
                                            >
                                        </button>

                                        <button
                                            class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                            on:click={() =>
                                                rechazar(
                                                    todo.id,
                                                    todo.nombre,
                                                    todo.Usuario_Cuidador,
                                                    todo.Nombre_Cuidador,
                                                    todo.documento,
                                                )}
                                        >
                                            <i class="bi bi-x-circle-fill"></i>
                                            <span class="d-none d-md-inline"
                                                >Rechazar</span
                                            >
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>

    {#if pdfUrl}
        <div
            class="modal fade show d-block"
            tabindex="-1"
            style="background-color: rgba(0,0,0,0.6);"
        >
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Vista previa del documento</h5>
                        <button
                            aria-label="A"
                            type="button"
                            class="btn-close"
                            on:click={cerrarModalPDF}
                        ></button>
                    </div>
                    <div class="modal-body">
                        <iframe
                            title=""
                            src={pdfUrl}
                            width="100%"
                            height="600px"
                            style="border: none;"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
