angular.module('anantbajaj')
  .controller('pricequotectrl',function ($scope, $http,$localStorage,$window,$timeout,onlineStatus,$rootScope,$location) {
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
    $("#hidenavbar").show();
	//console.log('Price quote started');
    $scope.formtitle=$localStorage.ktmmotortabtitle;
    $scope.pricequote={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $window.scrollTo(0, 0);
        if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.pricequote.user_id=$localStorage.anantuserid;         
            $scope.pricequote.name = $localStorage.anantuserdata.profile.full_name;
            $scope.pricequote.email = $localStorage.anantuserdata.profile.email;
            $scope.pricequote.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
             }
      
    //console.log($scope.branddata);
          /*   $http.post("https://anant-bajaj-dev.myridz.com/website/get_brand_cars",$scope.branddata).success(
                    function(result) {
                        //console.log(result);
                        //$scope.cardetails=result.cars;                               
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })*/
      $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.cardetails=result.bikes;                                
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
         $scope.changevariant = function() {
             //console.log('in');
            var emiCarData = $scope.cardetails;
            var emicarVariants = [];
             //console.log($scope.pricequote.model);
            for (var i = 0; i < emiCarData.length; i++) {
                if (emiCarData[i].name == $scope.pricequote.model) {
                    //console.log(emiCarData[i]);
                    emicarVariants.push(emiCarData[i].variant_data);
                    break;
                }
            }
             //console.log(emicarVariants[0]);
            $scope.emicarVariantData = emicarVariants[0];

        }
    
      $scope.submitpricequote = function() 
        {
               $scope.pricequoteform.submitted = true;
          $scope.pricequoteform1.submitted = true;
        	if ($scope.pricequoteform.$invalid) {
				return false;
			}
          if ($scope.pricequoteform1.$invalid) {
				return false;
			}                
                $scope.pricequote.user_id=$localStorage.anantuserid;     
                $scope.dataToSend = $scope.pricequote;
                //$scope.dataToSend.test_drive = $scope.pricequote;
                //console.log(JSON.stringify($scope.dataToSend));
                $scope.infomessage="Requesting Price Quote, please wait!";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/email_price",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);  
                            $localStorage.ananttabindex=1;
                            $scope.successmessage="Price quote sent to "+$scope.pricequote.email+"!";
                            $scope.Showsuccessalert = true;
                            $scope.pricequote={};
                            $scope.pricequoteform.submitted = false;
                            $scope.pricequoteform1.submitted = false;
                              /*$scope.pricequoteform.$setUntouched();
                            $scope.pricequoteform.$setPristine();*/
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert = false;},0);                            
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('main');},2000);  
                                               
                    }).error(
                    function(err) {
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);                       
                    })



         
        }
  
	
	
	
	
});