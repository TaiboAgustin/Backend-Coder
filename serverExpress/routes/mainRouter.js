const express = require('express');

const router = express.Router();

const productosRouter = require('./productos');

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
        });
});

router.use('/productos', productosRouter);

module.exports = router;
