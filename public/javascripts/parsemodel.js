  var parse = angular.module('parseApp',[]);

   function ParseController($scope, $http)
   {
    $http({method : 'GET',url :'http://localhost:1337/parse'}).success(function(data,status) {
    
    $scope.user = filter(data);

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