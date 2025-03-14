const express = require('express');
const User = require('../../../models/user');
const router = express.Router();
const { dev } = require('../../../utils/config.json')

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const secret = dev.secret;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the user is enabled
        if (!user.enabled) {
            return res.status(403).send({ error: 'User is not enabled' });
        }

        // Validate password
        if (user.password !== password) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const newCookie = Buffer.from(secret, Date.now(), 'utf8').toString('base64');

        res.cookie('ARZID', `${newCookie}`, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.status(200).send({
            ok: true,
            message: 'Login successful',
            
        });

                
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;