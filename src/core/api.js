import { Login } from './domain/services/users/login';
import { Signup } from './domain/services/users/signup';
// import { InMemoryUserRepository } from './infrastructure/inMemoryUserRepository';
// import { MongoDbUserRepository } from './infrastructure/mongoDbUserRepository';
import { GetSauces } from './domain/services/sauces/getsauces';
import { GetSauce } from './domain/services/sauces/getsauce';
import { AddSauce } from './domain/services/sauces/addsauce';
import { UpdateSauce } from './domain/services/sauces/updatesauce';
import { RemoveSauce } from './domain/services/sauces/removesauce';
import { VoteSauce } from './domain/services/sauces/votesauce';
// import { InMemorySauceRepository } from './infrastructure/inMemorySauceRepository';
// import { MongoDbSauceRepository } from './infrastructure/mongoDbSauceRepository';

export function createUserApi(userRepository) {
    const signUpUser = new Signup(userRepository);
    const logInUser = new Login(userRepository);

    return {
        signUpUser,
        logInUser,
    };
}
export function createSauceApi(sauceRepository) {
    const getSauces = new GetSauces(sauceRepository);
    const getSauce = new GetSauce(sauceRepository);
    const addSauce = new AddSauce(sauceRepository);
    const updateSauce = new UpdateSauce(sauceRepository);
    const removeSauce = new RemoveSauce(sauceRepository);
    const voteSauce = new VoteSauce(sauceRepository);

    return {
        getSauce,
        getSauces,
        addSauce,
        updateSauce,
        removeSauce,
        voteSauce,
    };
}
