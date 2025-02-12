<script>
    import NavBarCanSeeOrNot from "$lib/components/NavBarCanSeeOrNot.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import { onMount } from "svelte";

    let todos = [];
    let loading = false;
    let error = null;
    let opcion;
    let fecha_de = "";
    let fecha_hasta = "";
    let mostrarReporte = false;

    async function generar() {
        try {
            loading = true;
            mostrarReporte = false;
            error = null;

            opcion = document.getElementById("opcion").value;
            fecha_de = document.getElementById("desde_mascotas").value;
            fecha_hasta = document.getElementById("hasta_mascotas").value;

            const response = await fetch(
                "https://proyectomascotas.onrender.com/Mascotas_Report",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fecha1: fecha_de,
                        fecha2: fecha_hasta,
                    }),
                },
            );

            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();

            todos = data.resultado;
            mostrarReporte = true;

            setTimeout(() => globalThis.$("#myTable").DataTable(), 0);
        } catch (e) {
            error = e.message;
            console.error("Error al generar reporte:", e);
        } finally {
            loading = false;
        }
    }

    function exportarPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const columns = [
            "Id",
            "Nombre",
            "Género",
            "Tipo",
            "Propietario",
            "Fecha y Hora",
            "Estado",
        ];

        const body = todos.map((todo) => [
            todo.id,
            todo.nombre,
            todo.id_genero_mascota,
            todo.id_tipo_mascota,
            todo.id_propietario,
            todo.fecha_hora,
            todo.estado,
        ]);

        pdf.text(20, 20, "Reporte de mascotas registradas en la página");
        pdf.autoTable(columns, body, { startY: 30 });
        pdf.save("ReporteMascotas.pdf");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se exportó de manera exitosa",
            showConfirmButton: false,
            timer: 1500,
        });
    }
</script>

<NavBarCanSeeOrNot></NavBarCanSeeOrNot>

<div class="container" style="margin-top: 5%;">
    <div class="text-center pt-1 fs-3">
        <p class="fw-bold text-primary">Reportes</p>
    </div>

    <div class="row g-2">
        <div class="col-xl-1"></div>
        <div class="col-xl-10 text-center fs-3 py-5">
            <select
                class="form-select form-select-lg mb-3"
                id="opcion"
                required
            >
                <option value="1">Mascotas</option>
                <option value="2">Usuarios</option>
                <option value="3">Otro</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-xl-6 text-end">
            Desde:
            <input type="date" id="desde_mascotas" class="form-control" />
        </div>
        <div class="col-xl-6">
            Hasta:
            <input type="date" id="hasta_mascotas" class="form-control" />
        </div>
    </div>

    <div class="row justify-content-center">
        <button type="button" class="btn btn-primary btn-lg" on:click={generar}>
            Generar Reporte
        </button>
    </div>
</div>

<!-- Mostrar Datos -->
<div class="container py-4" id="MostrarReporte">
    {#if loading}
        <p class="text-center">Cargando datos...</p>
    {:else if error}
        <p class="text-danger text-center">Error: {error}</p>
    {:else if mostrarReporte}
        <h2 class="mb-4 text-center">Mascotas Registradas</h2>
        <div class="overflow-x-auto">
            <table class="table table-bordered table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Tipo</th>
                        <th>Propietario</th>
                        <th>Fecha y Hora</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {#each todos as todo}
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.nombre}</td>
                            <td>{todo.id_genero_mascota}</td>
                            <td>{todo.id_tipo_mascota}</td>
                            <td>{todo.id_propietario}</td>
                            <td>{todo.fecha_hora}</td>
                            <td>{todo.estado}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-success" on:click={exportarPDF}>
                Exportar como PDF
            </button>
        </div>
    {/if}
</div>

<Footer></Footer>

<style>
    .container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .col-xl-6 {
            margin-bottom: 10px;
        }
    }
</style>
