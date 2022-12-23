import status from 'http-status';

import { signUpUser, logInUser } from '../core/api';

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        await signUpUser.execute(email, password);
        res.status(status.CREATED).json({
            message: 'User signed in'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await logInUser.execute(email, password);
        res.status(200).json({
            userId: user.getId(), token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
