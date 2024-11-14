<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import { onMount } from "svelte";

    let map;
    let mascotas = []; // Aquí se almacenarán los datos de las mascotas
    let error = null;

    // Función para obtener los datos de las mascotas del usuario desde la API
    async function cargarMascotas() {
        try {
            const response = await fetch(
                "https://proyectomascotas.onrender.com/Mascotas_Map",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: JSON.parse(localStorage.getItem("usuario")).id, // Usa el ID del usuario en la sesión
                    }),
                },
            );
            const data = await response.json();
            if (response.ok) {
                mascotas = data.resultado; // Almacena los datos de las mascotas en el array
                mostrarUbicaciones(); // Llama a la función para mostrar los marcadores en el mapa
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
        mascotas.forEach((mascota) => {
            const { nombre_mascota, latitud, longitud } = mascota;
            const marker = L.marker([latitud, longitud]).addTo(map);
            marker
                .bindPopup(
                    `<b>${nombre_mascota}</b><br>Latitud: ${latitud}, Longitud: ${longitud}`,
                )
                .openPopup();
        });
    }

    // Configuración del mapa
    onMount(() => {
        map = L.map("map").setView([10.0, -84.0], 10); // Cambia a las coordenadas centrales según tu ubicación

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        cargarMascotas(); // Carga las ubicaciones de las mascotas cuando se monta el componente
    });

    /*async function Mapa() {
        const userData = JSON.parse(localStorage.getItem("usuario"));
        const userId = userData?.id; // Extrae el user_id del localStorage

        try {
            const response = await fetch(
                "https://proyectomascotas.onrender.com/Mascotas_Map",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId,
                    }),
                },
            );

            const data = await response.json();
            if (response.ok) {
                // Aquí puedes utilizar data.resultado para obtener los datos y mostrarlos en el mapa
                console.log(data.resultado);
            } else {
                console.error("Error:", data.detail);
            }
        } catch (e) {
            alert("Error en la solicitud: " + e.message);
        }
    }

    // Función para mostrar los marcadores de todas las mascotas en el mapa
    function mostrarMarcadores() {
        mascotas.forEach((mascota) => {
            const { nombre_mascota, latitud, longitud } = mascota;
            const coordenadas = [latitud, longitud];

            // Agregar un marcador para cada mascota
            const marker = L.marker(coordenadas).addTo(map);
            marker
                .bindPopup(`<b>¡Aquí está tu mascota ${nombre_mascota}!</b>`)
                .openPopup();

            // Agregar un círculo alrededor del marcador
            L.circle(coordenadas, {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.5,
                radius: 150,
            })
                .addTo(map)
                .bindPopup(`Área aproximada de ${nombre_mascota}`);
        });
    }

    onMount(() => {
        // Inicializar el mapa con una posición predeterminada
        map = L.map("map").setView([0, 0], 13); // Ajustar la vista inicial

        // Cargar las teselas del mapa
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Llamar a la función para cargar y mostrar las mascotas
        Mapa();
    });*/
</script>

<NavbarUser></NavbarUser>
<h2>Ubicación de tus Mascotas</h2>

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
