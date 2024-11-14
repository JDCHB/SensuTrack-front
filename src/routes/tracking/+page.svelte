<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import Footer from "../../lib/components/Footer.svelte";

    import { onMount } from "svelte";

    let map;

    onMount(() => {
        var CoordenadasSoledad = [10.9866371, -74.7902107];
        map = L.map("map").setView(CoordenadasSoledad, 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([51.5, -0.09])
            .addTo(map)
            .bindPopup("A pretty CSS popup.<br> Easily customizable.")
            .openPopup();

        // Agregar un marcador para la mascota
        var marker = L.marker(CoordenadasSoledad).addTo(map); // Coordenadas de ejemplo
        marker.bindPopup("<b>¡Aquí está tu mascota!</b>").openPopup();

        var circle = L.circle(CoordenadasSoledad, {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 150,
        }).addTo(map);
        circle.bindPopup("En esta area se encuentra tu mascota!");
    });
</script>

<NavbarUser></NavbarUser>
<h2>Ubicación de tu Mascota</h2>

<div class="map-container" id="map" style="height: 500px;"></div>
<Footer></Footer>

<style>
    /* Diseño para el contenedor del mapa */
    #map {
        height: 100%; /* Mapa ocupará todo el contenedor */
        border-radius: 15px; /* Bordes redondeados para el mapa */
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Sombra sutil */
        overflow: hidden;
    }

    /* Contenedor del mapa con una apariencia limpia */
    .map-container {
        max-width: 800px; /* Limitar el ancho */
        margin: 30px auto; /* Centrar el mapa */
        padding: 10px; /* Espaciado interno */
        border-radius: 15px;
        background: linear-gradient(
            to bottom,
            #f5f7fa,
            #e3e9f3
        ); /* Fondo suave */
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    }

    /* Estilos para el encabezado */
    h2 {
        text-align: center;
        color: #4a90e2;
        font-family: "Arial", sans-serif;
        margin-bottom: 20px;
    }
</style>
