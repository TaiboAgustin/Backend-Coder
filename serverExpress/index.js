const express = require('express');
const mainRouter = require('./routes/mainRouter');

//Inicializacion de express
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on('error', (err) => console.log('server error', err));


//definicion de las rutas
app.use('/api', mainRouter);
