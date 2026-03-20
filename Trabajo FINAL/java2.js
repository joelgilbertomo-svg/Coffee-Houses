function validarFormulario() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;

    if (
        nombre === "" ||
        telefono === "" ||
        email === "" ||
        mensaje === ""
    ) {
        alert("Todos los campos son obligatorios.");
        return false;
    }

        alert("Enviado")
        return true;
}