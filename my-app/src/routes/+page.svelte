<script>
    import Carrousel from "../lib/components/carrousel.svelte";
    import Footer from "../lib/components/footer.svelte";
    import Navbar from "../lib/components/Navbar.svelte";
    import Promociones from "../lib/components/promociones.svelte";
    import Servicios from "../lib/components/Servicios.svelte";
    import Banner from "../lib/components/banner.svelte";
    import ChatBot from "$lib/components/ChatBot.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<Navbar></Navbar>

<Carrousel></Carrousel>

<Promociones></Promociones>

<Servicios></Servicios>
<Banner></Banner>
<Footer></Footer>
<ChatBot></ChatBot>
<form method="post" action="?/OAuth2">
    <button
        type="submit"
        class="btn btn-primary btn-lg"
        style="background-color: #0082fb"
    >
        <i class="bi bi-google me-2"></i>Google
    </button>
</form>
