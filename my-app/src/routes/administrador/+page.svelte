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
        window.location.href = "/login";
    };
</script>

<!-- HTML del menú de administrador -->
<div class="fondo">
    <div class="container mt-5">
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
                                <span>MODULOXROL</span>
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
        display: flex; /* Usamos flexbox */
        justify-content: center; /* Centra el contenido horizontalmente */
        align-items: center; /* Centra el contenido verticalmente */
        background-image: url("/FONDO-ADMIN.jpg");
        background-size: cover; /* Ajusta la imagen al tamaño del contenedor */
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh; /* Asegura que la imagen ocupe toda la pantalla */
    }

    /* Diseño para el menú de administrador */
    .admin-menu {
        border-radius: 15px;
        padding: 30px;
    }

    .admin-menu h2 {
        font-size: 1.75rem;
        font-weight: 600;
    }

    .admin-menu p {
        font-size: 1.1rem;
        font-weight: 500;
    }

    .admin-menu button {
        font-size: 1.1rem;
        font-weight: 500;
        padding: 15px 25px;
    }

    .admin-menu button i {
        font-size: 1.3rem;
        margin-left: 10px;
    }

    .btn-outline-danger:hover {
        background-color: #dc3545;
        color: white;
    }
</style>
