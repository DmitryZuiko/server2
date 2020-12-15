const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const [strategy, token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, 'secret');
        // if (result.type !== 'access') {
        //     throw new Error('Invalid type of token')
        // }
        console.log(result);
        req.login = result.login;
        next();
    } catch (e) {
        res.status(401).send(e.message)
    }
}

module.exports = auth;