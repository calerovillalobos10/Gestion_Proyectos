// Importaciones necesarias
import express from 'express'
import config from './config'
import cors from 'cors'
import loginRoute from './routes/loginRouter'
import departmentRoute from './routes/departmentRouter'
import fileRoute from './routes/fileRouter'
import functionaryRoute from './routes/functionaryRouter'
import binnacleRoute from './routes/binnacleRouter'
import solicitationRoute from './routes/solicitationRouter'

// Instancia
const app = express()

// Setttings
// Si existe la variable port que la utilice, sino que utiliza el 3000
app.set('port', config.port || 3000)

// Middlewares
app.use(cors('http://localhost:4200/'));

app.use(express.json())

// Obtiene las rutas del loginRoute
app.use(loginRoute)
app.use(departmentRoute)
app.use(fileRoute)
app.use(functionaryRoute)
app.use(binnacleRoute)
app.use(solicitationRoute)

export default app

