export class Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.imgSrc = imgSrc;
        this.sonido = sonido;
    }

    reproducirSonido() {
        this.playSound();
    }

    playSound() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }

    setComentarios(comentarios) {
        this.comentarios = comentarios;
    }
}
