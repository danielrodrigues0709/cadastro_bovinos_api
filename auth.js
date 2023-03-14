const jwt = require("jsonwebtoken");
const { MSGS } = require("./msgs");
const { CONSTANTS } = require("./utils");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, CONSTANTS.JWT_KEY);
        req.usuario = decode;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: MSGS.falhaAutenticacao
        });
    }
}