import { Login } from './domain/services/users/login';
import { Signup } from './domain/services/users/signup';
import { InMemoryUserRepository } from './infrastructure/inMemoryUserRepository';

const userRepository = new InMemoryUserRepository();
export const signUpUser = new Signup(userRepository);
export const logInUser = new Login(userRepository);
