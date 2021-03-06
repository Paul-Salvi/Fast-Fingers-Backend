const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ALGORITHM = process.env.ALGORITHM
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE

var JWToken = function () { };

JWToken.generate = function (payload) {
   let accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      algorithm: ALGORITHM,
      expiresIn: ACCESS_TOKEN_LIFE
   });
   return accessToken;
}

JWToken.verify = function (token) {
   let res = false;
   jwt.verify(token, ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
         console.log(err);
         return res;
      }
      res = true;
   });
   return res;
}

JWToken.decodePayload = function (req) {
   var data = req.headers['authorization'];
   const token = data.substring(7, data.length);
   return jwt.decode(token);
}


module.exports = JWToken;