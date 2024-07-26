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
    mostrarSeccion('');
});

/**************************/

const baseURL = 'http://localhost:3000';

const getDatos = async (endpoint)=> {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            return data;
        } catch (error) {
            throw new Error('Error parsing JSON: ' + error.message);
        }
    } catch (error) {
        console.error('Error al ingresar al endpoint', error);
        throw error; // rethrow the error so it can be handled in the calling function
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const libroSeleccionado = document.querySelector(".seleccionado");
const libroData = document.querySelector(".contenedorData-principal");
const libroSecundario = document.querySelector(".contenedorData-secundaria")
const libroCcsero = document.querySelector(".cssero")
const libroId = parseInt(getQueryParam('id'), 10);
// console.log(libroId)

if (libroId) {
    getDatos(`/books`).then((data) => {
        console.log(data)
        const libro = data.find(book => book.id === libroId);
        console.log(libro)
        libroSeleccionado.innerHTML = `
            <img src=${libro.tapa} alt="tapa del libro" class="full-width">
        `;
        libroData.innerHTML = `
            <div class="book-info">
                <h1>${libro.title}</h1>
                <h3>por ${libro.autor}</h3>
            </div>
            <div class="status">
                <h3>${libro.devoluciones}</h3>
            </div>
        `;
        libroSecundario.innerHTML = `
            <div class="anio">
                <div class="anio1">
                    <h4>Año</h4>
                    <div class="anio2">
                        <h3>${libro.year}</h3>
                    </div>
                </div>
            </div>
            <div class="paginas">
                <div class="paginas-1">
                    <h4>Páginas</h4>
                    <div class="paginas-2">
                        <h3>${libro.paginas}</h3>
                    </div>
                </div>
            </div>
            <div class="categoria">
                <div class="categoria1">
                    <h4>Categoría</h4>
                    <div class="categoria2">
                        <h3>${libro.tematica_name}</h3>
                    </div>
                </div>
            </div>
        `;
        libroCcsero.innerHTML = `
            <div class="etiquetas">
                <ul>
                    <li><a href="#" onmouseover="mostrarSeccion('resenia')">Reseña</a></li>
                    <li><a href="#" onmouseover="mostrarSeccion('detalle')">Detalle</a></li>
                    <li><a href="#" onmouseover="mostrarSeccion('autores')">Autores</a></li>
                    <li><a href="#" onmouseover="mostrarSeccion('lectores')">Lectores</a></li>
                </ul>
            </div>
            <div class="textArea">
                <div class="resenia">
                    <p>${libro.resenia}</p>
                </div>
                <div class="detalle">
                    <div class="isbn">
                        <p>ISBN: ${libro.detalle_isbn}</p>
                        <p>Editorial: ${libro.detalle_editorial}</p>
                        <p>Idioma: ${libro.detalle_idioma}</p>
                        <p>Traductor: ${libro.detalle_traductor}</p>
                        <p>Formato: ${libro.detalle_formato}</p>
                        <p>Año de edición: ${libro.detalle_lanzamiento}</p>
                        <p>Información adicional: ${libro.detalle_adicional}</p>
                    </div>
                </div>
                <div class="autores">
                    <p>${libro.detalle_pdf}</p>
                </div>
                <div class="lectores">
                    <p>${libro.devoluciones}</p>
                </div>
            </div>
        `;
    }).catch(err => console.log(err));
}