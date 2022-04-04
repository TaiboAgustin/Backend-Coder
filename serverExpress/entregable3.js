const http = require('http');
const express = require('express');
const Container = require('./entregable2.js');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on('error', (err) => console.log('server error', err));

const container = new Container('./products.txt');

app.get('/productos', (req, res) => {
    const products = container.getAll();
    if(products.length != 0){
        res.json({
            products,
        });
    }
    else{
        res.json({
            err : 'Empty file',
        });
    }
});

app.get('/productoRandom', (req, res) => {
    const products = container.getAll();
    const prod = products[Math.floor(Math.random() * products.length)];
    res.json(prod);
});