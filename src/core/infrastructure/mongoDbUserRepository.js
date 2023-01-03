/* eslint-disable class-methods-use-this */
import { User } from '../domain/entities/User';

import { UserModel } from './models/user';

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
        const user = User.create(mongoDbUser.email, mongoDbUser.password);
        console.log('user: ', user);
        return user;
    }
}
