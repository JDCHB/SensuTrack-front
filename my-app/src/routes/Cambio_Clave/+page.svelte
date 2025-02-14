<script>
    const serviceID = "service_j9bousa";
    const templateID = "template_zszjdla";
    const apikey = "dFD1OdFitzwQblEX0";
    let cn1 = "";
    let vl_correo = "";
    let vr = 0;
    //Can change 7 to 2 for longer results.
    function codigo() {
        vr = (Math.random() + 1).toString(36).substring(4);
        return vr;
    }

    async function buscar_correo() {
        vl_correo = document.getElementById("correo").value; //

        try {
            const response = await fetch(
                "https://proyectomascotas.onrender.com/Validar_Correo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: vl_correo, // Enviar el valor como JSON
                    }),
                },
            );

            const data = await response.json();
            console.log(data);
            if (data && data.mensaje && data.mensaje.length > 0) {
                codigo(vr);

                emailjs.init(apikey);
                emailjs
                    .send(serviceID, templateID, {
                        r: vr,
                        email: vl_correo,
                    })
                    .then((result) => {})
                    .catch((error) => {});

                mostrarModalValidacion();
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Correo no encontrado",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function cambiar_contrasena() {
        try {
            const response = await fetch(
                "https://proyectomascotas.onrender.com/update_contraseña",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password: cn1,
                        email: vl_correo,
                    }),
                },
            );
            const data = await response.json();
            if (data[0].mensaje == "Contraseña actualizada exitosamente") {
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
                    title: "Contraseñass cambiada exitosamente",
                });

                setTimeout(() => {
                    window.location.href = "/usuario";
                }, 3500);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al cambiar la contraseña.",
                    icon: "error",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    function mostrarModalValidacion() {
        Swal.fire({
            title: "Validacion",
            html: `
                        <div class="card-header">Ingrese la clave enviada al correo<div/>
                        <input class="mt-2 form-control" id="ingaturrona"></input>
                    `,
            icon: "warning",
            showCancelButton: true,
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Validar",
        }).then((result) => {
            const f = document.getElementById("ingaturrona").value;
            if (result.isConfirmed) {
                if (f == vr) {
                    Swal.fire({
                        title: "Cambio de clave",
                        html: `
                                    <div class="card-header">Ingrese su nueva clave<div/>
                                    <input class="mt-2 form-control" id="clave_nueva_1"></input>
                                `,
                        icon: "warning",
                        allowOutsideClick: false,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Validar",
                    }).then((result) => {
                        cn1 = document.getElementById("clave_nueva_1").value;
                        if (result.isConfirmed) {
                            cambiar_contrasena(cn1);
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "El codigo es incorrecto... Por favor, intentalo de nuevo.",
                        icon: "error",
                    }).then(() => {
                        mostrarModalValidacion();
                    });
                }
            } else if (result.isDismissed) {
            }
        });
    }
</script>

<div class="container" style="margin-top: 10%;">
    <div
        style="text-align: center; margin-top: 4%; margin-bottom: 3%; "
        class="fs-3"
    >
        <b>Cambio de clave</b>
    </div>
    <div class="row justify-content-center g-2">
        <div class=" mx-5 col-md-6 mb-3">
            <p class="lead">
                Porfavor digite su correo electronico registrado en el sistema
            </p>
            <input
                type="text"
                class="form-control"
                placeholder="Correo"
                id="correo"
            />
        </div>
    </div>
    <div class="text-center">
        <button
            on:click={buscar_correo}
            type="button"
            class="btn btn-primary mt-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
        >
            Enviar
        </button>
    </div>
</div>
