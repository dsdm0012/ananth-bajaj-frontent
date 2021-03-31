angular.module('anantbajaj')
  .controller('testimonialctrl',function ($scope, $http,$rootScope,onlineStatus,$location,$window,$timeout) {
	////console.log('home started');
    $scope.testimonial = {};
    $scope.testimonialdata = {};
    /*$scope.testimonial.dealer_brand="KHT_Motors";
    $scope.branddata={"brand":"KHT_Motors"};*/
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
    
        $http.get("https://anant-bajaj-dev.myridz.com/website/get_all_testmonial").success(
            function(result) {   
                //console.log(result);
                $scope.viewtestimonialdata = result.testmonials;
            }).error(
            function(err) {
                 $scope.loading = false;

            }) 
     $scope.addTestimonial = function(){
        $location.path("addtestimonial");
     }

	$scope.submittestimonial = function() {
        
        $scope.addtestimonialform.submitted = true;
        if ($scope.addtestimonialform.$invalid) {
            return false;
        }
        
        if($scope.image.file.base64){
           $scope.testimonial.image = "data:image/jpg;base64,(" + $scope.image.file.base64 + ")";
        }
        
      $http.post("https://anant-bajaj-dev.myridz.com/website/testmonials", JSON.stringify({"testmonial": $scope.testimonial}))
          .then(function (success){ 
          //console.log(success);
           $window.scrollTo(0, 0);
            $scope.successmessage="Testimonial Submitted";
            $location.path('/main');
            $scope.Showsuccessalert = true;                         
            $timeout(function() {$scope.Showsuccessalert = false;},3000);      

       },function (error){
        //console.log(JSON.stringify(error));
       });
	};     
     
});