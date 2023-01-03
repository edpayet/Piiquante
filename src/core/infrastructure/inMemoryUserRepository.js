/* eslint-disable import/prefer-default-export */
export class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }

    async addUser(user) {
        this.users.push(user);
    }

    async findUserByEmail(email) {
        return this.users.find((user) => user.hasEmail(email));
    }
}
