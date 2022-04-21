const socket = io.connect();

socket.on('productCatalog', (productsData) => renderProducts(productsData));
let renderProducts = (productsData) => {
    if (productsData.products.length > 0) {
        //Productos
        let htmlProductos = productsData.products.map(e => `
        <div class="row product">
            <div class="col">${e.title}</div>
            <div class="col">$ ${e.price}</div>
        </div>`
        ).join(' ');

        document.getElementById('viewTitle').innerHTML = productsData.viewTitle;
        document.getElementById('productCatalog').innerHTML = htmlProductos;
    } else {
        let html = `<div class="error" style="padding:2em;text-align:center">${data.errorMessage}</div>`;
        document.getElementById('productCatalog').innerHTML = html;
    }
}