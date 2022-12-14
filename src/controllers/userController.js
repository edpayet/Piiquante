import { signUpUser, logInUser } from '../core/api';

const signup = async (req) => {
    const { email, password } = req.body;
    await signUpUser.execute({ email, password });
};

const login = async (req, res) => {
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

export { signup, login };
