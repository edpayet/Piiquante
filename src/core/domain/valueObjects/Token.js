import * as jwt from 'jsonwebtoken';

const key = '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW';
const expiresIn = '24h'

export class Token {
    constructor(value, isId = true) {
        this.userId = isId ? value : jwt.verify(value, key);
        this.value = isId ? this.createToken(value) : value;
    }

    // eslint-disable-next-line class-methods-use-this
    createToken(userId) {
        // Cahier des charges "un token web JSON signé (contenant également l'_id de l'utilisateur)" ?
        // const token = {
        //     userId,
        //     token: jwt.sign({ userId }, key, {
        //         expiresIn,
        //     }),
        // };
        // return token;
        const token = jwt.sign({ userId }, key, {
            expiresIn,
        });
        return token;
    }

    getUserId() {
        return this.userId;
    }

    getValue() {
        return this.value;
    }

    isEqual(token) {
        return this.value === token.getValue();
    }

    decode() {
        return jwt.verify(this.value, key);
    }
}
