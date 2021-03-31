angular.module('anantbajaj')
  .controller('bikecomparectrl',function ($scope, $http,$rootScope,$window,$timeout,$location,onlineStatus,$localStorage,$http,$rootScope) {
/*	//console.log('car compare started');
    $scope.car={};
    $scope.carcomparedata={};
	//console.log($localStorage.anantcompareid);
	   $scope.branddata={"brand":"KHT_Motors"};
       $scope.car.dealer_brand="KHT_Motors";
     
    $scope.carid=$localStorage.anantcompareid;
    //console.log(JSON.stringify($scope.carid));
              $http.post("https://anant-bajaj-dev.myridz.com/website/cars_data",$scope.carid).success(
                    function(result) {
                        //console.log(result);
                        $scope.carcomparedata=result.overview; 
           
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })  */ 
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
    $scope.bikemodel={};
    $scope.comparemodel={};
        $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikemodel=result.bikes;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
     /*  $http.get("https://anant-bajaj-dev.myridz.com/web/get_non_bajaj_vehicles").success(
                    function(result) {
                        //console.log(result);
                        //$scope.bikemodel=result.bikes;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })*/
      var bikeidlist={"id":parseInt($localStorage.anantcarid)}
                $http.post("https://anant-bajaj-dev.myridz.com/website/compare_data",bikeidlist).success(
                    function(result) {
                        //console.log(result);
                        $scope.comparemodel=result.bikes;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
    $scope.compareprice={};
    $scope.dataToprice={};
    $scope.biketotal=0;
    /*$scope.branddata={"brand":"KHT_Motors"};
    $scope.dataToprice.dealer_brand="KHT_Motors";
    $scope.compareprice.dealer_brand="KHT_Motors";*/
     if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.compareprice.user_id=$localStorage.anantuserid;         
            $scope.compareprice.name = $localStorage.anantuserdata.profile.full_name;
            $scope.compareprice.email = $localStorage.anantuserdata.profile.email;
            $scope.compareprice.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
             }
    $scope.carid=$localStorage.anantcompareid;
    $rootScope.query=$scope.carid;
    var api_url="https://anant-bajaj-dev.myridz.com";
		$scope.modalCarShown = false;
	 	$scope.priceModal = false;
            $scope.goToOverview = function(eID) {
                //anchorSmoothScroll.scrollTo(eID);
                expandSpecific(eID);
                $('html, body').animate({
                scrollTop: $("#"+eID).offset().top
                }, 2000);
            }

            $scope.overViewArray = [
				/*{name: "fuel type"},
				{name: "fuel tank"}, 
				{name: "seating capacity"},
				{name: "transmission type"}, 
				{name: "engine displacement"}, 
				{name: "fuel efficiency"}, */
				{name: "available colors"}];

            $scope.has3Cars = 0;
            $scope.allCars = {};
            $scope.bikeList = [];
            $scope.common = false;
            $scope.differences = false;
		    $scope.defaultText =true;

            $scope.highLightCommon = function() {

                $scope.differences = false;
				if($scope.common){
					$scope.defaultText = false;
				}
				
				if($scope.common == false && $scope.differences == false){
					$scope.defaultText = true;
				}
            }

            $scope.highLightUnCommon = function() {
                $scope.common = false;
				if($scope.differences){
					$scope.defaultText = false;
				}
				if($scope.common == false && $scope.differences == false){
					$scope.defaultText = true;
				}
    		}
			
			$scope.closePriceModal = function(){
		 $scope.priceModal = !$scope.priceModal;
	}

$scope.changeVariant = function(carIndex) {
  	var varid = document.getElementById("variantID"+carIndex).value;
    $scope.common = false;
    $scope.differences = false;
     $scope.defaultText = true;
    var temp = [];
    $scope.tempVar = {};   
    if (carIndex>=0) {      
        $scope.carid[carIndex]=parseInt(varid);
        //console.log($scope.carid);
         $scope.getData();

    }
}


$scope.getData = function getData(query) {
    //console.log(query);
	$scope.temp = {};
	var overViewArray = [];
	//removeHighlight();
   
    $scope.common = false;
    $scope.differences = false;
    $scope.test = true;
    $scope.defaultText = true;
    $scope.message = 'Loading Cars...';
    //console.log(JSON.stringify(query));
	
    $localStorage.query = query;
    //console.log($scope.carid);
    $scope.senddata={};
    $scope.senddata= {"compare_ids":$scope.carid};
    //console.log(JSON.stringify($scope.senddata));
    //return false;
    $http.post(api_url + "/website/bike_compare", $scope.senddata)
        .then(function(success) {
        console.log(success);
            $scope.temp = success.data.overview;
			////console.log($scope.temp.length);
    		var totalCars = $scope.temp.length;
			if(totalCars == 3){
				$scope.has3Cars = 1;
			}else{
				$scope.has3Cars = 0;
			}
			////console.log("Total Cars : "+totalCars);
		angular.forEach($scope.temp, function(key, value) {
		/*	$scope.temp[value].overViewArrayData = [];
			$scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].car_data[20].fuel_types.toString()});
			$scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].techinical_specification[5].values[0].value});
            $scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].variant_data.variant.seating});
            $scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].variant_data.variant.transmission_type});
			$scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].techinical_specification[1].values[4].value});
				
			$scope.temp[value].overViewArrayData.push({"value":$scope.temp[value].techinical_specification[0].values[0].value});*/
			
			//console.log($scope.temp);
				
					
				if(value==0){

					for(var i=0;i<$scope.temp[0].specifications.length;i++){
                        //console.log($scope.temp[0].specifications);
							//console.log(totalCars);
							if(totalCars == 2){
                                //console.log($scope.temp[0].specifications[i]);
								if($scope.temp[0].specifications[i].value == $scope.temp[1].specifications[i].value ){
									$scope.temp[0].specifications[i].matched = true;
									$scope.temp[1].specifications[i].matched = true;
								}else{
									$scope.temp[0].specifications[i].matched = false;
									$scope.temp[1].specifications[i].matched = false;
								}
							}else if(totalCars == 3){
								if($scope.temp[0].specifications[i].value == $scope.temp[1].specifications[i].value && $scope.temp[1].specifications[i].value == $scope.temp[2].specifications[i].value){
									$scope.temp[0].specifications[i].matched = true;
									$scope.temp[1].specifications[i].matched = true;
									$scope.temp[2].specifications[i].matched = true;
								}else{
									$scope.temp[0].specifications[i].matched = false;
									$scope.temp[1].specifications[i].matched = false;
									$scope.temp[2].specifications[i].matched = false;
								}
							}
						
						}
				/*	for(var i=0;i<$scope.temp[0].variant_data.variant_feature_showcases.length;i++){
						for(var j=0;j<$scope.temp[0].variant_data.variant_feature_showcases[i].values.length;j++){
							if(totalCars == 2){
								if($scope.temp[0].variant_data.variant_feature_showcases[i].values[j].description == $scope.temp[1].variant_data.variant_feature_showcases[i].values[j].description ){
									$scope.temp[0].variant_data.variant_feature_showcases[i].values[j].matched = true;
									$scope.temp[1].variant_data.variant_feature_showcases[i].values[j].matched = true;
								}else{
									$scope.temp[0].variant_data.variant_feature_showcases[i].values[j].matched = false;
									$scope.temp[1].variant_data.variant_feature_showcases[i].values[j].matched = false;
								}
							}else if(totalCars == 3){
								if($scope.temp[0].variant_data.variant_feature_showcases[i].values[j].description == $scope.temp[1].variant_data.variant_feature_showcases[i].values[j].description && $scope.temp[1].variant_data.variant_feature_showcases[i].values[j].description == $scope.temp[2].variant_data.variant_feature_showcases[i].values[j].description ){
									$scope.temp[0].variant_data.variant_feature_showcases[i].values[j].matched = true;
									$scope.temp[1].variant_data.variant_feature_showcases[i].values[j].matched = true;
									$scope.temp[2].variant_data.variant_feature_showcases[i].values[j].matched = true;
								}else{
									$scope.temp[0].variant_data.variant_feature_showcases[i].values[j].matched = false;
									$scope.temp[1].variant_data.variant_feature_showcases[i].values[j].matched = false;
									$scope.temp[2].variant_data.variant_feature_showcases[i].values[j].matched = false;
								}
							}
						}
						}*/
					
					
			}
		});
		
		var totalCars = $scope.temp.length;
		//console.log($scope.temp[0].overViewArrayData.length);
	/*	for(var i=0;i<$scope.temp[0].overViewArrayData.length;i++){
						if(totalCars == 2){
						if($scope.temp[0].overViewArrayData[i].value == $scope.temp[1].overViewArrayData[i].value){
							$scope.temp[0].overViewArrayData[i].matched=true;
							$scope.temp[1].overViewArrayData[i].matched=true;
						}else{
							$scope.temp[0].overViewArrayData[i].matched=false;
							$scope.temp[1].overViewArrayData[i].matched=false;
							
						}
						}else if(totalCars == 3){
							if($scope.temp[0].overViewArrayData[i].value == $scope.temp[1].overViewArrayData[i].value && $scope.temp[1].overViewArrayData[i].value == $scope.temp[2].overViewArrayData[i].value){
							$scope.temp[0].overViewArrayData[i].matched=true;
							$scope.temp[1].overViewArrayData[i].matched=true;
							$scope.temp[2].overViewArrayData[i].matched=true;
						}else{
							$scope.temp[0].overViewArrayData[i].matched=false;
							$scope.temp[1].overViewArrayData[i].matched=false;
							$scope.temp[2].overViewArrayData[i].matched=false;
							
						}
						}
							
					}*/
		$scope.data = $scope.temp;
        $scope.biketotal =$scope.data.length;
		//console.log($scope.data);

        }, function(error) {

        })['finally'](function() {
            $scope.dataLoaded = true;
		 pageDataLoaded();
        });

}


$rootScope.$on('getData', function(event, query) {
    $rootScope.query = query;
    $scope.getData($rootScope.query);

})

if ($rootScope.query) {
    //////console.log(JSON.stringify($rootScope.query));
    $scope.getData($rootScope.query);
    $localStorage.query = $rootScope.query;
}

if ($localStorage.query) {
    //////console.log(JSON.stringify($localStorage.query));
    $scope.getData($localStorage.query);
}

	
	$scope.selectedIndex = 0;
//close car
$scope.closeCar = function(carIndex) {
    var temp = [];
	var currentQuery = [];
	currentQuery = $localStorage.query;
	//console.log(currentQuery);
	var totalCars = $scope.data.length;
    $scope.biketotal = $scope.data.length;
	if(totalCars <=2){
	}else{
		temp = $scope.data;
		temp.splice(carIndex,1);
		$scope.data = temp;
        $scope.biketotal = $scope.data.length;
		currentQuery.splice(carIndex,1);
        $scope.carid=currentQuery;
		$localStorage.query = currentQuery;
		$scope.query = currentQuery;
		
				$scope.has3Cars = 0;
	}
   // $rootScope.$broadcast('getData', $scope.query);
}
	$scope.modelChange = function() {
		$scope.selectedModel = document.getElementById("changeModel").value;
        $scope.dataToSend = {};
        var bikeid=[];
            bikeid=$scope.carid;
        if ($scope.selectedModel) {
            //alert($scope.selectedModel);
          
            bikeid.push(parseFloat($scope.model));
            //console.log(bikeid);
            $scope.carid=bikeid;
            $localStorage.query = bikeid;
            $timeout(function() {$('#add_newcar').modal('toggle')},1000);
            $scope.getData($scope.carid);
        }

    }
	
	
	$scope.variantChange = function() {
		$scope.selectedVariant = document.getElementById("changeVariant").value;
        $scope.tempVar = {};
        var temp = [];
        //console.log($scope.selectedModel);
         //console.log($scope.selectedVariant);
            $scope.successmessage="Please wait...";
            $scope.Showsuccessalert = true; 
            $timeout(function() {$scope.Showsuccessalert = false;},2000);
            if ($scope.selectedModel && $scope.selectedVariant) {
				//code that causes an error
                Array.prototype.remove = function(index, data) {
                    try {
                        this.splice(index, 1, data);
                    } catch (e) {}
                }

                temp = $localStorage.query;
                $scope.tempVar['car_id'] = $scope.selectedModel;
                $scope.tempVar['variant_id'] = $scope.selectedVariant;
                temp.remove($scope.selectedIndex, $scope.tempVar);
                $scope.query = temp;
                $rootScope.$broadcast('getData', $scope.query);
                $timeout(function() {$('#add_newcar').modal('toggle')},1000);
                
            }         
		 $scope.modalCarShown = !$scope.modalCarShown;   
    }

//change/add car model
$scope.changeCar = function(carIndex) {
	$scope.model = "";
	$scope.variant = "";
	if(carIndex == 4){
		$scope.modalTitle = "Add Modal";
	}else{
		$scope.modalTitle = "Change Modal";	}
      $("#add_newcar").modal();		
 	$scope.selectedIndex = carIndex;
  	//console.log("Car Index : "+carIndex);
    $http.get(api_url + "/website/bikes")
        .then(function(success) {
        //console.log(success);
            $scope.bikeList = success.data.bikes;
            //console.log(JSON.stringify($scope.bikeList));
        }, function(error) {

        })['finally'](function() {
           
        });
    $scope.modalCarShown = !$scope.modalCarShown;
};
       $scope.gotohomepage = function(){
        $localStorage.anantbikecurrentpage="";
        $location.path('bikedetail');     
    }	
	
	$scope.closeCarModal = function(){
		$scope.modalCarShown = !$scope.modalCarShown;
	}

$scope.bikevariant={};
$scope.getPriceQuote = function(ev, bikename,nonbajaj) {
    if(nonbajaj==true){
       return false;
       }
    $("#car_onroadprice").modal();
      var name = bikename;
      $scope.sendEmailData = {};
    	for(var i=0;i<$scope.bikemodel.length;i++){               
				if($scope.bikemodel[i].name == name){
                    //console.log($scope.bikemodel[i]);
                    $scope.bikevariant=$scope.bikemodel[i].variant_data;                                
            }            
        }
}

	$scope.sendpricedetail=function(){
          $scope.bikecomparequote.submitted = true;
        	if ($scope.bikecomparequote.$invalid) {
				return false;
			}                      
            
                $scope.dataToprice = $scope.compareprice;
                //console.log(JSON.stringify($scope.dataToprice));
                $scope.infomessage="Requesting Price Quote, please wait!";
                $scope.Showinfoalert1 = true;
                $window.scrollTo(0, 0);
                //console.log($scope.dataToprice);
                $http.post("https://anant-bajaj-dev.myridz.com/website/email_price",$scope.dataToprice).success(
                    function(result) {
                        //console.log(result);                        
                            $scope.successmessage="Price quote sent to"+$scope.compareprice.email+"!";
                            $scope.Showsuccessalert = true;
                            $scope.compareprice={};
                            $scope.bikecomparequote.submitted = false;
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert1 = false;},0); 
                            $timeout(function() {$('#car_onroadprice').modal('toggle');},2000);
                            //$window.scrollTo(0, 0);
                                               
                    }).error(
                    function(err) {
                        $('#send_price').modal('toggle');
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showinfoalert1 = false;},0);
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $timeout(function() {$('#car_onroadprice').modal('toggle');},2000);
                            //$window.scrollTo(0, 0);                       
                    })
        
    }
})
  