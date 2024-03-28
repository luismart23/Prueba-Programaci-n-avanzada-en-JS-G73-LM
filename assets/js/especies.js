import { Animal } from "./animal.js";

export class Leon extends Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        super(nombre, edad, img, imgSrc, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

export class Lobo extends Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        super(nombre, edad, img, imgSrc, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

export class Oso extends Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        super(nombre, edad, img, imgSrc, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

export class Serpiente extends Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        super(nombre, edad, img, imgSrc, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

export class Aguila extends Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        super(nombre, edad, img, imgSrc, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}