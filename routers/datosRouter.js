const express = require('express');
const router = express.Router();
const Datos = require('../models/datos');

router.post('/datos', async (req, res)=>{
    const datos = req.body
    try{
        await Datos.create(datos);
    }catch(error){
        res.status(400).send({err: error})
        return
    };
    res.status(200).send({ok: "Creado con exito"})
})

router.delete('/datos', async (req, res)=>{
    const x = req.body.x;
    const y = req.body.y;
    const z = req.body.z;
    try{
        await Datos.destroy({where: {x: x, y: y, z: z}});
        
    }catch(error){
        res.status(400).send({err: error})
        return
    };
    res.status(200).send({ok: "Borrado con exito"})
})

router.get('/datos', async (req, res)=>{
    try{
        const datos = await Datos.findAll();
        res.status(200).send(datos)
    }catch(error){
        res.status(400).send({err: error})
        return
    };
})
module.exports = router;