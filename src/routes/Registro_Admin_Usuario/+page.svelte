<script>
    import NavbarAd from "../../lib/components/NavbarAD.svelte";

    let v_password = "";
    let v_nombre = "";
    let v_apellido = "";
    let v_documento = "";
    let v_telefono = "";
    let v_email = "";
    let v_rol = "";
    let v_estado = true;
    let error = null;

    let registerLoader;

    function showLoader(loader) {
        if (loader) {
            loader.style.display = "flex";
        }
    }

    function hideLoader(loader) {
        if (loader) {
            loader.style.display = "none";
        }
    }

    async function Register() {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡Desea registrar un nuevo Usuario a PETTRACKER!?",
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

            if (result.isConfirmed) {
                showLoader(registerLoader);
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
                hideLoader(registerLoader);

                if (response.ok) {
                    Swal.fire({
                        title: "¡Registrado!,¡Bienvenid@ " + v_nombre + "!",
                        icon: "success",
                        customClass: {
                            popup: "swal-popup",
                            title: "custom-title",
                        },
                    });
                } else {
                    alert("Error en el registro");
                }
            } else {
                console.log("Registro Cancelado");
            }
        } catch (e) {
            error = e.message;
            hideLoader(registerLoader);
            alert("Error en la solicitud: " + error);
        }
    }
</script>

<NavbarAd></NavbarAd>

<div class="wrapper">
    <div class="title small-title" style="color: dodgerblue;">
        REGISTRO DE USUARIOS
    </div>
    <form on:submit|preventDefault={Register} class="class-form">
        <input class="form__input small-input" bind:value={v_nombre} placeholder="Nombre" type="text" required />
        <input class="form__input small-input" bind:value={v_apellido} placeholder="Apellido" type="text" required />
        <input class="form__input small-input" bind:value={v_documento} placeholder="Documento" type="text" required />
        <input class="form__input small-input" bind:value={v_telefono} placeholder="Telefono" type="text" required />
        <input class="form__input small-input" bind:value={v_email} placeholder="Correo Electronico" type="text" required />
        <input class="form__input small-input" bind:value={v_password} placeholder="Contraseña" type="password" required />
        <div class="form__input-wrapper">
