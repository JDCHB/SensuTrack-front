<script>
    import NavbarAD from "../../lib/components/NavbarAD.svelte";
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
            fecha_de = document.getElementById("desde_ciegos").value;
            fecha_hasta = document.getElementById("hasta_ciegos").value;

            console.log({
                fecha1: fecha_de,
                fecha2: fecha_hasta,
            });

            if (!fecha_de || !fecha_hasta) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Por favor, selecciona ambas fechas.",
                });
                return;
            }

            const response = await fetch(
                "https://proyectomascotas.onrender.com/Ciegos_Report",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fecha1: fecha_de,
                        fecha2: fecha_hasta,
                    }),
                },
            );

            if (!response.ok) throw new Error("Error al cargar los datos");
            const data = await response.json();
            console.log(data);

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
            "Tipo de Ceguera",
            "Cuidador",
            "Fecha",
            "Estado",
        ];

        const body = todos.map((todo) => [
            todo.id,
            todo.nombre,
            todo.genero,
            todo.tipo_ceguera,
            todo.nombre_cuidador,
            todo.fecha,
            todo.estado,
        ]);

        pdf.text(
            20,
            20,
            "Reporte de discapacitados visuales registrados en la página",
        );
        pdf.autoTable(columns, body, { startY: 30 });
        pdf.save("ReporteDiscapacitados.pdf");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se exportó de manera exitosa",
            showConfirmButton: false,
            timer: 1500,
        });
    }
</script>

<NavbarAD />

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
                <option value="1">Discapacitados</option>
                <option value="2">Usuarios</option>
                <option value="3">Otro</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col-xl-6 text-end">
            Desde:
            <input type="date" id="desde_ciegos" class="form-control" />
        </div>
        <div class="col-xl-6">
            Hasta:
            <input type="date" id="hasta_ciegos" class="form-control" />
        </div>
    </div>

    <div class="row justify-content-center">
        <button type="button" class="btn btn-primary btn-lg" on:click={generar}>
            <i class="fas fa-file-alt"></i> Generar Reporte
        </button>
    </div>
</div>

<!-- Mostrar Datos -->
<div class="container py-4" id="MostrarReporte">
    {#if loading}
        <div class="progress" style="height: 5px; margin-top: 20px;">
            <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 100%"
            ></div>
        </div>
    {:else if error}
        <p class="text-danger text-center">Error: {error}</p>
    {:else if mostrarReporte}
        <h2 class="mb-4 text-center">Discapacitados Registrados</h2>
        <div class="overflow-x-auto">
            <table class="table table-bordered table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Tipo de Ceguera</th>
                        <th>Cuidador</th>
                        <th>Fecha y Hora</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {#each todos as todo}
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.nombre}</td>
                            <td>{todo.genero}</td>
                            <td>{todo.tipo_ceguera}</td>
                            <td>{todo.nombre_cuidador}</td>
                            <td>{todo.fecha}</td>
                            <td>{todo.estado ? "Activo" : "Inactivo"}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-success" on:click={exportarPDF}>
                <i class="fas fa-download"></i> Exportar como PDF
            </button>
        </div>
    {/if}
</div>

<Footer />

<style>
    .container {
        max-width: 900px;
        margin: auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .row {
        margin-bottom: 20px;
    }

    input,
    select,
    button {
        border-radius: 10px;
        transition: all 0.3s ease;
    }

    input:focus,
    select:focus,
    button:focus {
        outline: none;
        box-shadow: 0 0 5px 3px #5a9bff;
    }

    button {
        background-color: #5a9bff;
        color: white;
        border: none;
        padding: 12px 20px;
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: bold;
    }

    button:hover {
        background-color: #4b86e3;
    }

    button:active {
        background-color: #3e75c7;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 15px;
        text-align: center;
    }

    th {
        background-color: #f4f5f7;
        color: #333;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #e2e6ea;
    }

    .progress {
        height: 5px;
        margin-top: 20px;
    }

    #MostrarReporte {
        background-color: #f1f3f7;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
</style>
