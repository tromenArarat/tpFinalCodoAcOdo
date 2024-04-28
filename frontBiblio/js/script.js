function mostrarSeccion(nombreSeccion) {
    var secciones = document.querySelectorAll('.textArea > div');
    secciones.forEach(function(seccion) {
        seccion.style.display = 'none';
    });

    var seccionAmostrar = document.querySelector('.' + nombreSeccion);
    if (seccionAmostrar) {
        seccionAmostrar.style.display = 'flex';
    }
}

window.addEventListener('load', function() {
    mostrarSeccion('reseña');
});