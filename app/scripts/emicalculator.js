angular.module('anantbajaj')
  .controller('emicalculatorctrl',function ($scope, $http,$localStorage,$window,$timeout,onlineStatus,$rootScope,$location) {
    $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
    $("#hidenavbar").show();
	//console.log('emi started');
$scope.emi={};
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
    $scope.cardetails={};
    $scope.emicarVariantData={};
    $scope.tenuredata={};
      var emicarVariants = [];
    $scope.interestexceed=false;
        var data = [];
        var priceEmi = [];
        var onRoad = [];
    //console.log($scope.branddata);
              $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.cardetails=result.bikes; 
                        modelfillinitial();
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
               $http.get("https://anant-bajaj-dev.myridz.com/website/tenures").success(
                    function(result) {
                        //console.log(result);
                        $scope.tenuredata=result.tenures;                                   
                    }).error(
                    function(err) {
                         $scope.loading = false;
                       
                    })
         function modelfillinitial(){
             //console.log($localStorage.anantcaremibikename);
             if($localStorage.anantcaremibikename){
                $scope.row=1;
                $scope.emi.model=$localStorage.anantcaremibikename; 
                emiModel();
         }
         }
         function emiModel() {
            var emiCarData = $scope.cardetails;
            emicarVariants = [];
            for (var i = 0; i < emiCarData.length; i++) {;
                if (emiCarData[i].name == $scope.emi.model) {
                    emicarVariants.push(emiCarData[i].variant_data);
                    break;
                }
            }
            //console.log(emicarVariants[0]);
            $scope.emicarVariantData = emicarVariants[0];
        }
    
         $scope.emiModel = function() {
            var emiCarData = $scope.cardetails;
            emicarVariants = [];
            for (var i = 0; i < emiCarData.length; i++) {;
                if (emiCarData[i].name == $scope.emi.model) {
                    emicarVariants.push(emiCarData[i].variant_data);
                    break;
                }
            }
            //console.log(emicarVariants[0]);
            $scope.emicarVariantData = emicarVariants[0];
        }
                 $scope.emiVariant = function() {
            var index = $scope.emi.variantid;
                     //console.log(index);
            onRoad = $scope.emicarVariantData;
            for (var i = 0; i < onRoad.length; i++) {
                //console.log(onRoad[i]);
                if (onRoad[i].varient.id == index) {
                    //console.log(onRoad[i]);
                    //console.log(onRoad[i].variant_price[0].price[0].price_field_value);
                   $scope.emi.onRoadPriceValue =parseFloat(onRoad[i].price_field_values[0].value);
                    break;
                }
            }                     
        }
                       $scope.$watch('emi.rateInterest', function(interest) {
                           //console.log(interest);
            var userInterest = interest;
            if (userInterest > 20) {
                //console.log('Interest should not exceed 20'); 
                 $scope.errormessage="Interest should not exceed 20";
                 $scope.Showerroralert = true;
                $scope.emi.rateInterest = "";
                $timeout(function() {$scope.Showerroralert = false;},3000);
            } 
        });
      $scope.$watch('emi.downPay', function(downPay) {
          //console.log(downPay);
            var userDownPay = downPay;
          //console.log(JSON.stringify($scope.emi.onRoadPriceValue));
          //console.log(JSON.stringify($scope.emi.downPay));
            if ((userDownPay >= $scope.emi.onRoadPriceValue && $scope.emi.downPay != 0) || $scope.emi.emiValue < 0) {
                //console.log('Down payment should not exceed bike price'); 
                $scope.errormessage="Down payment should not exceed bike price";
                 $scope.Showerroralert = true;
                $scope.emi.downPay = "";
                $scope.emi.emiValue = "";
                $timeout(function() {$scope.Showerroralert = false;},3000);
            } 
        });
          $scope.calculate = function() {
              $scope.emiform.submitted = true;
          $scope.emiform1.submitted = true;
        	if ($scope.emiform.$invalid) {
				return false;
			}
          if ($scope.emiform1.$invalid) {
				return false;
			}  
            //console.log($scope.emi.rateInterest);
            if ($scope.emi.onRoadPriceValue && $scope.emi.rateInterest && $scope.emi.tenureMonth && $scope.emi.downPay) {
                if ($scope.emi.downPay > $scope.emi.onRoadPriceValue) {
                    $scope.emi.emiValue = "";
                    //console.log('Down payment should not exceed bike price!'); 
                     $scope.errormessage="Down payment should not exceed bike price!";
                 $scope.Showerroralert = true; 
                $timeout(function() {$scope.Showerroralert = false;},2000);
                } else if ($scope.emi.rateInterest > 20) {
                    $scope.emi.emiValue = "";
                    //console.log('Rate of Interest should not exceed 20!');
                    $scope.errormessage="Rate of Interest should not exceed 20!";
                 $scope.Showerroralert = true; 
                $timeout(function() {$scope.Showerroralert = false;},2000);
                } else {
                    calculateEmi($scope.emi.onRoadPriceValue, $scope.emi.rateInterest, $scope.emi.tenureMonth, $scope.emi.downPay);
                }
            }
        }

        function calculateEmi(e, i, t, d) {
            if ((e != undefined && i != undefined && t != undefined && d != undefined) && (e != "" && i != "" && t != "" && d != "") && (i > 0)) {
                var exshowPrice = e;
                var downPay = d;
                var pricipleAmount = e - d;
                var tenure = t;
                var interest = i;
                var monthlyInterest = (i / 100) / 12;
                var PIntoR = pricipleAmount * monthlyInterest;
                var top = Math.pow((1 + monthlyInterest), t);
                var bottom = top - 1;
                var rightPart = top / bottom;
                var emiValue = PIntoR * rightPart;
                $scope.emi.emiValue = parseFloat(emiValue).toFixed(2);
                //console.log($scope.emi.emiValue);
            } else {
                $scope.emi.emiValue = "";
            }
        }
           $scope.resetemi = function() {
            $scope.emiform.submitted = false;
            $scope.emiform1.submitted = false;
            $scope.emi={}; 
            $scope.emi.emiValue=0.00;
        }
});