import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';

/* eslint-disable import/prefer-default-export */
export class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    static createId() {
        return Math.floor(Math.random() * Date.now());
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    hasEmail(email) {
        return this.email.isEqual(email);
    }

    hasPassword(password) {
        return this.password.isEqual(password);
    }

    static create(email, password) {
        return new User(
            this.createId(),
            new Email(email),
            new Password(password, true)
        );
    }
}
