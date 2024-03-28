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

(() => {
    const $animalInput = $("#animal");
    const $edadInput = $("#edad");
    const $comentariosInput = $("#comentarios");
    const $animalesContainer = $("#animales");
    const $modal = $("#exampleModal");
    const $nombreAnimalModal = $("#nombreAnimalModal");
    const $edadAnimalModal = $("#edadAnimalModal");
    const $imagenAnimalModal = $("#imagenAnimalModal");
    const $preview = $("#preview");

    function mostrarDetallesAnimal(nombre, edad, imgSrc, sonido) {
        $nombreAnimalModal.text(nombre);
        $edadAnimalModal.text(edad);
        $imagenAnimalModal.attr("src", imgSrc ? `./assets/img/${imgSrc}` : "");
        $imagenAnimalModal.data("sonido", sonido);
        $modal.modal("show");
    }

    function crearElementoAnimal(animal) {
        const animalDiv = document.createElement("div");
        animalDiv.classList.add("col", "col-md-3", "mb-3");
        const imgSrc = animal.img ? animal.imgSrc : "";
        const html = `
            <div class="card h-100" data-id="preview" data-sonido="${animal.sonido}">
                <img src="./assets/img/${imgSrc}" class="card-img-top" alt="${animal.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${animal.nombre}</h5>
                    <p class="card-text">Edad: ${animal.edad}</p>
                    <button class="btn btn-primary ver-detalle">Ver Detalle</button>
                </div>
            </div>
        `;
        animalDiv.innerHTML = html;
        return animalDiv;
    }

    // Función para reproducir el sonido
    function reproducirSonido(sonido) {
        const audioElement = new Audio();
        audioElement.addEventListener("canplaythrough", function () {
            audioElement.play();
        });
        // Especifica la ruta completa del archivo de sonido
        audioElement.src = `https://github.com/luismart23/Prueba-Programacion-avanzada-en-JS-G73-LM/tree/main/assets/sonido/${sonido}`;
        audioElement.load();
    }


    $(document).on("click", ".ver-detalle", function () {
        const $animalDiv = $(this).closest(".card");
        const nombre = $animalDiv.find(".card-title").text();
        const edad = $animalDiv.find(".card-text").text().split(": ")[1];
        const imgSrc = $animalDiv.find(".card-img-top").attr("src").split("/").pop();
        const sonido = $animalDiv.data("sonido");
        mostrarDetallesAnimal(nombre, edad, imgSrc, sonido);
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

    $animalInput.change(async function () {
        const nombreAnimal = $(this).val();
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
        $preview.html(`<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><img src="./assets/img/${imgSrc}" alt="${animal.nombre}" style="max-width: 100%; max-height: 250px;"></div>`);
    }

    $modal.on("click", ".btn-audio", function () {
        const sonido = $(this).closest(".modal-content").find("img").data("sonido");
        reproducirSonido(sonido);
    });

    $("#btnRegistrar").click(async function (event) {
        event.preventDefault();

        const nombreAnimal = $animalInput.val();
        const edadAnimal = $edadInput.val();
        const comentariosAnimal = $comentariosInput.val();

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

        $animalesContainer.append(crearElementoAnimal(animal));
        $animalInput.val("");
        $edadInput.val("");
        $comentariosInput.val("");
    });

})();