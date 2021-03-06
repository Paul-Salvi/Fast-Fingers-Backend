
var WordManager = function (word) {
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


WordManager.create = function (word) {
   if (!word) {
      var errMsg = "Invalid word";
      return result(errMsg, null);;
   }
   var queryData = [word.name, word.difficultyType, word.isValid];
   dbConnection.query("insert into words (name,value) values (?,?,?);", queryData, function (err, res) {
      if (err) {
         console.log("error: ", err);
         result(err, null);
      } else {
         console.log(res.insertId);
         result(null, res.insertId);
      }
   });
};

WordManager.get = function (difficulty, result) {

   dbConnection.query("SELECT * FROM words WHERE difficultyType = ?", [difficulty], function (err, res, fields) {
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};

module.exports = WordManager;