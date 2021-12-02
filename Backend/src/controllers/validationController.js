// Importaciones necesarias
import fs from 'fs'

export default class validationController {

    // Constructor vacío
    constructor() {}

    // Esta función se encarga de validar que el correo sea del formato correcto y hace una comparación con el patern para evaluarlo
    verifyEmail = (email) => {

        if( this.verifySpecialCharacters(email) ){

            const patern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

            return patern.test(email.toLowerCase())
        } else{

            return false
        }
    }

    // Esta función valida que no entren caracteres especiales dentro de los parámetros ingresados, para evitar vulnerabilidades o sql injection
    verifySpecialCharacters = (characters) => !/[*%<>)(}{]/.test(characters)

    // Esta función verifica el tamaño máximo de los caracteres ingresados
    verifyMaxSize = (characters, size) => ( characters.length > size ) ? false : true

    // Esta función verifica el tamaño mínimo de los caracteres ingresados
    verifyMinSize = (characters, size) => ( characters.length < size ) ? false : true

    // Esta función verifica que el dato ingresado sea un número entero positivo
    verifyNumber = (number) => ( number >= 0 && Number.isInteger(number) ) ? true : false

    // Esta función verifica que el argumento ingresado sea solo texto 
    verifyText = (text) => /[a-zA-Z]/.test(text)

    // Esta función verifica la fecha
    verifyDate = (date) => /^\d{2,4}\-\d{1,2}\-\d{1,2}$/.test(date)
    
    // Esta función verifica la fecha y hora
    verifyDateTime = (date) => /^\d{2,4}\-\d{1,2}\-\d{1,2}\ \d{1,2}\:\d{1,2}\:\d{1,2}$/.test(date)

    // Esta función verifica el tipo de extensión de una imagen
    verifyExtImage = (file) => ( file.mimetype.toLowerCase() === 'image/jpeg' || file.mimetype.toLowerCase() === 'image/jpg' || file.mimetype.toLowerCase() === 'image/png' ) ? true : false

    // Esta función verifica el tipo de extensión del archivo ingresado
    verifyExtDocument = (file) => ( file.mimetype.toLowerCase() === 'application/pdf' ) ? true : false

    // Esta función verifica si el nombre de la imagen está repetido en la carpeta de archivos
    verifyNameImage = (file) => {

        const filename = file.name.trim()

        if ( fs.readdirSync("./images").includes(filename) ) {

            const array = filename.split('.')

            file.name = array[0]+(Math.random() * (999 - 1) + 1).toFixed()+'.'+array[array.length-1]
        }

        return true
    }
}