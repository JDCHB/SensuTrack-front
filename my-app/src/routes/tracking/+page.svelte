<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import { onMount } from "svelte";

    let map;
    let ciegos = []; // Aquí se almacenarán los datos de las mascotas
    let error = null;

    // Función para obtener los datos de las mascotas del usuario desde la API
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
                            .id, // Usa el ID del usuario en la sesión
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                ciegos = data.resultado; // Almacena los datos de las mascotas en el array
                mostrarUbicaciones(); // Llama a la función para mostrar los marcadores en el mapa
                console.log(data.resultado);
            } else {
                console.error("Error al obtener datos:", data);
            }
        } catch (e) {
            error = e.message;
            alert("Error en la solicitud: " + error);
        }
    }

    // Función para mostrar las ubicaciones de las mascotas en el mapa
    function mostrarUbicaciones() {
        ciegos.forEach((ciegos) => {
            const {
                nombre_discapacitado,
                latitud,
                longitud,
                numero_serie,
                nivel_bateria,
            } = ciegos;
            const marker = L.marker([latitud, longitud]).addTo(map);
            marker
                .bindPopup(
                    `<b>${nombre_discapacitado}</b><br>Latitud: ${latitud}, Longitud: ${longitud}<br>CollarGPS:${numero_serie}<br>Nivel de Bateria:${nivel_bateria}%`,
                )
                .openPopup();
            var circle = L.circle([latitud, longitud], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 100,
            }).addTo(map);
            circle.bindPopup(
                nombre_discapacitado + " se encuentra en esta area!",
            );
        });
    }

    // Configuración del mapa
    onMount(() => {
        map = L.map("map").setView([10.0, -84.0], 10); // Cambia a las coordenadas centrales según tu ubicación

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        CargarDiscapacitado(); // Carga las ubicaciones de las mascotas cuando se monta el componente
    });
</script>

<NavbarUser></NavbarUser>
<ChatBot></ChatBot>
<h2>Ubicacion del GPS</h2>

<div class="map-container" id="map" style="height: 500px;"></div>

<style>
    /* Diseño para el contenedor del mapa */
    #map {
        height: 100%;
        border-radius: 15px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    /* Contenedor del mapa con una apariencia limpia */
    .map-container {
        max-width: 800px;
        margin: 30px auto;
        padding: 10px;
        border-radius: 15px;
        background: linear-gradient(to bottom, #f5f7fa, #e3e9f3);
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    }

    /* Estilos para el encabezado */
    h2 {
        text-align: center;
        color: #4a90e2;
        font-family: "Arial", sans-serif;
        margin-bottom: 20px;
    }
</style>
