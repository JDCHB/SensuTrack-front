<script>
    import { onMount } from "svelte";
    let todos = {};
    let vector = ["primary", "success", "danger", "warning"];

    const logout = () => {
        window.location.href = "/login";
    };

    onMount(async () => {
        let miStorage = window.localStorage;
        let usuario = JSON.parse(miStorage.getItem("user_data"));
        let id_rol = usuario.id_rol;
        console.log("probando ando", id_rol);
        const response = await fetch(
            "https://proyectomascotas.onrender.com/get_modulos_can_see",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_rol: id_rol,
                }),
            },
        );
        const data = await response.json();
        todos = data.resultado;
        console.log("Probando ando", todos);
    });
</script>

<!-- HTML del menú de administrador -->
<div class="container mt-5 pt-1">
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
                <div class="row">
                    {#each todos as todo, i}
                        <div class="col-6 mb-3">
                            <a
                                href={todo.ubicacion}
                                class="btn btn-lg btn-outline-{vector[
                                    i
                                ]} d-flex align-items-center justify-content-between w-100"
                            >
                                <span>{todo.nombre}</span>
                                <i class={todo.estilo}></i>
                            </a>
                        </div>
                    {/each}
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
