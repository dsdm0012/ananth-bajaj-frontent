angular.module('anantbajaj')
  .controller('insurancectrl',function ($scope, $http,$localStorage,$filter,$window,$timeout,onlineStatus,$rootScope,$location) {
 $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
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
	$('#datepicker1').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy',
            endDate: "today"
        }); 
     	$('#datepicker2').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy'            
        }); 
    $("#hidenavbar").show();
    $scope.formtitle=$localStorage.ktmmotortabtitle;
    $scope.othermodel=true;
    $scope.carmodel=false;
    $scope.addmycarinsurance=false;
    $scope.insurance={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $scope.mycardetails={};
        if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.othermodel=false;
            $scope.carmodel=true;
            $scope.insurance.user_id=$localStorage.anantuserid;         
            $scope.insurance.name = $localStorage.anantuserdata.profile.full_name;
            $scope.insurance.email = $localStorage.anantuserdata.profile.email;
            $scope.insurance.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.insurance.address = $localStorage.anantuserdata.profile.address;
             }
    else{
        $scope.othermodel=true;
        $scope.carmodel=false;
    }
     
    //console.log($scope.branddata);
/*             $http.post("https://anant-bajaj-dev.myridz.com/website/get_brand_cars",$scope.branddata).success(
                    function(result) {
                        //console.log(result);
                        $scope.cardetails=result.cars;                               
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })*/
           /*   $http.post("https://anant-bajaj-dev.myridz.com/website/get_brand_dealers",$scope.branddata).success(
                    function(result) {
                        //console.log(result.dealers);
                        $scope.dealerdata=result.dealers;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })*/
           $http.get("https://anant-bajaj-dev.myridz.com/website/my_bikes?auth_token="+$localStorage.anantusersession).success(
                    function(result) {
                        //console.log(result);
                        $scope.mycardetails=result.my_bikes;
                        if(result.my_bikes.length==0 && $localStorage.anantuserid){
                             $scope.addmycarinsurance=true;
                            $scope.successmessage="Please add Bike(s) in you profile, to continue with the booking!";
                            $scope.Showsuccessalert = true;                         
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $window.scrollTo(0, 0);
                           }
                        if(result.my_bikes.length==1){
                            $scope.row=1;
                          //console.log(result.my_bikes[0]);
                  $scope.insurance.registration_number = result.my_bikes[0].registration_number;
                  //$scope.insurance.model = result.my_cars[0].id;
                  $scope.insurance.purchase_date = $filter('date')(result.my_bikes[0].purchase_date, 'dd-MM-yyyy');
                  $scope.insurance.expiry_date = $filter('date')(result.my_bikes[0].insurance_expiry_date, 'dd-MM-yyyy');
                  $scope.insurance.kms = result.my_bikes[0].kms;
                  $scope.insurance.insurance_company = result.my_bikes[0].insurance_provider;
                  $scope.insurance.policy_number = result.my_bikes[0].insurance_number;
                          var carid=result.my_bikes[0].id;
                          if(typeof(carid) != "undefined" && carid != null){
                          $scope.insurance.my_bike_id=carid.toString();                          
                          } 
                        }
                                                       
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
  
      $scope.submitinsurance = function() 
        {
                $scope.insuranceform.submitted = true;
          $scope.insuranceform1.submitted = true;
        	if ($scope.insuranceform.$invalid) {
				return false;
			}
          if ($scope.insuranceform1.$invalid) {
				return false;
			}           
              
                $scope.insurance.purchase_date=$('#datepicker1').val();
                $scope.insurance.expiry_date=$('#datepicker2').val();
               /* $scope.dataToSend.category="Book Service";
                $scope.dataToSend.date=$scope.insurance.date;
                $scope.dataToSend.time=$scope.insurance.time;
                $scope.dataToSend.count=0;*/
        /*    if($scope.insurance.my_bike_id=="Other"){
                $scope.insurance.model=
               }*/
              if($scope.insurance.my_bike_id=="Other"){
                  if(typeof($scope.insurance.model)=="undefined" || $scope.insurance.model==""){
                     $scope.modelinvalid=true;
                      return false;
                     }else{
                         $scope.modelinvalid=false;
                     }
               
               }         
               if($scope.insurance.purchase_date && $scope.insurance.expiry_date && $scope.insurance.purchase_date.split("-").reverse().join("") > $scope.insurance.expiry_date.split("-").reverse().join("")){
                 $scope.expiryDate = true;  
                 return false;
                }
                else{
                   $scope.expiryDate = false;   
                }
                $scope.dataToSend.insurance_renewal = $scope.insurance;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="Requesting Insurance renewal quote";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);

                $http.post("https://anant-bajaj-dev.myridz.com/website/insurance_renewals",$scope.dataToSend).success(
                    function(result) {
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        //console.log(result);
                            $localStorage.ananttabindex=1;
                            $scope.successmessage="Successfully submitted Insurance renewal quote request";
                            $scope.Showsuccessalert = true;
                            $scope.insurance={};
                            $scope.insuranceform.submitted = false;
                            $scope.insuranceform1.submitted = false;
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('main');},1000);  
                            //$location.path('insurance');
                                               
                    }).error(
                    function(err) {
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);
                       
                    })
        }
           $scope.addmycarins = function(){
        //console.log("in");
        $("#hidenavbar").hide();
        $localStorage.anantaddcarinsurance=1;
		$location.path('addmycar');		
	    }
        $scope.changecarmodel = function(){
            //console.log($scope.insurance.model);
               if($scope.insurance.my_bike_id=="Other"){
                $scope.carmodel=false;
               $scope.othermodel=true;
               }
            var model=$scope.insurance.my_bike_id;
               var serviceCarData = $scope.mycardetails;            
            for (var i = 0; i < serviceCarData.length; i++) {
              if (serviceCarData[i].id == model) {
                  //console.log(serviceCarData[i]);
                  $scope.insurance.registration_number = serviceCarData[i].registration_number;
                  $scope.insurance.model = serviceCarData[i].model;
                  $scope.insurance.purchase_date = $filter('date')(serviceCarData[i].purchase_date, 'dd-MM-yyyy');
                  $scope.insurance.expiry_date = $filter('date')(serviceCarData[i].insurance_expiry_date, 'dd-MM-yyyy');
                  $scope.insurance.kms = serviceCarData[i].kms;
                  $scope.insurance.insurance_company = serviceCarData[i].insurance_provider;
                  $scope.insurance.policy_number = serviceCarData[i].insurance_number;
                  break; 
              }
            }
        }
 
	
	
	
	
});