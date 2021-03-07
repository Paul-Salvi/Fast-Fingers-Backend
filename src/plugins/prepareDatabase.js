const Word = require('../models/words.model');
var fs = require('fs');
var path = require('path');
var JSONStream = require("JSONStream");
var es = require("event-stream");

exports.SetupDictionary = function () {
   var readableStream = fs.createReadStream(path.resolve('./data/dictionary.json'), { encoding: 'utf-8' });
   readableStream.pipe(JSONStream.parse("*")).pipe(
      es.through(function (data) {
         this.pause();
         saveData(data);
         this.resume();
      }),
      function end() {
         console.log("stream reading ended");
         this.emit("end");
      }
   );
}

function saveData(data) {
   var newWord = new Word(data);  
   Word.create(newWord, function (err, res) {
      if (err) {
         console.log("not inserted : " + err);
      }
      console.log(res);
   })
}