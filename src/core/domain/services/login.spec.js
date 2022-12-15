import { InMemoryUserRepository } from '../../infrastructure/inMemoryUserRepository';
import { User } from '../entities/User';
import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';
import { Login } from './login';

describe('login', () => {
    it('login instance should be defined', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        expect(login).toBeDefined();
        expect(login).toBeInstanceOf(Login);
    });
    it('login execute function should be defined', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        expect(login.execute).toBeDefined();
    });
    it('should return an error if a user does not exist', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        expect(() =>
            login.execute('nonvalid@email.com', 'password')
        ).toThrowError('The email/password pair is not correct');
    });
    it('should not throw an error if a user exists', () => {
        const userRepository = new InMemoryUserRepository();
        const email = 'valid@email.com';
        const password = 'password';
        userRepository.addUser(User.create(email, password));
        const login = new Login(userRepository);
        expect(() => login.execute(email, password)).not.toThrowError();
    });
    it('should return a user instance when user is logged in', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const email = 'valid@email.com';
        const password = 'password';
        userRepository.addUser(User.create(email, password));
        const user = login.execute(email, password);
        expect(user).toBeInstanceOf(User);
        expect(user.hasEmail(new Email(email))).toBeTruthy;
        expect(user.hasPassword(new Password(password))).toBeTruthy;
    });
    it('should return an error if a the email has an invalid format', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const email = 'invalidemail.com';
        const password = 'password';
        expect(() => login.execute(email, password)).toThrowError(
            'email is not valid'
        );
    });
    it('should return an error if the pair email/password is not correct', () => {
        const userRepository = new InMemoryUserRepository();
        userRepository.addUser(User.create('email@exists.com', 'password'));
        const login = new Login(userRepository);
        expect(() =>
            login.execute('email@exists.com', 'wrongpassword')
        ).toThrowError('The email/password pair is not correct');
    });
});
