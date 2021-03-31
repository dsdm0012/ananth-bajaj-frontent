angular.module('anantbajaj')
  .controller('updateprofilectrl',function ($scope, $http,$filter,$localStorage,$window,onlineStatus,$timeout,$rootScope,$location) {
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
    $scope.payduelength=$localStorage.anantpayduecount;
	$('#datepicker1,#datepicker2').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            endDate: "today"
        });  
  
    
    $scope.profile={};
    $scope.dataToSend = {};
    $scope.imgdefault=false;
    $scope.imgcustom=true;
    $scope.sociallogin=true;
    $scope.nomail=true;

      /* $scope.branddata={"brand":"KHT_Motors"};
       $scope.profile.dealer_brand="KHT_Motors";*/
    //console.log($scope.branddata);
             $http.get("https://anant-bajaj-dev.myridz.com/website/profiles/"+$localStorage.anantprofileid+"?auth_token="+$localStorage.anantusersession).success(
                    function(result) {
                        //console.log(result);
                        if(!result.email){
                          $scope.nomail=false;
                        }
                        $scope.sociallogin=false;
                        $scope.profile=result;   
                        $scope.profile.full_name=result.full_name;
                        $scope.profile.mobile=parseInt(result.mobile);
                        $scope.profile.marriage_anniversary_date=$filter('date')($scope.profile.marriage_anniversary_date, 'dd-MM-yyyy');  
                        $scope.profile.dob=$filter('date')($scope.profile.dob, 'dd-MM-yyyy'); 
                        if($localStorage.anantissocial==1 && $localStorage.anantsocialdata){
                      ////console.log($localStorage.anantsocialdata);
                            $scope.sociallogin=true;
                    $scope.socialdata=$localStorage.anantsocialdata;       
                    $scope.profileimage=$scope.socialdata.imageUrl;
                   }      else if(result.profile_image.url){
                           $scope.profileimage="https://anant-bajaj-dev.myridz.com"+result.profile_image.url+"?"+result.updated_at;
                           }
                        else{
                             $scope.profileimage="./images/home/profile_default.png";
                        }
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })          
    $scope.profileimage="";

        $scope.uploadimage=function(){
          if($localStorage.anantissocial!=1){
            $('#fileupload').click();
          }            
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
      $scope.updateprofile = function() 
        {
                    var imagedata =$scope.myFile;
          ////console.log(JSON.stringify(imagedata));
          if(typeof(imagedata)!="undefined"){
              $scope.profile.profile_image="data:image/png;base64,"+imagedata.base64;
             }            
                $scope.updateprofileform.submitted = true;
        	if ($scope.updateprofileform.$invalid) {
				return false;
			}
                   
                //$scope.profile.user_id=$localStorage.anantuserid; 
                $scope.profile.marriage_anniversary_date=$('#datepicker1').val();
                $scope.profile.dob=$('#datepicker2').val();
                $scope.dataToSend.profile = $scope.profile;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="please wait ...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.put("https://anant-bajaj-dev.myridz.com/website/profiles/"+$localStorage.anantprofileid+"?auth_token="+$localStorage.anantusersession,$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);  
                          if(result.profile_image.url){
                           $localStorage.anantprofileimg=result.profile_image.url+'?'+result.updated_at;
                           }
                            $localStorage.anantuserdata.profile.full_name =result.full_name;
                            $localStorage.anantuserdata.profile.email =result.email;
                            $localStorage.anantuserdata.profile.mobile=result.mobile;
                            $localStorage.anantuserdata.profile.address=result.address;
                            $scope.successmessage="Profile Updated";
                            $scope.Showsuccessalert = true;
                            //$scope.profile={};
                            $scope.updateprofileform.submitted = false;
                            //$scope.updateprofileform1.submitted = false;               
                             $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $window.scrollTo(0, 0);
                            //$timeout(function() {$location.path('profile');},1000);
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