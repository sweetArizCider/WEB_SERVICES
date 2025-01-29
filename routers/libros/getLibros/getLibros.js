const express = require("express");
const Libro = require("../../../models/libro.js");
const router = express.Router();

router.get('/get', async(req,res)=>{
    try{
        const libros = await Libro.findAll();
        res.status(200).send(libros);
    }catch(error){
        return res.status(400).send("Error getting the authors");
    }
});

module.exports = router;