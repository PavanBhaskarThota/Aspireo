const jwt = require('jsonwebtoken');
const { BlackListModel } = require('../model/blacklist.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token= req.headers.authorization?.split(' ')[1] || null;

        if (!token) {
            return res.status(401).send({ "msg": "Please login!" });
        }

        const blackListToken = await BlackListModel.findOne({ BlackList: { $in: [token] } });
        if (blackListToken) {
            return res.status(401).send({ "msg": "Please login!" });
        }

        jwt.verify(token, "Aspireo", (err, decoded) => {
            if (err) {
                return res.status(401).send({ "msg": "Please login!" });
            } else {
                req.body.userId = decoded.userId;
                console.log(decoded);
                return next();
            }
        });
    } catch (error) {
        return res.status(400).send({ "Auth error": error.message });
    }
};

module.exports = { authMiddleware };
