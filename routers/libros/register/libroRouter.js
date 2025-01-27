const express = require("express");
const Libro = require("../../../models/libro");
const LibrosValidations = require("./librosValidations");
const router = express.Router();

router.use("/register", async(req, res)=>{
    const libro_data = req.body;
    const validator = new LibrosValidations();

    const validatorResult = validator.validateLibro(libro_data);
    if(validatorResult.error){
        return res.status(400).send(validatorResult.error)
    }

    try{
        Libro.create(libro_data)
        res.status(201).send({ok: true})
    }catch(error){
        return res.status(400).send(error)
    }
})

module.exports = router;
