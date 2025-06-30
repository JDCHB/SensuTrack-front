<script>
    import { onMount } from "svelte";

    let todos = [];
    let loading = false;
    let error = null;
    let opcion;
    let fecha_de = "";
    let fecha_hasta = "";
    let mostrarPDF = false;
    let pdfUrl = "";

    async function generar() {
        try {
            loading = true;
            mostrarPDF = false;
            error = null;

            opcion = document.getElementById("opcion").value;
            fecha_de = document.getElementById("desde_ciegos").value;
            fecha_hasta = document.getElementById("hasta_ciegos").value;

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
            todos = data.resultado;

            exportarPDF();
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
            todo.estado ? "Activo" : "Inactivo",
        ]);

        pdf.text(
            20,
            20,
            "Reporte de discapacitados visuales registrados en la página",
        );
        pdf.autoTable({
            columns: columns,
            body: body,
            margin: { top: 70 },
        });

        const blob = pdf.output("blob");
        pdfUrl = URL.createObjectURL(blob);
        mostrarPDF = true;

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Vista previa generada con éxito",
            showConfirmButton: false,
            timer: 1500,
        });
    }
</script>

<!-- Panel de filtros -->
<div class="report-panel container bg-white rounded-4 shadow p-5 my-5">
    <h2 class="text-center fw-bold text-primary mb-5">
        <i class="fas fa-chart-bar me-2"></i>Generación de Reportes
    </h2>

    <div class="row g-4 align-items-end">
        <div class="col-md-4">
            <label for="opcion" class="form-label">Seleccionar tipo:</label>
            <select id="opcion" class="form-select form-select-lg" required>
                <option value="1">Personas con discapacidad visual</option>
                <option value="2">Usuarios del sistema</option>
                <option value="3">Otro</option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="desde_ciegos" class="form-label">Desde:</label>
            <input
                type="date"
                id="desde_ciegos"
                class="form-control form-control-lg"
            />
        </div>
        <div class="col-md-4">
            <label for="hasta_ciegos" class="form-label">Hasta:</label>
            <input
                type="date"
                id="hasta_ciegos"
                class="form-control form-control-lg"
            />
        </div>
    </div>

    <div class="text-center mt-5">
        <button
            type="button"
            class="btn btn-primary btn-lg px-5"
            on:click={generar}
        >
            <i class="fas fa-file-alt me-2"></i> Generar Reporte
        </button>
    </div>
</div>

<!-- Resultados -->
<div
    class="container mt-5 p-4 rounded-4 bg-light shadow-sm"
    id="MostrarReporte"
>
    {#if loading}
        <div class="progress" style="height: 6px;">
            <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                role="progressbar"
                style="width: 100%"
            ></div>
        </div>
    {:else if error}
        <div class="alert alert-danger text-center mb-0" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            {error}
        </div>
    {:else if mostrarPDF}
        <div class="text-center">
            <h4 class="mb-4 text-secondary">Vista previa del reporte</h4>
            <iframe
                src={pdfUrl}
                title="Vista previa del PDF"
                class="report-frame"
            ></iframe>
            <div class="mt-4">
                <a
                    href={pdfUrl}
                    download="ReporteDiscapacitados.pdf"
                    class="btn btn-success btn-lg px-5"
                >
                    <i class="fas fa-download me-2"></i> Descargar PDF
                </a>
            </div>
        </div>
    {/if}
</div>

<style>
    .report-panel {
        border: 1px solid #e0e0e0;
    }

    .form-label {
        font-weight: 500;
        color: #374151;
    }

    .report-frame {
        width: 100%;
        height: 600px;
        border: 1px solid #ced4da;
        border-radius: 0.75rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.04);
    }

    @media (max-width: 768px) {
        .report-frame {
            height: 400px;
        }
    }

    button:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.3);
    }

    h2,
    h4 {
        font-family: "Segoe UI", Roboto, sans-serif;
    }
</style>
