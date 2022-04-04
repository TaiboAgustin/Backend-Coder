const express = require('express');

const router = express.Router();
const Container = require('../entregable2.js');

const container = new Container('./products.txt');

router.get('/', (req, res) => {
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
})

router.get('/:genId', (req, res) => {
    const products = container.getAll();
    const found = products.filter((product) => product.genId == req.params.genId);
    if(found.length != 0){
        res.json(found);
    } else {
        res.json({
            err : 'Product not found',
        });
    }
})

router.post('/', (req, res) => {
    const products = container.getAll();
    const genId = products.length + 1;
    const newProduct = {
        genId,
        ...req.body,
    };
    container.save(newProduct);
    res.json({
        message : 'Product saved',
    });
});

router.put('/:genId', (req, res) => {
    const products = container.getAll();
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
    const products = container.getAll();
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