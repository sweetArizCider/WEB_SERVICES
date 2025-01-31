const express = require('express');
const User = require('../../../models/user');
const router = express.Router();
const GmailActions = require('../../../controller/gmail/gmailActions');
const gmail = new GmailActions();
validator = require('../validators/userValidator');

const tokenURL = 'http://localhost:3000/user/activate/';
const TokenActions = require('../../../controller/token/tokenActions');
let token;

router.post('/register', async (req, res) => {
        const user_data = req.body;
        const userValidator = new validator();
        const validationResult = userValidator.validateUser(user_data);

        if(validationResult.error) {
            return res.status(400).send(validationResult.error);
        }
        // Check if the user already exists
        const exists = await User.findOne({where: {username: user_data.username}});

        if(exists) {
            return res.status(409).send({
                error: `El usuario ${user_data.username} ya existe`
            });
        }

        if(user_data.secondLastName === undefined) {
            user_data.secondLastName = '';
        }

        // Creating the token, disabling the user and adding the token to the user
        const tokenActions = new TokenActions();
        await tokenActions.createToken().then(result =>{
            user_data.idToken = result.id;
            user_data.enabled = false;
            token = result.token;
            console.log(user_data);
        }).catch(error => {
            console.log("Error creating the token" + error);
            return res.status(400).send("Error creating the token");
        });

        // Creating the user
        try{
            await User.create(user_data);
        }catch(error){
            console.log("Error creating the user" + error);
            return res.status(400).send("Error creating the user");
        }

        // Anable the user sending a mail with gmail API
        const emailData = {
            from: "Registration service <pycarizpehdz@gmail.com>",
            to: `${user_data.name} ${user_data.lastName} ${user_data.secondLastName} <${user_data.email}>`,
            subject: "User Activation",
            date: (new Date()).toUTCString(),
            messageId: "<activationUTT@gmail.com>",
            message: `Hello ${user_data.name} ${user_data.lastName}!\nYour username is: ${user_data.username}. To activate your account click here: ${tokenURL}${token}`
        }

        const emailSent = await gmail.sendEmail(emailData);
        if(!emailSent){
            return res.status(400).send("Error sending the email");
        }
        res.status(200).send({
            ok: true,
            message: `User ${user_data.username} created successfully.An email has been sent to ${user_data.email}`
        })
});

module.exports = router;