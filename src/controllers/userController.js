import status from 'http-status';

import { signUpUser, logInUser } from '../core/api';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(`email: ${email}, password: ${password}`);
    try {
        const user = await signUpUser.execute(email, password);
        res.status(status.CREATED).json({
            userId: user.getId(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
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
