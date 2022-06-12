const canvas = document.querySelector('canvas'); // Obtenemos el canvas
const c = canvas.getContext('2d'); // Obtenemos el contexto del canvas, en este caso, para un juego 2D

canvas.width = 1024 // Establecemos el ancho del canvas
canvas.height = 576 // Establecemos el alto del canvas


c.fillRect(0, 0, canvas.width, canvas.height) // Dibuja un rectangulo de color negro en el canvas

const gravedad = 0.75
const izquierda = 0
const derecha = canvas.width

const fondo = new Sprite({
  posicion: {
    x: 0,
    y: 0
  },
  imagesrc: './img/caletabg.png',
})

const chiringuito = new Sprite({
  posicion: {
    x: 770,
    y: 205
  },
  imagesrc: './img/oak_woods_v1.0/decorations/shop_anim.png',
  escala: 2,
  framesMax: 6
})

const roca1 = new Sprite({
  posicion: {
    x: 640,
    y: 440
  },
  imagesrc: './img/oak_woods_v1.0/decorations/rock_1.png',
  escala: 1.5
})

const pivita = new Sprite({
  posicion: {
    x: 540,
    y: 370
  },
  imagesrc: './img/bikinibabe.png',
  escala: 1,
  framesMax: 8
})

const pivita2 = new Sprite({
  posicion: {
    x: 380,
    y: 370
  },
  imagesrc: './img/pivita2.png',
  escala: 0.5,
  framesMax: 11
})

const cangrejo = new Sprite({
  posicion: {
    x: 80,
    y: 400
  },
  imagesrc: './img/cangrejo.png',
  escala: 0.4,
  framesMax: 7
})

const roca2 = new Sprite({
  posicion: {
    x: 430,
    y: 454
  },
  imagesrc: './img/oak_woods_v1.0/decorations/rock_2.png',
  escala: 1.5
})

const roca3 = new Sprite({
  posicion: {
    x: 214,
    y: 420
  },
  imagesrc: './img/oak_woods_v1.0/decorations/rock_3.png',
  escala: 1.5
})





//LUCHADORES



// Instanciamos objetos de la clase Luchador, es decir, creamos al jugador y al enemigo
const jugador = new Luchador({
  posicion: {
    x: 210,
    y: 0
  },
  velocidad: {
    x: 0,
    y: 0
  },
  imagesrc: './img/EVil Wizard 2/Sprites/Idle.png',
  framesMax: 8,
  escala: 2,
  offset: {
    x: 210,
    y: 210
  },
  sprites: {
    idle: {
      imagesrc: './img/EVil Wizard 2/Sprites/Idle.png',
      framesMax: 8,
    },
    runrev: {
      imagesrc: './img/EVil Wizard 2/Sprites/RunRev.png',
      framesMax: 8,
    },
    run: {
      imagesrc: './img/EVil Wizard 2/Sprites/Run.png',
      framesMax: 8,
    },
    salto: {
      imagesrc: './img/EVil Wizard 2/Sprites/Jump.png',
      framesMax: 2,
    },
    caida: {
      imagesrc: './img/EVil Wizard 2/Sprites/Fall.png',
      framesMax: 2,
    },
    ataque: {
      imagesrc: './img/EVil Wizard 2/Sprites/Attack2.png',
      framesMax: 8
    },
    golpe: {
      imagesrc: './img/EVil Wizard 2/Sprites/Take hit.png',
      framesMax: 3
    },
    muerte: {
      imagesrc: './img/EVil Wizard 2/Sprites/Death.png',
      framesMax: 7
    }
  },

  ataque: {
    offset: { x: 0, y: 0 },
    ancho: 140,
    alto: 50,
  }
})

const enemigo = new Luchador({
  posicion: {
    x: 650,
    y: 0
  },
  velocidad: {
    x: 0,
    y: 0
  },
  imagesrc: './img/Hero Knight/Sprites/IdleRev.png',
  framesMax: 11,
  escala: 2.3,
  offset: {
    x: 90,
    y: 135
  },
  sprites: {
    idle: {
      imagesrc: './img/Hero Knight/Sprites/IdleRev.png',
      framesMax: 11,
    },
    runrev: {
      imagesrc: './img/Hero Knight/Sprites/RunRev.png',
      framesMax: 8,
    },
    run: {
      imagesrc: './img/Hero Knight/Sprites/Run.png',
      framesMax: 8,
    },
    salto: {
      imagesrc: './img/Hero Knight/Sprites/JumpRev.png',
      framesMax: 3,
    },
    caida: {
      imagesrc: './img/Hero Knight/Sprites/FallRev.png',
      framesMax: 3,
    },
    ataque: {
      imagesrc: './img/Hero Knight/Sprites/Attack1Rev.png',
      framesMax: 7
    },
    golpe: {
      imagesrc: './img/Hero Knight/Sprites/Take HitRev.png',
      framesMax: 4
    },
    muerte: {
      imagesrc: './img/Hero Knight/Sprites/Death.png',
      framesMax: 11
    }
  },

  ataque: {
    offset: { x: -30, y: 0 },
    ancho: 160,
    alto: 50,
  }
})

console.log(jugador)
console.log(enemigo)


const teclas = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

let lastKey


