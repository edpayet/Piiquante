import { InMemoryUserRepository } from '../../../infrastructure/inMemoryUserRepository';
import { User } from '../../entities/User';
import { Email } from '../../valueObjects/Email';
import { Password } from '../../valueObjects/Password';
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
    it('should return an error if a user does not exist', async () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        expect(
            (await login.execute('nonvalid@email.com', 'Password')).error
                .message
        ).toEqual('The email/password pair is not correct');
    });
    it('should not throw an error if a user exists', async () => {
        const userRepository = new InMemoryUserRepository();
        const email = 'valid@email.com';
        const password = 'Password';
        userRepository.addUser(User.create(email, password));
        const login = new Login(userRepository);
        expect((await login.execute(email, password)).isError()).toBeFalsy();
    });
    it('should return the user and a token when user is logged in', async () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const email = 'valid@email.com';
        const password = 'Password';
        userRepository.addUser(User.create(email, password));
        const result = await login.execute(email, password);
        expect(result.isError()).toBeFalsy();
        const { user, token } = result.content;
        expect(user.getId()).not.toBeNull();
        expect(user.hasEmail(new Email(email))).toBeTruthy();
        expect(user.hasPassword(new Password(password))).toBeTruthy();
        expect(token).toBeTruthy();
    });
    it('should return an error if a there is no email', async () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const password = 'Password';
        expect((await login.execute(password)).error.message).toEqual(
            'email is not valid'
        );
    });
    it('should return an error if a the email has an invalid format', async () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const email = 'invalidemail.com';
        const password = 'Password';
        expect((await login.execute(email, password)).error.message).toEqual(
            'email is not valid'
        );
    });
    it('should return an error if the pair email/password is not correct', async () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        const email = 'valid@email.com';
        await userRepository.addUser(User.create(email, 'Password'));
        expect(
            (await login.execute(email, 'WrongPassword')).error.message
        ).toEqual('The email/password pair is not correct');
    });
});
