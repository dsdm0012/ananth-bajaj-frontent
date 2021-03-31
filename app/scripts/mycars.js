angular.module('anantbajaj')
  .controller('mycarsctrl',function ($scope, $http,$localStorage,$window,$timeout,$rootScope,onlineStatus,$location) {
 $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail; 
    //console.log($localStorage.anantusersession);
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
 

        $scope.mycars = function(){
          $localStorage.anantaddcarservice=0;
          $localStorage.anantaddcarinsurance=0;
		  $location.path('mycars');		
	   }    
      $scope.addmycar = function(){
          $localStorage.anantaddcarservice=0;
          $localStorage.anantaddcarinsurance=0;
		  $location.path('addmycar');		
	   }
 

    $scope.mycardetails={};
    $scope.mycars={};
    $scope.nocar=true;
     $scope.havecar=true;
      
    ////console.log($scope.data);
              $http.get("https://anant-bajaj-dev.myridz.com/website/my_bikes?auth_token="+$localStorage.anantusersession).success(
                    function(result) {
                        //console.log(result);
                        if(result.my_bikes.length==0){
                            $scope.nocar=false;
                            $scope.havecar=false;
                           }
             
                        $scope.mycardetails=result.my_bikes;                                  
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })        
    

      $scope.updatecardetails = function(data) 
        {
          //console.log(data);
          $localStorage.anantmycardetails=data;
          $location.path('updatemycars');
      }

   
 
	
	
	
	
});