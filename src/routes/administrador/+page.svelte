<script>
    import NavBarAd from "../../lib/components/NavBarAD.svelte";
    import Footer from "../../lib/components/footer.svelte";
</script>

<NavBarAd></NavBarAd>
<section class="reportes-section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <div class="card mt-4">
                    <div class="card-header">
                        <h3 class="reportes-header">Reportes</h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="dropdownMenu" class="form-label"
                                >Selecciona una opción</label
                            >
                            <select class="form-control" id="dropdownMenu">
                                <option value="opcion1"
                                    >1. Historial de ubicacion de mascotas</option
                                >
                                <option value="opcion2"
                                    >Historial de Usuario</option
                                >
                                <option value="opcion3"></option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="fechaInicio" class="form-label"
                                >Fecha de Inicio</label
                            >
                            <input
                                type="date"
                                class="form-control"
                                id="fechaInicio"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="fechaFin" class="form-label"
                                >Fecha de Fin</label
                            >
                            <input
                                type="date"
                                class="form-control"
                                id="fechaFin"
                            />
                        </div>
                        <button class="btn btn-secondary" type="button">
                            Enivar Reporte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<Footer></Footer>

<style>
    .reportes-section {
        background-color: #f9f9f9;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        padding: 30px;
        position: relative;
        background-color: rgba(255, 255, 255, 0.85);
        background-image: url("https://your-image-url.com/pets-background.jpg");
        background-size: cover;
        background-position: center;
    }

    .reportes-title {
        font-family: "Comic Sans MS", sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: #ff7f50;
        text-align: center;
        margin-bottom: 20px;
    }

    .reportes-header {
        font-family: "Comic Sans MS", sans-serif;
        font-size: 1.8rem;
        font-weight: bold;
        color: #ff7f50;
    }

    .form-label {
        font-weight: bold;
        font-size: 1rem;
        color: #333;
    }

    .form-control {
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        border: 2px solid #ddd;
        font-size: 16px;
    }

    .form-control:focus {
        border-color: #ff7f50;
        box-shadow: 0 0 5px rgba(255, 127, 80, 0.5);
    }

    .dropdown-menu {
        background-color: #ffffff;
        border-radius: 10px;
    }

    .dropdown-item:hover {
        background-color: #ff7f50;
        color: white;
    }

    button {
        width: 100%;
        background-color: #ff7f50;
        border: none;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 15px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #ff6347;
    }

    p {
        font-size: 1rem;
        text-align: center;
        color: #333;
    }

    a {
        color: #ff7f50;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 767px) {
        .reportes-section {
            padding: 20px;
        }
        .reportes-title {
            font-size: 1.5rem;
        }
        .reportes-header {
            font-size: 1.5rem;
        }
    }
</style>
