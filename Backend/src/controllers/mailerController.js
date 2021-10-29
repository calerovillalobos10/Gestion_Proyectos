import nodemailer from 'nodemailer'

// Se encarga de enviar un correo
export const mailer = (email, imgSrc, res) => {

    // Crea la comunicación
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: process.env.CORREO,
            pass: process.env.CONTRASENIA
        },
    });

    // Parámetros del cuerpo de correo
    const mailOptions = {
        from: process.env.CORREO,
        to: email,
        subject: "Doble Autentificación",
        html: getTemplate(imgSrc),
    };

    // Envía el correo si todo está bien
    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            res.status(500).send(error.message)
        } else {

            res.status(200).send(info.response)
        }
    });
}

// Crea un html con el pin de la doble autentificación
const getTemplate = (imgSrc) => `
<div
    style="text-align: center; background-color: rgb(29, 29, 29);color: white;padding-bottom: 2em;padding-top: 2em;font-size: 1.2em;font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <div class="body">
        <h1>Pin de doble autentificación</h1>
        <hr>
        <img src="https://i.imgur.com/3PSKAYy.png" alt="logo" style="max-width: 100px;">
        <div>
            <p style="max-width: 75ch;margin-left: auto;margin-right: auto;">
                Se adjunta el código QR
            <p><img src=${imgSrc}>
</p>
        </div>
        </p>
        <hr>
        <p style="color: rgb(211, 211, 211); font-size: .7em;">
            Este mensaje se envió para alertarlo sobre actualizaciones importantes en
            su cuenta.
            <br />
            Esta dirección de correo electrónico no puede recibir respuestas.
        </p>
    </div>
</div>`;
