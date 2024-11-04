<script>
    import Corrousel from "../../lib/components/corrousel.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import Icons from "../../lib/components/icons.svelte";
    import NavbarUser from "../../lib/components/NavbarUser.svelte";
    import Productos from "../../lib/components/Productos.svelte";
    import Servicios from "../../lib/components/Servicios.svelte";
    import Promociones from "../../lib/components/promociones.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<NavbarUser></NavbarUser>

<Corrousel></Corrousel>
<Promociones></Promociones>

<Servicios></Servicios>
<Icons></Icons>

<Footer></Footer>
