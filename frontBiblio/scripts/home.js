import getdatos from "./getDatos.js";

// Mapea los elementos DOM que desea actualizar
const elementos = {
   biblioteca: document.querySelector('[data-name="biblioteca"]'),
};

// Funcion para crear la lista de libros

function crearListaLibros(elemento, datos) {
    // Verifica si hay un elemento <ul> dentro de la seccion
    const ulExistente = elemento.querySelector('ul');

    // Si un elemento <ul> ya existe dentro de la seccion, borrarlo
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = datos.map((libro) => `
        <li>
            <a href="/info.html?id=${libro.id}">
                <img src="${libro.tapa}" alt="${libro.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    elemento.appendChild(ul);
}

// Funcion genérica para tratamiento de errores
function tratarConErrores(mensajeError) {
    console.error(mensajeError);
}

const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsParaOcultar = document.querySelectorAll('.section'); // Adicione a classe CSS 'hide-when-filtered' às seções e títulos que deseja ocultar.

categoriaSelect.addEventListener('change', function () {
    const categoria = document.querySelector('[data-name="biblioteca"]');
    const categoriaSeleccionada = categoriaSelect.value;

    if (categoriaSeleccionada === 'todos') {

        for (const section of sectionsParaOcultar) {
            section.classList.remove('hidden')
        }
        categoria.classList.add('hidden');

    } else {

        for (const section of sectionsParaOcultar) {
            section.classList.add('hidden')
        }

        categoria.classList.remove('hidden')
        // Haga una solicitud para el endpoint com la categoria seleccionada
        getdatos(`/libros/categoria/${categoriaSeleccionada}`)
            .then(data => {
                crearListaLibros(categoria, data);
            })
            .catch(error => {
                tratarConErrores("Ocurrio un error al cargar los datos de la categoria.");
            });
    }
});

generaLibros();
function generaLibros() {
    const urls = ['/libros/home'];

    // Hace todas las solicitudes en paralelo
    Promise.all(urls.map(url => getdatos(url)))
        .then(data => {
            crearListaLibros(elementos.biblioteca, data[0]);
        })
        .catch(error => {
            tratarConErrores("Ocurrio un error al cargar los datos.");
        });

}