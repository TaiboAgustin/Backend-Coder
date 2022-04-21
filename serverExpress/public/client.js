const socket = io.connect();

const form = document.getElementById('form');
console.log(form);


const author = document.getElementById('username');
const text = document.getElementById('texto');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mensaje = {
        nombre: author.value,
        mensaje: text.value
    };

    author.value = '';
    text.value = '';

    socket.emit('nuevo-mensaje', mensaje);



    console.log(mensaje);
});