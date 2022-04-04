class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }

    getFullName(){
        console.log(`Hola, me llamo ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
        console.log(this.mascotas);
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(nombre, autor){
        this.libros.push ({
                    nombre : nombre,
                    autor : autor
        });

        console.log(this.libros);
    }

    getBookNames(libros){
        let arr = [];
        libros.forEach( libro => {
            arr.push(libro.nombre)
        });

        console.log(arr);
    }
}


let user1 = new Usuario (
                "Agustin",
                "Taibo",
                [
                    {
                        nombre : "El senior de las moscas",
                        autor: "William Golding"
                    },
                    {
                        nombre: "Fundacion",
                        autor: "Isaac Asimov"
                    }
                ],
                ["perro", "gato"]
)

console.log("===============================================")
user1.getFullName();
console.log("===============================================")
user1.addMascota("Pez");
console.log("===============================================")
user1.countMascotas();
console.log("===============================================")
user1.addBook("El ultimo deseo", "Andrzej Sapkowski");
console.log("===============================================")
user1.getBookNames(user1.libros);
console.log("===============================================")