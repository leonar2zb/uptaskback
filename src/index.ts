import server from './server';

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

server.use('/', (req, res) => {
    res.send('Respuesta desde la raiz')
})