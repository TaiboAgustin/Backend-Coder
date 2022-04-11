const express = require('express');
const mainRouter = require('../routes/mainRouter');
const path = require('path');
const {controller} = require('../src/controller/productosController');

//Inicializacion de express
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on('error', (err) => console.log('server error', err));

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    const productos = controller.getAll();
    res.render('index', { productos });
});


//definicion de las rutas
app.use('/api', mainRouter);
