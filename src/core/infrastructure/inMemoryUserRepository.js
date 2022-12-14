/* eslint-disable import/prefer-default-export */
export class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    findUserByEmail(email) {
        return this.users.find((user) => user.hasEmail(email));
    }
}
