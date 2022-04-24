const express = require('express');
const http = require('http');
const io = require('socket.io');
const mainRouter = require('../routes/mainRouter');
const path = require('path');
const {controller} = require('../src/controller/productosController');
const fs = require('fs');
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

let messagesFile = 'src/mensajes/mensajes.json';

//Funciones para persistencia de datos en mensajes.json
function leerMensajes() {
    let messages = fs.readFileSync(messagesFile, "utf-8")
    let parsedMessages = JSON.parse(messages);
    console.log("File read correctly.");
    return parsedMessages;
}

function guardarMensajes(msj) {
    let messages = leerMensajes();
    messages.push(msj);
    fs.writeFileSync(messagesFile, JSON.stringify(messages));
    console.log("Message saved.");
}

let productCatalog = [{
    id: 1,
    title: "Nintendo Switch OLED",
    price: 92999.99,
    thumbnail: "https://assets.nintendo.com/image/upload/b_white,c_pad,f_auto,h_382,q_auto,w_573/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/gallery/image01?v=2022021721"
},
{
    id: 2,
    title: "PlayStation 5",
    price: 198999.99,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvp64pH79Rc064zruKT4qtKKEfN8NbMWhXnEd6Htxq5S06yvoyzWZq4rmm_Swr_dM8Z80&usqp=CAU"
},
{
    id: 3,
    title: "Mario Kart 8 Deluxe",
    price: 8999.99,
    thumbnail: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_280x437/public/media/image/2017/02/mario-kart-8-deluxe-caratula.jpg?itok=XuGvkgAx"
}
];




const WSServer = io(myServer);

WSServer.on('connection', (socket) => {
    console.log('Nueva conexion');
    console.log(socket.id);
    console.log(socket.client.id);

    socket.emit('productCatalog', {
        products: productCatalog,
    });
    socket.on('newProduct', (data) => {
        console.log('esta es la data q llega:',data);
        productCatalog.push({
            id: productCatalog.length + 1,
            ...data
        });
        console.log(productCatalog);
        io.sockets.emit('productCatalog', {
            products: productCatalog
        });
    });

    socket.on('nuevo-mensaje', (mensaje) => {
        console.log(`Nuevo mensaje de: ${mensaje.nombre}\n dice: ${mensaje.mensaje}`);
    });

    let messages = leerMensajes();
    socket.emit('messages', {
        messages: messages
    });
    socket.on('newMsg', (data) => {
        guardarMensajes(data);
        io.sockets.emit('messages', {
            messages: leerMensajes()
        });
    });

})

//definicion de las rutas
app.use('/api', mainRouter);
