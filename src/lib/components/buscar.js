let inform = {}
//lISTA USUARIOS
function lista() {

    let tabla = document.getElementById("tablacontacs");
    tabla.innerHTML = '';
    let etiquetasFila = tabla.insertRow();

    let id = etiquetasFila.insertCell(0);
    id.innerHTML = "<b>id<b>";

    let nombre = etiquetasFila.insertCell(1);
    nombre.innerHTML = "<b>Nombre<b>";

    let correo = etiquetasFila.insertCell(2);
    correo.innerHTML = "<b>Correo<b>";

    let estado = etiquetasFila.insertCell(3);
    estado.innerHTML = "<b>Estado<b>";

    let opcion = etiquetasFila.insertCell(4);
    opcion.innerHTML = "<b>Estado<b>";

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlista',

    }).then(function (response) {

        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla)
            let nuevaFila = tabla.insertRow(tabla.lenght);

            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].id; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].nombre; /// segundo elemento

            cell2 = nuevaFila.insertCell(2);
            cell2.innerHTML = response.data[i].correo;  /// tercer elemento

            cell3 = nuevaFila.insertCell(3);
            cell3.innerHTML = response.data[i].estado;  /// tercer elemento

            cell4 = nuevaFila.insertCell(4);
            cell4.innerHTML = '<a class="btn btn-outline-orange" onclick="editar(\' ' + response.data[i].id + ' \')">  <b>Editar<b>    <a/> <a class="btn btn-outline-secondary" onclick="eliminar(\' ' + response.data[i].id + ' \')"><b>Eliminar<b><a/>      ';  /// cuarto elemento

        }

    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}

var ide_user_admin = 0
//EDITAR USUARIOS(ADMINISTRADOR)
function editar(id) {
    const v_editar = document.getElementById('nav-listado');
    v_editar.removeAttribute('class');
    console.log(v_editar)

    let ocultar = document.getElementById('Mostrarusuario')
    ocultar.setAttribute("class", "fade")
    console.log(ocultar)
    ide_user_admin = id//Identificacion del usuario , y admin para saber que es el administrador el que esta manipulando esta parte
    //Parent para acceder al elemento padre, en este caso el elemento padre esbody, y ahora puedo manipular lo que este dentro del body
    const cambiar = ocultar.parentElement;
    console.log(cambiar)

    cambiar.insertBefore(v_editar, ocultar);

    console.log(id)
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/datosuser',
        data: {
            id: id
        }
    }).then(function (response) {
        document.getElementById('nombres').value = response.data[0].nombre;
        document.getElementById('direccion').value = response.data[0].direccion;
        document.getElementById('correo').value = response.data[0].correo;
        document.getElementById('estado').innerHTML = ' <select id="estado"> <option value="activo">activo</option> <option value="no activo">no activo</option> </select>'
        console.log(response)

        const v_edit_nombre = document.getElementById('nombres');
        v_edit_nombre.removeAttribute('readonly');
        v_edit_nombre.focus();

        const v_edit_direccion = document.getElementById('direccion');
        v_edit_direccion.removeAttribute('readonly');


        const v_edit_correo = document.getElementById('correo');
        v_edit_correo.removeAttribute('readonly');


    }).catch(err => console.log('Error: ', err))

}
//--Actualizar los datos de los usuarios(ADMINISTRADOR)
function actualizarLosDatos() {
    let vnombre = document.getElementById('nombres').value;
    let vdireccion = document.getElementById('direccion').value;
    let vcorreo = document.getElementById('correo').value;
    let vestado = document.getElementById('estado').value;
    console.log(vestado)

    //-----------Ya no sirve
    const no_edit_nombre = document.getElementById('nombres');
    no_edit_nombre.setAttribute("readonly", "");

    const no_edit_direccion = document.getElementById('direccion');
    no_edit_direccion.setAttribute("readonly", "");

    const no_edit_correo = document.getElementById('correo');
    no_edit_correo.setAttribute("readonly", "");
    console.log(ide_user_admin)
    //-----------




    axios({

        method: 'PUT',
        url: 'http://127.0.0.1:3000//update/<id>',
        data: {
            name: vnombre,
            direccion: vdireccion,
            correo: vcorreo,
            id: ide_user_admin,
            estado: vestado
        }


    }).then(function (response) {
        alert("Actualizado")
        const v_editar = document.getElementById('nav-listado');
        v_editar.setAttribute("class", "fade");


        let ocultar = document.getElementById('Mostrarusuario')
        ocultar.removeAttribute('class')


        console.log("HOLA")
        console.log(ocultar)

        const cambiar = v_editar.parentElement;
        cambiar.insertBefore(ocultar, v_editar);

        lista()



    })


}


