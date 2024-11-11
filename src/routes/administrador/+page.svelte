<script>
    import NavbarAD from "../../lib/components/NavbarAD.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import { onMount } from "svelte";

    let todos = {};
    let loading = true;
    let error = null;
    let exportesModal;
    let opcion;
    let fecha_de = "";
    let fecha_hasta = "";

    onMount(() => {
        const modalElement = document.getElementById("Exported_modal");
        if (modalElement) {
            exportesModal = new bootstrap.Modal(modalElement);
        }
    });

    function showModal() {
        if (exportesModal) {
            exportesModal.show();
        }
    }

    function Ocultar() {
        exportesModal.hide();
    }

    async function generar() {
        let opcion = document.getElementById("opcion").value;
        console.log(opcion);
        try {
            if (opcion == 1) {
                let fecha_de = document.getElementById("desde_mascotas").value;
                let fecha_hasta =
                    document.getElementById("hasta_mascotas").value;
                console.log("----Comprando el generar------");
                console.log(fecha_de);
                console.log(fecha_hasta);

                let miStorage = window.localStorage;
                let vid = JSON.parse(miStorage.getItem("Administrador"));
                let n = vid.id;
                console.log("agendamos cita");
                console.log(n);

                const response = await fetch(
                    "https://proyectomascotas.onrender.com/Mascotas_Report",
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
                console.log(todos);
                setTimeout(() => {
                    globalThis.$("#myTable").DataTable(); // Para convertrlo en datatable :D
                });

                const { jsPDF } = window.jspdf;
                var doc = new jsPDF();

                var body = [];

                for (let i = 0; i < todos.length; i++) {
                    body.push([
                        todos[i].id,
                        todos[i].nombre,
                        todos[i].id_genero_mascota,
                        todos[i].id_tipo_mascota,
                        todos[i].id_propietario,
                        todos[i].fecha_hora,
                        todos[i].estado,
                    ]);
                }

                var pdf = new jsPDF();

                pdf.text(
                    20,
                    20,
                    "Reporte de turistas registrados en la pagina",
                );

                var columns = [
                    "Id",
                    "Nombre",
                    "id del genero de la mascota",
                    "id del tipo de mascota",
                    "id del propietario",
                    "Fecha y hora de registro",
                    "Estado",
                ];

                pdf.autoTable(
                    columns,
                    body,

                    { margin: { top: 25 } },
                );

                pdf.save("ReporteMascotas.pdf");
            } //fin de la opcion 1
            else if (opcion == 2) {
                alert("opcion2");
            } else {
                alert("opcion3");
            }
        } catch (e) {
            error = e.message;
            alert("Error en la solicitud: " + error);
        } finally {
            loading = false;
        }
    }
</script>

<NavbarAD></NavbarAD>
<div class="container" style="margin-top: 5%;">
    <div class="text-center pt-1 fs-3">
        <p>Reportes</p>
    </div>
    <div class="row g-2">
        <div class="col-xl-1"></div>
        <div class=" col-xl-10 text-center fs-3 py-5">
            <select class="form-select" id="opcion" style="" required>
                <option value="1">Mascotas</option>
                <option value="2">Diagnostico</option>
                <option value="3">3</option>
            </select>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-6 text-end">
            Desde:
            <input type="date" name="mascotas" id="desde_mascotas" />
        </div>
        <div class="col-xl-6">
            Hasta:
            <input type="date" name="mascotas" id="hasta_mascotas" />
        </div>
    </div>

    <div class="row">
        <button type="button" class="btn btn-dark" on:click={generar}
            >Generar</button
        >
    </div>
</div>

<div
    class="modal fade"
    id="Exported_modal"
    tabindex="-1"
    aria-labelledby="rModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body row">
                <h3>Como quieres exportar los datos?</h3>
                <button
                    on:click={generar}
                    class="col-md-4 text-decoration-none btn btn-outline-dark"
                    style="margin-left: 4%; margin-top:2%">PDF</button
                >
                <div class="col-md-3" style="color: white;">relleno :D</div>
                <button
                    on:click={Ocultar}
                    class="col-md-4 text-decoration-none btn btn-outline-dark"
                    style="margin-top:2%">Excel</button
                >
            </div>
        </div>
    </div>
</div>

<div id="Mostrarusuario">
    <div class="container py-4">
        <h2 class="mb-4">Citas agendadas</h2>
        {#if loading}
            <p class="text-center">Cargando datos...</p>
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
                            <th class="px-4 py-2 border">id</th>
                            <th class="px-4 py-2 border"
                                >nombre de la mascota</th
                            >
                            <th class="px-4 py-2 border">id_genero_mascota</th>
                            <th class="px-4 py-2 border">id_tipo_mascota</th>
                            <th class="px-4 py-2 border">id_propietario</th>
                            <th class="px-4 py-2 border">fecha_hora</th>
                            <th class="px-4 py-2 border">estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each todos as todo}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-2 border">{todo.id}</td>
                                <td class="px-4 py-2 border">{todo.nombre}</td>
                                <td class="px-4 py-2 border"
                                    >{todo.id_genero_mascota}</td
                                >
                                <td class="px-4 py-2 border"
                                    >{todo.id_tipo_mascota}</td
                                >
                                <td class="px-4 py-2 border"
                                    >{todo.id_propietario}</td
                                >
                                <td class="px-4 py-2 border"
                                    >{todo.fecha_hora}</td
                                >
                                <td class="px-4 py-2 border">{todo.estado}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</div>

<Footer></Footer>

<style>
    .container {
        max-width: 600px; /* Limita el ancho del contenedor */
        margin: auto; /* Centra el contenedor horizontalmente */
        padding: 20px; /* Agrega padding interno */
        border-radius: 10px; /* Bordes redondeados */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
        background-color: #f9f9f9; /* Color de fondo claro */
    }

    @media (max-width: 768px) {
        .col-md-4 {
            width: 100%; /* Hace que los inputs ocupen el 100% en pantallas pequeñas */
        }
    }
</style>
