const baseURL = 'http://localhost:3000';

//Capturamos el form dentro de una constante
const registerForm = document.getElementById("registerForm");

//Agregamos un evento a la acción submit

registerForm.addEventListener("submit", function (event) {
  // Anulamos el comportamiento por defecto del botón submit
  event.preventDefault();

  //Capturamos del dom el usuario y el pass
  const nombre = document.getElementById("nombre").value;
  const clave = document.getElementById("clave").value;
  const mail = document.getElementById("mail").value;

  // Objeto para configurar el fetch
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, clave, mail }),
  };

  //Petición asíncrona
  fetch(`${baseURL}/auth/register`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al registrarse");
      }
      return res.json();
    })
    .then((data) => {
      alert("Registro exitoso. Por favor, inicia sesión.");
      window.location.href = '/templates/login.html';
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al registrarse");
    });
});