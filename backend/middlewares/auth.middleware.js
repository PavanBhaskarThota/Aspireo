// <<<<<<< fp11_100-day_5
// const jwt = require('jsonwebtoken');
// const { BlackListModel } = require('../model/blacklist.model');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token= req.headers.authorization?.split(' ')[1] || null;

//         if (!token) {
//             return res.status(401).send({ "msg": "Please login!" });
//         }

//         const blackListToken = await BlackListModel.findOne({ BlackList: { $in: [token] } });
//         if (blackListToken) {
//             return res.status(401).send({ "msg": "Please login!" });
//         }

//         jwt.verify(token, "Aspireo", (err, decoded) => {
//             if (err) {
//                 return res.status(401).send({ "msg": "Please login!" });
//             } else {
//                 req.body.userId = decoded.userId;
//                 console.log(decoded);
//                 return next();
//             }
//         });
//     } catch (error) {
//         return res.status(400).send({ "Auth error": error.message });
//     }
// =======
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || null;

  console.log(token, "token");

  try {
    if (token) {
      const tokenInBlackList = await BlackListModel.findOne({
        blackList: { $in: token },
      });

      if (tokenInBlackList) {
        return res.status(400).send({ msg: "Please Login !!" });
      }

      jwt.verify(token, process.env.KEY, async (err, result) => {
        try {
          if (result) {
            req.body.userId = result.userId;
            return next();
          } else {
            return res.status(200).send({ msg: "Please Login!!" });
          }
        } catch (error) {
          return res.status(400).send({ error: error.message });
        }
      });
    } else {
      return res.status(200).send({ msg: "Please Login first!!" });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = { authMiddleware };
