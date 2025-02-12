<script>
    import Carrousel from "$lib/components/carrousel.svelte";
    import Footer from "$lib/components/footer.svelte";
    import NavbarUser from "$lib/components/NavbarUser.svelte";
    import Servicios from "$lib/components/Servicios.svelte";
    import Productos from "$lib/components/Productos.svelte";
    import Icons from "$lib/components/icons.svelte";
    import "bootstrap-icons/font/bootstrap-icons.css";
</script>

<NavbarUser></NavbarUser>
<Carrousel></Carrousel>
<Icons></Icons>
<Productos></Productos>

<Servicios></Servicios>

<Footer></Footer>
