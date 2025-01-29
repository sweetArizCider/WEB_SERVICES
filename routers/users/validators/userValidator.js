const joi = require('joi');

class UserValidator {
    validateUser(user_data){
        const schema = joi.object({
            username: joi.string()
            .min(6)
            .alphanum()
            .max(50)
            .required(),

            password: joi.string()
            .min(6)
            .max(50)
            .required(),

            name: joi.string()
            .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$'))
            .required(),

            lastName: joi.string()
            .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$'))
            .required(),
            
            secondLastName: joi.string()
            .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$')),
            
            email: joi.string()
            .email()
            .required(),

            enabled: joi.boolean()
            .required()
        });

        return schema.validate(user_data);
    }
}

module.exports = UserValidator;
