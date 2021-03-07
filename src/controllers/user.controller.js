const { response } = require('express');
const User = require('../models/user.model');
const jwt = require('../security/jwt');
const Score = require('../models/score.model');

exports.createUser = function (req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: true, message: 'Invalid request' });
   }
   const newUser = new User(req.body);
   User.create(newUser, function (err, user) {
      if (err)
         return res.json({ Error: err });
      return res.json({ message: res });
   });

};
exports.getUserScores = function (req, res) {
   const userData = jwt.decodePayload(req);
   User.getScores(userData.id, function (err, scores) {
      if (err)
         return res.json({ Error: err });
      return res.json({ message: res });
   });
};

exports.saveUserScore = function (req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: true, message: 'Invalid request' });
   }
   const userData = jwt.decodePayload(req);
   const newScore = new Score(req.body);
   newScore.user_id = userData.id;

   User.saveScore(newScore, function (err, users) {
      if (err)
         return res.json({ Error: err });
      return res.json({ message: res });
   });
};
