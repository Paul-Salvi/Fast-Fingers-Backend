'use strict';
const jwt = require('../security/jwt');
const Crypt = require('../security/encryption');
const User = require('../models/user.model');

var Credentials = function (credential) {
   if (!credential.email || !credential.password) {
      return null;
   }
   this.email = credential.email;
   this.password = credential.password;
}

Credentials.login = function (credentials, result) {
   if (!credentials.email || !credentials.password) {
      var errMsg = "Invalid credentials.";
      result(errMsg, null);
   }
   User.findByEmail(credentials.email, function (err, user) {
      if (err)
         return result(err, null);
      if (user.length <= 0)
         return result("Email Id does not exist.", null);

      if (Crypt.compare(credentials.password, user[0].password)) {
         let payload = { id: user[0].id, username: user[0].username };
         let accessToken = jwt.generate(payload);       
         return result(null, accessToken);
      }
      result("Invalid Password", null);
   });
};

module.exports = Credentials;