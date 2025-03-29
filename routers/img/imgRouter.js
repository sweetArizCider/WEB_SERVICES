const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:image', (req, res) => {
    try{
        const img = req.params.image;
        const imgPath = path.join(__dirname, '../../img', `${img}`);
        res.status(200).sendFile(imgPath);
    }
    catch(error){
        res.status(404).json({error: error})
    }
})

module.exports = router;