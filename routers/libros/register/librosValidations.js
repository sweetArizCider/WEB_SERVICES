const Joi = require('joi');

class LibrosValidations {
    validateLibro(libro_data) {
        const schema = Joi.object({
            id: Joi.number()
                .integer()
                .optional(),

            ISBN: Joi.string()
                .max(16)
                .required(),

            title: Joi.string()
                .max(512)
                .required(),

            autor_license: Joi.string()
                .max(12)
                .optional(),

            editorial: Joi.string()
                .optional(),

            pages: Joi.number()
                .integer()
                .optional(),

            year: Joi.number()
                .integer()
                .required(),

            genre: Joi.string()
                .optional(),

            language: Joi.string()
                .required(),

            format: Joi.string()
                .optional(),

            sinopsis: Joi.string()
                .optional(),
            content: Joi.string()
                .optional(),
        });

        return schema.validate(libro_data);
    }
}

module.exports = LibrosValidations;