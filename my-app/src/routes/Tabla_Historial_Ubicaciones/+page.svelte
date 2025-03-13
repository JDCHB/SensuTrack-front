<script>
    import Navbaradmin from "../../lib/components/NavbarAD.svelte";
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

<Navbaradmin></Navbaradmin>

<div id="Mostrarusuario">
    <div class="container py-4">
        <h2 class="mb-4">Historial de Ubicaciones</h2>
        {#if loading}
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
                            <th class="px-4 py-2 border">ID</th>
                            <th class="px-4 py-2 border">Usuario</th>
                            <th class="px-4 py-2 border">Latitud</th>
                            <th class="px-4 py-2 border">Longitud</th>
                            <th class="px-4 py-2 border">Lugar</th>
                            <th class="px-4 py-2 border">Estado</th>
                            <th class="px-4 py-2 border">Opcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each todos as todo}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-2 border">{todo.id}</td>
                                <td class="px-4 py-2 border"
                                    >{todo.id_usuario}</td
                                >
                                <td class="px-4 py-2 border">{todo.latitud}</td>
                                <td class="px-4 py-2 border">{todo.longitud}</td
                                >
                                <td class="px-4 py-2 border">{todo.lugar}</td>
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
                                    >
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>
                                    {#if todo.estado}
                                        <button
                                            class="btn btn-danger"
                                            on:click={() => desactivar(todo.id)}
                                        >
                                            <i class="bi bi-lock"></i> Desactivar
                                        </button>
                                    {:else}
                                        <button
                                            class="btn btn-success"
                                            on:click={() => activar(todo.id)}
                                        >
                                            <i class="bi bi-unlock"></i> Activar
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
