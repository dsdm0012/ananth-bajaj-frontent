angular.module('anantbajaj')
    .controller('pricelistctrl', function($scope, $timeout, $http, $window, $localStorage, $rootScope, $location, onlineStatus) {
        $scope.onlineStatus = onlineStatus; //onlineStatus
        $scope.$watch('onlineStatus.isOnline()', function(online) {
            $scope.online_status_string = online ? 'online' : 'offline';

            if ($scope.online_status_string == 'offline') {
                $window.scrollTo(0, 0);
                $scope.errormessage = "Check your internet connection and try again..";
                $scope.Showerroralert = true;

            }
            if ($scope.online_status_string == 'online') {
                $scope.Showerroralert = false;
            }

        });
        //console.log($localStorage.anantpricelist);
        $scope.pricedata = {};
        $scope.pdflink = {};
        
        console.log($localStorage.anantpricelist)
        $http.post("https://anant-bajaj-dev.myridz.com/website/price_chart_pdf",$scope.dataToSend).success(
            function(result) {
                console.log("result",result);
                $localStorage.anantpricelist=result;
               $scope.pricedata =result;


                                       
            }).error(
            function(err) {
                                      
            })
    /*    $http.get("https://anant-bajaj-dev.myridz.com/website/get_pdf_url").success(
            function(result) {
                console.log(result);
                $scope.pdflink = result.pdf_link;
            }).error(
            function(err) {
                $scope.loading = false;
            })*/
        $scope.downloadpdf = function(link) {
            window.open('https://anant-bajaj-dev.myridz.com/website/pdf_url', '_system');
            /*if (link) {
                window.open(link, '_system');
            } else {
                $scope.errormessage = "Document not available !";
                $scope.Showerroralert = true;
                $timeout(function() {
                    $scope.Showerroralert = false;
                }, 3000);
                $window.scrollTo(0, 0);
            }*/
        }
        $scope.sendmail = function() {
            $scope.priceemailform.submitted = true;
            if ($scope.priceemailform.$invalid) {
                return false;
            }

            $scope.dataToSend = $scope.pricemail;
            //console.log(JSON.stringify($scope.dataToSend));
            $scope.infomessage = "Please Wait ...";
            $scope.Showinfoalert1 = true;
            $window.scrollTo(0, 0);
            $http.post("https://anant-bajaj-dev.myridz.com/website/download_pdf_price_chart", $scope.dataToSend).success(
                function(result) {
                    //console.log(result);
                    $('#send_email').modal('toggle');
                    $scope.successmessage = "Price list sent to " + $scope.pricemail.email + "!";
                    $scope.Showsuccessalert = true;
                    $scope.pricelist = {};
                    $scope.priceemailform.submitted = false;
                    $timeout(function() {
                        $scope.Showsuccessalert = false;
                    }, 3000);
                    $timeout(function() {
                        $scope.Showinfoalert1 = false;
                    }, 0);
                    $window.scrollTo(0, 0);

                }).error(
                function(err) {
                    $('#send_email').modal('toggle');
                    $scope.errormessage = "Something went wrong.Try again later";
                    $scope.Showerroralert = true;
                    $timeout(function() {
                        $scope.Showinfoalert1 = false;
                    }, 0);
                    $timeout(function() {
                        $scope.Showerroralert = false;
                    }, 3000);
                    $window.scrollTo(0, 0);
                })

        }

    });