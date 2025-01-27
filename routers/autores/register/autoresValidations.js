const Joi = require('joi')

class AutoresValidations{

    validateAutorRegister(autor_data){
        const schema = Joi.object({
            nombre: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ]{3,15}$')) 
                .required(),
            apellidoPaterno: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ]{3,15}$')) 
                .required(),
            apellidoMaterno: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ]{3,15}$')) 
                .required()
        });

        return schema.validate(autor_data)
    }
}

module.exports = AutoresValidations;