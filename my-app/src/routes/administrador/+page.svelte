<script>
    import { onMount } from "svelte";

    // Función que maneja el evento de clic en el botón
    const mostrarConfirmacionUser = () => {
        window.location.href = "/usuario";
    };

    const mostrarConfirmacionRegistroUsuario = () => {
        window.location.href = "/Registro_Admin_Usuario";
    };

    const mostrarConfirmacionReporte = () => {
        window.location.href = "/Admin_reportes";
    };

    const mostrarConfirmacionRegistroGPS = () => {
        window.location.href = "/Admin_Registro_GPS";
    };

    const mostrarTablaUsuarios = () => {
        window.location.href = "/Admin_Tabla_Usuarios";
    };

    const mostrarTablaCiegos = () => {
        window.location.href = "/Admin_Tabla_Ciegos";
    };

    const mostrarRegistroRoles = () => {
        window.location.href = "/Admin_Registro_Roles";
    };

    const mostrarRegistroModulos = () => {
        window.location.href = "/Admin_Registro_Modulo";
    };

    const mostrarRegistroModuloxRol = () => {
        window.location.href = "/Admin_Registro_ModuloxRol";
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
</script>

<!-- HTML del menú de administrador -->
<div class="fondo">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="admin-menu">
                    <h2 class="text-center mb-4 text-primary">
                        Menú de Super_Administrador
                    </h2>

                    <div class="text-center mb-4">
                        <p class="lead">
                            Bienvenido, Super_Admin. ¿A qué página deseas
                            ingresar?
                        </p>
                    </div>

                    <div class="row">
                        <div class="col-6 mb-3">
                            <button
                                on:click={mostrarConfirmacionUser}
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                            >
                                <span>VISTA DE USUARIO</span>
                                <i class="bi bi-person-video"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarConfirmacionRegistroUsuario}
                            >
                                <span>REGISTRAR USUARIO</span>
                                <i class="bi-person-add"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarConfirmacionReporte}
                            >
                                <span>REPORTES</span>
                                <i class="bi bi-file-earmark-spreadsheet"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarConfirmacionRegistroGPS}
                            >
                                <span>REGISTRAR GPS</span>
                                <i class="bi bi-geo-alt"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarTablaUsuarios}
                            >
                                <span>TABLA USUARIOS</span>
                                <i class="bi bi-table"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarTablaCiegos}
                            >
                                <span>TABLA CIEGOS</span>
                                <i class="bi bi-table"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarRegistroRoles}
                            >
                                <span>REGISTRAR ROLES</span>
                                <i class="bi bi-person-badge"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarRegistroModulos}
                            >
                                <span>REGISTRAR MODULOS</span>
                                <i class="bi bi-stack"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                                on:click={mostrarRegistroModuloxRol}
                            >
                                <span>ASIGNAR MODULO</span>
                                <i class="bi bi-shield-lock"></i>
                            </button>
                        </div>
                        <div class="col-6 mb-3">
                            <button
                                class="btn btn-lg btn-outline-danger d-flex align-items-center justify-content-between w-100"
                                on:click={logout}
                            >
                                <span>CERRAR SESION</span>
                                <i class="bi bi-power"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Incluir Bootstrap Icons para los iconos -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

<style>
    .fondo {
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("/FONDO-ADMIN.jpg");
        background-size: cover; /* Ajusta la imagen para cubrir todo */
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh; /* Altura completa de la pantalla */
        width: 100%; /* Ancho completo */
        padding: 20px;
        box-sizing: border-box; /* Para que padding no afecte el tamaño */
    }

    .admin-menu {
        border-radius: 15px;
        padding: 40px;
        max-width: 800px; /* Máximo ancho para que no se vea muy grande */
        width: 100%; /* Ancho completo para que se adapte */
        text-align: center; /* Centra el contenido */
        transition: all 0.3s ease; /* Suaviza las animaciones */
    }

    .admin-menu h2 {
        font-size: 2rem;
        font-weight: 600;
    }

    .admin-menu button {
        font-size: 1.2rem;
        padding: 15px;
        margin-bottom: 10px;
        width: 100%; /* Que los botones ocupen todo el ancho */
        transition: all 0.3s ease; /* Efecto suave al pasar el mouse */
    }

    .admin-menu button:hover {
        transform: scale(1.05); /* Pequeño efecto de escala */
    }

    @media (max-width: 768px) {
        .admin-menu {
            padding: 20px; /* Reduce el padding para móviles */
        }

        .admin-menu h2 {
            font-size: 1.5rem; /* Texto más pequeño */
        }

        .admin-menu button {
            font-size: 1rem;
            padding: 10px; /* Botones más pequeños */
        }
    }

    @media (max-width: 480px) {
        .admin-menu {
            padding: 15px; /* Más pequeño para teléfonos */
        }

        .admin-menu h2 {
            font-size: 1.2rem;
        }

        .admin-menu button {
            font-size: 0.9rem;
            padding: 8px;
        }
    }
</style>
