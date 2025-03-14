const Joi = require('joi');

class AutoresValidations {
    validateAutorRegister(autor_data) {
        const schema = Joi.object({
            id: Joi.number()
                .integer()
                .optional(),

            license: Joi.string()
                .max(12)
                .required(),

            name: Joi.string()
                .required(),

            lastName: Joi.string()
                .optional(),

            secondLastName: Joi.string()
                .optional(),

            year: Joi.number()
                .integer()
                .optional()
        });

        return schema.validate(autor_data);
    }
}

module.exports = AutoresValidations;