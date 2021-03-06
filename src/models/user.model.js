'use strict';
var dbConnection = require('../configs/db.config');
const crypt = require('../security/encryption');
const Score = require('./score.model');
const scoreManager = require('./score.model')
var User = function (user) {
   if (!user.username || !user.email || !user.password) {
      return null;
   }
   this.username = user.username;
   this.email = user.email;
   this.password = user.password;
   this.createdOn = new Date();
}

User.create = function (user, result) {

   if (!user.username || !user.email || !user.password) {
      var errMsg = "Invalid request";
      return result(errMsg, null);
   }
   let existingUser = getExistingUser(user.email);
   if (existingUser) {
      return result("User already registered.", null);
   }
   var queryData = [user.username, user.email, crypt.encrypt(user.password), user.createdOn];
   dbConnection.query("insert into users (username,email,password,createdOn) values (?,?,?,?);", queryData, function (err, res) {
      if (err) {
         console.log("error: ", err);
         result(err, null);
      } else {
         console.log(res.insertId);
         result(null, res.insertId);
      }
   });
};

User.findByEmail = function (email, result) {
   dbConnection.query("SELECT * FROM users WHERE email = ?", [email], function (err, res, fields) {
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};

User.saveScore = function (score, result) {
   scoreManager.saveScore(score, function (err, savedScore) {
      if (err)
         return result(err, null);
      return result(null, "Saved successfully.");

   });
};

User.getScores = function (userId, result) {
   scoreManager.getScores(userId, function (err, scores) {
      if (err)
         return result(err, null);
      if (scores.length > 0)
         return result(null, scores);
      return result("No data available.", null);
   });
};

function getExistingUser(emailId) {
   User.findByEmail(emailId, function (err, user) {
      if (user)
         return user;
      return null;
   });
}


module.exports = User;