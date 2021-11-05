export default class validationController {

    // Constructor vacío
    constructor() {}

    // Esta función valida que no entren caracteres especiales dentro de los parámetros ingresados, para evitar vulnerabilidades o sql injection
    verifySpecialCharacters = (characters) => {

        const patern = /[*%<>)(]/

        return !patern.test(characters)
    }
    
    // Esta función se encarga de validar que el correo sea del formato correcto y hace una comparación con el patern para evaluarlo
    verifyEmail = (email) => {
        console.log(email);

        if( this.verifySpecialCharacters(email) ){

            const patern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

            return patern.test(email.toLowerCase())
        } else{

            return false
        }
    }

    // Esta función verifica el tamaño máximo de los caracteres ingresados
    verifyMaxSize = (characters, size) => {

        return ( characters.length > size ) ? false : true
    }

    // Esta función verifica el tamaño mínimo de los caracteres ingresados
    verifyMinSize = (characters, size) => {

        return ( characters.length < size ) ? false : true
    }

    verifyNumber = () => {}

    verifyText = () => {}
}