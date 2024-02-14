$(document).ready(function () {

    // Año actual
    var anioActual = new Date().getFullYear();

    // años
    for (var i = anioActual; i >= 1900; i--) {
        $('#fechaNacimiento').append($('<option>', {
            value: i,
            text: i
        }));
    }
});

//Alert para confirmar eliminación
function confirmDelete(event) {
    event.preventDefault();
    swal({
        title: "¿Está seguro de Eliminar?",
        text: "",
        icon: "warning",
        buttons: [
            'Cancelar',
            'Aceptar'
        ],
        dangerMode: false,
    }).then(function (isConfirm) {
        if (isConfirm) {
            event.target.submit();
        } 
    });
}

//Alerta y proceso de validación de campos
function validarInfo(event) {

    event.preventDefault();

    var validacion = "";

    var nombre = $('#nombreCompleto').val();
    var telefono = $('#telefono').val();
    var celular = $('#celular').val();
    var fechaNacimiento = $('#fechaNacimiento').val();

    var regexNombre = /^(?! )(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,}$/;
    var regexTelefono = /^2\d{7}$/;
    var regexCelular = /^[893]\d{7}$/;
    var edad = new Date().getFullYear() - fechaNacimiento;

    if (regexNombre.test(nombre) == false) {
        validacion += `<li class="list-group-item ">NOMBRE: Solo mayúsculas, minúsculas y espacios.</li>`;
    }

    if (regexTelefono.test(telefono) == false) {
        validacion += `<li class="list-group-item">TELÉFONO: Iniciar con 2, se aceptan 8 carácteres.</li>`;
    }

    if (regexCelular.test(celular) == false) {
        validacion += `<li class="list-group-item">CELULAR: Iniciar con 8,9 o 3, se aceptan 8 carácteres.</li>`;
    }

    if (fechaNacimiento == "null" || edad < 18 || edad > 65 ) {
        validacion += fechaNacimiento != "null" ?
              `<li class="list-group-item">EDAD(` + edad + `) no permitida, rango aceptable de 18 a 65 años.</li>`
            : `<li class="list-group-item">Seleccionar Año.</li>`
    }

    if (validacion == "") {
        swal({
            title: "¿Está seguro de guardar la información de " + nombre + "?",
            text: "",
            icon: "warning",
            buttons: [
                'Cancelar',
                'Aceptar'
            ],
            dangerMode: false,
        }).then(function (isConfirm) {
            if (isConfirm) {
                event.target.submit();
            } else {
                return false;
            }
        });

    } else {

        var myhtml = document.createElement("span");
        myhtml.innerHTML = `<ul class="list-group list-group-flush">` + validacion + `</ul>`;

        swal({
            title: "Error",
            content: myhtml,
            icon: "error",
            dangerMode: true
            //, className: 'swal-wide'
        })

    }
}