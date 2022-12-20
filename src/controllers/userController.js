const status = require('http-status');
import { signUpUser, logInUser } from '../core/api';

const signup = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(`email: ${email}, password: ${password}`);
    try {
        const { user, token } = await signUpUser.execute({ email, password });
        res.status(status.CREATED).json({
            userId: user.getId(),
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await logInUser.execute(email, password);
        res.status(200).json({
            message: `user ${user.getEmail().getValue()} is connected`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
