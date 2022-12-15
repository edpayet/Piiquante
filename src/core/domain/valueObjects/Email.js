/* eslint-disable import/prefer-default-export */
import * as EmailValidator from "email-validator";

export class Email {
  constructor(email) {
    this.validate(email);
    this.value = email;
  }

  // eslint-disable-next-line class-methods-use-this
  validate(email) {
    if(email.length === 0) {
      throw new Error('email must not be empty')
    }
    if (!EmailValidator.validate(email)) {
      throw new Error("email is not valid");
    }
  }

  getValue() {
    return this.value;
  }

  isEqual(email) {
    return this.value === email.getValue();
  }
}
