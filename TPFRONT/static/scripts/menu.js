// Despliega el menu de usuario
function desplegarMenu() {
    const menuUsuario = document.getElementById("menu-usuario");
    menuUsuario.style.display = (menuUsuario.style.display === "block") ? "none" : "block";
}
//Oculta el menu cunado deja de hacer hover sobre el
function ocultarMenu() {
    const menuUsuario = document.getElementById("menu-usuario");
    menuUsuario.style.display = "none";
}


// Despliega el menu de usuario
function desplegarMenuMovil() {
    const menuUsuario = document.getElementById("menu-usuario-movil");
    menuUsuario.style.display = (menuUsuario.style.display === "block") ? "none" : "block";
}