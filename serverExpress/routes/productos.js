const express = require('express');

const router = express.Router();
const { controller } = require('../src/controller/productosController');

router.get('/', (req, res) => {
    const products = controller.getAll();
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
})

router.get('/:genId', (req, res) => {
    const products = controller.getAll();
    const found = products.filter((product) => product.genId == req.params.genId);
    if(found.length != 0){
        res.json(found);
    } else {
        res.json({
            err : 'Product not found',
        });
    }
})

router.post('/save', (req, res) => {
    const body = req.body;
    const products = controller.getAll();
    const genId = products.length + 1;
    const newProduct = {
        title: body.title,
        price: body.price,
        genId: genId,
    };
    controller.save(newProduct);

    res.redirect('/');
});

router.put('/:genId', (req, res) => {
    const products = controller.getAll();
    const found = products.filter((product) => product.genId == req.params.genId);
    if(found.length != 0){
        const updatedProduct = {
            genId : req.params.genId,
            ...req.body,
        };
        container.save(updatedProduct);
        res.json({
            message : 'Product updated',
        });
    } else {
        res.json({
            err : 'Product not found',
        });
    }
});

router.delete('/:genId', (req, res) => {
    const products = controller.getAll();
    const found = products.filter((product) => product.genId == req.params.genId);
    if(found.length != 0){
        container.deleteById(req.params.genId);
        res.json({
            msg : 'Product deleted',
        });
    } else {
        res.json({
            err : 'Product not found',
        });
    }
})

module.exports = router;