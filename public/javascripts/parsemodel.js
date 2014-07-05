  var parse = angular.module('parseApp',[]);

   function ParseController($scope, $http)
   {
    $http({method : 'GET',url :'https://api.parse.com/1/classes/User',

  headers: {'X-Parse-Application-Id': '6OJ2Wl0qTyUHRjg8xBhO9laf5zzg5vONwpm5LCBO',
             'X-Parse-REST-API-Key':'Rqswa37oivdEkqkB5kGVkwWuES2idF193Cye6vq4',
              }}).success(function(data,status) {

              //  alert(data.results[0].email);
            

$scope.user = data;

$scope.Phonefilter= function(temp){
     
	return temp.phone!=="";
}
});


}
parse.controller('ParseController',ParseController);