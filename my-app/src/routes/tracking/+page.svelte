<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import { onMount, tick } from "svelte";

    let map;
    let drawControl;
    let drawnItems;
    let ciegos = [];
    let zonas_Seguras = [];
    let error = null;
    let modoAgregarZona = false;
    let cargando = true;
    let v_estado = true;

    // Función para obtener datos del usuario de forma segura
    function getUserData() {
        try {
            const userData = localStorage.getItem("user_data");
            return userData ? JSON.parse(userData) : null;
        } catch (e) {
            console.error("Error al leer user_data:", e);
            return null;
        }
    }

    // ✅ NUEVA FUNCIÓN PARA TOMAR LOS DATOS DEL CIEGO ASIGNADO A UN CUIDADOR DESDE LA BASE DE DATOS
    async function CargarDiscapacitado() {
        try {
            const userData = getUserData();
            if (!userData?.id) {
                throw new Error("No se encontraron datos de usuario válidos");
            }

            const response = await fetch(
                "https://proyectomascotas.onrender.com/Ciegos_Map",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userData.id,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            ciegos = data.resultado || [];
            mostrarUbicaciones();
            cargando = false;

            // ✅ Cargar zona segura del primer discapacitado
            if (ciegos.length > 0) {
                await CargarZonaSegura(ciegos[0].id);
            }

            console.log("Datos cargados:", data.resultado);
        } catch (e) {
            console.error("Error en CargarDiscapacitado:", e);
            error = e.message;
            cargando = false;
            alert("Error al cargar datos: " + e.message);
        }
    }

    // ✅ NUEVA FUNCIÓN PARA MOSTRAR LA UBICACION DEL GPS DESDE LA BASE DE DATOS
    function mostrarUbicaciones() {
        if (!map) return;

        // Limpiar marcadores existentes
        if (drawnItems) {
            drawnItems.clearLayers();
        } else {
            drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
        }

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
            if (!idDiscapacitado) return;

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_Zona_Segura/${idDiscapacitado}`,
            );

            if (!response.ok) {
                console.warn(
                    "No hay zona segura registrada o error en la respuesta",
                );
                return;
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                data.forEach((zona) => {
                    const { nombre_zona, latitud, longitud, radio } = zona;

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
                            radius: parseFloat(radio),
                        },
                    );
                    // ✅ Asignar ID al círculo para poder eliminarlo
                    circle._idZona = zona.id;
                    // ✅ Agregar al grupo editable para que sea eliminable
                    drawnItems.addLayer(circle);

                    circle.bindPopup(`Zona Segura: <b>${nombre_zona}</b>`);
                });
            }
        } catch (e) {
            console.error("Error al cargar la zona segura:", e);
        }
    }

    onMount(async () => {
        try {
            // Esperar a que todo esté listo
            await tick();

            // Verificar que las dependencias estén cargadas
            if (!window.L || !window.Swal) {
                await new Promise((resolve) => {
                    const checkDeps = () => {
                        if (window.L && window.Swal) resolve();
                        else setTimeout(checkDeps, 100);
                    };
                    checkDeps();
                });
            }

            // Verificar que el elemento del mapa exista
            if (!document.getElementById("map")) {
                throw new Error("Elemento del mapa no encontrado");
            }

            // Inicializar el mapa
            map = L.map("map").setView([10.9639, -74.7964], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(map);

            // Inicializar drawnItems si no existe
            if (!drawnItems) {
                drawnItems = new L.FeatureGroup();
                map.addLayer(drawnItems);
            }

            // Configurar controles de dibujo
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

            // Configurar eventos del mapa
            configurarEventosMapa();

            // Cargar datos iniciales
            await CargarDiscapacitado();
        } catch (e) {
            console.error("Error en onMount:", e);
            error = e.message;
            cargando = false;
        }
    });

    function configurarEventosMapa() {
        if (!map) return;

        map.on("draw:created", async (event) => {
            if (!modoAgregarZona) {
                map.removeLayer(event.layer);
                return;
            }

            const layer = event.layer;
            const center = layer.getLatLng();

            try {
                const { value: nombreZona } = await Swal.fire({
                    title: "Nombre de la Zona Segura",
                    input: "text",
                    inputLabel: "Ingresa el nombre de esta zona",
                    inputPlaceholder: "Ej: Zona Norte, Patio Principal...",
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                });

                if (!nombreZona) {
                    map.removeLayer(layer);
                    return;
                }

                const idDiscapacitado = ciegos.length > 0 ? ciegos[0].id : null;
                if (!idDiscapacitado) {
                    throw new Error(
                        "No se encontró un ID de discapacitado válido",
                    );
                }

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
                            radio: layer.getRadius?.() || 100,
                            id_discapacitado: parseInt(idDiscapacitado),
                            estado: Boolean(v_estado),
                        }),
                    },
                );

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(
                        result.detail || "Error al guardar la zona",
                    );
                }

                layer._idZona = result.id;
                drawnItems.addLayer(layer);
                layer
                    .bindPopup(`Zona Segura: <b>${nombreZona}</b>`)
                    .openPopup();

                Swal.fire(
                    "¡Guardado!",
                    "Zona segura registrada exitosamente",
                    "success",
                );
            } catch (e) {
                console.error("Error al crear zona segura:", e);
                map.removeLayer(layer);
                Swal.fire("Error", e.message, "error");
            }
        });

        map.on("draw:deleted", async (event) => {
            const layers = event.layers;
            layers.eachLayer(async (layer) => {
                try {
                    const idZonaSegura = layer._idZona;
                    if (!idZonaSegura) return;

                    const response = await fetch(
                        `https://proyectomascotas.onrender.com/delete_Zona_Segura/${idZonaSegura}`,
                        { method: "DELETE" },
                    );

                    if (!response.ok) {
                        throw new Error("No se pudo eliminar la zona");
                    }

                    Swal.fire(
                        "Eliminada",
                        "Zona segura eliminada exitosamente",
                        "success",
                    );
                } catch (e) {
                    console.error("Error al eliminar zona:", e);
                    Swal.fire("Error", e.message, "error");
                }
            });
        });

        map.on("draw:edited", async (event) => {
            const layers = event.layers;
            layers.eachLayer(async (layer) => {
                try {
                    const idZonaSegura = layer._idZona;
                    if (!idZonaSegura) return;

                    const { value: nuevoNombre } = await Swal.fire({
                        title: "Editar nombre de la zona",
                        input: "text",
                        inputPlaceholder: "Ej: Zona Escuela",
                        showCancelButton: true,
                        inputValidator: (value) =>
                            value ? null : "Debes escribir un nombre.",
                    });

                    if (!nuevoNombre) return;

                    const center = layer.getLatLng();
                    const response = await fetch(
                        `https://proyectomascotas.onrender.com/update_Zona_Segura/${idZonaSegura}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                latitud: String(center.lat),
                                longitud: String(center.lng),
                                radio: layer.getRadius?.() || 100,
                                nombre_zona: nuevoNombre,
                            }),
                        },
                    );

                    if (!response.ok) {
                        throw new Error("No se pudo actualizar la zona");
                    }

                    Swal.fire("Editado", "Zona segura actualizada", "success");
                } catch (e) {
                    console.error("Error al editar zona:", e);
                    Swal.fire("Error", e.message, "error");
                }
            });
        });
    }

    function toggleAgregarZona() {
        if (!map) return;

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

<div class="boton-container">
    <button on:click={toggleAgregarZona} class="zona-btn">
        {modoAgregarZona
            ? "Cerrar Configuración de Zona Segura"
            : "Configurar Zona Segura"}
    </button>
</div>

{#if error}
    <p class="error-msg">Error: {error}</p>
{:else if cargando}
    <p class="loading-msg">Cargando ubicaciones...</p>
{/if}

<div class="map-container">
    <div id="map"></div>
</div>

<style>
    /* Tipografía y título */
    h2 {
        margin-top: 2%;
        text-align: center;
        color: #2c3e50;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    /* Botón responsive */
    .boton-container {
        text-align: center;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    .zona-btn {
        padding: 12px 24px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: bold;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
        transition:
            background-color 0.3s ease,
            transform 0.2s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
    }

    .zona-btn:hover {
        background-color: #45a049;
        transform: translateY(-2px);
    }

    /* Mensajes */
    .error-msg,
    .loading-msg {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        margin-top: 10px;
        padding: 0 10px;
    }

    .error-msg {
        color: red;
    }

    .loading-msg {
        font-style: italic;
        color: #666;
    }

    /* Contenedor del mapa */
    .map-container {
        max-width: 900px;
        margin: 0 auto 30px;
        padding: 10px;
        border-radius: 20px;
        background: #ffffff;
        box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.12);
        border: 1px solid #ddd;
    }

    #map {
        height: 500px;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    /* Responsive para pantallas pequeñas */
    @media (max-width: 600px) {
        h2 {
            font-size: 22px;
        }

        .zona-btn {
            font-size: 14px;
            padding: 10px 20px;
        }

        #map {
            height: 350px;
        }
    }
</style>
