import { User } from '../../entities/User';
import { Email } from '../../valueObjects/Email';
import { Password } from '../../valueObjects/Password';
import { InMemoryUserRepository } from '../../../infrastructure/inMemoryUserRepository';
import { Signup } from './signup';

describe('signup', () => {
    it('should have an execute function into the signup class', () => {
        const signup = new Signup();
        expect(signup).toBeInstanceOf(Signup);
        expect(signup.execute).toBeDefined();
    });
    it('should return an exception if an empty email is given', async () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        expect((await signup.execute('')).error.message).toEqual(
            'email must not be empty'
        );
    });
    it('should return an error if password is weak', async () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        expect(
            (await signup.execute('valid@email.com', 'pass')).error.message
        ).toEqual('password is not strong enough: min, uppercase');
    });
    it('should return an error if a the email has an invalid format', async () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'invalidemail.com';
        const password = 'Password';
        expect((await signup.execute(email, password)).error.message).toEqual(
            'email is not valid'
        );
    });
    it('should add a user when a valid email and password is given', () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'valid@email.com';
        const password = 'Password';
        signup.execute(email, password);
        expect(userRepository.findUserByEmail(new Email(email))).toBeDefined();
    });
    it('should return a user with a hash password', async () => {
        const userRepository = new InMemoryUserRepository();
        const signup = new Signup(userRepository);
        const email = 'valid@email.com';
        const password = 'Password';
        const result = await signup.execute(email, password);
        expect(result.isError()).toBeFalsy();
        const user = result.content;
        expect(user.getPassword().getValue()).not.toBe(
            new Password(password).getValue()
        );
        expect(user.hasPassword(new Password(password))).toBeTruthy();
    });
    it('should throw an exception if a user already exists', async () => {
        const userRepository = new InMemoryUserRepository();
        const email = 'valid@email.com';
        const password = 'Password';
        userRepository.addUser(User.create(email, password));
        const signup = new Signup(userRepository);
        expect((await signup.execute(email, password)).error.message).toEqual(
            'user already exists'
        );
    });
});
