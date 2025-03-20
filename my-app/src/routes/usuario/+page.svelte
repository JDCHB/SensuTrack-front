<script>
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import Carrousel from "../../lib/components/carrousel.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import Icons from "../../lib/components/icons.svelte";
    import Productos from "../../lib/components/Productos.svelte";
    import Servicios from "../../lib/components/Servicios.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";

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

                miStorage.setItem("user_data", JSON.stringify(user_data));
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<NavbarUser></NavbarUser>

<Carrousel></Carrousel>

<ChatBot></ChatBot>

<Icons></Icons>

<Productos></Productos>

<Servicios></Servicios>

<Footer></Footer>
