const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Access token not found' });
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err, user) => {
        if (err) res.status(403).json('Token is not valid!');
        req.user = user;
        next();
    });
};

const verifyTOkenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.user.isadmin) {
            next();
        } else {
            res.status(403).json('you are not admin');
        }
    });
};

module.exports = { verifyToken, verifyTOkenAdmin };
