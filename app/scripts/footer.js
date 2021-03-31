angular.module('anantbajaj')
    .controller('footerCtrl', function($scope,$timeout, $localStorage, $route, $http, $rootScope, $location) {
       $scope.pagename="";
    
       $scope.pagename=$localStorage.anantpagename;
       console.log($scope.pagename);
    
        $scope.homepage = function() {
            $localStorage.ananttabindex = 1;
            $location.path('main');
        }
        $scope.gototerms = function(data) {
            $location.path('terms');
        }
        $scope.testimonial = function(data) {
            $scope.pagename="Testimonial";
            $localStorage.anantpagename="Testimonial";
            $location.path('testimonial');
        }
        $scope.gotoprivacy = function(data) {
            $location.path('privacy');
        }
        $scope.contactlink = function(data) {
            $scope.pagename="Contact";
            $localStorage.anantpagename="Contact";
        }
        $scope.whatsapplink = {};
        $scope.whatsapptext = {};
        $scope.sociallink = "";
        $scope.bikename = 'CT100';
        $http.get("https://anant-bajaj-dev.myridz.com/web/whatsapp_chats").success(
            function(result) {
                $scope.whatsapplink = result.whatsapp_chats[0].contact_number;
                $scope.whatsapptext = result.whatsapp_chats[0].default_message;
            }).error(
            function(err) {
                $scope.loading = false;
            })
        $scope.homepagesocial = function() {
            var link = $scope.sociallink;
            //window.open(link);
            return false;
            window.open(link, '_system');
        }
        $http.get("https://anant-bajaj-dev.myridz.com/web/social_media_links").success(
            function(result) {
                $scope.sociallink = result.social_media_links[0].social_media_url;
            }).error(
            function(err) {
                $scope.loading = false;
            })
        $scope.contactno = "";
        $scope.getno = {
            "category": "Support Number"
        };
        $http.post("https://anant-bajaj-dev.myridz.com/website/get_contact_numbers", $scope.getno).success(
            function(result) {
                $scope.contactno = result.contact_numbers[0].number;
            }).error(
            function(err) {
                $scope.loading = false;
            })
        $scope.bikedata = {};
        $scope.bikemodel_type = {};

        $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
            function(result) {
                //console.log(result);
                $scope.bikedata = result.bikes;
            }).error(
            function(err) {})
        $http.get("https://anant-bajaj-dev.myridz.com/website/bikes_with_type").success(
            function(result) {
                //console.log(result);
                $scope.bikemodel_type = result;
            }).error(
            function(err) {
                $scope.loading = false;
            })
        $scope.getbikename = function(name) {
            $scope.bikename = name;
        }
        $scope.goTobikedetail = function(bikeid, name) {
            $localStorage.anantcarid = bikeid;
            $localStorage.anantbiketype = name;
            $localStorage.anantbikecurrentpage = "";
            closebikenav();
            //$scope.loadbikedetail();
            $location.path('bikedetail');
            $route.reload();
        }
        $scope.whatsapp1 = function() {
            $scope.pagename="Whatsapp";
            $localStorage.anantpagename="Whatsapp";
            /*  Add country code before number*/
            var whatsno = $scope.whatsapplink;
            if (whatsno) {
                //window.open("https://api.whatsapp.com/send?phone="+whatsno+"&text="+$scope.whatsapptext);
                //window.open("https://api.whatsapp.com/send?phone=" + whatsno);
                window.open("https://api.whatsapp.com/send?phone=" + whatsno, '_system');
            }

        }
        $scope.bikelist=function(){
            $scope.pagename="bikes";
            $localStorage.anantpagename="bikes";
        }
             $scope.gotopayment = function(){
              $scope.pagename="payment";
              $localStorage.anantpagename="payment";
		     if($localStorage.anantuserid){
              $localStorage.anantpaydueid="";
              $localStorage.anantpaymentpage="";
              $location.path('makepayment');	
              $route.reload();
              }else{
                  $scope.pagename="";
                  $localStorage.anantpagename="";
                  $localStorage.anantpage="payment";
                  //logintab();
                  $scope.infomessage="Login to Make payment!";
                  $scope.Showinfoalert = true;
                  $timeout(function() {$scope.Showinfoalert = false;},3000);    
              }	
	}

    });