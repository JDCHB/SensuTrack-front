<script>
    import Corrousel from "../../lib/components/corrousel.svelte";
    import Footer from "../../lib/components/footer.svelte";
    import Icons from "../../lib/components/icons.svelte";
    import Navbar2 from "../../lib/components/Navbar2.svelte";
    import Productos from "../../lib/components/Productos.svelte";
    import Servicios from "../../lib/components/Servicios.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<Navbar2></Navbar2>

<Corrousel></Corrousel>
<p>USUARIO NUEVO</p>
<Servicios></Servicios>
<Icons></Icons>

<Productos></Productos>
<Footer></Footer>
