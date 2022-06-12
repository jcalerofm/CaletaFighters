function ataqueRectangulo({ rectangulo1, rectangulo2 }) {
  return (
    rectangulo1.ataque.posicion.x + rectangulo1.ataque.ancho >= rectangulo2.posicion.x &&
    rectangulo1.ataque.posicion.x <= rectangulo2.posicion.x + rectangulo2.ancho &&
    rectangulo1.ataque.posicion.y + rectangulo1.ataque.alto >= rectangulo2.posicion.y &&
    rectangulo1.ataque.posicion.y <= rectangulo2.posicion.y + rectangulo2.altura
  )
}

//Funcion para la logica que establece el ganador
function ganador({ jugador, enemigo, timerId }) {
  clearTimeout(timerId) //Paramos el tiempo
  document.querySelector('.finjuego').style.display = 'flex'
  if (jugador.energia === enemigo.energia) {
    document.querySelector('.finjuego').innerHTML = 'Empate'
  } else if (jugador.energia > enemigo.energia) {
    document.querySelector('.finjuego').innerHTML = 'Player 1 Wins!'
  } else {
    document.querySelector('.finjuego').innerHTML = 'Player 2 Wins!'
  }
}


//TEMPORIZADOR Y LOGICA DE GANADOR DE JUEGO POR TIEMPO
let timer = 30
let timerId
function cuentaAtras() {
  //establecemos cuenta atras
  if (timer > 0) {
    timerId = setTimeout(cuentaAtras, 1000)
    timer--
    document.getElementById('tiempo').innerHTML = timer
  }

  //Logica de ganador de juego cuando acaba el tiempo
  if (timer === 0) {
    ganador({ jugador, enemigo })
  };
};
