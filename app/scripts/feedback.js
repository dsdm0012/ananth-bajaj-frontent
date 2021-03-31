angular.module('anantbajaj')
  .controller('feedbackctrl',function ($scope, $http,$localStorage,$window,$timeout,$rootScope,onlineStatus,$location) {
    $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
	//console.log('feedback started');
$scope.feedback={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $window.scrollTo(0, 0);
    $scope.formtitle=$localStorage.ktmmotortabtitle;
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
            $scope.feedback.user_id=$localStorage.anantuserid;         
            $scope.feedback.name = $localStorage.anantuserdata.profile.full_name;
            $scope.feedback.email = $localStorage.anantuserdata.profile.email;
            $scope.feedback.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.feedback.address = $localStorage.anantuserdata.profile.address;
             }
       
    //console.log($scope.branddata);
  	$('#ratingval input').click(function () {
  //console.log($(this).val());
        $scope.feedback.rating=$(this).val();
});
	
              $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
                    function(result) {
                        //console.log(result.dealers);
                        $scope.dealerdata=result.dealers;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
    
      $scope.submitfeedback = function() 
        {
               $scope.feedbackform.submitted = true;
          $scope.feedbackform1.submitted = true;
        	if ($scope.feedbackform.$invalid) {
				return false;
			}
          if ($scope.feedbackform1.$invalid) {
				return false;
			}                
            
                $scope.dataToSend.feedback = $scope.feedback;
                //$scope.dataToSend.test_drive = $scope.feedback;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="Please wait ...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/feedbacks",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result); 
                            $localStorage.ananttabindex=1;
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $scope.successmessage="Feedback Submitted!";
                            $scope.Showsuccessalert = true;
                            $scope.feedback={};
                            $scope.feedbackform.submitted = false;
                            $scope.feedbackform1.submitted = false;
                              /*$scope.feedbackform.$setUntouched();
                            $scope.feedbackform.$setPristine();*/
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