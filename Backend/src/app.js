// Importaciones necesarias
import express from 'express'
import config from './config'
import loginRoute from './routes/loginRouter'

// Instancia
const app = express()

// Setttings

// Si existe la variable port que la utilice, sino que utiliza el 3000
app.set('port', process.env.PORT || 3000)

// Obtiene las rutas del loginRoute
app.use(loginRoute)

export default app

