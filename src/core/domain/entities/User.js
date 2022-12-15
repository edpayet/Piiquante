import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";

/* eslint-disable import/prefer-default-export */
export class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
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
    return new User(new Email(email), new Password(password, true))
  }
}
