
module.exports = function(mongoose)
{

var Schema = mongoose.Schema;

var Comments = new Schema({
 
  comments: {type: String},
  comment_id : {type: Schema.ObjectId}

});


var email = new Schema({

    email : {type: String, unique:true}

});

var UserInfo = new Schema({

  userName : {type : String, required: true, index:{unique:true}},
  password : {type : String, required: true},
  country  : {type : String, required: true},
  city : {type : String , required: true},
  profileImage :{type: String, required:true},
  comments : [Comments]

});


var Photo = new Schema({
   
   user: {type: String},
   link: {type: String},
   shared : {type: Array}

});

var UserModel = mongoose.model('UserInfo', UserInfo);
var CommentModel = mongoose.model('CommentModel', Comments);
var EmailModel= mongoose.model('EmailModel', email);
var PhotoModel = mongoose.model('PhotoModel', Photo);

module.exports.UserModel= UserModel;
module.exports.CommentModel= CommentModel;
module.exports.EmailModel=EmailModel;
module.exports.PhotoModel= PhotoModel;



};