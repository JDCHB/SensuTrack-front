<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import Carrousel from "../../lib/components/carrousel.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import Icons from "../../lib/components/icons.svelte";
    import Productos from "../../lib/components/Productos.svelte";
    import Servicios from "../../lib/components/Servicios.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";
    import { onMount } from "svelte";
    let loading = true;
    let correo = "";
    let todos = {};
    let v_id = "";

    onMount(async () => {
        try {
            // Verifica si hay una sesión de Google en las cookies
            let cookies = document.cookie
                .split("; ")
                .find((row) => row.startsWith("sesionGoogle="));

            if (cookies) {
                let sesionGoogleRaw = cookies.split("=")[1];
                let sesionGoogle = JSON.parse(
                    decodeURIComponent(sesionGoogleRaw),
                );

                // Guarda los datos de la sesión en el localStorage
                console.log("Sesión decodificada:", sesionGoogle);
                let miStorage = window.localStorage;
                let name = sesionGoogle.nombre;
                let apellido = sesionGoogle.apellido;
                let id = sesionGoogle.id;
                correo = sesionGoogle.email;
                console.log(correo);
                let user_data = { name, id, correo };
                miStorage.setItem("user_data", JSON.stringify(user_data));

                const response = await fetch(
                    "https://proyectomascotas.onrender.com/generate_token_google",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: correo,
                        }),
                    },
                );
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    const { access_token } = data;
                    localStorage.setItem("access_token", access_token);
                    console.log("AAAAAAQUIIIII", access_token);
                } else {
                    localStorage.removeItem("access_token"); // Asegurar que no haya un token inválido
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text:
                            data.detail ||
                            "Ha ocurrido un error al generar el token.",
                        customClass: {
                            popup: "swal-popup", // Clase para personalizar el popup de la alerta
                            title: "custom-title", // Clase personalizada para el título
                        },
                    });
                }
            } else {
                console.log("No se encontró sesión de Google en las cookies.");
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }

        try {
            let miStorage = window.localStorage;
            let usuario = JSON.parse(miStorage.getItem("user_data"));
            v_id = usuario?.id || "";
            console.log(
                "ESSSSSSSSTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
                v_id,
            );
            if (!v_id) return;

            //AHORA BUSQUEMOS LOS DATOS DEL USUARIO

            const response = await fetch(
                `https://proyectomascotas.onrender.com/get_user/${v_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(
                "PARECE QUE SI ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            );
            usuario = await response.json();
            console.log(
                "DATOS TOMADOS DEL USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
                usuario,
            );
        } catch (error) {}
    });
</script>

<NavbarUser></NavbarUser>

<Carrousel></Carrousel>

<ChatBot></ChatBot>

<Icons></Icons>

<Productos></Productos>

<Servicios></Servicios>

<Footer></Footer>
