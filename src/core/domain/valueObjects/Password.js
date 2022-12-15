/* eslint-disable import/prefer-default-export */

import bcrypt from 'bcrypt';

export class Password {
  static saltRounds = 10;

  constructor(password, hash = false) {
    this.validate(password);
    
    const salt = bcrypt.genSaltSync(Password.saltRounds);
    this.value = hash ? bcrypt.hashSync(password, salt) : password;
    this.hash = hash;
  }

  // eslint-disable-next-line class-methods-use-this
  validate(password) {
    if(password.length === 0) {
      throw new Error('password must not be empty')
    }
  }

  getValue() {
    return this.value;
  }

  isEqual(password) {
    const passwordValue = password.getValue();
    return this.hash ? bcrypt.compareSync(passwordValue, this.value) : this.value === passwordValue
  }
}