//Buscar a los usuarios por parte del administrador
function Buscar() {
    let tabla = document.getElementById("tablacontacs");
    tabla.innerHTML = '';
    let etiquetasFila = tabla.insertRow();

    let id = etiquetasFila.insertCell(0);
    id.innerHTML = "<b>id<b>";

    let nombre = etiquetasFila.insertCell(1);
    nombre.innerHTML = "<b>Nombre<b>";

    let correo = etiquetasFila.insertCell(2);
    correo.innerHTML = "<b>Correo<b>";

    let estado = etiquetasFila.insertCell(3);
    estado.innerHTML = "<b>Estado<b>";

    const vnombre = document.getElementById("nombre").value;

    let opcion = etiquetasFila.insertCell(4);
    opcion.innerHTML = "<b>Opcion<b>"

    axios({

        method: 'POST',
        url: 'http://127.0.0.1:3000/Buscarusuario',
        data: {
            name: vnombre
        }

    }).then(function (response) {

        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla)
            let nuevaFila = tabla.insertRow(tabla.lenght);

            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].id; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].nombre; /// segundo elemento

            cell2 = nuevaFila.insertCell(2);
            cell2.innerHTML = response.data[i].correo;  /// tercer elemento

            cell3 = nuevaFila.insertCell(3);
            cell3.innerHTML = response.data[i].estado;  /// tercer elemento
            cell4 = nuevaFila.insertCell(4);
            cell4.innerHTML = '<a class="btn btn-outline-orange" onclick="editar(\' ' + response.data[i].id + ' \')">  <b>Editar<b>    <a/> <a class="btn btn-outline-secondary">  <b>Eliminar<b>    <a/>      ';  /// cuarto elemento

        }


    }).catch(err => console.log('Error: ', err))

}



//---------------------------------------Eliminar por parte del administrador
function eliminar(id) {
    console.log("ID para eliminar es" + id)
    let vid = id
    console.log(vid)
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/deleteUser',
        data: {
            id: vid
        }


    }).then(function (response) {

        alert("Usuario eliminado")
        lista()

    }).catch(err => console.log('Error: ', err))



}
//-------------------------------------------------------------------HASTA AQUI LLEGA EL CODIGO DE GESTION DE USUARIO--------------------------------------------------------------------
//-------------------------------------------------------------------HASTA AQUI LLEGA EL CODIGO DE GESTION DE USUARIO--------------------------------------------------------------------
//-------------------------------------------------------------------HASTA AQUI LLEGA EL CODIGO DE GESTION DE USUARIO--------------------------------------------------------------------



//-------------------------------------------------------------------Aqui empieza la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------
//-------------------------------------------------------------------Aqui empieza la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------
//-------------------------------------------------------------------Aqui empieza la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------
function listaEntrenador() {
    //espera   mira estetruco de magia, 1,23
    let tabla = document.getElementById("tablaentrenador");
    tabla.innerHTML = '';

    let etiquetasFila = tabla.insertRow();

    let id = etiquetasFila.insertCell(0);
    id.innerHTML = "<b>Id<b>";

    let nombre = etiquetasFila.insertCell(1);
    nombre.innerHTML = "<b>Nombre<b>";

    let direccion = etiquetasFila.insertCell(2);
    direccion.innerHTML = "<b>Direccion<b>";

    let correo = etiquetasFila.insertCell(3);
    correo.innerHTML = "<b>Correo<b>";

    let especialidad = etiquetasFila.insertCell(4);
    especialidad.innerHTML = "<b>Especialidad<b>";

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlistaEntrenador',

    }).then(function (response) {

        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla)
            let nuevaFila = tabla.insertRow(tabla.lenght);
            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].id; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].nombre; /// segundo elemento

            cell2 = nuevaFila.insertCell(2);
            cell2.innerHTML = response.data[i].direccion;  /// tercer elemento

            cell3 = nuevaFila.insertCell(3);
            cell3.innerHTML = response.data[i].correo;  /// cuarto elemento

            cell4 = nuevaFila.insertCell(4);
            cell4.innerHTML = response.data[i].Especialidad;  /// quinto elemento


            /*
              cell4  = nuevaFila.insertCell(4);
                cell4.innerHTML =   `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
                    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;
            */

        }
        // 
    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}







