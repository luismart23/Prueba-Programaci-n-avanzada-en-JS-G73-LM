export class Animal {
    constructor(nombre, edad, img, imgSrc, sonido) {
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.imgSrc = imgSrc;
        this.sonido = sonido;
    }

    getNombre() {
        return this.nombre;
    }

    getEdad() {
        return this.edad;
    }

    getImg() {
        return this.img;
    }

    getImgSrc() {
        return this.imgSrc;
    }

    getSonido() {
        return this.sonido;
    }

    setComentarios(comentarios) {
        this.comentarios = comentarios;
    }
}
