// Importaciones necesarias
import app from './app';

// Obtiene la variable port desde el archivo ./app
app.listen( app.get('port') );

console.log( 'Servidor activo' );