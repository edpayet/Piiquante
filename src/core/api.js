import { Login } from './domain/services/users/login';
import { Signup } from './domain/services/users/signup';
import { InMemoryUserRepository } from './infrastructure/inMemoryUserRepository';
import { GetSauces } from './domain/services/sauces/getsauces';
import { GetSauce } from './domain/services/sauces/getsauce';
import { AddSauce } from './domain/services/sauces/addsauce';
import { UpdateSauce } from './domain/services/sauces/updatesauce';
import { RemoveSauce } from './domain/services/sauces/removesauce';
import { InMemorySauceRepository } from './infrastructure/inMemorySauceRepository';

const userRepository = new InMemoryUserRepository();
export const signUpUser = new Signup(userRepository);
export const logInUser = new Login(userRepository);

const sauceRepository = new InMemorySauceRepository();
export const getSauces = new GetSauces(sauceRepository);
export const getSauce = new GetSauce(sauceRepository);
export const addSauce = new AddSauce(sauceRepository);
export const updateSauce = new UpdateSauce(sauceRepository);
export const removeSauce = new RemoveSauce(sauceRepository);
