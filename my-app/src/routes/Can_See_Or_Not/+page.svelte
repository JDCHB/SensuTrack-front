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
<div class="fondo">
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="admin-menu">
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