function actualizar(nombre) {
    alert("Enviando solicitud al entrenador: " + nombre)

}



var i = -1
var imagenesEntrenador = ["../../img/gym4.jpg", "../../img/gym5.png", "../../img/gym8.jpg"];
var imagenActual = 0;
var k = 0
var activo = false
var nombre
function listaEntrenadorAnterior() {//Lista de entrenadores por parte del usuario



    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlistaEntrenador',

    }).then(function (response) {
        /*
         if (i >= response.data.length) {  
             i = 0;
             
         }*/
        //alert(i)//Empieza con 6, y finaliza con 3
        if (imagenActual >= imagenesEntrenador.length) {
            imagenActual = 0;
        }

        j = k

        console.log("final", i)
        if (j > 0) {
            console.log(i)
            console.log("k:", k)





            console.log("1:", k)
            k = k - 1
            i = k
            document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre3').innerText = response.data[k].nombre;
            document.getElementById('Direccion3').innerText = response.data[k].direccion;
            document.getElementById('Correo3').innerText = response.data[k].correo;
            const V_Valoracion3 = response.data[k].Valoracion;


            contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador3) {
                    document.getElementById((i + 1) + nombre3).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre3).style.color = 'gray';
                }
            }


            document.getElementById('Estado3').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[k].id + ' \')  "  > Enviar solicitud </a> ';
            k = k - 1


            imagenActual = imagenActual + 1;



            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }


            document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre2').innerText = response.data[k].nombre;
            document.getElementById('Direccion2').innerText = response.data[k].direccion;
            document.getElementById('Correo2').innerText = response.data[k].correo;

            const V_Valoracion2 = response.data[k].Valoracion;


            contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador2) {
                    document.getElementById((i + 1) + nombre2).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre2).style.color = 'gray';
                }
            }



            document.getElementById('Estado2').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[k].id + ' \')  "  > Enviar solicitud </a> ';
            k = k - 1
            imagenActual = imagenActual + 1;



            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }



            document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre').innerText = response.data[k].nombre;
            document.getElementById('Direccion').innerText = response.data[k].direccion;
            document.getElementById('Correo').innerText = response.data[k].correo;

            const V_Valoracion = response.data[k].Valoracion;


            contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre = 'estrella1';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador) {
                    document.getElementById((i + 1) + nombre).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre).style.color = 'gray';
                }
            }


            document.getElementById('Estado').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[k].id + ' \')  "  > Enviar solicitud </a> ';
            //i = k
            imagenActual = imagenActual + 1;


            console.log(i)

            console.log(response)
        }






    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}

function actualizar(nombre) {
    alert("Enviando solicitud al entrenador: " + nombre)

}



