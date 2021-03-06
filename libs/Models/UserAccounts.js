var mongoose    = require('mongoose');
var user = mongoose.model('UserInfo');
var statusUpdate = mongoose.model('StatusUpdate')
var comments= mongoose.model('CommentModel');
var timestamp =mongoose.model('TimeStamp');
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

exports.getTime = function(data, callback)
{

timestamp.collection.aggregate(
   { 
  $match : {timestamp : {"$gte" : new Date(data.start) , "$lte": new Date(data.end)}}
    },
    {
      $project : {user:1,
                  timestamp:1,
                  year : {$year : "$timestamp"}, 
                  month : {$month : "$timestamp"},
                  day   : {$dayOfMonth : "$timestamp"}
                }
    },
    { 
  $group : {   
               _id : {year : "$year", month : "$month", day : "$day"},         
               users : {$addToSet : "$user"},
               total : { $sum : 1 } 
            }
       }     
   //   {       
   // $sort  : { date: -1 }  
   //    }       

    ,function(e,o){

           if(e)
         { 
           callback(e);
         }
         else if(o)
           callback(o);


    }
);

 // timestamp.find({timestamp : {"$gte" : new Date(data.start) , "$lte": new Date(data.end)}},function(e,o){


 //       if(e)
 //        { 
 //          callback(e);
 //        }
 //        else if(o)
 //          callback(o);
       

 // });



}


exports.insertTime = function(data, callback)
{


 timestamp.findOne(data,function(e,o){


       if(e)
        { 
          callback('error');
        }
        else if(o)
          callback('alreader taken');
        else 
        {

        data.timestamp= new Date();
       timestamp.collection.insert(data, function(e,o)
        {
                   
                  if(e)
                    callback(e)
                  else
                    callback(o)
        });
      }

 });



}

exports.getStatus = function(id,callback)
{
     
   statusUpdate.findById(id, function(e,o){

        
       statusUpdate.populate(o, {path : 'info'}, function(e,o){
           
            statusUpdate.populate(o, {path : 'likers'}, function(e,o){
      
          console.log(o.comments);
           statusUpdate.populate(o, {path : 'comments.user'}, function(e,o){
      
      if(e)
        callback(e)
      else
         callback(o);
           
       });
           
       });
           
       });





   });


};




exports.getAllRecords = function(callback)
{


 timestamp.find().exec(function(e, res) {
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

// 360009982033

//9717757347
//324028828151
//answer- shank
//name-ravi9876
//12345678

//mongo ds053469.mongolab.com:53469/shank -u <dbuser> -p <dbpassword>

exports.updateStatus = function(data,callback)
{

   user.findOne({userName: data.username},function(e,o){

      if(e)
        callback('not found');
      else
      {
        console.log(o._id);
        console.log(data.id);
        var id= o._id;
        statusUpdate.update({_id: data.id}, {$push : {likers : id}}, function(e,o){
           
           console.log(o);

           if(e)
            callback(e)
          else
            callback(o)
               

        });

}

    
});

};





exports.addComment = function(data,callback)
{
  console.log(data.user)
   user.findOne({userName: data.user},function(e,o){

      if(e)
        callback('not found');
      else
      {
        console.log(o._id);
        console.log(data.comment);
        var id= o._id;
        statusUpdate.update({_id: data.id}, 
       {$push : {comments : {
          comment : data.comment,
          user    : o._id
        }}} , function(e,o){
           
           console.log(o);

           if(e)
            callback(e)
          else
            callback(o)
               

        });

}

    
});

};