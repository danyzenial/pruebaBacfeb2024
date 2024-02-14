function validarInfo() {

    event.preventDefault();

    var validacion = "";

    var nombre = $('#nombreCompleto').val();
    var telefono = $('#telefono').val();
    var celular = $('#celular').val();
    var fechaNacimiento = $('#fechaNacimiento').val();

    var regexNombre = /^(?! )(?=.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{3,}$/;
    var regexTelefono = /^2\d{0,7}$/;
    var regexCelular = /^[893]\d{0,7}$/;
    var edad = new Date().getFullYear() - fechaNacimiento;

    if (regexNombre.test(nombre) == false) {
        validacion += "Favor Validar nombre, solo se permiten Mayusculas, Minuscular y espacios.\n";
    }

    if (regexTelefono.test(telefono) == false) {
        validacion += "Favor Validar Teléfono, debe iniciar con 2, solo se aceptan 8 carácteres.\n";
    }

    if (regexCelular.test(celular) == false) {
        validacion += "Favor Validar Celular, debe iniciar con 8,9 o 3; solo se aceptan 8 carácteres.\n";
    }

    if (edad < 18 || edad > 65) {
        validacion += "Su edad no es permitida " + edad + ", rango aceptable de 18 y 65 años.\n";
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
        }).then(function(isConfirm) {
            if (isConfirm) {
                form.submit();
            } else {
                return false;
            }
        });

    } else {
        alert(validacion);
        return false;
    }
}