function listaEntrenadorSiguiente() {//Lista de entrenadores por parte del usuario
    document.getElementById("tablaSolicitud").style.display = "none";
    document.getElementById("nav-nuevo").style = "1px solid black";

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlistaEntrenador',

    }).then(function (response) {

        if (activo == false) {
            console.log("dfsd")
            let i2 = 0

            document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre').innerText = response.data[i2].nombre;
            document.getElementById('Direccion').innerText = response.data[i2].direccion;
            document.getElementById('Correo').innerText = response.data[i2].correo;
            const V_Valoracion = response.data[i2].Valoracion;


            contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre = 'estrella1';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador) {
                    document.getElementById((i + 1) + nombre).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre).style.color = 'gray';
                }
            }



            document.getElementById('Estado').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i2].id + ' \')  "  > Enviar solicitud </a> ';



            //document.getElementById('Estado').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"   onclick="solicitud(\' '+response.data[i2].nombre+ ' \')  " > Enviar solicitud </a>';
            /* `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
             <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;
             
             
               cell4.innerHTML = '<a class="btn btn-secondary " onclick="actualizar(\' ' + response.data[i].nombre + ' \')">Enviar solicitud</a>';
            
               
                \'   \'    ----- Representa una comilla simple dentro de una cadena delimitada por comillas simples.(?)
                        ----- Esto evita que la comilla se interprete como el fin de la cadena. 
            */

            i2 = i2 + 1
            imagenActual = imagenActual + 1;

            document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre2').innerText = response.data[i2].nombre;
            document.getElementById('Direccion2').innerText = response.data[i2].direccion;
            document.getElementById('Correo2').innerText = response.data[i2].correo;
            document.getElementById('Estado2').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i2].id + ' \')  "  > Enviar solicitud </a> ';

            const V_Valoracion2 = response.data[i2].Valoracion;


            let contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador2) {
                    document.getElementById((i + 1) + nombre2).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre2).style.color = 'gray';
                }
            }





            i2 = i2 + 1
            imagenActual = imagenActual + 1;


            document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre3').innerText = response.data[i2].nombre;
            document.getElementById('Direccion3').innerText = response.data[i2].direccion;
            document.getElementById('Correo3').innerText = response.data[i2].correo;


            const V_Valoracion3 = response.data[i2].Valoracion;


            let contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            console.log("s", contador3)
            let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd 
            for (let i = 0; i < 5; i++) {
                if (i < contador3) {
                    document.getElementById((i + 1) + nombre3).style.color = 'orange';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre3).style.color = 'gray';
                }
            }
            document.getElementById('Estado3').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i2].id + ' \')  "  > Enviar solicitud </a> ';





            imagenActual = imagenActual + 1;
            activo = true //mano ya la dejo hasta aca, q quien esta logeando
        } else {


            console.log("ñ", i)


            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }

            j = i

            if (j < 0) {
                i = 2
            }

            console.log("j", response.data.length)
            while (i + 1 < response.data.length) {
                console.log("HOLA")
                i = i + 1
                k = i
                document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre').innerText = response.data[i].nombre;
                document.getElementById('Direccion').innerText = response.data[i].direccion;
                document.getElementById('Correo').innerText = response.data[i].correo;
                const V_Valoracion = response.data[i].Valoracion;


                contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre = 'estrella1';//captura el nombre, el numero fue capturado arriba xd 
                for (let i = 0; i < 5; i++) {
                    if (i < contador) {
                        document.getElementById((i + 1) + nombre).style.color = 'orange';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre).style.color = 'gray';
                    }
                }







                document.getElementById('Estado').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i].id + ' \')  "  > Enviar solicitud </a> ';
                i = i + 1

                imagenActual = imagenActual + 1;



                if (imagenActual >= imagenesEntrenador.length) {
                    imagenActual = 0;
                }


                document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre2').innerText = response.data[i].nombre;
                document.getElementById('Direccion2').innerText = response.data[i].direccion;
                document.getElementById('Correo2').innerText = response.data[i].correo;
                const V_Valoracion2 = response.data[i].Valoracion;


                contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd 
                for (let i = 0; i < 5; i++) {
                    if (i < contador2) {
                        document.getElementById((i + 1) + nombre2).style.color = 'orange';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre2).style.color = 'gray';
                    }
                }


                document.getElementById('Estado2').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i].id + ' \')  "  > Enviar solicitud </a> ';
                i = i + 1
                imagenActual = imagenActual + 1;



                if (imagenActual >= imagenesEntrenador.length) {
                    imagenActual = 0;
                }



                document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre3').innerText = response.data[i].nombre;
                document.getElementById('Direccion3').innerText = response.data[i].direccion;
                document.getElementById('Correo3').innerText = response.data[i].correo;
                const V_Valoracion3 = response.data[i].Valoracion;


                contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd 
                for (let i = 0; i < 5; i++) {
                    if (i < contador3) {
                        document.getElementById((i + 1) + nombre3).style.color = 'orange';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre3).style.color = 'gray';
                    }
                }


                document.getElementById('Estado3').innerHTML = '<a class="btn btn-outline-orange"   data-bs-toggle="modal" data-bs-target="#modal-enviar"  onclick="enviando(\' ' + response.data[i].id + ' \')  "  > Enviar solicitud </a> ';

                imagenActual = imagenActual + 1;


                console.log(i)

                console.log(response)
                break//

            }

        }








    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}

