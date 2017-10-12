// Script para que el carousel se mueva a determinado tiempo
$('.carousel').carousel({
    interval: 1000
});
function cargador(carga) {
    $("#el_contenedor").load(carga);
}
$( document ).ready(function() {
    cargador("home.html");
});
