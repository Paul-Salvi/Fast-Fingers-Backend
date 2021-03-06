const jwt = require('../security/jwt');

exports.authenticate = function (req, res, next) {
   var token = req.headers['authorization'];
   if (!token && !token.startsWith('Bearer ')) {
      return res.status(401).send({ auth: false, message: 'Authentication required.' });
   }
   if (!jwt.verify(token.substring(7, token.length))) {
      return res.status(401).send({ auth: false, message: 'Authenticate failed.' });
   }
   next();
};