function solicitud(iden) {
    //alert("Enviando solicitud al entrenador "+ id+"...")
    const vid_entrenador = iden
    miStorage = window.localStorage;

    let usuario = JSON.parse(miStorage.getItem('usuario'));
    ide = usuario.id

    const vestado = 'Pendiente'
    console.log(iden)

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/solicitud',
        data: {
            id_usuario: ide,
            id_entrenador: vid_entrenador,
            estado: vestado
        },
    }).then(function (response) {

    }).catch(err => console.log('Error: ', err))
}

function enviada() {
    alert('Enviada')
    solicitud(iden)
}


var iden = 0
function enviando(id) {
    iden = id
}
//-------------------------------------------------------------------Aqui termina la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------
//-------------------------------------------------------------------Aqui termina la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------
//-------------------------------------------------------------------Aqui termina la solicitud de entrenadores por aprte del usuario--------------------------------------------------------------------









//------------------------------------------------------------------PARA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------
//------------------------------------------------------------------PARA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------
//------------------------------------------------------------------PARA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------
function lista_de_entrenador() {
    // toca editar es la parte de editar no? esta de aca mira
    //era el codigo de buscar usuario de html xd
    let tabla = document.getElementById("tablaentrenador");
    tabla.innerHTML = '';
    let etiquetasFila = tabla.insertRow();

    let id = etiquetasFila.insertCell(0);
    id.innerHTML = "<b>id<b>";

    let nombre = etiquetasFila.insertCell(1);
    nombre.innerHTML = "<b>Nombre<b>";


    let direccion = etiquetasFila.insertCell(2);
    direccion.innerHTML = "<b>direccion<b>";

    let correo = etiquetasFila.insertCell(3);
    correo.innerHTML = "<b>Correo<b>";

    let especialidad = etiquetasFila.insertCell(4);
    especialidad.innerHTML = "<b>Especialidad<b>";

    let estado = etiquetasFila.insertCell(5);
    estado.innerHTML = "<b>Estado<b>";

    let opcion = etiquetasFila.insertCell(6);
    opcion.innerHTML = "<b>Opcion<b>";

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlistaEntrenador',//aca, dale ahora a ver

    }).then(function (response) {

        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla)
            let nuevaFila = tabla.insertRow(tabla.lenght);

            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].id; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].nombre; /// segundo elemento

            cell2 = nuevaFila.insertCell(2);
            cell2.innerHTML = response.data[i].direccion; /// tercer elemento

            cell3 = nuevaFila.insertCell(3);
            cell3.innerHTML = response.data[i].correo;  /// cuarto elemento

            cell4 = nuevaFila.insertCell(4);
            cell4.innerHTML = response.data[i].Especialidad;  /// quinto elemento

            cell5 = nuevaFila.insertCell(5);
            cell5.innerHTML = response.data[i].estado;  /// sexto elemento

            cell6 = nuevaFila.insertCell(6);
            cell6.innerHTML = '<a class="btn btn-outline-orange" onclick="editar_entrenador(\' ' + response.data[i].id + ' \')">  <b>Editar<b>    <a/> <a class="btn btn-outline-secondary" onclick="eliminar_entrenador(\' ' + response.data[i].id + ' \')"><b>Eliminar<b><a/>      ';  /// cuarto elemento
            //
        }

    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}


