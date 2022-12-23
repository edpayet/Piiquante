const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(
            token,
            '8j9QUGDEQ@U48BHsmhZAzvpcRa-rdW'
        );
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