<script>
    import { onMount } from "svelte";

    let v_id = "";
    let usuario = "";
    let discapacitado = "";
    let error = "";
    let loading = true;

    function logout() {
        // Limpiar los datos de inicio de sesión en el LocalStorage
        localStorage.clear();
        window.location.href = "/login"; // Redirigir a la página de login
    }

    onMount(async () => {
        try {
            let miStorage = window.localStorage;
            let userData = miStorage.getItem("user_data");

            if (!userData) {
                console.warn("No se encontró user_data en localStorage");
                loading = false;
                return;
            }

            usuario = JSON.parse(userData);
            v_id = usuario?.id || "";

            if (!v_id) {
                console.warn("El usuario no tiene un ID válido");
                loading = false;
                return;
            }

            // Solicitud al backend
            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_user/${v_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            const response2 = await fetch(
                `https://proyectomascotas.onrender.com/get_discapacitadoV_Usuario/${v_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            if (!response2.ok) {
                throw new Error("Error al obtener los datos del discapacitado");
            }

            usuario = await response.json();
            discapacitado = await response2.json();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });

    let flipped = false;
    function toggleCard() {
        flipped = !flipped;
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light py-3 mb-4">
    <a
        class="navbar-brand d-flex align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#Perfil_Usuario"
        href="#"
    >
        <img
            src="/logo.jpg"
            width="50"
            height="50"
            class="rounded-circle shadow-sm"
            alt="Logo SensuTrack"
        />
        <div class="d-flex flex-column">
            <span class="fw-bold text-dark">{usuario.nombre}</span>
            <small class="text-muted">SensuTrack</small>
        </div>
    </a>

    <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <i class="bi bi-list fs-2 text-primary"></i>
    </button>

    <div
        class="collapse navbar-collapse justify-content-end mt-2 mt-lg-0"
        id="navbarNav"
    >
        <ul class="navbar-nav align-items-center gap-2">
            <li class="nav-item">
                <a class="nav-link fw-semibold text-dark" href="/usuario">
                    <i class="bi bi-house-door-fill me-1"></i> Inicio
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-semibold text-dark" href="/registrar_GPS">
                    <i class="bi bi-plus-circle me-1"></i> Registrar GPS
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link fw-semibold text-dark" href="/tracking">
                    <i class="bi bi-geo-alt-fill me-1"></i> Ubicación en Vivo
                </a>
            </li>
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle fw-semibold text-dark"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i class="bi bi-person-circle me-1"></i> Usuario
                </a>
                <ul
                    class="dropdown-menu dropdown-menu-end rounded-3 shadow-sm"
                    aria-labelledby="navbarDropdown"
                >
                    <li>
                        <a
                            class="dropdown-item text-danger"
                            href="#"
                            on:click={logout}
                        >
                            <i class="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>

<!-- Inclusión de los iconos de Bootstrap (por ejemplo, para los iconos de la barra de navegación) -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

<!-- Modal -->
<div
    class="modal fade"
    id="Perfil_Usuario"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Perfil_UsuarioLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <!-- Encabezado -->
            <div
                class="modal-header text-white p-4 rounded-top-4"
                style="background: linear-gradient(135deg, #4e54c8, #8f94fb);"
            >
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-person-circle fs-1"></i>
                    <div>
                        <h4
                            class="modal-title m-0 fw-bold"
                            id="Perfil_UsuarioLabel"
                        >
                            {#if flipped}Datos del Discapacitado{:else}Perfil de
                                Usuario{/if}
                        </h4>
                        <small class="text-white-50"
                            >{#if flipped}Información de la persona asociada{:else}Datos
                                personales del usuario actual{/if}</small
                        >
                    </div>
                </div>
                <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                ></button>
            </div>

            <!-- Cuerpo de la carta -->
            <div class="modal-body bg-light p-4">
                <div class="flip-card-container" class:flipped>
                    <div class="flip-card">
                        <!-- Cara frontal: Usuario -->
                        <div class="card-face card-front">
                            {#if loading}
                                <p class="text-center">Cargando...</p>
                            {:else}
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Nombre</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={usuario.nombre}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Apellido</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={usuario.apellido}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Correo</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={usuario.email}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Documento</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={usuario.documento}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Teléfono</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={usuario.telefono}
                                        />
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <!-- Cara trasera: Discapacitado -->
                        <div class="card-face card-back">
                            {#if loading}
                                <p class="text-center">Cargando...</p>
                            {:else}
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Nombre</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={discapacitado.nombre}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Documento</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={discapacitado.documento}
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Tipo de Ceguera</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={
                                                discapacitado.tipo_ceguera
                                            }
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="" class="form-label"
                                            >Genero</label
                                        >
                                        <input
                                            class="form-control"
                                            readonly
                                            bind:value={discapacitado.genero}
                                        />
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pie -->
            <div
                class="modal-footer bg-white rounded-bottom-4 border-0 px-4 py-3"
            >
                <button
                    type="button"
                    class="btn btn-secondary"
                    on:click={toggleCard}
                >
                    {#if flipped}Ver Usuario{:else}Ver Discapacitado{/if}
                </button>
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                >
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Estilos CSS -->
<style>
    /* Modal Carta */
    /* Contenedor principal */
    .flip-card-container {
        position: relative;
        width: 100%;
        height: 100%;
        perspective: 1500px;
        min-height: 320px;
    }

    /* Tarjeta que rota */
    .flip-card {
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        position: relative;
    }

    /* Aplicar rotación */
    .flip-card-container.flipped .flip-card {
        transform: rotateY(180deg);
    }

    /* Cada cara de la tarjeta */
    .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        padding: 15px 0;
        transition: opacity 0.4s;
    }

    /* Frente visible por defecto */
    .card-front {
        z-index: 2;
    }

    /* Parte trasera girada */
    .card-back {
        transform: rotateY(180deg);
    }

    .navbar {
        backdrop-filter: blur(8px); /* efecto glass suave */
        background-color: rgba(
            255,
            255,
            255,
            0.95
        ); /* fondo blanco semitransparente */
        transition: all 0.3s ease;
        z-index: 1000;
        border: none;
    }

    .navbar-brand img {
        transition: transform 0.3s ease;
    }
    .navbar-brand img:hover {
        transform: scale(1.05);
    }

    .navbar-nav .nav-link {
        transition: all 0.3s ease;
        padding: 8px 14px;
        border-radius: 6px;
    }
    .navbar-nav .nav-link:hover {
        color: #0d6efd !important;
        background-color: rgba(13, 110, 253, 0.1);
        text-decoration: none;
    }

    .navbar-toggler {
        background-color: transparent;
        border: none;
        outline: none;
    }

    .dropdown-menu {
        min-width: 180px;
        border: none;
        padding: 10px 0;
        animation: fadeIn 0.2s ease-in-out;
    }
    .dropdown-menu .dropdown-item {
        transition: background-color 0.2s ease;
        padding: 10px 20px;
    }
    .dropdown-menu .dropdown-item:hover {
        background-color: #f1f3f5;
        border-radius: 5px;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive */
    @media (max-width: 991px) {
        .navbar-nav {
            text-align: center;
            gap: 10px;
        }
        .navbar-brand {
            margin-bottom: 10px;
        }
    }
</style>
