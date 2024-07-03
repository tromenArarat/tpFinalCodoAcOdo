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

// Función para seleccionar un libro random
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
// Función para remover el libro seleccionado del array de libros
function removeItem(array, item) {
    return array.filter(i => i !== item);
  }

getDatos("/books").then((data)=>{
    const libro = getRandomItem(data);
    libroSeleccionado.innerHTML=
    `
    <div class="img-container">
                <a href="#">
                    <img class="img-selec" src=${libro.tapa} alt="libroSeleccionado">
                </a>
                <div class="zocalo">
                    <div class="titulo-calado">
                        <h1 class="titulo-libro">${libro.title}</h1>
                    </div>
                    <div class="descargas">
                        <i class="fa-regular fa-circle-play"></i>
                        <h3 class="descargasNum">${libro.tematica_name}</h3>
                    </div>
                    <div class="autor">
                        <i class="fa-solid fa-square-pen"></i>
                        <h3 class="autor-libro">${libro.autor}</h3>
                    </div>
                </div>
            </div>
    `;
    const libros = removeItem(data, libro);
    const librosContenedor = document.querySelector(".populares");
    for(let i=0;i<libros.length;i++){
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
                            <em> ${libros[i].tematica_name}</em>
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