var ide_etrenador_admin = 0
//---------------d---------------------------------------------------------------------------------------------
function editar_entrenador(id) {
    const v_editar = document.getElementById('nav-listado');
    v_editar.removeAttribute('class');
    console.log(v_editar)

    let ocultar = document.getElementById('Mostrarusuario')
    ocultar.setAttribute("class", "fade")
    console.log(ocultar)
    ide_etrenador_admin = id//Identificacion del entrenador

    const cambiar = ocultar.parentElement;
    console.log(cambiar)

    cambiar.insertBefore(v_editar, ocultar);

    console.log(id)
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/datosEntrenador',
        data: {
            id: id
        }
    }).then(function (response) {
        document.getElementById('nombres').value = response.data[0].nombre;
        document.getElementById('direccion').value = response.data[0].direccion;
        document.getElementById('correo').value = response.data[0].correo;
        document.getElementById('skill').value = response.data[0].Especialidad;
        document.getElementById('estado').innerHTML = ' <select id="estado"> <option value="activo">activo</option> <option value="no activo">no activo</option> </select>'
        console.log(response)

        const v_edit_nombre = document.getElementById('nombres');
        v_edit_nombre.removeAttribute('readonly');
        v_edit_nombre.focus();//vamos primero a python

        const v_edit_direccion = document.getElementById('direccion');
        v_edit_direccion.removeAttribute('readonly');


        const v_edit_correo = document.getElementById('correo');
        v_edit_correo.removeAttribute('readonly');

        const v_edit_especialidad = document.getElementById('skill'); //whatsapp
        v_edit_especialidad.removeAttribute('readonly');


    }).catch(err => console.log('Error: ', err))

}
//--Actualizar los datos de los usuarios
function actualizarLosDatos_entrenador() {
    let vnombre = document.getElementById('nombres').value;
    let vdireccion = document.getElementById('direccion').value;
    let vcorreo = document.getElementById('correo').value;
    let vskill = document.getElementById('skill').value;
    let vestado = document.getElementById('estado').value;
    console.log(vestado)

    /*/-----------Ya no sirve
    const no_edit_nombre = document.getElementById('nombres');
    no_edit_nombre.setAttribute("readonly", "");
    const no_edit_direccion = document.getElementById('direccion');
    no_edit_direccion.setAttribute("readonly", "");
    const no_edit_correo = document.getElementById('correo');
    no_edit_correo.setAttribute("readonly", "");
    console.log(ide_user_admin)
    *///-----------

    axios({

        method: 'PUT',
        url: 'http://127.0.0.1:3000/update/entrenador',
        data: {
            name: vnombre,
            direccion: vdireccion,
            correo: vcorreo,
            id: ide_etrenador_admin,
            estado: vestado,
            especialidad: vskill
        }
        //
    }).then(function (response) {
        alert("Actualizado")

        const v_editar = document.getElementById('nav-listado');
        v_editar.setAttribute("class", "fade");


        let ocultar = document.getElementById('Mostrarusuario')
        ocultar.removeAttribute('class')


        console.log("HOLA")
        console.log(ocultar)

        const cambiar = v_editar.parentElement;
        cambiar.insertBefore(ocultar, v_editar);

        lista_de_entrenador()
        //, no muestra informacion, abajo en la terminal, puedes ver el error, 405mmm, vamos a la funcion editar
    })

}


