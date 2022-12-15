import * as jwt from 'jsonwebtoken';

import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';

export class Login {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(email, password = '') {
        const userFound = this.userRepository.findUserByEmail(new Email(email));
        if (userFound === undefined) {
            throw new Error('The email/password pair is not correct');
        }
        if (!userFound.hasPassword(new Password(password))) {
            throw new Error('The email/password pair is not correct');
        }
        const token = this.createToken(userFound.id);
        return { userFound, token };
    }

    createToken(userId) {
        const token = {
            userId,
            token: jwt.sign({ userId }, '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW', {
                expiresIn: '24h',
            }),
        };
        return token;
    }
}
