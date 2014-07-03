var mongoose    = require('mongoose');
var user = mongoose.model('UserInfo');



exports.getAllRecords = function(callback)
{


  user.find().exec(function(e, res) {
		if (e) callback(e)
		else callback(res)
	});

};


exports.addNewUser = function(newUserData, callback)
{

  
  user.findOne({userName: newUserData.userName}, function(e,o)
  {
  	    console.log(newUserData);
    
        if(o)
        	callback('user already taken');
        else 
    	  user.collection.insert(newUserData, {w:1}, callback);

  } );


};

exports.getUser = function(query,callback)
{


  user.findOne({userName: query}, function(e,o)
  {

      if(o)
      	callback(o);
      else 
      	callback(e);

  });

};