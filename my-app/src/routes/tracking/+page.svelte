<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import { onMount, tick } from "svelte";

    let map;
    let drawControl;
    let drawnItems = new L.FeatureGroup();
    let ciegos = [];
    let zonas_Seguras = [];
    let error = null;
    let modoAgregarZona = false;
    // let modoEliminarZona = false;
    let cargando = true;
    let v_estado = true;

    async function CargarDiscapacitado() {
        try {
            const response = await fetch(
                "https://proyectomascotas.onrender.com/Ciegos_Map",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: JSON.parse(localStorage.getItem("user_data"))
                            .id,
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                ciegos = data.resultado;
                mostrarUbicaciones();
                cargando = false;

                // ✅ Cargar zona segura del primer discapacitado
                if (ciegos.length > 0) {
                    await CargarZonaSegura(ciegos[0].id);
                }

                console.log(data.resultado);
            } else {
                console.error("Error al obtener datos:", data);
            }
        } catch (e) {
            error = e.message;
            alert("Error en la solicitud: " + error);
        }
    }

    function mostrarUbicaciones() {
        ciegos.forEach((discapacitado) => {
            const {
                nombre_discapacitado,
                latitud,
                longitud,
                numero_serie,
                nivel_bateria,
            } = discapacitado;

            const marker = L.marker([latitud, longitud]).addTo(map);
            marker.bindPopup(`
                <b>${nombre_discapacitado}</b><br>
                Latitud: ${latitud}, Longitud: ${longitud}<br>
                CollarGPS: ${numero_serie}<br>
                Nivel de Batería: ${nivel_bateria}%
            `);

            // const circle = L.circle([latitud, longitud], {
            //     color: "red",
            //     fillColor: "#f03",
            //     fillOpacity: 0.5,
            //     radius: 100,
            // }).addTo(map);
            // circle.bindPopup(
            //     `${nombre_discapacitado} se encuentra en esta área.`,
            // );

            const circle = L.circle([latitud, longitud], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 100,
            });
            circle.bindPopup(
                `${nombre_discapacitado} se encuentra en esta área.`,
            );

            // ✅ Añadir al grupo editable
            drawnItems.addLayer(circle);
        });
    }

    // ✅ NUEVA FUNCIÓN PARA MOSTRAR ZONA SEGURA DESDE LA BASE DE DATOS
    async function CargarZonaSegura(idDiscapacitado) {
        try {
            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_Zona_Segura/${idDiscapacitado}`,
            );

            const data = await response.json();

            if (response.ok) {
                // Asegúrate de que data sea un array
                if (Array.isArray(data)) {
                    data.forEach((zona) => {
                        const { nombre_zona, latitud, longitud } = zona;

                        // const circle = L.circle(
                        //     [parseFloat(latitud), parseFloat(longitud)],
                        //     {
                        //         color: "green",
                        //         fillColor: "#7CFC00",
                        //         fillOpacity: 0.4,
                        //         radius: 100,
                        //     },
                        // ).addTo(map);

                        const circle = L.circle(
                            [parseFloat(latitud), parseFloat(longitud)],
                            {
                                color: "green",
                                fillColor: "#7CFC00",
                                fillOpacity: 0.4,
                                radius: 100,
                            },
                        );

                        // ✅ Asignar ID al círculo para poder eliminarlo
                        circle._idZona = zona.id;

                        // ✅ Agregar al grupo editable para que sea eliminable
                        drawnItems.addLayer(circle);

                        circle.bindPopup(`Zona Segura: <b>${nombre_zona}</b>`);
                    });
                } else {
                    console.warn(
                        "La respuesta no contiene una lista de zonas.",
                    );
                }
            } else {
                console.warn("No hay zona segura registrada:", data.detail);
            }
        } catch (e) {
            console.error("Error al cargar la zona segura:", e);
        }
    }

    onMount(async () => {
        await tick(); // ✅ Esto ya no lanza error

        map = L.map("map").setView([10.9639, -74.7964], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        map.addLayer(drawnItems);

        drawControl = new L.Control.Draw({
            draw: {
                polygon: false,
                polyline: false,
                rectangle: false,
                marker: false,
                circlemarker: false,
                circle: {
                    shapeOptions: {
                        color: "green",
                        fillColor: "#7CFC00",
                        fillOpacity: 0.4,
                    },
                },
            },
            edit: {
                featureGroup: drawnItems,
            },
        });

        map.on("draw:created", async (event) => {
            if (!modoAgregarZona) {
                map.removeLayer(event.layer);
                return;
            }

            const layer = event.layer;
            drawnItems.addLayer(layer);
            const center = layer.getLatLng();

            const { value: nombreZona } = await Swal.fire({
                title: "Nombre de la Zona Segura",
                input: "text",
                inputLabel: "Ingresa el nombre de esta zona",
                inputPlaceholder: "Ej: Zona Norte, Patio Principal...",
                showCancelButton: true,
                confirmButtonText: "Guardar",
            });

            if (nombreZona) {
                layer
                    .bindPopup(`Zona Segura: <b>${nombreZona}</b>`)
                    .openPopup();

                const idDiscapacitado = ciegos.length > 0 ? ciegos[0].id : null;

                if (idDiscapacitado) {
                    try {
                        const response = await fetch(
                            "https://proyectomascotas.onrender.com/create_Zona_Segura",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    nombre_zona: nombreZona,
                                    latitud: String(center.lat),
                                    longitud: String(center.lng),
                                    id_discapacitado: parseInt(idDiscapacitado),
                                    estado: Boolean(v_estado),
                                }),
                            },
                        );

                        const result = await response.json();
                        if (response.ok) {
                            Swal.fire(
                                "¡Guardado!",
                                "Zona segura registrada exitosamente",
                                "success",
                            );
                            console.log("Zona segura guardada:", result);
                        } else {
                            throw new Error(
                                result.detail || "Error al guardar la zona",
                            );
                        }
                    } catch (e) {
                        console.error("Error al guardar zona segura:", e);
                        Swal.fire("Error", e.message, "error");
                    }
                } else {
                    Swal.fire(
                        "Error",
                        "No se encontró un ID de discapacitado válido",
                        "error",
                    );
                }
            } else {
                map.removeLayer(layer);
            }
        });

        map.on("draw:deleted", async (event) => {
            const layers = event.layers;

            layers.eachLayer(async function (layer) {
                const idZonaSegura = layer._idZona;

                if (!idZonaSegura) {
                    console.warn("No se encontró el ID de la zona segura");
                    return;
                }

                try {
                    const response = await fetch(
                        `https://proyectomascotas.onrender.com/delete_Zona_Segura/${idZonaSegura}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    );

                    const result = await response.json();

                    if (response.ok) {
                        Swal.fire(
                            "Eliminada",
                            "Zona segura eliminada exitosamente",
                            "success",
                        );
                    } else {
                        Swal.fire(
                            "Error",
                            result.detail || "No se pudo eliminar",
                            "error",
                        );
                    }
                } catch (error) {
                    console.error("Error al eliminar zona:", error);
                    Swal.fire(
                        "Error",
                        "Error al conectar con el servidor",
                        "error",
                    );
                }
            });
        });

        map.on("draw:edited", async (event) => {
            const layers = event.layers;

            layers.eachLayer(async function (layer) {
                const idZonaSegura = layer._idZona;

                if (!idZonaSegura) {
                    console.warn(
                        "No se encontró el ID de la zona segura editada",
                    );
                    return;
                }

                const center = layer.getLatLng();

                // Pregunta el nuevo nombre con SweetAlert2
                const { value: nuevoNombre } = await Swal.fire({
                    title: "Editar nombre de la zona",
                    input: "text",
                    inputPlaceholder: "Ej: Zona Escuela",
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                    cancelButtonText: "Cancelar",
                    inputValidator: (value) => {
                        if (!value) return "Debes escribir un nombre.";
                    },
                });

                if (!nuevoNombre) return;

                try {
                    const response = await fetch(
                        `https://proyectomascotas.onrender.com/update_Zona_Segura/${idZonaSegura}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                latitud: String(center.lat),
                                longitud: String(center.lng),
                                nombre_zona: nuevoNombre,
                            }),
                        },
                    );

                    const result = await response.json();

                    if (response.ok) {
                        Swal.fire(
                            "Editado",
                            "Zona segura actualizada",
                            "success",
                        );
                    } else {
                        Swal.fire(
                            "Error",
                            result.detail || "No se pudo actualizar",
                            "error",
                        );
                    }
                } catch (error) {
                    console.error("Error al editar zona:", error);
                    Swal.fire(
                        "Error",
                        "Error al conectar con el servidor",
                        "error",
                    );
                }
            });
        });

        await CargarDiscapacitado();
    });

    function toggleAgregarZona() {
        modoAgregarZona = !modoAgregarZona;

        if (modoAgregarZona) {
            map.addControl(drawControl);
        } else {
            map.removeControl(drawControl);
        }
    }
</script>

<NavbarUser />
<ChatBot />

<h2>Ubicación del GPS</h2>

<div style="text-align: center; margin-bottom: 10px;">
    <button
        on:click={toggleAgregarZona}
        style="padding: 10px 20px; background-color: #4caf50; color: white; border: none; border-radius: 8px; cursor: pointer;"
    >
        {modoAgregarZona
            ? "Cerrar Configuracion Zona Segura"
            : "Configurar Zona Segura"}
    </button>
</div>

{#if cargando}
    <p style="text-align:center; font-style: italic;">
        Cargando ubicaciones...
    </p>
{/if}

<div class="map-container" id="map" style="height: 500px;"></div>

<style>
    #map {
        height: 100%;
        border-radius: 15px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .map-container {
        max-width: 800px;
        margin: 30px auto;
        padding: 10px;
        border-radius: 15px;
        background: linear-gradient(to bottom, #f5f7fa, #e3e9f3);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        color: #4a90e2;
        font-family: "Arial", sans-serif;
        margin-bottom: 20px;
    }
</style>
