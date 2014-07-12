var UM   = require('./Models/UserAccounts');

var request = require('request');
module.exports = function(app)
{

 app.get('/api', function(req, res)
 {

   res.send('API IS RUNNING');

 });



app.get('/all', function(req, res)
{

  UM.getAllRecords(function(o)
	      {
	      	    if(o)
                res.send(o);
            else res.send([]);
             
	      });
   
});


app.post('/new', function(req,res)
{


UM.addNewUser( {userName : req.param('username'), 
	            password : req.param('password') , 
	            country :req.param('country'),
                city : req.param('city'),
                comments: req.param('comments'),
                }
                , function(e,o)
                 {
                   



                if (e){
				res.send(e);
			}	else{
				res.send(o[0]._id);
			}

             } );

});


app.post('/status', function(req,res){

  UM.status({user: req.param('username'), status : req.param('status')}, function(e,o){
              
           if (e){
        res.send(e);
      } else{
        res.send(o);
      }    
  
  });
      

});

app.post('/upload', function(req,res)
{
   console.log(req.param('shared').length);
   UM.uploadImage({userName : req.param('username'), 
                   shared : req.param('shared') , 
                   }, req, function(e,o)
   {
            
            if (e){
        res.send(e);
      } else{
        res.send({'success': o});
      }

   });

});


app.get('/login', function(req,res)
{


UM.getUser(req.param('usr'),function(o)
{
    if(o)
        res.send(o)
    else
        res.send('error');
   
});

});


app.get('/yo', function(req,res)
{
   


// do the POST call
request.post({ url:'http://api.justyo.co/yoall',
     headers:{ api_token:'618cf60f-7fe1-1fdc-3a04-2066a0d37dfb'} },
    function (error, response, body) {

        if (!error && response.statusCode ==200) {
            console.log(body);
            res.send(body);

        } else {
            res.send('Oops not working'+response.statusCode)
        }

    }
);

});

app.get('/parse', function(req,res)
{
   
   var options = {

      url: 'https://api.parse.com/1/classes/User?limit=1000&order=-createdAt',
      headers: {
      'X-Parse-Application-Id': '6OJ2Wl0qTyUHRjg8xBhO9laf5zzg5vONwpm5LCBO',
      'X-Parse-REST-API-Key':'Rqswa37oivdEkqkB5kGVkwWuES2idF193Cye6vq4',
               },
     //  params:{limit: '1000', order: '-createdAt'}   
};

   request.get(options, function(error,response,body)
   {
          if (!error && response.statusCode ==200) {
            console.log(body);
            res.send(body);

        } else {
            res.send('Oops not working'+response.statusCode)
        }

   })


});












};