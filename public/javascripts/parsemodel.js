  var parse = angular.module('parseApp',[]);

   function ParseController($scope, $http)
   {
    $http({method : 'GET',url :'https://api.parse.com/1/classes/User', params:{limit: '1000'},

  headers: {'X-Parse-Application-Id': '6OJ2Wl0qTyUHRjg8xBhO9laf5zzg5vONwpm5LCBO',
             'X-Parse-REST-API-Key':'Rqswa37oivdEkqkB5kGVkwWuES2idF193Cye6vq4',

              }}).success(function(data,status) {

  // alert(data.results.length);
            

//$scope.user = data;
$scope.user = filter(data);

$scope.Phonefilter= function(temp){
     
	return temp.phone.length>0;
}
});


}


function filter(data)
{
	
	var array=[];
	
	
	for(var i=0;i<data.results.length;i++)
	{
		
	 if(typeof(data.results[i].phone)!="undefined")
		{

       if(data.results[i].phone.length>0)
       	  array.push(data.results[i]);
       }

	}
    
	return array;
}
parse.controller('ParseController',ParseController);