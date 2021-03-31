angular.module('anantbajaj')
  .controller('addtestimonialctrl',function ($scope, $http,$localStorage,$window,$timeout,onlineStatus,$rootScope,$location) {
 $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;    
    $scope.testimonial={};
    $scope.dataToSend = {};
    $scope.imgdefault=false;
    $scope.imgcustom=true;
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
       //console.log($scope.branddata);
            if($localStorage.anantusersession && $localStorage.anantuserid){
            $scope.testimonial.user_id=$localStorage.anantuserid;         
            $scope.testimonial.name = $localStorage.anantuserdata.profile.full_name;
            $scope.testimonial.email = $localStorage.anantuserdata.profile.email;
            $scope.testimonial.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
             }
        $scope.profileimage="";
        $scope.uploadimage=function(){
            $('#fileupload').click();            
        }
        		$scope.profileselect = function () {
                 var profileimg =$scope.myFile;
                 //console.log(profileimg);
				if(typeof(profileimg)!="undefined")
                 {
                    $scope.imgdefault=true;
                    $scope.imgcustom=false;
           $scope.profileimage="data:image/png;base64,"+profileimg.base64;
                 }			
         }
        $scope.addtestimonial = function() 
        {
          //console.log('in');
           var imagedata =$scope.myFile;
          ////console.log(JSON.stringify(imagedata));
          if(typeof(imagedata)!="undefined"){
              $scope.testimonial.image="data:image/png;base64,"+imagedata.base64;
             }            
                $scope.addtestimonialform.submitted = true;
        	if ($scope.addtestimonialform.$invalid) {
				return false;
			}
                 
                //$scope.profile.user_id=$localStorage.anantuserid; 
                $scope.dataToSend.testmonial = $scope.testimonial;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="please wait ...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/testmonials",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);                                  
                            $scope.successmessage="Testimonial Submitted";
                            $scope.Showsuccessalert = true;
                            $scope.testimonial={};
                            $scope.addtestimonialform.submitted = false;
                             $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('testimonial');},1000);
                            //$location.path('mycars');
                                               
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