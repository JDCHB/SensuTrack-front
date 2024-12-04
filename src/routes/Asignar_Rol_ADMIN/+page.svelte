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
        <!-- Script de email.js-->
        <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        >
        </script>
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
        const serviceID = "service_2cyuhi6";
        const templateID = "template_3iecse6";
        const apikey = "6T5BO3EL6DVgLE1lr";

        function mostrar_nombre() {
            let miStorage = window.localStorage;
            let name = JSON.parse(miStorage.getItem("usuario"));
            let n = name.name;
            document.getElementById("name").text = n;
        }

        function lista() {
            mostrar_nombre();

            axios({
                method: "GET",
                url: "http://127.0.0.1:3000/getusuario",
            })
                .then(function (response) {
                    let tabla = $("#tablausuario").DataTable();
                    tabla.clear();
                    for (i = 0; i < response.data.length; i++) {
                        tabla.row.add([
                            response.data[i].id,
                            response.data[i].nombre,
                            response.data[i].apellido,
                            response.data[i].correo,
                            response.data[i].telefono,

                            //'<a class="btn btn-outline-info" onclick="administrativo(\' ' + response.data[i].id + ' \')">  <b>Administrativo<b>    <a/> <a class="btn btn-outline-success" onclick="user(\' ' + response.data[i].id + "," + response.data[i].correo + ' \')"><b>Usuario<b><a/>  '  /// cuarto elemento
                            '<a class="btn btn-primary" onclick="administrativo(' +
                                response.data[i].id +
                                ", '" +
                                response.data[i].correo +
                                "', '" +
                                response.data[i].nombre +
                                "')\" >Administrativo</a>" +
                                '<a class="btn btn-outline-success" onclick="user(' +
                                response.data[i].id +
                                ", '" +
                                response.data[i].correo +
                                "', '" +
                                response.data[i].nombre +
                                "')\" >Usuario</a>",

                            // '<select class="btn ">   <option >Administrador</option>  <option>Usuario</option>    </select>'
                        ]);
                    }
                    tabla.draw();
                })
                .catch((err) => console.log("Error: ", err));

            //document.getElementById("nombre").value = "";
        }

        let v_id_rol = 0;
        function administrativo(v_id, correo, nombre) {
            alert(nombre);
            v_id_rol = 2;

            emailjs.init(apikey);
            emailjs
                .send(serviceID, templateID, {
                    rol: "Administrativo",
                    name: nombre,
                    email: correo,
                })
                .then((result) => {
                    console.log("Correo enviado con exito");
                })
                .catch((error) => {
                    console.log("Error al enviar el correo:", error.text);
                });

            asignar_roles(v_id, v_id_rol);
        }

        function user(v_id, correo, nombre) {
            //UPDATE usuario SET id_rol=null where id=51

            v_id_rol = 3;

            emailjs.init(apikey);
            emailjs
                .send(serviceID, templateID, {
                    rol: "Usuario",
                    name: nombre,
                    email: correo,
                })
                .then((result) => {
                    console.log("Correo enviado con exito");
                })
                .catch((error) => {
                    console.log("Error al enviar el correo:", error.text);
                });

            asignar_roles(v_id, v_id_rol);
        }

        function asignar_roles(v_id, v_id_rol) {
            axios({
                method: "PUT",
                url: "http://127.0.0.1:3000/asignar_rol",
                data: {
                    id_rol: v_id_rol,
                    id: v_id,
                },
            })
                .then(function (response) {
                    if (response.data[0].informacion == "actualizado") {
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
                            iconColor: "white",
                            color: "white",
                            background: "green",
                            title: "Rol asignado exitosamente",
                        });

                        setTimeout(() => {
                            location.reload();
                        }, 3500); //en milisegundos
                    } else {
                    }
                })
                .catch((err) => console.log("Error: ", err));
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
                        <table
                            id="tablausuario"
                            class="table border"
                            style="width: 100%"
                        >
                            <!--style="width:100%"-->
                            <thead>
                                <tr class="table-hover">
                                    <th><b>Id</b></th>
                                    <th><b>Nombre</b></th>
                                    <th><b>Apellido</b></th>
                                    <th><b>Correo</b></th>
                                    <th><b>Telefono</b></th>
                                    <th><b>Asignar rol</b></th>
                                </tr>
                            </thead>
                            <tbody> </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>

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
