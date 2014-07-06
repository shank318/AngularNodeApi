
module.exports = function(mongoose)
{

var Schema = mongoose.Schema;

var Comments = new Schema({
 
  comments: {type: String},
  comment_id : {type: Schema.ObjectId}

});

var UserInfo = new Schema({

  userName : {type : String, required: true},
  password : {type : String, required: true},
  country  : {type : String, required: true},
  city : {type : String , required: true},
  profileImage :{type: String, required:true},
  comments : [Comments]

});

var UserModel = mongoose.model('UserInfo', UserInfo);
var CommentModel = mongoose.model('CommentModel', Comments);

module.exports.UserModel= UserModel;
module.exports.CommentModel= CommentModel;

};