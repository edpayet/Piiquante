
import { Token } from '../core/domain/valueObjects/Token';

export function Authenticate(req, res, next) {
    try {
        const token = new Token(req.headers.authorization.split(' ')[1]);
        const decodedToken = token.decode();
        const { userId } = decodedToken.userId;
        req.auth = {
            userId,
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error });
    }
};