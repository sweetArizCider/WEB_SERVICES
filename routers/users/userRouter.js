const express = require('express');
const { dev } = require('../../utils/config.json');
const DEV_SECRET = process.env.DEV_SECRET;
const router = express.Router();

const User = require('../../models/user');
const Token = require('../../models/token');
const GmailActions = require('../../controller/gmail/gmailActions');
const validator = require('./userValidator');
const TokenActions = require('../../controller/token/tokenActions');


const tokenURL = dev.activateUrl;
let token;
const gmail = new GmailActions();

router.post('/register', async (req, res) => {
    const user_data = req.body;
    user_data.enabled = false;
    const userValidator = new validator();
    const validationResult = userValidator.validateUser(user_data);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    const exists = await User.findOne({ where: { username: user_data.username } });

    if (exists) {
        return res.status(409).send({
            error: `El usuario ${user_data.username} ya existe`
        });
    }

    if (user_data.secondlastname === undefined) {
        user_data.secondlastname = '';
    }

    const tokenActions = new TokenActions();

    try {
        const result = await tokenActions.createToken();
        user_data.token = result.id; 
        token = result.token;
    } catch (error) {
        console.log("Error creating the token: " + error);
        return res.status(400).send("Error creating the token");
    }

    try {
        await User.create(user_data);
    } catch (error) {
        console.log("Error creating the user: " + error);
        return res.status(400).send("Error creating the user");
    }

    const emailData = {
        from: "Registration service <libreria@gmail.com>",
        to: `${user_data.name} ${user_data.lastname} ${user_data.secondlastname} <${user_data.email}>`,
        subject: "User Activation",
        date: (new Date()).toUTCString(),
        messageId: "<activationUTT@gmail.com>",
        message: `Hello ${user_data.name} ${user_data.lastname}!\nYour username is: ${user_data.username}. To activate your account click here: ${tokenURL}${token}`
    }

    const emailSent = await gmail.sendEmail(emailData);
    if (!emailSent) {
        return res.status(400).send("Error sending the email");
    }

    res.status(200).send({
        ok: true,
        message: `User ${user_data.username} created successfully. An email has been sent to ${user_data.email}`
    });
});

router.get('/activate/:token', async (req, res) =>{
    const token = req.params.token;
    const date = new Date();

    const tokenFound = await Token.findOne({where: {token: token}});

    if(!tokenFound){
        return res.status(404).send({
            error: "Token not found"
        });
    }
    const user = await User.findOne({where: {token: tokenFound.id}})
    if(!user){
        return res.status(404).send({
            error: "User not found"
        });
    }
    if(tokenFound.expiration < date){
        return res.status(400).send({
            error: "Token has expired"
        });
    };
    if(tokenFound.used){
        return res.status(400).send({
            error: "Token has been used"
        });
    };

    user.enabled = true;
    tokenFound.used = true;

    await user.save();
    await tokenFound.save();
    return res.status(200).send({
        message: "User activated"
    });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const secret = DEV_SECRET;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!user.enabled) {
            return res.status(403).send({ error: 'User is not enabled' });
        }

        if (user.password !== password) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const newCookie = Buffer.from(secret, Date.now(), 'utf8').toString('base64');

        res.cookie('ARZID', `${newCookie}`, { expires: new Date(Date.now() + 900000), httpOnly: true })

        res.status(200).send({
            ok: true,
            message: 'Login successful',
            cookie: 'ARZID' + newCookie
        });     
    } catch (error) {
        console.log('Error during login:', error);
        
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;