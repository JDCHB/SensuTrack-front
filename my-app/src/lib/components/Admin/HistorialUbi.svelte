<script>
    import { onMount } from "svelte";

    let todos = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:3000/historial");
            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            console.log(data); // Verifica la estructura de la respuesta
            todos = Array.isArray(data) ? data : [data]; // Asegúrate de que sea un array

            setTimeout(() => {
                if (globalThis.$ && globalThis.$.fn.DataTable) {
                    globalThis.$("#myTable").DataTable();
                } else {
                    console.error("jQuery o DataTables no están cargados");
                }
            }, 0);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<div id="Mostrarusuario">
    <div class="container py-4">
        <h2
            class="text-center mb-4 pb-2 border-bottom border-3 border-primary fw-bold"
        >
            <i class="bi-clock-history me-2"></i>Historial de Ubicaciones
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
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Lugar</th>
                            <th>Estado</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each todos as todo}
                            <tr>
                                <td>{todo.id}</td>
                                <td>{todo.id_usuario}</td>
                                <td>{todo.latitud}</td>
                                <td>{todo.longitud}</td>
                                <td>{todo.lugar}</td>
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
                                    </div></td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</div>
