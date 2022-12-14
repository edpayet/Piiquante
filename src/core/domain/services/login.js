export class Login {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // TODO: make a class for email, make a class for password, use them
    execute(email, password = '') {
        const userFound = this.userRepository.findUserByEmail(email);
        if (userFound === undefined) {
            throw new Error('user does not exist');
        }
        if (!userFound.hasPassword(password)) {
            throw new Error('password is not correct');
        }
        return userFound;
    }
}
