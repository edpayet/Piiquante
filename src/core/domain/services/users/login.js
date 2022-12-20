import { Email } from '../../valueObjects/Email';
import { Password } from '../../valueObjects/Password';
import { Token } from '../../valueObjects/Token';

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
        const token = new Token(userFound.getId());
        return { user: userFound, token: token.getValue() };
    }
}
