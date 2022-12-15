import { User } from '../entities/User';
import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';
import { InMemoryUserRepository } from '../../infrastructure/inMemoryUserRepository';
import { Signup } from './signup';

describe('signup', () => {
    it('should have an execute function into the signup class', () => {
        const signup = new Signup();
        expect(signup).toBeInstanceOf(Signup);
        expect(signup.execute).toBeDefined();
    });
    it('should return an exception if an empty email is given', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        expect(() => signup.execute('')).toThrowError(
            'email must not be empty'
        );
    });
    it('should return an exception if password is weak', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        expect(() => signup.execute('valid@email.com', 'pass')).toThrowError(
            'password is not strong enough: min, uppercase'
        );
    });
    it('should return an error if a the email has an invalid format', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'invalidemail.com';
        const password = 'Password';
        expect(() => signup.execute(email, password)).toThrowError(
            'email is not valid'
        );
    });
    it('should add a user when a valid email is given', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'valid@email.com';
        const password = 'Password';
        signup.execute(email, password);
        expect(userRepository.findUserByEmail(new Email(email))).toBeDefined();
    });
    it('should return a user with a hash password', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'valid@email.com';
        const password = 'Password';
        const user = signup.execute(email, password);
        expect(user.getPassword().getValue()).not.toBe(
            new Password(password).getValue()
        );
        expect(user.hasPassword(new Password(password))).toBeTruthy();
    });
    it('should throw an exception if a user already exists', () => {
        const userRepository = new InMemoryUserRepository();
        const email = 'valid@email.com';
        const password = 'Password';
        userRepository.addUser(User.create(email, password));
        const signup = new Signup(userRepository);
        expect(() => signup.execute(email, password)).toThrowError(
            'user already exists'
        );
    });
});
