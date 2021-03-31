angular.module('anantbajaj')
  .controller('servicesctrl',function ($scope, $http,$localStorage,onlineStatus,$window,$timeout,$rootScope,$location) {
	//console.log('service started');
     $("#hidenavbar").show();
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
    $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
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
    $scope.formtitle=$localStorage.ktmmotortabtitle;
    $scope.othermodel=true;
    $scope.carmodel=false;
    $scope.addmycarpage=false;
    $scope.servicebook={};
    $scope.cardetails={};
     $scope.dealerdata={};
    $scope.dataToSend = {};
    $scope.mycardetails={};
        if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.othermodel=false;
            $scope.carmodel=true;
            $scope.servicebook.user_id=$localStorage.anantuserid;         
            $scope.servicebook.name = $localStorage.anantuserdata.profile.full_name;
            $scope.servicebook.email = $localStorage.anantuserdata.profile.email;
            $scope.servicebook.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.servicebook.address = $localStorage.anantuserdata.profile.address;
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
              $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
                    function(result) {
                        //console.log(result.dealers);
                        $scope.dealerdata=result.dealers;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
           $http.get("https://anant-bajaj-dev.myridz.com/website/my_bikes?auth_token="+$localStorage.anantusersession).success(
                    function(result) {
                        //console.log(result);
                        $scope.mycardetails=result.my_bikes;
                        if(result.my_bikes.length==0 && $localStorage.anantuserid){
                            $scope.addmycarpage=true;
                            $scope.successmessage="Please add Bike(s) in you profile, to continue with the booking!";
                            $scope.Showsuccessalert = true;                         
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $window.scrollTo(0, 0);
                           }
                        if(result.my_bikes.length==1){
                            $scope.row=3;
                            //console.log(result.my_bikes[0]);
                    $scope.servicebook.registration_number = result.my_bikes[0].registration_number;
					$scope.servicebook.kms = parseFloat(result.my_bikes[0].kms);
                  //$scope.servicebook.model = my_bikes.my_cars[0].model;
                          var carid=result.my_bikes[0].id;
                          if(typeof(carid) != "undefined" && carid != null){
                          $scope.servicebook.my_bike_id=carid.toString();                          
                          } 
                        }
                                                         
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
  
      $scope.servicebooking = function() 
        {
                $scope.servicebookform.submitted = true;
          $scope.servicebookform1.submitted = true;
        	if ($scope.servicebookform.$invalid) {
				return false;
			}
          if ($scope.servicebookform1.$invalid) {
				return false;
			}           
                if($scope.servicebook.requestpickup==true){
                    $scope.servicebook.request_pick_up=true;
                }
                else {
                $scope.servicebook.request_pick_up=false;
                }
               if($scope.servicebook.my_bike_id=="Other"){
                   
                  if(typeof($scope.servicebook.model)=="undefined" || $scope.servicebook.model==""){
                     $scope.modelinvalid=true;
                      return false;
                     }else{
                         $scope.modelinvalid=false;
                     }
                   $scope.servicebook.my_bike_id='';               
               }
                $scope.servicebook.date=$('#datepicker1').val();
                $scope.servicebook.time=$('#clockpicker1').val();
                $scope.dataToSend.category="Book Service";
                $scope.dataToSend.date=$scope.servicebook.date;
                $scope.dataToSend.time=$scope.servicebook.time;
                $scope.dataToSend.count=0;
                $scope.dataToSend.service_booking = $scope.servicebook;
                //console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="Requesting , please wait!";
                $scope.Showinfoalert = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/service_bookings",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);
                        $timeout(function() {$scope.Showinfoalert = false;},0); 
                        if(result.status==false){
                            $scope.errormessage=result.message;
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);
                        }else{
                            $localStorage.ananttabindex=1;
                            $scope.successmessage="Service booked successful!";
                            $scope.Showsuccessalert = true;
                            $scope.servicebook={};
                            $scope.servicebookform.submitted = false;
                            $scope.servicebookform1.submitted = false;
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $window.scrollTo(0, 0);
                            $timeout(function() {$location.path('main');},1500);  
                            //$location.path('servicebook');
                    }                               
                    }).error(
                    function(err) {
                        $localStorage.ananttabindex="";
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                       $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);
                    })
        }
        $scope.addmycar = function(){
        //console.log("in");
        $("#hidenavbar").hide();
        $localStorage.anantaddcarservice=1;
		$location.path('addmycar');		
	    }
        $scope.changecarmodel = function(){
            //console.log($scope.servicebook.my_bike_id);
              if($scope.servicebook.my_bike_id=="Other"){
                $scope.carmodel=false;
               $scope.othermodel=true;
               }
            var model=$scope.servicebook.my_bike_id;
               var serviceCarData = $scope.mycardetails;            
            for (var i = 0; i < serviceCarData.length; i++) {
              if (serviceCarData[i].id == model) {
                  //console.log(serviceCarData[i]);
                  $scope.servicebook.registration_number = serviceCarData[i].registration_number;
					$scope.servicebook.kms = serviceCarData[i].kms;
                  $scope.servicebook.model = serviceCarData[i].model;
                  break; 
              }
            }
        }
       $scope.stateChanged = function(){
            //console.log($scope.servicebook.requestpickup);
           $scope.showaddress=$scope.servicebook.requestpickup;
        }
	
	
	
});