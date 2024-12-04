<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>

        <!--BOOSTRAP-->
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
        />

        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"
        ></script>

        <!--Scrip y link de sweet alert-->
        <script
            src="
    https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js
    "
        ></script>
        <link
            href="
    https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.min.css
    "
            rel="stylesheet"
        />
    </head>

    <script src="../../js/verificar_token.js"></script>
    <script>
        revisar_token();
        function borrar_sesion() {
            localStorage.clear();
        }
    </script>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="MenuAD.html" id="name">Navbar</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Gestionar servicios
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="create_servicios.html"
                                        >Crear servicio</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="consultar_servicios.html"
                                        >Consultar servicio</a
                                    >
                                </li>

                                <li></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Gestionar planes
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="create_planes.html"
                                        >Crear planes</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="consultar_planes.html"
                                        >Consultar planes</a
                                    >
                                </li>
                                <li></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Usuarios
                            </a>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="create_usuario.html"
                                        >Registrar usuario</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="asignar_rol.html">Asignar rol</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        href="consultar_usuario.html"
                                        >Consultar usuario</a
                                    >
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <a
                            class="btn btn-outline-success"
                            href="../../index.html"
                            type="button"
                            onclick="borrar_sesion()">Cerrar sesion</a
                        >
                    </form>
                </div>
            </div>
        </nav>
    </header>

    <script>
        function mostrar_nombre() {
            let miStorage = window.localStorage;
            let name = JSON.parse(miStorage.getItem("usuario"));
            let n = name.name;
            document.getElementById("name").text = n;
        }

        let estado_v = "";
        function lista() {
            mostrar_nombre();

            axios({
                method: "GET",
                url: "http://127.0.0.1:3000/getservicios",
            })
                .then(function (response) {
                    let tabla = $("#tablausuario").DataTable();
                    tabla.clear();
                    for (i = 0; i < response.data.length; i++) {
                        if (response.data[i].estado == 1) {
                            estado_v = "activo";
                            console.log("ss");
                        } else {
                            estado_v = "desactivado";
                        }
                        //que le moviste?

                        //nombre,descripcion, precio_adulto,precio_nino, costo, tipo_servicio, estado
                        tabla.row.add([
                            response.data[i].nombre,
                            response.data[i].descripcion,
                            response.data[i].precio_adulto,
                            response.data[i].precio_nino,
                            response.data[i].costo,
                            response.data[i].tipo_servicio,
                            estado_v,

                            '<a class="btn btn-outline-info" onclick="editar(\' ' +
                                response.data[i].id +
                                ' \')">  <b>Editar<b>    <a/> <a class="btn btn-outline-success" onclick="eliminar(\' ' +
                                response.data[i].id +
                                " ')\"><b>eliminar<b><a/>  ", /// cuarto elemento
                            //'<select class="btn ">   <option >Administrador</option>  <option>Usuario</option>    </select>'
                        ]);
                    }
                    tabla.draw();
                })
                .catch((err) => console.log("Error: ", err));

            //document.getElementById("nombre").value = "";
        }

        function editar(id) {
            ide = id;
            const v_editar = document.getElementById("card-servico");
            v_editar.removeAttribute("class");

            let ocultar = document.getElementById("Mostrarusuario");
            ocultar.setAttribute("class", "fade");

            id_servicio = id;

            const cambiar = ocultar.parentElement;

            cambiar.insertBefore(v_editar, ocultar);
            axios({
                method: "post",
                url: "http://127.0.0.1:3000/getservicios_editar",
                data: {
                    id: id_servicio,
                },
            })
                .then(function (response) {
                    //nombre,descripcion, precio_adulto,precio_nino, costo, tipo_servicio, estado

                    document.getElementById("nombre").value =
                        response.data[0].nombre;
                    document.getElementById("descripcion").value =
                        response.data[0].descripcion;
                    document.getElementById("precio_adulto").value =
                        response.data[0].precio_adulto;
                    document.getElementById("precio_nino").value =
                        response.data[0].precio_nino;
                    document.getElementById("costo").value =
                        response.data[0].costo;
                    document.getElementById("tipo_servicio").value =
                        response.data[0].tipo_servicio;
                    document.getElementById("estado").value =
                        response.data[0].estado;

                    // document.getElementById('estado').innerHTML = ' <select id="estado"> <option value="activo">activo</option> <option value="no activo">no activo</option> </select>'

                    console.log(response);

                    const v_edit_nombre = document.getElementById("nombre");
                    v_edit_nombre.focus();
                })
                .catch((err) => console.log("Error: ", err));
        }

        function eliminar(id) {
            console.log("ID para eliminar es" + id);
            let vestado = 0;
            let vid = id;
            console.log(vid);
            axios({
                method: "PUT",
                url: "http://127.0.0.1:3000/deleteservicio",
                data: {
                    estado: vestado,
                    id: vid,
                },
            })
                .then(function (response) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        iconColor: "#000000",
                        color: "white",
                        background: "green",
                        title: "Servicio eliminado",
                    });

                    setTimeout(() => {
                        location.reload();
                    }, 3500); //en milisegundos
                })
                .catch((err) => console.log("Error: ", err));
        }

        let vname = "";
        let vdescripcion = "";
        let vadulto = "";
        let vnino = "";
        let vcosto = "";
        let vtiposervicio = "";
        let vestado = "";
        var ide = 0;

        function actualizarservicio() {
            console.log(ide);
            vname = document.getElementById("nombre").value;
            vdescripcion = document.getElementById("descripcion").value;
            vadulto = document.getElementById("precio_adulto").value;
            vnino = document.getElementById("precio_nino").value;
            vcosto = document.getElementById("costo").value;
            vtiposervicio = document.getElementById("tipo_servicio").value;
            vestado = document.getElementById("estado").value;

            if (
                (vname != "") &
                (vdescripcion != "") &
                (vadulto != "") &
                (vnino != "") &
                (vcosto != "") &
                (vtiposervicio != "") &
                (vestado != "")
            ) {
                console.log(vadulto);
                axios({
                    method: "PUT",
                    url: "http://127.0.0.1:3000/update_servicios",
                    data: {
                        id: ide,
                        nombre: vname,
                        descripcion: vdescripcion,
                        precio_adulto: vadulto,
                        precio_nino: vnino,
                        costo: vcosto,
                        tipo_servicio: vtiposervicio,
                        estado: vestado,
                    },
                }).then(function (response) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        color: "white",
                        background: "green",
                        title: "Servicio actualizado",
                    });

                    setTimeout(() => {
                        location.reload();
                    }, 3500); //en milisegundos
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "error",
                    color: "white",
                    background: "red",
                    title: "llena todos los campos",
                });

                //en milisegundos
            }
        }
    </script>

    <body onload="lista()">
        <div
            class=" tab-pane"
            id="Mostrarusuario"
            role="tabpanel"
            aria-labelledby="nav-listado-tab"
        >
            <!--Mostrar usuarios-->
            <!--class="tab-pane fade" id="nav-listado" role="tabpanel" aria-labelledby="nav-listado-tab"-->
            <div class="container pt-4 text-black">
                <div class="row">
                    <div id="">
                        <!--nombre,descripcion, precio_adulto,precio_nino, costo, tipo_servicio, estado-->
                        <table
                            id="tablausuario"
                            class="table border"
                            style="width: 100%"
                        >
                            <!--style="width:100%"-->
                            <thead>
                                <tr class="table-hover">
                                    <th><b>Nombre</b></th>
                                    <th><b>Descripcion</b></th>
                                    <th><b>precio adulto</b></th>
                                    <th><b>precio nino</b></th>
                                    <th><b>costo</b></th>
                                    <th><b>tipo servicio</b></th>
                                    <th><b>estado</b></th>

                                    <th><b>Cambiar rol</b></th>
                                </tr>
                            </thead>
                            <tbody> </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <div class="fade" id="card-servico">
        <div
            class="row justify-content-center"
            role="tabpanel"
            aria-labelledby="nav-listado-tab"
        >
            <div class="container"></div>
            <div
                class="card border-dark shadow text-center"
                style="width: 50%;"
            >
                <div class="card-body">
                    <div class="card-header row g-2">
                        <h5 class="card-title col-lg-11">
                            <b>Editando Usuario</b>
                        </h5>
                        <a
                            class="btn btn-close col-lg-1"
                            href="consultar_servicios.html"
                        ></a>
                    </div>
                    <!---->
                    <img
                        class="pt-2"
                        src="../../img/Puente Pumarejo.jpg"
                        style="width: 750px; height:350px;"
                    />

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Nombre:</b></p>
                        </div>
                        <div class="col-lg-3">
                            <input type="text" id="nombre" />
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Descripcion:</b></p>
                        </div>
                        <div class="col-lg-3">
                            <textarea type="text" id="descripcion"></textarea>
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Precio adulto:</b></p>
                        </div>
                        <div class="col-lg-3">
                            <input type="number" id="precio_adulto" />
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>precio niño:</b></p>
                        </div>
                        <div class="col-lg-3">
                            <input type="number" id="precio_nino" />
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Costo:</b></p>
                        </div>
                        <div class="col-lg-3">
                            <input type="number" id="costo" />
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Tipo de servicio: </b></p>
                        </div>
                        <div class="col-lg-3">
                            <select
                                class="form-select"
                                id="tipo_servicio"
                                required
                            >
                                <option id="" value="" disabled selected
                                    >Seleccione...</option
                                >
                                <option value="Tercero">Externo</option>
                                <option value="Propio">Propio</option>
                            </select>
                        </div>
                    </div>

                    <div class="row pt-3">
                        <div class="col-lg-2">
                            <p class="card-text"><b>Estado:</b></p>
                        </div>

                        <div class="col-lg-3">
                            <select class="form-select" id="estado">
                                <option value="1">activo</option>
                                <option value="0">no activo</option>
                            </select>
                        </div>
                    </div>

                    <div class="row pt-3 px-1">
                        <!--   style="visibility: hidden"     o en bosstrap invisible-->
                        <div class="col-lg-2"></div>
                        <div class="col-lg-3 text-start">
                            <a
                                class="btn btn-outline-success"
                                onclick="actualizarservicio()"
                                ><b>Actualizar</b></a
                            >
                        </div>
                        <div id="estado" class="col-lg-10"></div>
                    </div>
                </div>

                <div class="card-footer">
                    <p class="text-orange text-center">
                        ¡Al terminar de editar, darle click en actualizar para
                        guardar los cambios!
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!--Axios-->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!--Link para el datatable-->
    <link
        href="https://cdn.datatables.net/v/dt/dt-1.13.6/datatables.min.css"
        rel="stylesheet"
    />
    <script
        src="https://cdn.datatables.net/v/dt/dt-1.13.6/datatables.min.js"
    ></script>

    <!--Script para poner poner el datable en español
<script type="text/javascript" src="../../Js/EditarTable.js"></script>
-->
</html>
