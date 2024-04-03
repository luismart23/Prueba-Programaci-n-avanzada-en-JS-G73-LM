// 1. Crear las clases representadas en el diagrama implementando la herencia indicada.

// 2. Crear las instancias de las clases utilizando los datos del formulario.

// 3. Realizar una consulta asíncrona utilizando una función async / await para obtener las
// imágenes correspondientes a los animales.

// 4. Realizar por lo menos una función autoejecutable IIFE.

// 5. Dividir el código en módulos

// 6. Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados con
// el formulario

// 7. Validar que el usuario haya asignado todos los datos del animal antes de que éste sea
// agregado a la tabla.

// 8. Devolver el formulario en un estado inicial luego de registrar a cada animal.

// 9. Programar la interacción del botón de audio, en donde deberás reproducir el sonido
// del animal en el sitio web.

// 10. Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen.

// 1. Crear las clases representadas en el diagrama implementando la herencia indicada.

// 2. Crear las instancias de las clases utilizando los datos del formulario.

// 3. Realizar una consulta asíncrona utilizando una función async / await para obtener las
// imágenes correspondientes a los animales.

// 4. Realizar por lo menos una función autoejecutable IIFE.

// 5. Dividir el código en módulos

// 6. Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados con
// el formulario

// 7. Validar que el usuario haya asignado todos los datos del animal antes de que éste sea
// agregado a la tabla.

// 8. Devolver el formulario en un estado inicial luego de registrar a cada animal.

// 9. Programar la interacción del botón de audio, en donde deberás reproducir el sonido
// del animal en el sitio web.

// 10. Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen.

import { Animal } from "./animal.js";
import { Leon, Lobo, Oso, Serpiente, Aguila } from "./especies.js";

