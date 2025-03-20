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
                let correo = sesionGoogle.email;
                let user_data = { name, id, correo };

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

                if (response.ok) {
                    const { access_token } = data;
                    localStorage.setItem("access_token", access_token);
                } else {
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

                miStorage.setItem("user_data", JSON.stringify(user_data));
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }

        // try {
        //     const response = await fetch(
        //         "https://proyectomascotas.onrender.com/generate_token_google",
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({}),
        //         },
        //     );
        //     const data = await response.json();

        //     if (response.ok) {
        //         const { access_token } = data;
        //         localStorage.setItem("access_token", access_token);
        //     } else {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Oops...",
        //             text:
        //                 data.detail ||
        //                 "Ha ocurrido un error al generar el token.",
        //             customClass: {
        //                 popup: "swal-popup", // Clase para personalizar el popup de la alerta
        //                 title: "custom-title", // Clase personalizada para el título
        //             },
        //         });
        //     }
        // } catch (error) {
        //     console.error("Error en la solicitud:", e.message);
        //     hideLoader(loginLoader);
        //     Swal.fire({
        //         icon: "error",
        //         title: "Error",
        //         text: "Hubo un problema al crear el Token.",
        //     });
        // }
    });
</script>

<NavbarUser></NavbarUser>

<Carrousel></Carrousel>

<ChatBot></ChatBot>

<Icons></Icons>

<Productos></Productos>

<Servicios></Servicios>

<Footer></Footer>
