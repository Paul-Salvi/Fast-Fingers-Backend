var dbConnection = require('../configs/db.config');

var Word = function (word) {
   if (!word) {
      return null;
   }
   this.name = word;
   this.isValid = true;
   let difficultyType = "";
   if (word.length <= 4) {
      difficultyType = "EASY"
   } else if (word.length >= 5 && word.length <= 8) {
      difficultyType = "MEDIUM";
   } else {
      difficultyType = "HARD";
   }
   this.difficultyType = difficultyType;
}


Word.create = function (word,result) {
   if (!word) {
      var errMsg = "Invalid word";
      return result(errMsg, null);;
   }
   var queryData = [word.name, word.difficultyType, word.isValid];
   dbConnection.query("insert into words (name,difficultyType,isValid) values (?,?,?);", queryData, function (err, res) {
      if (err) {
         result(err, null);
      } else {        
         result(null, res.insertId);
      }
   });
};

Word.get = function (difficulty, result) {

   dbConnection.query("SELECT * FROM words WHERE difficultyType = ? ORDER BY RAND() LIMIT 1", [difficulty], function (err, res, fields) {
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};

module.exports = Word;