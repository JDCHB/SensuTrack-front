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
<div class="container mt-5 pt-1">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="admin-menu bg-white shadow-lg rounded p-4">
                <h2 class="text-center mb-4 text-primary">
                    Menú de Super_Administrador
                </h2>

                <div class="text-center mb-4">
                    <p class="lead">
                        Bienvenido, Super_Admin. ¿A qué página deseas ingresar?
                    </p>
                </div>

                <div class="row">
                    <div class="col-6 mb-3">
                        <button
                            on:click={mostrarConfirmacionUser}
                            class="btn btn-lg btn-outline-primary d-flex align-items-center justify-content-between w-100"
                        >
                            <span>VISTA DE USUARIO</span>
                            <i class="bi bi-person-circle"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-success d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarConfirmacionRegistroUsuario}
                        >
                            <span>REGISTRAR USUARIO</span>
                            <i class="bi bi-person-plus"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarConfirmacionReporte}
                        >
                            <span>REPORTES</span>
                            <i class="bi bi-gear-fill"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-warning d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarConfirmacionRegistroGPS}
                        >
                            <span>REGISTRAR COLLARES</span>
                            <i class="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-primary d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarTablaUsuarios}
                        >
                            <span>TABLA USUARIOS</span>
                            <i class="bi bi-person"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-success d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarRegistroRoles}
                        >
                            <span>REGISTRAR ROLES</span>
                            <i class="bi bi-person-plus"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-dark d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarRegistroModulos}
                        >
                            <span>REGISTRAR MODULOS</span>
                            <i class="bi bi-gear-fill"></i>
                        </button>
                    </div>
                    <div class="col-6 mb-3">
                        <button
                            class="btn btn-lg btn-outline-warning d-flex align-items-center justify-content-between w-100"
                            on:click={mostrarRegistroModuloxRol}
                        >
                            <span>MODULOXROL</span>
                            <i class="bi bi-plus-circle"></i>
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

<!-- Incluir Bootstrap Icons para los iconos -->
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

<style>
    /* Diseño para el menú de administrador */
    .admin-menu {
        background-color: #f9f9f9;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

    .btn-outline-primary:hover {
        background-color: #3085d6;
        color: white;
    }

    .btn-outline-success:hover {
        background-color: #28a745;
        color: white;
    }

    .btn-outline-danger:hover {
        background-color: #dc3545;
        color: white;
    }

    .btn-outline-warning:hover {
        background-color: #ffc107;
        color: white;
    }
</style>
