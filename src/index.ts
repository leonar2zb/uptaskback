import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.bgGreen(`Servidor escuchando en el puerto ${port}`))
})

server.use('/', (req, res) => {
    res.send('Respuesta desde la raiz')
})