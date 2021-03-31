angular.module('anantbajaj')
  .controller('paymentduectrl',function ($scope, $http,$localStorage,$window,$timeout,$rootScope,onlineStatus,$location) {
 $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
    	    $scope.onlineStatus = onlineStatus;//onlineStatus
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status_string = online ? 'online' : 'offline';  

        if($scope.online_status_string == 'offline')
        {
            $window.scrollTo(0, 0);
            $scope.errormessage="Check your internet connection and try again..";
            $scope.Showerroralert = true;                                                 
         
        }     
        if($scope.online_status_string == 'online')
        {            
            $scope.Showerroralert = false;          
        }

    });
            $scope.myprofile = function(){
		$location.path('profile');		
	}
	$scope.editprofile = function(){
		$location.path('updateprofile');		
	}
    $scope.mycarsdetail = function(){
        //console.log('in');
        $localStorage.anantaddcarservice=0;
        $localStorage.anantaddcarinsurance=0;
		$location.path('mybikesdetail');		
	}
    $scope.payduelength=$localStorage.anantpayduecount;
    
      $scope.addmycar = function(){
        $localStorage.anantaddcarservice=0;
        $localStorage.anantaddcarinsurance=0;
		$location.path('addmycar');		
	}
        $scope.makepayment = function(){
        $localStorage.anantpaydueid="";
		$location.path('makepayment');		
	}
          $scope.paymenthistory = function(){
		$location.path('myaccount');		
	}
        $scope.paymentdetails = function(){
		    $location.path('paymentdetail');		
	}
        $scope.paynow = function(id){
            $localStorage.anantpaydueid=id;
		    $location.path('makepayment');		
	}
                       /* $scope.branddata={"brand":"KHT_Motors"};
       $scope.payment.dealer_brand="KHT_Motors";*/
    //console.log($scope.branddata);
    $scope.paymentdata={};
              $http.get("https://anant-bajaj-dev.myridz.com/website/get_user_due_payments").success(
                    function(result) {
                        //console.log(result);
                        $scope.paymentdata=result.users;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
	
	
});