const express = require('express');
const router = express.Router();
const User = require('../../../models/user');
const Token = require('../../../models/token');

router.get('/activate/:token', async (req, res) =>{
    const token = req.params.token;
    const date = new Date();

    // Check if the token exists
    const tokenFound = await Token.findOne({where: {token: token}});
    if(!tokenFound){
        return res.status(404).send({
            error: "Token not found"
        });
    }

    // Check if the token is related to a user
    const user = await User.findOne({where: {idToken: tokenFound.id}})

    if(!user){
        return res.status(404).send({
            error: "User not found"
        });
    }
    // Check if the token has expired
    if(tokenFound.expiration < date){
        return res.status(400).send({
            error: "Token has expired"
        });
    };
    // Check if the token has been used
    if(tokenFound.used){
        return res.status(400).send({
            error: "Token has been used"
        });
    };

    // Activate the user
    user.enabled = true;
    tokenFound.used = true;

    // Save the changes into the database
    
    await user.save();
    await tokenFound.save();
    return res.status(200).send({
        message: "User activated"
    });
})

module.exports = router;
