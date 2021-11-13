// Importaciones necesarias
import {config} from 'dotenv'

// Variables de entorno

// Se le dice a la función que si existe la variable de entorno PORT que la use, sino que seleccione 4000
export default {
    port: process.env.PORT || 4000
}

config();