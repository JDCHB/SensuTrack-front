<script>
    import { onMount } from "svelte";

    let historial = [];
    let loading = true; // Indicador de carga

    async function fetchHistorial() {
        try {
            const response = await fetch("http://localhost:3000/historial");
            if (!response.ok) throw new Error("Error al obtener el historial");
            historial = await response.json();
        } catch (error) {
            console.error("❌ Error:", error);
        } finally {
            loading = false; // Cambia a false cuando termine la carga
        }
    }

    onMount(fetchHistorial);
</script>

<h2>Historial de Ubicaciones</h2>

{#if loading}
    <p>Cargando historial...</p>
{:else}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario ID</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Dirección</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {#each historial as item}
                <tr>
                    <td>{item.id}</td>
                    <td>{item.usuario_id}</td>
                    <td>{item.latitud}</td>
                    <td>{item.longitud}</td>
                    <td>{item.direccion}</td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th,
    td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: left;
    }
    th {
        background-color: #f4f4f4;
    }
</style>
