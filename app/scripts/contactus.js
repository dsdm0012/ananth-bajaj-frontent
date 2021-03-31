angular.module('anantbajaj')
  .controller('contactusctrl',function ($scope, $http,$localStorage,$window,$timeout,$rootScope,onlineStatus,$location) {
    $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
	//console.log('contactus started');
    $scope.formtitle=$localStorage.ktmmotortabtitle;
    $scope.contactus={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $window.scrollTo(0, 0);
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
        if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.contactus.user_id=$localStorage.anantuserid;         
            $scope.contactus.name = $localStorage.anantuserdata.profile.full_name;
            $scope.contactus.email = $localStorage.anantuserdata.profile.email;
            $scope.contactus.phone = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.contactus.address = $localStorage.anantuserdata.profile.address;
             }
      
        $scope.bikedetails={};
        $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikedetails=result.bikes;   
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
    //console.log($scope.branddata);
              $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
                    function(result) {
                        //console.log(result.dealers);
                        $scope.dealerdata=result.dealers;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
    
      $scope.submitcontactus = function() 
        {
               $scope.contactusform.submitted = true;
          $scope.contactusform1.submitted = true;
        	if ($scope.contactusform.$invalid) {
				return false;
			}
          if ($scope.contactusform1.$invalid) {
				return false;
			}                
            
                $scope.dataToSend.enquiry = $scope.contactus;
                //$scope.dataToSend.test_drive = $scope.contactus;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="please wait...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/enquiries",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);  
                            $localStorage.ananttabindex=1;
                            $timeout(function() {$scope.Showinfoalert = false;},0); 
                            $scope.successmessage="Sucessfully Submitted!";
                            $scope.Showsuccessalert = true;
                            $scope.contactus={};
                            $scope.contactusform.submitted = false;
                            $scope.contactusform1.submitted = false;
                              /*$scope.contactusform.$setUntouched();
                            $scope.contactusform.$setPristine();*/
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $(".rating input:radio").attr("checked", false);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('main');},2000);  
                                               
                    }).error(
                    function(err) {
                        $timeout(function() {$scope.Showinfoalert = false;},0); 
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);                       
                    })



         
        }
  
	
	
	
	
});