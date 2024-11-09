new DataTable('#tablacontacs');

$(document).ready(function () {
    $('tablacontacs').DataTable({


        "languaje": {

            "lengthMenu": "Mostrar _MENU_registros",
            "zeroRecords": "No se encontro resultado",
            "info": "Mostrar",
            "infoEmpty": "Mostra",
            "infoFiltered": "a",
            "sSearch": "Buscar:",
            "oPaginate:": {
                "sFirst": "Primero",
                "sLast": "Ultimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            }



        },

        "searching": true
    })
})


new DataTable('#tablaHotelReserva');

$(document).ready(function () {
    $('tablaHotelReserva').DataTable({


        "languaje": {

            "lengthMenu": "Mostrar _MENU_registros",
            "zeroRecords": "No se encontro resultado",
            "info": "Mostrar",
            "infoEmpty": "Mostra",
            "infoFiltered": "a",
            "sSearch": "Buscar:",
            "oPaginate:": {
                "sFirst": "Primero",
                "sLast": "Ultimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"

            }



        },

        "searching": true
    })
})