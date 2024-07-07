// URL del servidor

const baseURL = 'http://localhost:3000';

// APLICANDO COOKIES
// Set cookie function
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Strict";
  }
  // Get cookie function
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

// Maneja el evento 'submit' del formulario de inicio de sesión con id 'loginForm'
//Capturamos el form del dom dentro de una constante y trabajamos con el
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    // Anulamos el comportamiento por defecto del botón submit
    event.preventDefault();
  
    //Capturamos del dom el usuario y el pass
    const mail = document.getElementById("mail").value;
    const clave = document.getElementById("clave").value;
  
    // Declaración del objeto que configura la solicitud HTTP
    // Este objeto carga con atributos de, método, la cabecera, y el body que
    // convertimos a json
    const options = {
      method: "POST",
      //POST realiza el envío de la info de manera oculta
      headers: {
        "Content-Type": "application/json",
        //declaración del contenido
      },
      body: JSON.stringify({ mail, clave }),
      //convertimos el objeto a json
    };
  
    // Petición asíncrona
    fetch(`${baseURL}/auth/login`, options)
      .then((res) => {
        // Si no obtenemos respuesta...
        if (!res.ok) {
          throw new Error("Error al iniciar sesión");
        }
        //Retornamos lo recibido desde el servidor
        return res.json();
      })
      .then((data) => {
        // almacenamos el token en data y lo pasamos
        // al webstore
        // localStorage.setItem("token", data.token);
        setCookie("token", data.token, 1); // Almacenamos el token en la cookie
        alert("Inicio de sesión exitoso");
        window.location.href = '/';
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al iniciar sesión");
      });
  });