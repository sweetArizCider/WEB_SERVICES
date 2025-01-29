const express = require("express");
const Autor = require("../../../models/autor.js");
const router = express.Router();

router.get('/get', async(req,res)=>{
    try{
        const autores = await Autor.findAll();
        res.status(200).send(autores);
    }catch(error){
        return res.status(400).send("Error getting the authors");
    }
});

module.exports = router;