
/*
// Mapea los elementos DOM que desea actualizar
const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lanzamientos: document.querySelector('[data-name="lanzamientos"]'),
    series: document.querySelector('[data-name="series"]')
};

// Funcion para crear la lista de peliculas

function crearListaPeliculas(elemento, datos) {
    // Verifica si hay un elemento <ul> dentro de la seccion
    const ulExistente = elemento.querySelector('ul');

    // Si un elemento <ul> ya existe dentro de la seccion, borrarlo
    if (ulExistente) {
        elemento.removeChild(ulExistente);
    }

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = datos.map((pelicula) => `
        <li>
            <a href="/detalles.html?id=${pelicula.id}">
                <img src="${pelicula.poster}" alt="${pelicula.titulo}">
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
    const categoria = document.querySelector('[data-name="categoria"]');
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
        getdatos(`/series/categoria/${categoriaSeleccionada}`)
            .then(data => {
                crearListaPeliculas(categoria, data);
            })
            .catch(error => {
                tratarConErrores("Ocurrio un error al cargar los datos de la categoria.");
            });
    }
});

// Array de URLs para las solicitudes
generaSeries();
function generaSeries() {
    const urls = ['/series/top5', '/series/lanzamientos', '/series'];

    // Hace todas las solicitudes en paralelo
    Promise.all(urls.map(url => getdatos(url)))
        .then(data => {
            crearListaPeliculas(elementos.top5, data[0]);
            crearListaPeliculas(elementos.lanzamientos, data[1]);
            crearListaPeliculas(elementos.series, data[2].slice(0, 5));
        })
        .catch(error => {
            tratarConErrores("Ocurrio un error al cargar los datos.");
        });

}
*/
/*
<div class="img-container">
                <a href="#">
                    <img class="img-selec" src="./static/img/Ile_Mysterieuse_10.jpg" alt="libroVerne">
                </a>
                <div class="zocalo">
                    <div class="titulo-calado">
                        <h1 class="titulo-libro">Estudio en escarlata</h1>
                    </div>
                    <div class="descargas">
                        <i class="fa-regular fa-circle-play"></i>
                        <h3 class="descargasNum">112 descargas</h3>
                    </div>
                    <div class="autor">
                        <i class="fa-solid fa-square-pen"></i>
                        <h3 class="autor-libro">Julio Verne</h3>
                    </div>
                </div>
            </div>
        
*/

/*
fetch('https://tu-backend.com/api/endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'  // Asegúrate de configurar esto si estás haciendo solicitudes con credenciales
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
*/
const baseURL = 'https://libreria-backend-0nfu.onrender.com';

const getDatos = async (endpoint)=> {
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
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

const libroSeleccionado = document.querySelector(".seleccionado");


getDatos("/books").then((data)=>{
    console.log(data)
    libroSeleccionado.innerHTML=
    `
    <div class="img-container">
                <a href="#">
                    <img class="img-selec" src=${data[0].tapa} alt="libroSeleccionado">
                </a>
                <div class="zocalo">
                    <div class="titulo-calado">
                        <h1 class="titulo-libro">${data[0].title}</h1>
                    </div>
                    <div class="descargas">
                        <i class="fa-regular fa-circle-play"></i>
                        <h3 class="descargasNum">112 descargas</h3>
                    </div>
                    <div class="autor">
                        <i class="fa-solid fa-square-pen"></i>
                        <h3 class="autor-libro">${data[0].autor}</h3>
                    </div>
                </div>
            </div>
    `;
    const libros = data;
    const librosContenedor = document.querySelector(".populares");
    for(let i=1;i<data.length;i++){
        const librosElement = document.createElement("div");
        librosElement.innerHTML=
        `<div class="cardHorizontal">
        <a href="#">
            <img src=${libros[i].tapa} alt="tapa" class="tapa">
                </a>
                <div class="columna-dos">
                    <h4 class="titulo-libro-card">${libros[i].title}</h4>
                        <h5 class="autor-libro-card">Por ${libros[i].autor}</h5>
                        <div class="calificacion">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <em> 20k descargas</em>
                        </div>
                </div>
        </div>
      `
      librosContenedor.appendChild(librosElement);
    }
    
})
.catch((err)=>{
    console.log(err);
});