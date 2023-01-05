/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { User } from '../domain/entities/User';
import { Email } from '../domain/valueObjects/Email';
import { Password } from '../domain/valueObjects/Password';

const UserModel = require('./models/user');

export class MongoDbUserRepository {
    async addUser(user) {
        const mongoDbUser = new UserModel({
            email: user.getEmail().value,
            password: user.getPassword().value,
        });
        await mongoDbUser.save();
    }

    async findUserByEmail(email) {
        const mongoDbUser = await UserModel.findOne({ email: email.value });
        console.log('mongoDb user: ', mongoDbUser);
        if (!mongoDbUser) return false;
        const user = new User(
            mongoDbUser._id,
            new Email(mongoDbUser.email),
            new Password(mongoDbUser.password, false, true)
        );
        console.log('user: ', user);
        return user;
    }
}
