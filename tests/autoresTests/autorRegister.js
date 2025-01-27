const AutoresValidations = require("../../routers/autores/autoresValidations")

const validator = new AutoresValidations();
const autor_data = {
    nombre: "Carlos",
    apellidoPaterno: "Arizpe",
    apellidoMaterno: "Hernandez",
};

const validationResult = validator.validateAutorRegister(autor_data)

console.log(validationResult);