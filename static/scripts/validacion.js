/* 
El gran libro de HTML CSS y Javascript 
J D Gauchat - 3ra Edicion
página 345 
*/
var formulario;
function iniciar() {
    var boton = document.getElementById("enviar");
    boton.addEventListener("click", enviarformulario);
    formulario = document.querySelector("form[name='informacion']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
}
function validacion(evento) {
    var elemento = evento.target;
    elemento.style.background = "#FFDDDD";
}
function enviarformulario() {
    var valido = formulario.checkValidity();
    if (valido) {
        formulario.submit();
    }
}
function comprobar(evento) {
    var elemento = evento.target;
    if (elemento.validity.valid) {
        elemento.style.background = "#FFFFFF";
    } else {
        elemento.style.background = "#FFDDDD";
    }
}
window.addEventListener("load", iniciar);

