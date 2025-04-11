<script>
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

<div class="container my-4 p-4 bg-white rounded shadow-lg">
    <h2 class="text-center text-primary fw-bold mb-4">Reportes</h2>

    <div class="mb-4">
        <select class="form-select form-select-lg" id="opcion" required>
            <option value="1">Discapacitados</option>
            <option value="2">Usuarios</option>
            <option value="3">Otro</option>
        </select>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-3 mb-4">
        <div>
            <label for="desde_ciegos" class="form-label fw-semibold"
                >Desde:</label
            >
            <input type="date" id="desde_ciegos" class="form-control" />
        </div>
        <div>
            <label for="hasta_ciegos" class="form-label fw-semibold"
                >Hasta:</label
            >
            <input type="date" id="hasta_ciegos" class="form-control" />
        </div>
    </div>

    <div class="text-center mb-4">
        <button
            type="button"
            class="btn btn-primary btn-lg px-4"
            on:click={generar}
        >
            <i class="fas fa-file-alt me-2"></i> Generar Reporte
        </button>
    </div>
</div>

<!-- Mostrar Datos -->
<div class="container py-4" id="MostrarReporte">
    {#if loading}
        <div class="progress" style="height: 5px;">
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
        <h3 class="mb-4 text-center text-secondary">
            Discapacitados Registrados
        </h3>
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-light text-center">
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
            <button class="btn btn-success btn-lg px-4" on:click={exportarPDF}>
                <i class="fas fa-download me-2"></i> Exportar como PDF
            </button>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 960px;
    }

    label {
        font-weight: 500;
    }

    table {
        font-size: 0.95rem;
    }

    button:focus {
        box-shadow: 0 0 0 0.25rem rgba(90, 155, 255, 0.5);
    }

    #MostrarReporte {
        background-color: #f8f9fb;
        border-radius: 12px;
        margin-top: 30px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 576px) {
        h2,
        h3 {
            font-size: 1.4rem;
        }

        .btn {
            font-size: 0.9rem;
        }
    }
</style>
