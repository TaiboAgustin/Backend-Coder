const express = require('express');
const http = require('http');
const io = require('socket.io');
const mainRouter = require('../routes/mainRouter');
const path = require('path');
const {controller} = require('../src/controller/productosController');

//Inicializacion de express
const app = express();
const PORT = 8080;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const myServer = http.Server(app);

myServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
myServer.on('error', (err) => console.log('server error', err));

// const publicPath = path.resolve(__dirname, './public');
// app.use(express.static(publicPath));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.get('/', (req, res) => {
    const productos = controller.getAll();
    res.render('index', { productos });
});

const WSServer = io(myServer);

WSServer.on('connection', (socket) => {
    console.log('Nueva conexion');
    // socket.on('disconnect', () => {
    //     console.log('Conexion terminada');
    // });
    // socket.on('nuevo-producto', (producto) => {
    //     controller.add(producto);
    //     WSServer.emit('nuevo-producto', producto);
    // });
    // socket.on('borrar-producto', (id) => {
    //     controller.delete(id);
    //     WSServer.emit('borrar-producto', id);
    // });
    // socket.on('editar-producto', (producto) => {
    //     controller.edit(producto);
    //     WSServer.emit('editar-producto', producto);
    // });
    socket.on('nuevo-mensaje', (mensaje) => {
        console.log(`Nuevo mensaje de: ${mensaje.nombre} \n dice: ${mensaje.mensaje}`);
    });

    socket.emit('productCatalog', {
        products: productCatalog,
        viewTitle: "Listado de productos",
        errorMessage: "No hay productos."
    });
    socket.on('newProduct', (data) => {
        productCatalog.push({
            id: productCatalog.length + 1,
            ...data
        });
        console.log(productCatalog);
        io.sockets.emit('productCatalog', {
            products: productCatalog,
            viewTitle: "Listado de productos",
            errorMessage: "No hay productos."
        });
    });
})

//definicion de las rutas
app.use('/api', mainRouter);
