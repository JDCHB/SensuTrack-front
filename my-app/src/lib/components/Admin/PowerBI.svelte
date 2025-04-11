<div class="admin-container">
    <div class="admin-card">
        <div class="card-header">
            <h2>📊 Panel de Estadísticas</h2>
        </div>
        <div class="card-body">
            <div class="iframe-container">
                <iframe
                    title="SensuTrack - Estadísticas"
                    src="https://app.powerbi.com/view?r=eyJrIjoiZWE4NDU5OWUtNDZiMi00M2RjLTk0NTUtZWUxZDkyMjMwZDQyIiwidCI6IjFlOWFhYmU4LTY3ZjgtNGYxYy1hMzI5LWE3NTRlOTI0OTlhZSIsImMiOjR9"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </div>
</div>

<style>
    /* Contenedor principal estilo admin */
    .admin-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    /* Tarjeta principal */
    .admin-card {
        width: 90%;
        max-width: 1000px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    /* Encabezado de la tarjeta */
    .card-header {
        background: #007bff;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        border-bottom: 2px solid #0056b3;
    }

    /* Cuerpo de la tarjeta */
    .card-body {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    /* Contenedor del iframe */
    .iframe-container {
        width: 100%;
        max-width: 900px;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
