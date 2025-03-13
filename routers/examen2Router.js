const Examen2 = require('../models/examen2');
const express = require('express');
const router = express.Router();
//  latitud real, longitud real, altitud real, nombre text, direccion varchar(128)
router.post('/mapa/new', async (req, res)=>{
    const mapaData = req.body
    try{
        await Examen2.create(mapaData);
        res.status(200).send({ok: "Nuevo mapa creado"});
    }catch(err) {return console.log(err)}
})
// get /mapa/:latitud/:altitud/:longitud
router.get('/mapa/:latitud/:altitud/:longitud', async(req, res)=>{
    const latitud = req.body.latitud;
    const altitud = req.body.altitud;
    const longitud = req.body.longitud;
    try {
        const mapa = await Examen2.findOne({where: {latitud: latitud, altitud: altitud, longitud: longitud}})
        res.status(200).send(mapa);
    } catch (error) {
        console.log(error)
    }
})

router.get('/mapa/all', async(req, res)=>{
    try {
        const mapas = await Examen2.findAll();
        res.status(200).send(mapas);
    } catch (error) {
        console.log(error)
    }
})

router.delete('/mapa/:latitud/:altitud/:longitud', async(req, res)=>{
    const latitud = req.body.latitud;
    const altitud = req.body.altitud;
    const longitud = req.body.longitud;
    try {
        const destroyedMapa = await Examen2.destroy({where: {latitud: latitud, altitud: altitud, longitud: longitud}})
        res.sendStatus(200).send(destroyedMapa);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;