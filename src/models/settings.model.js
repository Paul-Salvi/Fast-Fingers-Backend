var dbConnection = require('../configs/db.config');

var Setting = function (setting) {
   if (!setting.name || !setting.value) {
      return null;
   }
   this.name = setting.name;
   this.value = setting.value;
}


Setting.create = function (setting, result) {
   if (!setting.name || !setting.value) {
      var errMsg = "Invalid setting";
      return result(errMsg, null);;
   }
   var queryData = [setting.name, setting.value];
   dbConnection.query("insert into settings (name,value) values (?,?);", queryData, function (err, res) {
      if (err) {
         result(err, null);
      } else {         
         result(null, "Created successfully.");
      }
   });
};

Setting.getSetting = function (name, result) {
   dbConnection.query("SELECT * FROM settings WHERE name = ?", [name], function (err, res, fields) {    
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("Not Found", null);
   });
};

Setting.getAll = function (result) {
   dbConnection.query("SELECT * FROM settings", function (err, res, fields) {
      if (res.length > 0)
         return result(null, res);
      if (err)
         return result(err, null);
      return result("No Data.", null);
   });
};

module.exports = Setting;