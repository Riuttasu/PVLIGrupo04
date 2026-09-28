function EmpiezaJuego()
{
  var Juego = document.getElementById('Juego');
  if(window.getComputedStyle(Juego).display == 'none') Juego.style.display = 'block';
  else if(window.getComputedStyle(Juego).display == 'block') Juego.style.display = 'none';
}