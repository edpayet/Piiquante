import * as jwt from 'jsonwebtoken';

export class Token {
    constructor(userId) {
        this.value = this.createToken(userId);
    }

    // eslint-disable-next-line class-methods-use-this
    createToken(userId) {
        const token = {
            userId,
            token: jwt.sign({ userId }, '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW', {
                expiresIn: '24h',
            }),
        };
        return token;
    }

    getValue() {
        return this.value;
    }

    isEqual(token) {
        return this.value === token.getValue();
    }
}
