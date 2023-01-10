import { User } from '../../entities/User';
import { Email } from '../../valueObjects/Email';
import { Result } from '../../../../util/result';

export class Signup {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, password) {
        try {
            if (await this.userRepository.findUserByEmail(new Email(email))) {
                return Result.failure(new Error('user already exists'));
            }
            const user = User.create(email, password);
            await this.userRepository.addUser(user);
            return Result.success(user);
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
