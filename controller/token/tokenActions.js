const Token = require('../../models/token');
const { dev } = require('../../utils/config.json');

class TokenActions {
    constructor() {
        this.secret = dev.secret;
    }

    async createToken() {
        const date = new Date();
        const uniqueTime = Date.now();
        const expiration = date.setHours(date.getHours() + 24);
        const plainText = `${uniqueTime}${this.secret}${uniqueTime}`;
        const token = Buffer.from(plainText, 'utf8').toString('base64');

        const newToken = await Token.create({
            token: token,
            used: false,
            expiration: expiration
        });

        return { id: newToken.id, token: token };
    }
}

module.exports = TokenActions;