//Creamos una funcion que simulara el movimiento gracias al metodo update y al bucle que genera el requestAnimationFrame
function animar() {
  window.requestAnimationFrame(animar);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height) //Limpia el canvas
  fondo.update();
  chiringuito.update();
  roca1.update();
  pivita.update();
  pivita2.update();
  cangrejo.update();
  roca2.update();
  roca3.update();
  jugador.update();
  enemigo.update();

  jugador.velocidad.x = 0;
  enemigo.velocidad.x = 0;

  //MOVIMIENTO DEL JUGADOR

  if (teclas.a.pressed && jugador.lastKey === 'a' && jugador.posicion.x > 0) {
    jugador.velocidad.x = -5;
    jugador.switchSprite('runrev')
  } else if (teclas.d.pressed && jugador.lastKey === 'd' && jugador.posicion.x < canvas.width - jugador.ancho) {
    jugador.velocidad.x = 5;
    jugador.switchSprite('run')
  } else {
    jugador.switchSprite('idle')
  }

  //SALTO JUGADOR
  if (jugador.velocidad.y < 0) {
    jugador.switchSprite('salto')
  } else if (jugador.velocidad.y > 0) {
    jugador.switchSprite('caida')
  }

  //MOVIMIENTO DEL ENEMIGO
  if (teclas.ArrowLeft.pressed && enemigo.lastKey === 'ArrowLeft' && enemigo.posicion.x > 0) {
    enemigo.velocidad.x = -5;
    enemigo.switchSprite('runrev')
  } else if (teclas.ArrowRight.pressed && enemigo.lastKey === 'ArrowRight' && enemigo.posicion.x < canvas.width - enemigo.ancho) {
    enemigo.velocidad.x = 5;
    enemigo.switchSprite('run')
  } else {
    enemigo.switchSprite('idle')
  }
  // SALTO ENEMIGO
  if (enemigo.velocidad.y < 0) {
    enemigo.switchSprite('salto')
  } else if (enemigo.velocidad.y > 0) {
    enemigo.switchSprite('caida')
  }

  //detectar si hay contacto entre el jugador y el enemigo
  if (
    ataqueRectangulo({ rectangulo1: jugador, rectangulo2: enemigo }) && jugador.atacando) {
    enemigo.golpe()
    jugador.atacando = false;
    document.getElementById('restasalud2').style.width = enemigo.energia + '%';
  }

  if (
    ataqueRectangulo({ rectangulo1: enemigo, rectangulo2: jugador }) && enemigo.atacando) {
    jugador.golpe()
    enemigo.atacando = false;
    document.getElementById('restasalud1').style.width = jugador.energia + '%';
  }

  //final del juego basado en la energia
  if (enemigo.energia <= 0 || jugador.energia <= 0) {
    ganador({ jugador, enemigo, timerId })
  }

}

animar()

window.addEventListener('keydown', (event) => {
  if (!jugador.muerto) {
    switch (event.key) {
      case 'd':
        teclas.d.pressed = true;
        jugador.lastKey = 'd';
        break;
      case 'a':
        teclas.a.pressed = true;
        jugador.lastKey = 'a';
        break;
      case 'w':
        jugador.velocidad.y = -20;
        jugador.lastKey = 'w';
        break;
      case 'c':
        jugador.attack();
        break;
    }
  }

  if (!enemigo.muerto) {
    switch (event.key) {
      case 'ArrowRight':
        teclas.ArrowRight.pressed = true;
        enemigo.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        teclas.ArrowLeft.pressed = true;
        enemigo.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        enemigo.velocidad.y = -20;
        enemigo.lastKey = 'ArrowUp';
        break;
      case ']':
        enemigo.attack();
        break;
    }
  }

});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      teclas.d.pressed = false;
      break;
    case 'a':
      teclas.a.pressed = false;
      break;

  }

  //Teclas del enemigo
  switch (event.key) {
    case 'ArrowRight':
      teclas.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      teclas.ArrowLeft.pressed = false;
      break;
  }
});

//Funcionalidad de los botones de la pantalla de inicio
document.getElementById('instrucciones').addEventListener('click', () => {
  document.querySelector('.footer').style.position = 'inherit';
  document.getElementById('instr').style.display = 'flex';
  document.getElementById('ocultar').style.display = 'block';
  document.getElementById('instrucciones').style.display = 'none';
});

document.getElementById('ocultar').addEventListener('click', () => {
  document.querySelector('.footer').style.position = 'inherit';
  document.getElementById('instr').style.display = 'none';
  document.getElementById('ocultar').style.display = 'none';
  document.getElementById('instrucciones').style.display = 'block';
});

document.getElementById('iniciar').addEventListener('click', () => {
  cuentaAtras();
  document.querySelector('.footer').style.position = 'unset';
  document.getElementById('logo').style.display = 'none';
  document.getElementById('big-canvas').style.display = 'flex';
  document.getElementById('iniciar').style.display = 'none';
  document.getElementById('reiniciar').style.display = 'block';
});

document.getElementById('reiniciar').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.footer').style.position = 'absolute';
  document.getElementById('big-canvas').style.display = 'none';
  document.getElementById('logo').style.display = 'block';
  document.getElementById('iniciar').style.display = 'block';
  document.getElementById('reiniciar').style.display = 'none';

});

