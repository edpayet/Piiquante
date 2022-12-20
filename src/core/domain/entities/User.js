import { Email } from '../valueObjects/Email';
import { Password } from '../valueObjects/Password';
import { nanoid } from 'nanoid'

/* eslint-disable import/prefer-default-export */
export class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
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
        const id = nanoid();
        return new User(
            id,
            new Email(email),
            new Password(password, true)
        );
    }
}
