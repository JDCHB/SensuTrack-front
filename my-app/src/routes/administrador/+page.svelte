<script>
    import RegistroUSUAdmin from "../../lib/components/Admin/RegistroUsu.svelte";
    import Reportes from "../../lib/components/Admin/Reportes.svelte";
    import RegistroGPS from "../../lib/components/Admin/RegistroGPS.svelte";
    import TablaUsuarios from "../../lib/components/Admin/TablaUsuarios.svelte";
    import TablaCiegos from "../../lib/components/Admin/TablaCiegos.svelte";
    import RegistrarRoles from "../../lib/components/Admin/RegistroRoles.svelte";
    import RegistroModulos from "$lib/components/Admin/RegistroModulos.svelte";
    import PowerBi from "$lib/components/Admin/PowerBI.svelte";
    import HistorialUbi from "$lib/components/Admin/HistorialUbi.svelte";
    import ModuloxRol from "$lib/components/Admin/ModuloxRol.svelte";

    let expandido = false;
    let activeSection = "X"; // valor por defecto
    let registerLoader;

    function showLoader() {
        registerLoader.style.display = "flex";
    }

    function hideLoader() {
        registerLoader.style.display = "none";
    }

    function expandirSidebar() {
        expandido = true;
    }

    function colapsarSidebar() {
        expandido = false;
    }

    function logout() {
        localStorage.clear();
        window.location.href = "/login";
    }

    // Acciones disponibles
    function mostrarConfirmacionRegistroUsuario() {
        activeSection = "registro_usuario";
    }

    function mostrarConfirmacionReporte() {
        activeSection = "reportes";
    }
    function mostrarConfirmacionRegistroGPS() {
        activeSection = "registro_gps";
    }
    function mostrarTablaUsuarios() {
        activeSection = "tabla_usuarios";
    }
    function mostrarTablaCiegos() {
        activeSection = "tabla_discapacitados";
    }
    function mostrarRegistroRoles() {
        activeSection = "registro_roles";
    }
    function mostrarRegistroModulos() {
        activeSection = "registro_modulos";
    }
    function mostrarRegistroModuloxRol() {
        activeSection = "modulos_por_rol";
    }
    function mostrarTableroPowerBI() {
        activeSection = "tablero";
    }
    function mostrarHistorialUbicaciones() {
        activeSection = "historial_ubicaciones";
    }
</script>

