angular.module('anantbajaj')
  .controller('testdrivectrl',function ($scope, $http,$localStorage,onlineStatus,$window,$timeout,$rootScope,$location) {
	//console.log('testdrive started');
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
    $scope.formtitle=$localStorage.ktmmotortabtitle;
    $("#hidenavbar").show();
	$('#datepicker1').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd/mm/yyyy'
        });
        $('#clockpicker1').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    /*donetext: 'Done',*/
    twelvehour: true,
});
    $scope.testdrive={};
    $scope.bikedetails={};
    $scope.dealerdata={};
    $scope.dataToSend = {};
    var testDriveFuels = [];
        if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.testdrive.user_id=$localStorage.anantuserid;         
            $scope.testdrive.name = $localStorage.anantuserdata.profile.full_name;
            $scope.testdrive.email = $localStorage.anantuserdata.profile.email;
            $scope.testdrive.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.testdrive.address = $localStorage.anantuserdata.profile.address;
             }
    if($localStorage.anantcartestdrive){
        console.log($localStorage.anantcartestdrive);
        $scope.testdrive.model=$localStorage.anantcartestdrive;
       }
      /* $scope.branddata={"brand":"KHT_Motors"};
       $scope.testdrive.dealer_brand="KHT_Motors";*/
    //console.log($scope.branddata);
             $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikedetails=result.bikes;    
                        if($scope.testdrive.model){
                        var testDrive = $scope.bikedetails;
                        testDriveFuels = [];
                        for (var i = 0; i < testDrive.length; i++) {
                            if (testDrive[i].car_name == $scope.testdrive.model) {
                                testDriveFuels.push(testDrive[i].fuel_types);
                                break;
                            }
                        }
                        $scope.testDriveFuelTypes = testDriveFuels[0];
                           }
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
              $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
                    function(result) {
                        //console.log(result.dealers);
                        $scope.dealerdata=result.dealers;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
            var testDriveFuels = [];
        $scope.testFuels = function() {
            var testDrive = $scope.bikedetails;
            testDriveFuels = [];
            for (var i = 0; i < testDrive.length; i++) {
                if (testDrive[i].car_name == $scope.testdrive.model) {
                    testDriveFuels.push(testDrive[i].fuel_types);
                    break;
                }
            }
            $scope.testDriveFuelTypes = testDriveFuels[0];
        }
      $scope.submittestdrive = function() 
        {
               $scope.testdriveform.submitted = true;
          $scope.testdriveform1.submitted = true;
        	if ($scope.testdriveform.$invalid) {
				return false;
			}
          if ($scope.testdriveform1.$invalid) {
				return false;
			}
         /* if($localStorage.anantusersession){
             $scope.testdrive.user_id=$localStorage.anantuserid;
             } */           
                if($scope.testdrive.requestpickup==true){
                    $scope.testdrive.request_pick_up=true;
                }
                else {
                $scope.testdrive.request_pick_up="No";
                }
                $scope.testdrive.date=$('#datepicker1').val();
                $scope.testdrive.time=$('#clockpicker1').val();
                $scope.dataToSend.category="Book Test Ride";
                $scope.dataToSend.date=$scope.testdrive.date;
                $scope.dataToSend.time=$scope.testdrive.time;
                $scope.dataToSend.count=0;
                $scope.dataToSend.test_ride = $scope.testdrive;
                //$scope.dataToSend.test_drive = $scope.testdrive;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="Requesting TestRide, please wait!";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/test_rides",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);
                        if(result.status==false){
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $scope.errormessage=result.message;
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},5000);
                            $window.scrollTo(0, 0);
                        }else{ 
                            $localStorage.ananttabindex=1;
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $scope.successmessage="Test drive booked Successful!";
                            $scope.Showsuccessalert = true;
                            $scope.testdrive={};
                            $scope.testdriveform.submitted = false;
                            $scope.testdriveform1.submitted = false;
                              /*$scope.testdriveform.$setUntouched();
                            $scope.testdriveform.$setPristine();*/
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$location.path('main');},1000);                            
                    }                               
                    }).error(
                    function(err) {
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        $localStorage.ananttabindex="";
                        $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);
                    })



         
        }
       $scope.stateChanged = function(){
            //console.log($scope.testdrive.requestpickup);
           $scope.showaddress=$scope.testdrive.requestpickup;
        }
	
	
	
});