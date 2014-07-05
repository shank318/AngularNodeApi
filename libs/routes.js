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
                }
                , function(e,o)
                 {
                   



                if (e){
				res.send(e);
			}	else{
				res.send('ok', 200);
			}

             } );

});


app.post('/upload', function(req,res)
{
   console.log(req.param('username'));
   UM.uploadImage({userName : req.param('username'), 
                   password : req.param('password') , 
                   country :req.param('country'),
                   city : req.param('city')}, req, function(e,o)
   {
            
            if (e){
        res.send(e);
      } else{
        res.send('uploaded', 200);
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
request.post({ url:'http://api.justyo.co/yoall/',
     params:{ api_token:'618cf60f-7fe1-1fdc-3a04-2066a0d37dfb'} },
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
   
    res.render('./public/index');


});












};