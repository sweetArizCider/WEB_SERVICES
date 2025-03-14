const express = require("express");
const Libro = require("../../../models/libro.js");
const router = express.Router();


router.get('/', async(req,res)=>{
    try{
        const libros = await Libro.findAll();
        res.status(200).send(libros);
    }catch(error){
        return res.status(500).send(error);
    }
});

router.get('/:ISBN', async(req, res)=>{
    try{
        const libro = await Libro.findOne({where: {ISBN: req.params.ISBN}});
        if(!libro){
            return res.status(404).send({message: "Libro not found"});
        }
        return res.status(200).send(libro);

    }catch(error){
        return res.status(500).json(error);
    }
});

router.delete('/:ISBN', async(req, res)=>{
    try{
        const libro = await Libro.findOne({where: {ISBN: req.params.ISBN}});
        if(!libro){
            return res.status(404).send({message: "Libro not found"});
        }
        await libro.destroy();
        return res.status(200).send({message: "Libro deleted"});
    }catch(error){
        return res.status(500).json(error);
    }
});

router.post('/random', async(req, resJ)=>{
    
})

module.exports = router;