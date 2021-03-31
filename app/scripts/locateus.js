angular.module('anantbajaj')
  .controller('locateusdetailctrl',function ($scope, $http,onlineStatus,$window,$rootScope,$location,$http) {
	//console.log('locateus started');
    $("#hidenavbar").hide();
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
        $scope.dealerdata={};
        $scope.gallerydata={};
        $scope.dealerDetailsListFinal={};
        /*$scope.branddata={"brand":"KHT_Motors"};*/
    //console.log($scope.branddata);
             $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
                    function(result) {
                        //console.log(result.dealers);
                        var res=result.dealers; 
                        $scope.dealerdata=result.dealers;
                        var tempdealerDetailsList = [];
                        var dealertypes = [];
                   angular.forEach(res, function(key, value) {
                        tempdealerDetailsList.push(key);
                    for (var i = 0; i < key.dealer_type.length; i++) {
                        if (isInArray(key.dealer_type[i], dealertypes) == false) {
                            dealertypes.push(key.dealer_type[i]);
                        }
                    }
                });
    
                        $scope.dealertypes = dealertypes;
                        $scope.dealerDetailsListFinal = tempdealerDetailsList;
                        //console.log(dealertypes);
                        InitializeMap(res);                
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
         $scope.openModalUCImages = function(data) {
                        for (var i = 0; i < $scope.dealerdata.length; i++) {
                        if ($scope.dealerdata[i].dealer_name==data) {
                            $scope.gallerydata = $scope.dealerdata[i].image;
                            $("#myModal").modal();
                        }
                    } 
                }
    	function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }
    var myCenter;
    var geocoder;
    var map;
    var mapProp;
    var infowindow = new google.maps.InfoWindow();
    var marker, i;  
    var arrMarkers = [];
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	function InitializeMap(dealerdetails) {
        //alert('d');
        $scope.dealerDetails=dealerdetails;
         //console.log(JSON.stringify(dealerdetails));
          var locations = [];
            angular.forEach($scope.dealerDetails, function(key, value) {
                locations.push([key.dealer_name, key.latitude, key.longitude, value + 1]);
            });
        //console.log(locations);
        myCenter = new google.maps.LatLng(12.96909973,77.55999131);
        mapProp = {
                center:myCenter,
                zoom:11,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: true,
                scaleControl: true,
                overviewMapControl: true,
                disableDefaultUI: true,
                streetViewControl: false
              };
       map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
       //var marker = new google.maps.Marker({position:myCenter});
       //marker.setMap(map);
        addMarkers(locations);
              
}
       function addMarkers(locations)
    {
        //console.log(locations);
        var markers=locations;
        var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < markers.length; i++)
        {    
            /*var myIcon1 = new google.maps.MarkerImage('./img/image/Locator_icon.png', null, null, null, new google.maps.Size(35, 37));*/
            //console.log(markers);
            marker = new google.maps.Marker(
            {
                position: new google.maps.LatLng(markers[i][1], markers[i][2]),
                map: map,
               /* icon: myIcon1*/
            });
            arrMarkers.push(marker);
            google.maps.event.addListener(marker, 'mousedown', (function(marker, i)
            {
                //console.log(marker);
                return function()
                {                                  
                    infowindow.setContent("<p style='padding: 20px;font-size:16px;text-align: center;'> <strong>ANANT BAJAJ<br> </strong> " + markers[i][0] + "</p>");
                    var marklatLng = marker.getPosition();
                    map.setCenter(marklatLng);
                    infowindow.open(map, marker);
                };
            })(marker, i));
        }
    }
       $scope.facilityChange = function()
        {
           reloadMarkers();
            $scope.dealerDetails = {};
            if ($scope.facility == 'all') {
                $scope.dealerDetails = $scope.dealerDetailsListFinal;
                    var locations = [];
            angular.forEach($scope.dealerDetails, function(key, value) {
                locations.push([key.dealer_name, key.latitude, key.longitude, value + 1]);
            });
            //console.log(locations);
                addMarkers(locations);
            }
            else
            {
                $scope.dealerDetails = $scope.dealerDetailsListFinal;
                var tempArray = [];
                var array = new Array();
                angular.forEach($scope.dealerDetailsListFinal, function(key, value) {
                    if (isInArray($scope.facility, key.dealer_type) == true) 
                    {
                        ////console.log(key);
                        array.push(key);
                        tempArray.push([key.dealer_name, key.latitude, key.longitude, key.id]);
                        expandSpecific(key.dealer_type)
                    }
                });                
                $scope.dealerDetails = array;
                addMarkers(tempArray);
            }                        
        }

        $scope.changeLocation = function() 
        {
            //alert($scope.location);
             reloadMarkers();
            $scope.dealerDetails = {};
            if ($scope.location == 'all') {
                $scope.dealerDetails = {};
                $scope.dealerDetails = $scope.dealerDetailsListFinal;
                  var locations = [];
            angular.forEach($scope.dealerDetails, function(key, value) {
                locations.push([key.dealer_name, key.latitude, key.longitude, value + 1]);
            });
            //console.log(locations);
                addMarkers(locations);
            }
            else
            {
                var tempArray = [];
                var array = new Array();
                $scope.dealerDetails = $scope.dealerDetailsListFinal;
                angular.forEach($scope.dealerDetailsListFinal, function(key, value) {
                   
                    if (key.id == $scope.location) {
                         ////console.log(key);
                        array.push(key);
                        tempArray.push([key.dealer_name, key.latitude, key.longitude, key.id]);
                        expandSpecific(key.dealer_type)
                        //$scope.changeMap(key.dealer_name, key.lat, key.lon, key.id);
                        //tempArray.push(key);
                    }

                });
                $scope.dealerDetails = array;
                 //console.log(tempArray);
               
                addMarkers(tempArray);
            }
                       
        }
        function reloadMarkers() {
    
        //console.log(arrMarkers);
    for (var i=0; i<arrMarkers.length; i++) {
        //console.log('in');
        arrMarkers[i].setMap(null);
        arrMarkers[i].setVisible(false);
    }
        }
    
$scope.filterEmail = function(items) 
        {
            var result = {};
            var temp = [];
            var emails = items[0];
            emails = emails.split(",");
            for (var i = 0; i < emails.length; i++) 
            {
               temp.push({
                'email': emails[i]
               });
            }
            result = temp;
            return result;
        }

        $scope.filterAddress = function(data) 
        {
            var result = {};
            var temp = [];
            var address = data;
            address = address.split(",");
            for (var i = 0; i < address.length; i++) 
            {
               temp.push({
                'add': address[i]
               });
            }
            result = temp;
            return result;
        }

        $scope.filterWorkingHours = function(data) 
        {
            var result = '';
            var time = data;
            time = time.split(",");      
            result = time[0] + ", " + time[1];  
            return result;
        }

        // instantiate google map objects for directions
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();

        $scope.openMap = function (lat,lon) 
        {
         
          $scope.directions = {
            origin: new google.maps.LatLng(lat,lon),
            destination: new google.maps.LatLng(lat,lon)
          }
            var request = {
              origin: new google.maps.LatLng(lat,lon),
              destination: $scope.directions.destination,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
              
              if (status === google.maps.DirectionsStatus.OK) {
                 window.open('http://maps.google.com/maps?daddr='+$scope.directions.destination+'&mode=driving&key=AIzaSyBYWsf-3NOYaO4smFooZSUEo3IR4uoyGlQ','_blank');
              } else {
              }
            });
        }
	
	
})
   .filter('customFilter', function() {
  return function(input, value) {
    var result = [];
    input.forEach(function(item){
        ////console.log(item);
        if(item.dealer_type.indexOf(value) > -1){
            result.push(item);
        }
    });
    return result;
  };
});