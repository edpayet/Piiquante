/* eslint-disable import/prefer-default-export */
import passwordValidator from 'password-validator';
import bcrypt from 'bcrypt';

const schema = new passwordValidator();

schema
    .is()
    .min(8)
    .is()
    .max(128)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .not()
    .spaces();

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
        const errors = schema.validate(password, { list: true });
        if (errors.length > 0) {
            throw new Error(
                `password is not strong enough: ${errors.join(', ').toString()}`
            );
        }
    }

    getValue() {
        return this.value;
    }

    isEqual(password) {
        const passwordValue = password.getValue();
        return this.hash
            ? bcrypt.compareSync(passwordValue, this.value)
            : this.value === passwordValue;
    }
}