//Buscar a los usuarios por parte del administrador
function BuscarEntrenador() {
    let tabla = document.getElementById("tablaentrenador");
    tabla.innerHTML = '';
    let etiquetasFila = tabla.insertRow();

    let id = etiquetasFila.insertCell(0);
    id.innerHTML = "<b>id<b>";

    let nombre = etiquetasFila.insertCell(1);
    nombre.innerHTML = "<b>Nombre<b>";


    let direccion = etiquetasFila.insertCell(2);
    direccion.innerHTML = "<b>direccion<b>";

    let correo = etiquetasFila.insertCell(3);
    correo.innerHTML = "<b>Correo<b>";

    let especialidad = etiquetasFila.insertCell(4);
    especialidad.innerHTML = "<b>Especialidad<b>";

    let estado = etiquetasFila.insertCell(5);
    estado.innerHTML = "<b>Estado<b>";

    let opcion = etiquetasFila.insertCell(6);
    opcion.innerHTML = "<b>Opcion<b>";

    const vnombre = document.getElementById("nombres").value;

    axios({

        method: 'POST',
        url: 'http://127.0.0.1:3000/Buscarentrenador',
        data: {
            name: vnombre
        }

    }).then(function (response) {

        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            console.log(tabla)
            let nuevaFila = tabla.insertRow(tabla.lenght);//No e

            cell0 = nuevaFila.insertCell(0);
            cell0.innerHTML = response.data[i].id; /// primer elemento

            cell1 = nuevaFila.insertCell(1);
            cell1.innerHTML = response.data[i].nombre; /// segundo elemento

            cell2 = nuevaFila.insertCell(2);
            cell2.innerHTML = response.data[i].direccion; /// tercer elemento

            cell3 = nuevaFila.insertCell(3);
            cell3.innerHTML = response.data[i].correo;  /// cuarto elemento

            cell4 = nuevaFila.insertCell(4);
            cell4.innerHTML = response.data[i].Especialidad;  /// quinto elemento

            cell5 = nuevaFila.insertCell(5);
            cell5.innerHTML = response.data[i].estado;  /// sexto elemento

            cell6 = nuevaFila.insertCell(6);
            cell6.innerHTML = '<a class="btn btn-outline-orange" onclick="editar_entrenador(\' ' + response.data[i].id + ' \')">  <b>Editar<b>    <a/> <a class="btn btn-outline-secondary" onclick="eliminar_entrenador(\' ' + response.data[i].id + ' \')"><b>Eliminar<b><a/>      ';  /// cuarto elemento






        }


    }).catch(err => console.log('Error: ', err))

}



//---------------------------------------Eliminar(desactivar) por parte del administrador
function eliminar_entrenador(id) {
    console.log("ID para eliminar es" + id)
    let vid = id
    console.log(vid)
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/deleteEntrenador',
        data: {
            id: vid
        }


    }).then(function (response) {

        alert("Usuario eliminado")
        lista_de_entrenador()

    }).catch(err => console.log('Error: ', err))


}


//------------------------------------------------------------------AQUI TERMINA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------
//------------------------------------------------------------------AQUI TERMINA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------
//------------------------------------------------------------------AQUI TERMINA LA GESTION DE ENTRENADOR(ADMINISTRADOR)------------------------------------------------------------------------------------



//-----------------------------Entrenadores que aceptaron tu solicitud-----------------------------------------------------------
//-----------------------------Entrenadores que aceptaron tu solicitud-----------------------------------------------------------
//-----------------------------Entrenadores que aceptaron tu solicitud-----------------------------------------------------------

let inform3 = {}
let tabla3 = document.getElementById("tablaSolicitud");

function entrenador_aceptado() {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    console.log(ide)

    console.log("holaaaaaaaa4")

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/entrenadores_QueTe_Aceptaron',
        data: {
            id_usuario: ide,
        }

    }).then(function (response) {
        console.log("holaasasas")//
        document.getElementById("nav-nuevo").style.display = "none";
        document.getElementById("tablaSolicitud").style = "1px solid black";
        for (let i = 0; i < response.data.length; i++) {
            //se ve algo complicado entonces primero queria ver si se mostraba, vaya
            console.log(tabla3)
            let nuevaFilas = tabla3.insertRow(tabla3.lenght);

            //Le puse cel0, porque no me funcionaba y pense que podria ser eso
            cel0 = nuevaFilas.insertCell(0);
            cel0.innerHTML = response.data[i].id; /// primer elemento

            cel1 = nuevaFilas.insertCell(1);
            cel1.innerHTML = response.data[i].nombre; ///segundo elemento
            //usuario
            cel2 = nuevaFilas.insertCell(2);
            cel2.innerHTML = response.data[i].estado; /// tercer elemento

            cel3 = nuevaFilas.insertCell(3);
            cel3.innerHTML = response.data[i].correo; /// cuarto elemento


            xidentrenador = response.data[i].id




            cel4 = nuevaFilas.insertCell(4);
            cel4.innerHTML = `<span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="1estreella">&#9733</span> <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="2estreella">&#9733</span>
            <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="3estreella">&#9733</span>
            <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="4estreella">&#9733</span>
            <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="5estreella">&#9733</span>
            <input type="button" class="btn btn-outline-orange" onclick="enviarCalificacion()" value="Calificar">
            `

        }




        /* 
    
    <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="1estrella">&#9733</span>
 
          <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="2estrella">&#9733</span>
 
          <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="3estrella">&#9733</span>
 
          <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="4estrella">&#9733</span>
 
          <span class="fs-3" onclick="calificar(this)" style="cursor:pointer;" id="5estrella">&#9733</span>
    
    */

        tabla3 = ""
    }).catch("Error")
}

