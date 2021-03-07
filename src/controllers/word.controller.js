const WordManager = require('../models/words.model');


exports.create = function (req, res) {
   const newSetting = new Word(req.body)
   WordManager.create(newSetting, function (err, setting) {
      if (err)
         return res.json({ Error: err });
      return res.json(setting);
   });
};

exports.getWord = function (req, result) {   
   WordManager.get(req.params.difficulty, function (err, settings) {
      if (err)
         return result.json({ Error: err });
      return result.json(settings);
   });

};