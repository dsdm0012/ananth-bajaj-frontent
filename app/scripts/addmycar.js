angular.module('anantbajaj')
  .controller('addmycarctrl',function ($scope, $http,$localStorage,$window,$timeout,$rootScope,$location,onlineStatus) {
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
    $scope.mycars={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $scope.mycardetails={};
    $scope.othercarselected = false;

      
    ////console.log($scope.branddata);
             $http.get("https://anant-bajaj-dev.myridz.com/website/bikes",$scope.branddata).success(
                    function(result) {
                        //console.log(result);
                        $scope.cardetails=result.bikes;                               
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
        $scope.uploadimage=function(){
            $('#fileupload').click();
            
        }
      $scope.addmycars = function() 
        {
            /*  var imagedata =$scope.myFile;
          //////console.log(JSON.stringify(imagedata));
          if(typeof(imagedata)!="undefined"){
              $scope.mycars.default_car_image="data:image/png;base64,"+imagedata.base64;
             } */        
                $scope.mycarsform.submitted = true;
          $scope.mycarsform1.submitted = true;
        	if ($scope.mycarsform.$invalid) {
				return false;
			}
          if ($scope.mycarsform1.$invalid) {
				return false;
			}           
                $scope.mycars.user_id=$localStorage.anantuserid; 
                $scope.mycars.date_of_purchase=$('#datepicker1').val();
                $scope.mycars.last_service_date=$('#datepicker2').val();
                $scope.mycars.insurance_expiry=$('#datepicker3').val();  
                $scope.mycars.purchase_date=$scope.mycars.date_of_purchase;
                $scope.dataToSend.my_bike = $scope.mycars;
                ////console.log(JSON.stringify($scope.dataToSend));
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
             /*   var purchasedate = $scope.mycars.date_of_purchase;
           var lastservicedate = $scope.mycars.last_service_date;
          var parts = purchasedate.split("/");
   var datepurchase = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
          //console.log(datepurchase);          
          var parts1 = lastservicedate.split("/");
   var dateservice = new Date(parts1[1] + "/" + parts1[0] + "/" + parts1[2]);
          //console.log(dateservice);           
            if(datepurchase<dateservice){                
                //console.log("true");
            }
          else{//console.log("true");}*/
                //return false;
          //console.log(JSON.stringify($scope.dataToSend));
          //return false;
                $scope.infomessage="please wait ...";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/my_bikes",$scope.dataToSend).success(
                    function(result) {
                        ////console.log(result);                                  
                            $scope.successmessage="Bike Added.Please wait...";
                            $scope.Showsuccessalert = true;
                            $scope.mycars={};
                            $scope.mycarsform.submitted = false;
                            $scope.mycarsform1.submitted = false;
                        if($localStorage.anantaddcarservice==1){
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $scope.successmessage="Redirecting to Service Booking.Please wait...";
                            $scope.Showsuccessalert = true;
                            $timeout(function() {$location.path('services');},2000);
                            return false;
                           
                           }else if($localStorage.anantaddcarinsurance==1){
                               $timeout(function() {$scope.Showinfoalert = false;},0);
                                $scope.successmessage="Redirecting to Insurance.Please wait...";
                            $scope.Showsuccessalert = true;
                            $timeout(function() {$location.path('insurance');},2000);
                               return false;
                            
                        }
                             $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert = false;},0);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('mybikesdetail');},2000);
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