function calificar(item) {

    contador = item.id[0];//captura el primer digito de la id sea desde 1 a 5 dejando estrella
    console.log(contador)

    let nombre = item.id.substring(1);//captura el nombre, el numero fue capturado arriba xd 
    console.log(nombre)
    for (let i = 0; i < 5; i++) {
        if (i < contador) {
            document.getElementById((i + 1) + nombre).style.color = 'orange';// Es facil mandarlo a la base de datos
        } else {
            document.getElementById((i + 1) + nombre).style.color = 'gray';
        }
    }
}
var xidentrenador = 0
var valoracionEntrenador = 0


function enviarCalificacion() {


    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id


    const x = "1";
    const y = "1";
    const z = "1";
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/buscarvaloracion',
        data: {

            id_entrenador: xidentrenador,


        }

    }).then(function (response) {
        valoracionEntrenador = response.data[0].Valoracion;
        SumaValoracion = response.data[0].SumaValoracion;
        console.log(valoracionEntrenador)
        if (SumaValoracion != 0) {
            console.log(valoracionEntrenador)//Voy a guardar la carpeta primer
            //mano el puerto xd

            i = parseInt(SumaValoracion) + parseInt(contador)
            console.log("va", i)


            dividir = valoracionEntrenador + 1

            i = parseFloat(i) / parseFloat(dividir)

            console.log(i)

        }
        enviar(i)


    }).catch(err => console.log('Error: ', err))

}



function enviar(i) {
    miStorage = window.localStorage;
    let usuarioid = JSON.parse(miStorage.getItem('usuario'));
    ide = usuarioid.id
    const x = "1";
    const y = "1";
    const z = "1";

    //  alert(contador)
    // alert(xidentrenador)
    //alert(ide)

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/valoracionEntrenador',
        data: {
            id_usuario: ide,
            id_entrenador: xidentrenador,
            x: x,
            y: y,
            z: z

        }

    }).then(function (response) {
        console.log("****")
        console.log(response.data.length)
        console.log(response.data)
        console.log(response.data.Valoracion)

        if (response.data.length == 2) {
            const x = "2";
            const y = "2";
            const z = "2";

            axios({
                method: 'PUT',
                url: 'http://127.0.0.1:3000/valoracionEntrenador',
                data: {
                    Valoracion: i,//cORREGIR
                    id: xidentrenador,
                    x: x,
                    y: y,
                    z: z

                }

            }).then(function (response) {

                alert("Asistencia realizada")
                const x = "3";
                const y = "3";
                const z = "3";

                console.log("SASDDDD")
                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/valoracionEntrenador',
                    data: {
                        valoracion: contador,
                        id_entrenador: xidentrenador,
                        id_usuario: ide,
                        x: x,
                        y: y,
                        z: z
                    }

                }).then(function (response) {

                    alert("Asistencia realizada")

                }).catch(err => console.log('Error: ', err))

            }).catch(err => console.log('Error: ', err))




        } else {
            alert('Usted ya ha calificado a este entrenador')
        }




    }).catch(err => console.log('Error: ', err))







}