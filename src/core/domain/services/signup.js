import { User } from '../entities/User';
import { Email } from '../valueObjects/Email';

export class Signup {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    execute(email, password) {
        if (this.userRepository.findUserByEmail(new Email(email))) {
            throw new Error('user already exists');
        }
        const user = User.create(email, password);
        this.userRepository.addUser(user);
        return user;
    }
}
