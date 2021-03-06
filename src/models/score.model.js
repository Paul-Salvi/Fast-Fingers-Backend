'use strict';
var dbConnection = require('../configs/db.config');

var Score = function (score) {
   if (!score.score_duration || !score.score_totalWords) {
      return null;
   }
   this.user_id = "";
   this.score_duration = score.score_duration;
   this.score_totalWords = score.score_totalWords;
   this.createdOn = new Date();
}

Score.saveScore = function (score, result) {
   var queryData = [score.user_id, score.score_duration, score.score_totalWords, score.createdOn];                      
   dbConnection.query("INSERT into scores (user_id, score_duration, score_totalWords, createdOn) values (?,?,?,?);", queryData, function (err, res) {
      if (err) {
         console.log("error: ", err);
         result(err, null);
      } else {
         console.log(res.insertId);
         result(null, res.insertId);
      }
   });

};

Score.getScores = function (userId, result) {
   dbConnection.query("SELECT * FROM scores where user_id = ? ", [userId], function (err, res, fields) {     
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("No data", null);
   });
};



module.exports = Score;