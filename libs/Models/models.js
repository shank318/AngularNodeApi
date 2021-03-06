
module.exports = function(mongoose)
{

var Schema = mongoose.Schema;

var Comments = new Schema({
 
  comments: {type: String},
 // comment_id : {type: Schema.ObjectId}

});

Comments.virtual('comment_id').get(function() {

  console.log('aaaa')
    return this._id;
});

Comments.set('toJSON', {
    virtuals: true
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

var TimeStamp = new Schema({

user : {type: String, required :true},
timestamp : {type: Date, required: true}

});


var StatusUpdate= new Schema({
   
   status : {type: String},
   info : {type : Schema.ObjectId , ref: 'UserInfo'},
   likers : [{type: Schema.ObjectId , ref : 'UserInfo'}] ,
   comments : [{ comment : String,
                  user : {type: Schema.ObjectId, ref :'UserInfo'},
                  created_at :  {type: Date, required: true, default: Date.now}
              }]



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
var StatusUpdate= mongoose.model('StatusUpdate', StatusUpdate)
var TimeStamp = mongoose.model('TimeStamp', TimeStamp);

module.exports.UserModel= UserModel;
module.exports.CommentModel= CommentModel;
module.exports.EmailModel=EmailModel;
module.exports.PhotoModel= PhotoModel;
module.exports.StatusUpdate=StatusUpdate;
module.exports.TimeStamp= TimeStamp;



};