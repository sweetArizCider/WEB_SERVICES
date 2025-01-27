const Joi = require('joi');

class LibrosValidations {
    validateLibro(libro_data) {
        const schema = Joi.object({
            ISBN: Joi.string()
                .length(13)
                .required(),
            
            titulo: Joi.string()
                .max(255)
                .required(),

            autorID: Joi.number()
                .integer()
                .required(),

            numPag: Joi.number()
                .integer()
                .required(),

            editorial: Joi.string()
                .max(100)
                .optional()
        });
        
        return schema.validate(libro_data);
    }
}

module.exports = LibrosValidations;
