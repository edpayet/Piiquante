
import { Token } from '../core/domain/valueObjects/Token';

export function Authenticate(req, res, next) {
    try {
        const authHeaders = req.headers.authorization;
        // console.log(authHeaders);
        if (!authHeaders) {
            throw new Error('No authentication token found');
        }
        const token = new Token(authHeaders.split(' ')[1], false);
        const decodedToken = token.getUserId();
        const {userId} = decodedToken;
        // console.log('userId: ', userId);
        req.auth = {
            userId,
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error });
    }
};