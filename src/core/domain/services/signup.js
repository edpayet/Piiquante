export class Signup {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // TODO: make a class for email, use it
    // TODO: make a class for user, use it
    execute(email, password) {
        if (this.userRepository.findUserByEmail(email)) {
            throw new Error('user already exists');
        }
        const user = { email, password };
        this.userRepository.addUser(user);
        return user;
    }
}
