const express = require("express");
const Libro = require("../../models/libro");
const LibrosValidations = require("./librosValidations");
const DeepSeek = require("../../controller/AI/DeepSeek");
const router = express.Router();

router.post("/", async(req, res)=>{
    let libro_data = req.body;
    const validator = new LibrosValidations();

    const validatorResult = validator.validateLibro(libro_data);
    if(validatorResult.error){
        return res.status(400).send(validatorResult.error);
    }

    if(!libro_data.img){
        libro_data.img = "https://libreria-y5ka.onrender.com/img/defaultPortrait.webp";
    }

    try{
        const newLibro = await Libro.create(libro_data)
        res.status(201).send({ok: newLibro})
    }catch(error){
        return res.status(400).send(error)
    }
})

router.get('/', async(req, res)=>{
    // There's 2 query params 'isbn' and 'autor_license' ?isbn=123&autor_license=123
    const { isbn , autor_license } = req.query;
        const query = {};
        if(isbn) query.isbn = isbn;
        if(autor_license) query.autor_license = autor_license;
        Libro.findAll({where: query})
        .then(libros => res.status(200).json(libros))
        .catch(error => res.status(500).json(error));
});

router.delete('/:ISBN', async(req, res)=>{
    try{
        const libro = await Libro.findOne({where: {isbn: req.params.ISBN}});
        if(!libro){
            return res.status(404).send({message: "Libro not found"});
        }
        await libro.destroy();
        return res.status(200).send({message: "Libro deleted"});
    }catch(error){
        return res.status(500).json(error);
    }
});

router.post('/AI', async(req, res)=> {
    const deepseek = new DeepSeek();

    deepseek.createBook()
    .then(book=> deepseek.cleanAIResponse(book))
    .then(bookJson => {
        if(!bookJson){
            return res.status(500).send({error: "Error creating book"});
        }
        const validator = new LibrosValidations();
        const validatorResult = validator.validateLibro(bookJson);
    
        if(validatorResult.error){
            return res.status(500).json({validatorError: validatorResult.error})
        }

        Libro.create(bookJson)
        .then(libro => res.status(201).json({ok: libro}))
        .catch(error => res.status(500).json({error: error}))
    })
})
module.exports = router;