(function () {
    const animalInput = document.getElementById("animal");
    const edadInput = document.getElementById("edad");
    const comentariosInput = document.getElementById("comentarios");
    const animalesContainer = document.getElementById("animales");
    const modal = document.getElementById("exampleModal");
    const nombreAnimalModal = document.getElementById("nombreAnimalModal");
    const edadAnimalModal = document.getElementById("edadAnimalModal");
    const imagenAnimalModal = document.getElementById("imagenAnimalModal");
    const preview = document.getElementById("preview");

    function mostrarDetallesAnimal(nombre, edad, imgSrc, sonido) {
        nombreAnimalModal.textContent = nombre;
        edadAnimalModal.textContent = edad;
        imagenAnimalModal.src = imgSrc ? `./assets/img/${imgSrc}` : "";
        imagenAnimalModal.dataset.sonido = sonido;
        modal.classList.add("show");
        modal.style.display = "block";
    }

    function crearElementoAnimal(animal) {
        const animalDiv = document.createElement("div");
        animalDiv.classList.add("col", "col-md-3", "mb-3");
        const imgSrc = animal.img ? animal.imgSrc : "";
        animalDiv.innerHTML = `
            <div class="card h-100" data-id="preview" data-sonido="${animal.sonido}">
                <img src="./assets/img/${imgSrc}" class="card-img-top" alt="${animal.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${animal.nombre}</h5>
                    <p class="card-text">Edad: ${animal.edad}</p>
                    <button class="btn btn-primary ver-detalle">Ver Detalle</button>
                </div>
            </div>
        `;
        return animalDiv;
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("ver-detalle")) {
            const animalDiv = event.target.closest(".card");
            const nombre = animalDiv.querySelector(".card-title").textContent;
            const edad = animalDiv.querySelector(".card-text").textContent.split(": ")[1];
            const imgSrc = animalDiv.querySelector(".card-img-top").getAttribute("src").split("/").pop();
            const sonido = animalDiv.dataset.sonido;
            mostrarDetallesAnimal(nombre, edad, imgSrc, sonido);
        }
    });


    async function obtenerDatosAnimal(nombre) {
        try {
            const response = await fetch("animales1.json");
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los animales.");
            }
            const data = await response.json();
            if (!data || !data.animales || !Array.isArray(data.animales)) {
                throw new Error("El archivo animales.json no tiene el formato esperado.");
            }
            const animalData = data.animales.find(animal => animal.nombre && animal.nombre.toLowerCase() === nombre.toLowerCase());
            if (!animalData) {
                throw new Error(`No se encontró el animal "${nombre}".`);
            }

            if (!animalData.imgSrc) {
                throw new Error(`La propiedad 'imgSrc' no está definida para el animal "${nombre}".`);
            }

            return animalData;
        } catch (error) {
            console.error("Error en obtenerDatosAnimal:", error);
            mostrarError("Error al obtener los datos del animal.");
            return null;
        }
    }

    animalInput.addEventListener("change", async function () {
        const nombreAnimal = this.value;
        const animalData = await obtenerDatosAnimal(nombreAnimal);
        if (animalData) {
            actualizarVistaPreviaImagen(animalData);
        }
    });

    function mostrarError(mensaje) {
        alert(mensaje);
    }

    function actualizarVistaPreviaImagen(animal) {
        const imgSrc = animal.imgSrc ? animal.imgSrc : "";
        preview.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><img src="./assets/img/${imgSrc}" alt="${animal.nombre}" style="max-width: 100%; max-height: 250px;"></div>`;
    }

    modal.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-audio")) {
            const sonido = this.querySelector(".modal-content img").dataset.sonido;
            reproducirSonido(sonido);
        }
        // Agregar el evento para resetear el modal cuando se haga clic fuera del contenido del modal o en el botón de cerrar
        if (event.target.classList.contains("btn-close") || event.target.classList.contains("modal")) {
            resetearModal();
        }
    });

    document.getElementById("btnRegistrar").addEventListener("click", async function (event) {
        event.preventDefault();

        const nombreAnimal = animalInput.value;
        const edadAnimal = edadInput.value;
        const comentariosAnimal = comentariosInput.value;

        // Validación de campos de entrada
        if (!nombreAnimal || !edadAnimal || !comentariosAnimal) {
            mostrarError("Por favor, complete todos los campos.");
            return;
        }

        const animalData = await obtenerDatosAnimal(nombreAnimal);
        if (!animalData) {
            mostrarError("Error al obtener datos del animal.");
            return;
        }

        let animal;
        switch (nombreAnimal) {
            case "León":
                animal = new Leon(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
                break;
            case "Lobo":
                animal = new Lobo(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
                break;
            case "Oso":
                animal = new Oso(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
                break;
            case "Serpiente":
                animal = new Serpiente(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
                break;
            case "Águila":
                animal = new Aguila(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
                break;
            default:
                animal = new Animal(nombreAnimal, edadAnimal, animalData.img, animalData.imgSrc, animalData.sonido);
        }

        animalesContainer.appendChild(crearElementoAnimal(animal));
        animalInput.value = "";
        edadInput.value = "";
        comentariosInput.value = "";
    });

    function reproducirSonido(sonido) {
        const rutaSonido = sonido.startsWith("assets/") ? sonido : `assets/sonido/${sonido}`;
        const audioElement = new Audio(rutaSonido);

        // Agrega un evento para manejar errores de carga del audio
        audioElement.addEventListener("error", function (e) {
            console.error("Error al cargar el audio:", e);
            console.error("Código de error:", e.target.error.code);
            console.error("Mensaje de error:", e.target.error.message);
            mostrarError("Error al cargar el audio.");
        });

        // Agrega un evento para reproducir el audio cuando se cargue completamente
        audioElement.addEventListener("canplaythrough", function () {
            audioElement.play();
        });

        // Carga el audio
        audioElement.load();
    }

    function resetearModal() {
        nombreAnimalModal.textContent = "";
        edadAnimalModal.textContent = "";
        imagenAnimalModal.src = "";
        imagenAnimalModal.removeAttribute("data-sonido");
        modal.classList.remove("show");
        modal.style.display = "none";
    }
})();
