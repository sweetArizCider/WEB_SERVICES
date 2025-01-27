const LibrosValidations = require("../../routers/libros/register/librosValidations")

const validator = new LibrosValidations();

const libro_data = {
    ISBN: "9879345669235",
    titulo: "Programs",
    autorID: 1,
    numPag: 502,
    editorial: "Alfredo Campos"
}

console.log(validator.validateLibro(libro_data));

