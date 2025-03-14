const express = require("express");
const Autor = require("../../../models/autor.js");
const AutoresValidations = require("./autoresValidations");
const router = express.Router();

router.post('/register', async(req, res)=>{
    const autor_data = req.body;
    const validator = new AutoresValidations();

    const validationResult = validator.validateAutorRegister(autor_data);

    if (validationResult.error){
        return res.status(400).send(validationResult.error)
    };

    try{
        const newAutor = await Autor.create(autor_data);
        res.status(201).send({ok: newAutor});
    } catch(error){
        return res.status(400).send(error);
    };
});

module.exports = router;