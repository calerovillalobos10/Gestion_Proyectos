// Importaciones necesarias
import sql from 'mssql';

// Se crea un objeto con los atributos que tendrá la conexión
const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: "localhost",
    database: process.env.DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// Una vez terminado de conectar retornará un pool
export const getConnection = async () => {
    
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (err) {
        console.log(err);
    }
}

export { sql };


