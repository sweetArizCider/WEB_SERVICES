const express = require("express");
const Libro = require("../../models/libro");
const LibrosValidations = require("./librosValidations");
const router = express.Router();

router.post("/", async(req, res)=>{
    const libro_data = req.body;
    const validator = new LibrosValidations();

    const validatorResult = validator.validateLibro(libro_data);
    if(validatorResult.error){
        return res.status(400).send(validatorResult.error);
    }

    try{
        const newLibro = await Libro.create(libro_data)
        res.status(201).send({ok: newLibro})
    }catch(error){
        return res.status(400).send(error)
    }
})

router.get('/', async(req,res)=>{
    try{
        const libros = await Libro.findAll();
        res.status(200).send(libros);
    }catch(error){
        return res.status(500).send(error);
    }
});

router.get('/?isbn&autor', async(req, res)=>{
    const isbn = req.query.isbn;
    const autor = req.query.autor;
    if(isbn){
        try{
            const libro = await Libro.findOne({where: {isbn: isbn}});
            if(!libro){
                return res.status(404).json({message: "Libro not found"});
            }
            return res.status(200).send(libro);
        }catch(error){return res.status(400).json(error);}
    }
    else if(autor){
        try{
            const libros = await Libro.findAll({where: {license: autor}});
            if(libros.length == 0){
                return res.status(404).json({message: "Please search for author license... Or that author does not have any books"});
            }
        }catch(error){return res.status(400).json(error);}
    }
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

module.exports = router;
