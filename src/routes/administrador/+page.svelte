<script>
    import { onMount } from "svelte";

    // Función que maneja el evento de clic en el botón
    const mostrarConfirmacionUser = () => {
        Swal.fire({
            title: "¿Desea ver la vista de Usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ingresar!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Bienvenido a la vista de Usuario!",
                    icon: "success",
                });
                // Redirigir a la página de usuario
                window.location.href = "/usuario";
            }
        });
    };

    const mostrarConfirmacionReporte = () => {
        Swal.fire({
            title: "¿Desea revisar los Reportes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ingresar!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Bienvenido a la vista de Reportes!",
                    icon: "success",
                });
                // Redirigir a la página de usuario
                window.location.href = "/Admin_reportes";
            }
        });
    };

    const mostrarConfirmacionRegistroUsuario = () => {
        Swal.fire({
            title: "¿Desea ir a la pagina de Registro de Usuarios?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ingresar!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Bienvenido a la vista de Usuario!",
                    icon: "success",
                });
                // Redirigir a la página de usuario
                window.location.href = "/Registro_Admin_Usuario";
            }
        });
    };

    const logout = () => {
        Swal.fire({
            title: "¿Desea cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, cerrar sesión!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Adios, que tenga buen dia!",
                    icon: "success",
                });
                localStorage.clear();
                window.location.href = "/login"; // Redirigir a la página de login
            }
        });
    };
</script>

<!-- HTML del menú de administrador -->
<div class="container mt-5 pt-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="admin-menu bg-white shadow-lg rounded p-4">
                <h2 class="text-center mb-4 text-primary">
                    Menú de Administrador
                </h2>

                <div class="text-center mb-4">
                    <p class="lead">
                        Bienvenido, Administrador. ¿A qué página deseas
                        ingresar?
                    </p>
                </div>

                <div class="d-grid gap-3">
                    <button
                        on:click={mostrarConfirmacionUser}
                        class="btn btn-lg btn-outline-primary d-flex align-items-center justify-content-between"
                    >
                        <span>USUARIO</span>
                        <i class="bi bi-person-circle"></i>
                    </button>

                    <button
                        class="btn btn-lg btn-outline-success d-flex align-items-center justify-content-between"
                        on:click={mostrarConfirmacionRegistroUsuario}
                    >
                        <span>REGISTRAR USUARIO</span>
                        <i class="bi bi-box"></i>
                    </button>

                    <button
                        class="btn btn-lg btn-outline-danger d-flex align-items-center justify-content-between"
                        on:click={mostrarConfirmacionReporte}
                    >
                        <span>REPORTES</span>

                        <i class="bi bi-bar-chart-line"></i>
                    </button>

                    <button
                        class="btn btn-lg btn-outline-warning d-flex align-items-center justify-content-between"
                    >
                        <span>CONFIGURACIONES</span>
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    <button
                        class="btn btn-lg btn-outline-danger d-flex align-items-center justify-content-between"
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
