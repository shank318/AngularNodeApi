var mongoose    = require('mongoose');
var user = mongoose.model('UserInfo');
var statusUpdate = mongoose.model('StatusUpdate')
var comments= mongoose.model('CommentModel');
var uploadphoto=mongoose.model('PhotoModel');
var formidable = require('formidable');
 var   fs      = require( "fs" );







exports.status= function(data, callback)
{

 user.findOne({userName: data.user},function(e,o){

      if(e)
        callback('not found');
      else
      {
        console.log(o._id);
        console.log(data);


        statusUpdate.collection.insert({status: data.status, info: o._id}, function(e,o)
        {
                   
                  if(e)
                    callback(e)
                  else
                    callback(o)
        });
      }

 });


};

exports.getStatus = function(id,callback)
{
     
   statusUpdate.findById(id, function(e,o){

        console.log(o);
       statusUpdate.populate(o, {path : 'info'}, function(e,o){
           
           callback(o);
           
       });


   });


};




exports.getAllRecords = function(callback)
{


 statusUpdate.find().exec(function(e, res) {
		if (e) callback(e)
		else callback(res)
	});

};


exports.uploadImage = function(data,req, callback)
{
   
console.log( "Request for 'upload' is called." );

user.findOne({userName: data.user}, function(e,o)
{
     
     if(e)
      callback('user not exists');
    else
    {
       
        //    var form    = new formidable.IncomingForm();
        //    form.parse( req, function( error, fields, files ){
        //    console.log( "Completed Parsing" );
        //    console.log( files );
        // if( error ){
        //     callback(error)
        // }

        // fs.renameSync( files.myfile.path, './libs/' + files.myfile.name );




        var options = {
        link:   './libs/',// + files.myfile.name,
        user:   data.user,
       shared : data.shared 
      }

      console.log(options);
        uploadphoto.collection.update({user:data.userName},{$push: { shared: {$each: data.shared}}},function(e,o){

           console.log(o)
           
           if(e)
              callback(e)
            else
              callback(o)



        });
      
                
   



    }



});

 



};


exports.addNewUser = function(newUserData, callback)
{

  
  user.findOne({userName: new RegExp("^" + newUserData.userName.toLowerCase(), "i") }, function(e,o)
  {
  	    console.log(newUserData);
    
        if(e)
        { 
        	callback('error');
        }
        else if(o)
          callback('alreader taken');
        else 
        {

        comments.collection.insert({comments: newUserData.comments}, callback);  
    	  user.collection.insert(newUserData, {w:1}, callback);
      }

  } );


};

exports.getUser = function(query,callback)
{


  user.find({userName: new RegExp("^"+ query)}).exec(function(e,o)
  {

      if(o)
      	callback(o);
      else 
      	callback(e);

  });

};



exports.updateStatus = function(data,callback)
{
   user.findOne({userName: data.username},function(e,o){

      if(e)
        callback('not found');
      else
      {
        console.log(o._id);
        console.log(data.id);

       statusUpdate.collection.update({ _id: data.id}, {$push: { likers: o._id}}, function(e,o){
            
                console.log(o);

         statusUpdate.findById(data.id, function(e,o){

        console.log(o);
       statusUpdate.populate(o, {path : 'likers'}, function(e,o){
           
           callback(o);
           
       });


   });


            

    } );

  }

});

};