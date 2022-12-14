import { InMemoryUserRepository } from '../../infrastructure/inMemoryUserRepository';
import { Login } from './login';

describe('login', () => {
    it('login instance should be defined', () => {
        const userRepository = new InMemoryUserRepository();
        const login = new Login(userRepository);
        expect(login).toBeDefined();
        expect(login).toBeInstanceOf(Login);
    });
});
