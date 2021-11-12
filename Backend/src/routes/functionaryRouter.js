router.post('/insertF', async (req, res) =>{
    console.log('Hola');
    res.redirect(307, '/uploadImage')
    console.log('Adios');

    res.send({
        mensaje: "Se añadió la imagen exitosamente",
        estado: true
    })
})