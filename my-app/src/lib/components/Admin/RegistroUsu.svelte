<script>
    import { onMount, createEventDispatcher } from "svelte";

    let v_nombre = "";
    let v_apellido = "";
    let v_password = "";
    let Confirmar_Contraseña = "";
    let v_documento = "";
    let v_telefono = "";
    let v_email = "";
    let v_rol = "";
    let roles = [];
    let v_estado = true;
    let error = null;
    let registerLoader;

    onMount(async () => {
        const response = await fetch(
            "https://proyectomascotas.onrender.com/get_roles/",
        );
        const data = await response.json();
        roles = data.resultado;
        console.log(roles);
    });

    const dispatch = createEventDispatcher();

    async function Register() {
        Confirmar_Contraseña = document.getElementById(
            "Confirmar_Contraseña",
        ).value;

        if (Confirmar_Contraseña === v_password) {
            try {
                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Desea registrar un nuevo Usuario a SensuTrack!?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, registrar!",
                    customClass: {
                        popup: "swal-popup",
                        title: "custom-title",
                    },
                });

                // Convertir el rol seleccionado a número entero
                const id_rol = parseInt(v_rol, 10);

                // Validar que el rol es un número válido
                if (isNaN(id_rol)) {
                    alert("Por favor, seleccione un rol válido.");
                    dispatch("hideLoader"); // 🔥 cuando termina
                    return;
                }

                if (result.isConfirmed) {
                    dispatch("showLoader"); // 🔥 emitir evento personalizado

                    const response = await fetch(
                        "https://proyectomascotas.onrender.com/create_user",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: v_email,
                                password: v_password,
                                nombre: v_nombre,
                                apellido: v_apellido,
                                documento: v_documento,
                                telefono: v_telefono,
                                id_rol: v_rol,
                                estado: v_estado,
                            }),
                        },
                    );

                    const data = await response.json();
                    console.log("Respuesta del servidor:", data);
                    dispatch("hideLoader"); // 🔥 cuando termina

                    if (data.resultado === "Usuario creado") {
                        Swal.fire({
                            title: "¡Registrado!,¡Bienvenid@ " + v_nombre + "!",
                            icon: "success",
                            customClass: {
                                popup: "swal-popup",
                                title: "custom-title",
                            },
                        });
                    } else if (data.resultado === "El usuario ya existe") {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Lo sentimos, el usuario ya existe.",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "REGISTRO CANCELADO",
                        icon: "error",
                        customClass: {
                            popup: "swal-popup", // Clase para personalizar el popup de la alerta
                            title: "custom-title", // Clase personalizada para el título
                        },
                    });
                }
            } catch (e) {
                error = e.message;
                dispatch("hideLoader"); // 🔥 cuando termina
                alert("Error en la solicitud: " + error);
            }
        } else {
            Swal.fire({
                title: "Parece que ha ocurrido un error",
                text: "No son iguales las contraseñas, porfavor intente de nuevo :]",
                icon: "error",
                customClass: {
                    popup: "swal-popup", // Clase para personalizar el popup de la alerta
                    title: "custom-title", // Clase personalizada para el título
                },
            });
        }
    }
</script>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRO DE USUARIOS
    </div>
    <form on:submit|preventDefault={Register} class="class-form">
        <input
            class="form__input small-input"
            bind:value={v_nombre}
            placeholder="Nombre"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_apellido}
            placeholder="Apellido"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_documento}
            placeholder="Documento"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_telefono}
            placeholder="Telefono"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_email}
            placeholder="Correo Electronico"
            type="text"
            autocomplete="off"
            required
        />
        <input
            class="form__input small-input"
            bind:value={v_password}
            placeholder="Contraseña"
            type="password"
            autocomplete="off"
            required
        />

        <input
            class="form__input small-input"
            id="Confirmar_Contraseña"
            placeholder="Contraseña"
            type="password"
            autocomplete="off"
            required
        />
        <!-- Select para elegir el rol -->
        <select id="roles" class="form__select" bind:value={v_rol}>
            <option value="" disabled selected>Seleccione el Rol:</option>
            {#each roles as rol}
                <option value={rol.id}>{rol.nombre}</option>
            {/each}
        </select>
        <button class="flip-card__btn small-btn">Confirmar</button>
    </form>
</div>

<style>
    /*REGISTRO DE USUARIOS*/
    .wrapper {
        max-width: 500px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: #ffffff;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 1.8rem;
        font-weight: bold;
        color: #1e90ff;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .class-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form__input,
    .form__select {
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        transition: border-color 0.3s ease;
    }

    .form__input:focus,
    .form__select:focus {
        border-color: #1e90ff;
        outline: none;
    }

    .form__select {
        background-color: #f9f9f9;
    }

    .flip-card__btn {
        background-color: #1e90ff;
        color: white;
        border: none;
        padding: 0.75rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .flip-card__btn:hover {
        background-color: #187bcd;
    }
</style>
