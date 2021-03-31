angular.module('anantbajaj')
  .controller('privacyCtrl',function ($http,$localStorage,$scope,$window) {
    $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
    $window.scrollTo(0, 0);
        $scope.gototerms = function(data){	
		$location.path('terms');		
	}
        $scope.gotoprivacy = function(data){
		$location.path('privacy');		
	}
});