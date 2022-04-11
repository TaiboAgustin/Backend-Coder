const fs = require('fs');

class productosController{
    constructor(file){
        this.file = file;

        
    }

    getAll(){
        const content = fs.readFileSync(this.file, 'utf-8');
        let parsedFile = JSON.parse(content);
        return parsedFile;
    }

    save(obj){

        const content = fs.readFileSync(this.file, 'utf-8');
        const parsedFile = JSON.parse(content);
        const updateObj = {
            genId : parsedFile.length + 1,
            ...obj,
        };

        parsedFile.push(updateObj);

        fs.writeFileSync(this.file, JSON.stringify(parsedFile));
        console.log('Producto guardado correctamente');
        return genId;

    }

    getById(id){
        
        const content = this.getAll();
        const parsedFile = JSON.parse(content);
        const foundProd = parsedFile.filter(p => p.genId === id);
        return foundProd;

    }

    deleteById(id){
        
        const content = fs.readFileSync(this.file, 'utf-8');
        const parsedFile = JSON.parse(content);
        const updatedFile = parsedFile.filter(p => p.genId !== id);
        fs.writeFileSync(this.file, JSON.stringify(updatedFile));
        console.log('Producto eliminado correctamente');
        
    }

    deleteAll(){
        fs.writeFileSync(this.file, JSON.stringify([]));
    }

}

const container = new productosController ('products.json');

module.exports = {
    controller: container,
};
//const container = new Contenedor ('text.txt');

// container.save({
//     modelo: 'Adidas Yeezy Boost 350 v2 Zebra',
//     price: 50,
//     stock: 10
// });
// container.getById(3);
//container.getAll();
//container.deleteById(4);
//container.deleteAll();

