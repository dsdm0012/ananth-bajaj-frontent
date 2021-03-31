angular.module('anantbajaj')
  .controller('updatemycarsctrl',function ($scope, $http,$localStorage,$window,$timeout,onlineStatus,$rootScope,$location,$filter) {
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
    var startDate = new Date('01-01-1990');
	$('#datepicker1').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy',
            endDate: "today"
        }).on('changeDate', function(selected){  
        //console.log(selected);
            startDate = new Date(selected.date.valueOf());
        startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
        $('#datepicker2').datepicker('setStartDate', startDate);
        });;  
    	$('#datepicker2').datepicker({
            todayHighlight: true,
            startDate: startDate,
            endDate: "today",
            autoclose: true,
            format: 'dd-mm-yyyy'
        });  
        $('#datepicker3').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy'
        });
   $scope.myprofile = function(){
		$location.path('profile');		
	   }
	   $scope.editprofile = function(){
		$location.path('updateprofile');		
	   }
        $scope.mycarsdetail = function(){
            $localStorage.anantaddcarservice=0;
        $localStorage.anantaddcarinsurance=0;
		  $location.path('mybikesdetail');		
	   }    
      $scope.addmycar = function(){
          $localStorage.anantaddcarservice=0;
        $localStorage.anantaddcarinsurance=0;
		  $location.path('addmycar');		
	   }
        $scope.makepayment = function(){
          $localStorage.anantpaydueid="";
		  $location.path('makepayment');		
	   }
          $scope.paymentdue = function(){
		  $location.path('paymentdue');		
	   }
       $scope.paymenthistory = function(){
		  $location.path('myaccount');		
	   }
        $("#hidenavbar").hide();
    $scope.mycars={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $scope.mycardetails={};
     $scope.id='';
     $scope.othercarselected = false;

      
    //console.log($scope.branddata);
             $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.cardetails=result.bikes;  
                        testFuels(result.bikes);
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })          
    
            var testDriveFuels = [];
        $scope.testFuels = function() {
            var testDrive = $scope.cardetails;
            testDriveFuels = [];
             var defaultFuelTypes = {"fuel":["Petrol", "Diesel"]};
            for (var i = 0; i < testDrive.length; i++) {
                if (testDrive[i].car_name == $scope.mycars.bike) {
                    testDriveFuels.push(testDrive[i].fuel_types);
                    break;
                }
                    if($scope.mycars.bike == "Other"){
                   $scope.othercarselected = true;
                     testDriveFuels.push(defaultFuelTypes.fuel);
                     break;
                 }
            }
            $scope.testDriveFuelTypes = testDriveFuels[0];
        }
        function testFuels(cardata){
              var testDrive = cardata;
            testDriveFuels = [];
             var defaultFuelTypes = {"fuel":["Petrol", "Diesel"]};
            for (var i = 0; i < testDrive.length; i++) {
                if (testDrive[i].car_name == $scope.mycars.bike) {
                    testDriveFuels.push(testDrive[i].fuel_types);
                    break;
                }
                      else if($scope.mycars.bike == "Other"){
                    $scope.othercarselected = true;
                    testDriveFuels.push(defaultFuelTypes.fuel);
                    break;
                }else{
                    $scope.othercarselected = false;
                    testDriveFuels.push(defaultFuelTypes.fuel);
                    break;
                }
                
            }
            $scope.testDriveFuelTypes = testDriveFuels[0];
        }
              if($localStorage.anantmycardetails){
       //$scope.mycars=$localStorage.anantmycardetails;
                  //console.log($localStorage.anantmycardetails);
        var mycardata=$localStorage.anantmycardetails;
        $scope.mycars.registration_number = mycardata.registration_number;
                   $scope.id=mycardata.id;
                  $scope.mycars.custom_model = mycardata.bike;
                  $scope.mycars.bike = mycardata.bike;
                  $scope.mycars.fuel_type = mycardata.fuel_type;
                  $scope.mycars.date_of_purchase = $filter('date')(new Date(mycardata.purchase_date),'dd-MM-yyyy');
                  $scope.mycars.insurance_expiry_date = $filter('date')(new Date(mycardata.insurance_expiry_date),'dd-MM-yyyy');
                  $scope.mycars.kms = mycardata.kms;
                  $scope.mycars.insurance_company = mycardata.insurance_provider;
                  $scope.mycars.insurance_number = mycardata.insurance_number;
                  $scope.mycars.last_service_date = $filter('date')(new Date(mycardata.last_service_date),'dd-MM-yyyy');
       }
      $scope.updatemycars = function() 
        {
                $scope.mycarseditform.submitted = true;
          $scope.mycarseditform1.submitted = true;
        	if ($scope.mycarseditform.$invalid) {
				return false;
			}
          if ($scope.mycarseditform1.$invalid) {
				return false;
			}           
                $scope.mycars.user_id=$localStorage.anantuserid; 
                $scope.mycars.date_of_purchase=$('#datepicker1').val();
                $scope.mycars.last_service_date=$('#datepicker2').val();
                $scope.mycars.insurance_expiry=$('#datepicker3').val();   
               if($scope.mycars.date_of_purchase && $scope.mycars.last_service_date && $scope.mycars.date_of_purchase.split("-").reverse().join("") > $scope.mycars.last_service_date.split("-").reverse().join("")){
                 $scope.serviceDate = true;   
                 return false;
                }
                else{
                    $scope.serviceDate = false; 
                }
                if($scope.mycars.date_of_purchase && $scope.mycars.insurance_expiry && $scope.mycars.date_of_purchase.split("-").reverse().join("") > $scope.mycars.insurance_expiry.split("-").reverse().join("")){
                 $scope.expiryDate = true;  
                 return false;
                }
                else{
                   $scope.expiryDate = false;   
                }
              if($scope.mycars.bike=="Other"){
                   
                  if(typeof($scope.mycars.other_model)=="undefined" || $scope.mycars.other_model==""){
                     $scope.modelinvalid=true;
                      return false;
                     }else{
                         $scope.mycars.bike=$scope.mycars.other_model;
                         $scope.modelinvalid=false;
                     }
                   //$scope.mycars.my_car_id='';               
               }
                $scope.mycars.purchase_date=$scope.mycars.date_of_purchase;
                $scope.dataToSend.my_bike = $scope.mycars;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="please wait ...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.put("https://anant-bajaj-dev.myridz.com/website/my_bikes/"+ $scope.id,$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);                                  
                            $scope.successmessage="Bike Udpate Successful.Please wait...";
                            $scope.Showsuccessalert = true;
                            $scope.mycars={};
                            $scope.mycarseditform.submitted = false;
                            $scope.mycarseditform1.submitted = false;
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('mybikesdetail');},2000);
                                               
                    }).error(
                    function(err) {
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0); 
                       
                    })
        }
      $scope.opendelete=function(){
          $("#deletebike").modal();
      }
      $scope.cancelbike=function(){
          $('#deletebike').modal('toggle');
      }
      $scope.deletemycars=function(){
                  $http.delete("https://anant-bajaj-dev.myridz.com/website/my_bikes/"+ $scope.id,$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);                                  
                            $scope.successmessage="Bike Delete Successful.Please wait...";
                            $scope.Showsuccessalert = true;
                            $scope.mycars={};
                            $scope.mycarseditform.submitted = false;
                            $scope.mycarseditform1.submitted = false;
                            $('#deletebike').modal('toggle');
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('mybikesdetail');},1000);
                            
                                               
                    }).error(
                    function(err) {
                          $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0); 
                       
                    })
      }
   
 
	
	
	
	
});