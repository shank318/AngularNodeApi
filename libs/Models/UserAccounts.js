var mongoose    = require('mongoose');
var user = mongoose.model('UserInfo');
var formidable = require('formidable');
 var   fs      = require( "fs" );



exports.getAllRecords = function(callback)
{


  user.find().exec(function(e, res) {
		if (e) callback(e)
		else callback(res)
	});

};


exports.uploadImage = function(data,req, callback)
{
   
console.log( "Request for 'upload' is called." );
 var form    = new formidable.IncomingForm();
 form.parse( req, function( error, fields, files ){
        console.log( "Completed Parsing" );
          console.log( files );
        if( error ){
            callback(error)
        }

        fs.renameSync( files.myfile.path, './libs/' + files.myfile.name );

        data.profileImage= './libs/' + files.myfile.name;
        user.collection.insert(data,{w:1},callback);
      
                
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