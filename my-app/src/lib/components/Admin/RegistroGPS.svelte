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
                globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
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
    ) {
        const confirmar = confirm(
            `¿Estás seguro de rechazar la solicitud de ${nombreDiscapacitado}?`,
        );
        if (!confirmar) return;

        try {
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
                },
                apikey,
            );

            alert(
                "Solicitud rechazada correctamente. Se notificó al cuidador.",
            );
            location.reload();
        } catch (err) {
            console.error("Error al rechazar:", err);
            alert("Error al rechazar: " + err.message);
        }
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
                                >Genero del Discapacitado</th
                            >
                            <th class="px-4 py-2 border">Tipo de Ceguera</th>
                            <th class="px-4 py-2 border"
                                >Cuidador Responsable</th
                            >
                            <th class="px-4 py-2 border"
                                >Archivo de Verificación</th
                            >
                            <th class="px-4 py-2 border">Opcion</th>
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
                                        class="d-flex flex-wrap gap-2 justify-content-center"
                                    >
                                        <button
                                            class="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                                            on:click={() =>
                                                editar(todo.id, todo.nombre)}
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
</div>
