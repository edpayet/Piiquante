import { Login } from './domain/services/login';
import { Signup } from './domain/services/signup';
import { InMemoryUserRepository } from './infrastructure/inMemoryUserRepository';

const userRepository = new InMemoryUserRepository();
export const signUpUser = new Signup(userRepository);
export const logInUser = new Login(userRepository);
