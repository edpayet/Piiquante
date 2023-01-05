import status from 'http-status';

export function createUserController({ signUpUser, logInUser }) {
    const signup = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await signUpUser.execute(email, password);
            if (result.isError()) {
                res.status(500).json({ message: result.error.message });
                return;
            }
            res.status(status.CREATED).json({
                message: 'User signed in',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const login = async (req, res) => {
        const { email, password } = req.body;
        const result = await logInUser.execute(email, password);
        if (result.isError()) {
            res.status(500).json({ message: result.error.message });
            return;
        }
        const { user, token } = result.content;
        res.status(status.OK).json({
            userId: user.getId(),
            token,
        });
    };
    return {
        signup,
        login,
    };
}
