var parse = angular.model('Parse',[]);


parse.controller('ParseData', function ($scope, $http) {
 $http({method : 'GET',url :'https://api.parse.com/1/classes/User',

 	headers: {'X-Parse-Application-Id': '6OJ2Wl0qTyUHRjg8xBhO9laf5zzg5vONwpm5LCBO',
 	           'X-Parse-REST-API-Key':'Rqswa37oivdEkqkB5kGVkwWuES2idF193Cye6vq4',
 	            }}).success(function(data,status) {

 	            	console.log(data);
$scope.table = data;
}).error(function(data,status)
{
	console.log('failure');
}); 

});