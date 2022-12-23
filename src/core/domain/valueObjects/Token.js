import * as jwt from 'jsonwebtoken';

export class Token {
    constructor(userId) {
        this.value = this.createToken(userId);
    }

    // eslint-disable-next-line class-methods-use-this
    createToken(userId) {
        // Cahier des charges "un token web JSON signé (contenant également l'_id de l'utilisateur)" ?
        // const token = {
        //     userId,
        //     token: jwt.sign({ userId }, '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW', {
        //         expiresIn: '24h',
        //     }),
        // };
        // return token;
        const token = jwt.sign({ userId }, '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW', {
            expiresIn: '24h',
        });
        return token;
    }

    getValue() {
        return this.value;
    }

    isEqual(token) {
        return this.value === token.getValue();
    }
}
