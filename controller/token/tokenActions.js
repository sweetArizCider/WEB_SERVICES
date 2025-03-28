const Token = require('../../models/token');
const SECRET = process.env.SECRET;

class TokenActions {
    constructor() {
        this.secret = SECRET;
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

        console.log('New token created:', newToken);
        console.log('New token ID:', newToken.id);

        return { id: newToken.id, token: token };
    }
}

module.exports = TokenActions;