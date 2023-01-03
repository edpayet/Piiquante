import { Email } from '../../valueObjects/Email';
import { Password } from '../../valueObjects/Password';
import { Token } from '../../valueObjects/Token';
import { Result } from '../../../../util/result';

export class Login {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, password = '') {
        try {
            const verifiedEmail = new Email(email);
            const userFound = await this.userRepository.findUserByEmail(
                verifiedEmail
            );
            if (userFound === undefined) {
                console.log('no user found with this email');
                return Result.failure(
                    new Error('The email/password pair is not correct')
                );
            }
            if (!userFound.hasPassword(new Password(password))) {
                console.log('password not matching');
                return Result.failure(
                    new Error('The email/password pair is not correct')
                );
            }
            const token = new Token(userFound.getId());
            return Result.success({ user: userFound, token: token.getValue() });
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