<div class="layout">
    <!-- Sidebar -->
    <div
        class="sidebar"
        on:mouseenter={expandirSidebar}
        on:mouseleave={colapsarSidebar}
        role="navigation"
    >
        <div class="sidebar-header">
            {#if expandido}
                <h2>Super Admin</h2>
            {:else}
                <i class="bi bi-person-circle fs-3"></i>
            {/if}
        </div>

        <nav>
            <button on:click={mostrarConfirmacionRegistroUsuario}>
                <i class="bi bi-person-add"></i>
                {#if expandido}<span>Registrar Usuario</span>{/if}
            </button>
            <button on:click={mostrarConfirmacionReporte}>
                <i class="bi bi-file-earmark-spreadsheet"></i>
                {#if expandido}<span>Reportes</span>{/if}
            </button>
            <button on:click={mostrarConfirmacionRegistroGPS}>
                <i class="bi bi-geo-alt"></i>
                {#if expandido}<span>Registrar GPS</span>{/if}
            </button>
            <button on:click={mostrarTablaUsuarios}>
                <i class="bi bi-table"></i>
                {#if expandido}<span>Tabla Usuarios</span>{/if}
            </button>
            <button on:click={mostrarTablaCiegos}>
                <i class="bi bi-table"></i>
                {#if expandido}<span>Tabla Discapacitados</span>{/if}
            </button>
            <button on:click={mostrarRegistroRoles}>
                <i class="bi bi-person-badge"></i>
                {#if expandido}<span>Registrar Roles</span>{/if}
            </button>
            <button on:click={mostrarRegistroModulos}>
                <i class="bi bi-stack"></i>
                {#if expandido}<span>Registrar Módulos</span>{/if}
            </button>
            <button on:click={mostrarRegistroModuloxRol}>
                <i class="bi bi-shield-lock"></i>
                {#if expandido}<span>Asignar Módulo</span>{/if}
            </button>
            <!-- <button on:click={mostrarTableroPowerBI}>
                <i class="bi bi-graph-up"></i>
                {#if expandido}<span>Tablero</span>{/if}
            </button> -->
            <!-- <button on:click={mostrarHistorialUbicaciones}>
                <i class="bi bi-map"></i>
                {#if expandido}<span>Ubicaciones</span>{/if}
            </button> -->
            <button on:click={logout} class="logout">
                <i class="bi bi-power"></i>
                {#if expandido}<span>Cerrar Sesión</span>{/if}
            </button>
        </nav>
    </div>

    <!-- Contenido a la derecha -->
    <main class="content">
        {#if activeSection === "X"}
            <div class="admin-welcome">
                <h1>👋 ¡Bienvenido, Administrador!</h1>
                <p class="subtitle">
                    Este panel te permite tener el control total del sistema
                    para apoyar a las personas ciegas con eficiencia y
                    seguridad.
                </p>
            </div>
        {:else if activeSection === "registro_usuario"}
            <RegistroUSUAdmin
                on:showLoader={showLoader}
                on:hideLoader={hideLoader}
            ></RegistroUSUAdmin>

            <div class="loader-container" bind:this={registerLoader}>
                <div class="loader-text">
                    <span>S</span>
                    <span>e</span>
                    <span>n</span>
                    <span>s</span>
                    <span>u</span>
                    <span>T</span>
                    <span>r</span>
                    <span>a</span>
                    <span>c</span>
                    <span>k</span>
                </div>
            </div>
        {:else if activeSection === "reportes"}
            <Reportes></Reportes>
        {:else if activeSection === "registro_gps"}
            <RegistroGPS on:showLoader={showLoader} on:hideLoader={hideLoader}
            ></RegistroGPS>

            <div class="loader-container" bind:this={registerLoader}>
                <div class="loader-text">
                    <span>S</span>
                    <span>e</span>
                    <span>n</span>
                    <span>s</span>
                    <span>u</span>
                    <span>T</span>
                    <span>r</span>
                    <span>a</span>
                    <span>c</span>
                    <span>k</span>
                </div>
            </div>
        {:else if activeSection === "tabla_usuarios"}
            <TablaUsuarios></TablaUsuarios>
        {:else if activeSection === "tabla_discapacitados"}
            <TablaCiegos></TablaCiegos>
        {:else if activeSection === "registro_roles"}
            <RegistrarRoles
                on:showLoader={showLoader}
                on:hideLoader={hideLoader}
            ></RegistrarRoles>

            <div class="loader-container" bind:this={registerLoader}>
                <div class="loader-text">
                    <span>S</span>
                    <span>e</span>
                    <span>n</span>
                    <span>s</span>
                    <span>u</span>
                    <span>T</span>
                    <span>r</span>
                    <span>a</span>
                    <span>c</span>
                    <span>k</span>
                </div>
            </div>
        {:else if activeSection === "registro_modulos"}
            <RegistroModulos
                on:showLoader={showLoader}
                on:hideLoader={hideLoader}
            ></RegistroModulos>
            <div class="loader-container" bind:this={registerLoader}>
                <div class="loader-text">
                    <span>S</span>
                    <span>e</span>
                    <span>n</span>
                    <span>s</span>
                    <span>u</span>
                    <span>T</span>
                    <span>r</span>
                    <span>a</span>
                    <span>c</span>
                    <span>k</span>
                </div>
            </div>
        {:else if activeSection === "modulos_por_rol"}
            <ModuloxRol></ModuloxRol>
        {:else if activeSection === "tablero"}
            <PowerBi></PowerBi>
            <!-- {:else if activeSection === "historial_ubicaciones"}
            <HistorialUbi></HistorialUbi> -->
        {/if}
    </main>
</div>

<link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    rel="stylesheet"
/>

<style>
    /* Contenedor para el loader */
    .loader-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente */
        display: none; /* Oculto por defecto */
        justify-content: center;
        align-items: center;
        z-index: 100; /* Asegúrate de que esté encima de otros elementos */
    }

    /* Contenedor para el loader */
    .loader-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .loader-text {
        display: flex;
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #007bff; /* Color azul principal */
        animation: fadeIn 1.5s infinite alternate;
    }

    .loader-text span {
        animation: bounce 1.5s infinite ease-in-out;
        animation-delay: calc(0.1s * var(--i));
    }

    .loader-text span:nth-child(1) {
        --i: 1;
    }
    .loader-text span:nth-child(2) {
        --i: 2;
    }
    .loader-text span:nth-child(3) {
        --i: 3;
    }
    .loader-text span:nth-child(4) {
        --i: 4;
    }
    .loader-text span:nth-child(5) {
        --i: 5;
    }
    .loader-text span:nth-child(6) {
        --i: 6;
    }
    .loader-text span:nth-child(7) {
        --i: 7;
    }
    .loader-text span:nth-child(8) {
        --i: 8;
    }
    .loader-text span:nth-child(9) {
        --i: 9;
    }
    .loader-text span:nth-child(10) {
        --i: 10;
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-15px);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0.7;
        }
        100% {
            opacity: 1;
        }
    }

    /*HASTA AQUI*/
    .layout {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    .sidebar {
        height: 100vh;
        background-color: #1f2937;
        color: #f9fafb;
        width: 70px;
        transition: width 0.3s ease;
        overflow-y: auto; /* <-- scroll vertical cuando sea necesario */
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 0.5rem;
        border-right: 1px solid #374151;
    }

    .sidebar:hover {
        width: 240px;
    }

    .sidebar-header {
        text-align: center;
        margin-bottom: 1rem;
        font-weight: bold;
        color: #60a5fa;
    }

    /* Scrollbar moderno para el sidebar */
    .sidebar::-webkit-scrollbar {
        width: 6px;
    }

    .sidebar::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidebar::-webkit-scrollbar-thumb {
        background-color: #4b5563; /* gris suave */
        border-radius: 4px;
    }

    .sidebar:hover::-webkit-scrollbar-thumb {
        background-color: #9ca3af; /* gris claro en hover */
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1;
    }

    button {
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: background 0.2s ease;
        border-radius: 0.5rem;
    }

    button:hover {
        background-color: #374151;
    }

    button i {
        font-size: 1.2rem;
    }

    button span {
        white-space: nowrap;
    }

    .logout {
        margin-top: auto;
        color: #f87171;
    }

    .logout:hover {
        background-color: #7f1d1d;
        color: #fef2f2;
    }

    .content {
        flex: 1;
        padding: 2rem;
        background: #eeaeca;
        background: radial-gradient(
            circle,
            rgba(238, 174, 202, 1) 0%,
            rgba(148, 187, 233, 1) 100%
        );
        overflow-y: auto;
    }

    .content h1 {
        color: #111827;
    }

    /* VISTA ADMIN AL ENTRAR*/

    .admin-welcome {
        background-color: #ffffffcc;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        color: #1f2937;
        max-width: 800px;
        margin: auto;
        text-align: center;
    }

    .admin-welcome h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        color: #111827;
    }

    .admin-welcome .subtitle {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        color: #4b5563;
    }
</style>
