const { response } = require('express');
const Settings = require('../models/settings.model');
const jwt = require('../security/jwt');

exports.getAll = function (req, result) {

   Settings.getAll(function (err, settings) {
      if (err)
         return result.status(200).json({ Error: err });
      return result.json(settings);
   });

};

exports.create = function (req, res) {
   const newSetting = new Settings(req.body)
   Settings.create(newSetting, function (err, setting) {
      if (err)
         return res.json({ Error: err });
      return res.json(setting);
   });
};

exports.getSetting = function (req, result) {
   Settings.getSetting(req.params.name, function (err, settings) {
      if (err)
         return result.status(200).json({ Error: err });
      return result.json(settings);
   });

};