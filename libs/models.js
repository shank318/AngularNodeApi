
module.exports = function(mongoose)
{

var Schema = mongoose.Schema;

var UserInfo = new Schema({

  userName : {type : String, required: true},
  password : {type : String, required: true},
  city : {type : String , required: true}


});

var UserModel = mongoose.model('UserInfo', UserInfo);

module.exports.UserModel= UserModel;

};