class Sprite {
  constructor({ posicion, imagesrc, escala = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.posicion = posicion;
    this.altura = 150;
    this.ancho = 50;
    this.image = new Image()
    this.image.src = imagesrc
    this.escala = escala
    this.framesMax = framesMax
    this.frame = 0
    //ralentizar animacion sprites
    this.pasaframe = 0
    this.paraframe = 15
    this.offset = offset
  }

  animarFrame() {
    this.pasaframe++
    if (this.pasaframe % this.paraframe === 0) {
      if (this.frame < this.framesMax - 1) {
        this.frame++
      } else {
        this.frame = 0
      }
    }
  }

  dibujar() {
    c.drawImage(
      this.image,
      this.frame * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.posicion.x - this.offset.x,
      this.posicion.y - this.offset.y,
      (this.image.width / this.framesMax) * this.escala,
      this.image.height * this.escala
    )
  }

  update() {
    this.dibujar()
    this.animarFrame()
  }

}

//Definimos una clase para un moñequito que se va a mover por pantalla
class Luchador extends Sprite {
  constructor({
    posicion,
    velocidad,
    color = 'red',
    imagesrc,
    escala = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    ataque = {
      offset: {},
      ancho: undefined,
      alto: undefined
    }
  }) {
    super({ posicion, imagesrc, escala, framesMax, offset })  //llamamos al constructor de la clase padre

    this.velocidad = velocidad;
    this.altura = 150;
    this.ancho = 50;
    this.lastKey;
    this.ataque = {
      posicion: {
        x: this.posicion.x,
        y: this.posicion.y
      },
      offset: ataque.offset,
      ancho: ataque.ancho,
      alto: ataque.alto
    }
    this.color = color;
    this.atacando;
    this.energia = 100;
    this.frame = 0
    this.pasaframe = 0
    this.paraframe = 12
    this.sprites = sprites
    this.muerto = false


    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imagesrc
    }
  }

  update() {
    this.dibujar()
    if (!this.muerto) this.animarFrame()
    this.ataque.posicion.x = this.posicion.x + this.ataque.offset.x
    this.ataque.posicion.y = this.posicion.y + this.ataque.offset.y

    // c.fillRect(this.ataque.posicion.x, this.ataque.posicion.y, this.ataque.ancho, this.ataque.alto)

    this.posicion.x += this.velocidad.x;
    this.posicion.y += this.velocidad.y

    //paramos el movimiento, creando efecto de gravedad
    if (this.posicion.y + this.altura + this.velocidad.y >= canvas.height) {
      this.velocidad.y = 0; //paramos el movimiento creando la sensacion de tener suelo
      this.posicion.y = 426;
    } else this.velocidad.y += gravedad;



    //paramos el movimiento al llegar a los limites
    if (this.posicion.x + this.ancho + this.velocidad.x >= derecha) {
      this.velocidad.x = 0;
    }
    if (this.posicion.x + this.velocidad.x <= izquierda) {
      this.velocidad.x = 0;
    }
  }

  attack() {
    this.switchSprite('ataque')
    this.atacando = true;
    setTimeout(() => {
      this.atacando = false;
    }, 100);
  }

  golpe() {
    this.energia -= 10;

    if (this.energia <= 0) {
      this.switchSprite('muerte');
    } else this.switchSprite('golpe');
  }

  switchSprite(sprite) {
    //superpone frame de muerte frente a todos los demas
    if (this.image === this.sprites.muerte.image) {
      if (this.frame === this.sprites.muerte.framesMax - 1)
        this.muerto = true
      return
    }


    //superpone el frame de ataque frente a todos los demas
    if (this.image === this.sprites.ataque.image &&
      this.frame < this.sprites.ataque.framesMax - 1
    )
      return
    // superpone el frame de cuando es golpeado frente a todos los demas
    if (
      this.image === this.sprites.golpe.image &&
      this.frame < this.sprites.golpe.framesMax - 1
    )
      return

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.frame = 0
        }
        break;
      case 'runrev':
        if (this.image !== this.sprites.runrev.image) {
          this.image = this.sprites.runrev.image
          this.framesMax = this.sprites.runrev.framesMax
          this.frame = 0
        }
        break;
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.frame = 0
        }
        break;
      case 'salto':
        if (this.image !== this.sprites.salto.image) {
          this.image = this.sprites.salto.image
          this.framesMax = this.sprites.salto.framesMax
          this.frame = 0
        }
        break;
      case 'caida':
        if (this.image !== this.sprites.caida.image) {
          this.image = this.sprites.caida.image
          this.framesMax = this.sprites.caida.framesMax
          this.frame = 0
        }
        break;
      case 'ataque':
        if (this.image !== this.sprites.ataque.image) {
          this.image = this.sprites.ataque.image
          this.framesMax = this.sprites.ataque.framesMax
          this.frame = 0
        }
        break;
      case 'golpe':
        if (this.image !== this.sprites.golpe.image) {
          this.image = this.sprites.golpe.image
          this.framesMax = this.sprites.golpe.framesMax
          this.frame = 0
        }
        break;

      case 'muerte':
        if (this.image !== this.sprites.muerte.image) {
          this.image = this.sprites.muerte.image
          this.framesMax = this.sprites.muerte.framesMax
          this.frame = 0
        }
        break;

      default:
        break;
    }

  }

}
