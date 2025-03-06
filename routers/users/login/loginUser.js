const express = require('express');
const User = require('../../../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

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
            return res.status(401).send({ error: 'Invalid password' });
        }

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