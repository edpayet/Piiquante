import { Login } from './domain/services/users/login';
import { Signup } from './domain/services/users/signup';
import { InMemoryUserRepository } from './infrastructure/inMemoryUserRepository';
import { GetSauces } from './domain/services/sauces/getsauces';
import {AddSauce} from './domain/services/sauces/addsauce';
import {InMemorySauceRepository} from './infrastructure/inMemorySauceRepository'

const userRepository = new InMemoryUserRepository();
export const signUpUser = new Signup(userRepository);
export const logInUser = new Login(userRepository);

const sauceRepository = new InMemorySauceRepository();
export const getSauces = new GetSauces(sauceRepository);
export const addSauce = new AddSauce(sauceRepository);

