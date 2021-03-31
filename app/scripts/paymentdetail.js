angular.module('anantbajaj')
    .controller('paymentdetailctrl', function($scope, $http, $localStorage, $window, $timeout, $rootScope, $location) {
        $http.defaults.headers.common['X-USER-TOKEN'] = $localStorage.anantusersession;
        $http.defaults.headers.common['X-USER-EMAIL'] = $localStorage.anantusermail;
        var textImage = "images/Text.png";
        var wordImage = "images/Word.png";
        var pdfImage = "images/PDF_icon.png";
        var jpgImage = "images/JPEG_icon.png";
        /*   $scope.$on('$routeChangeStart', function (scope, next, current) {
        if (next.$$route.controller != "Your Controller Name") {
           $location.path('myaccount');
        }
    });*/

        $scope.makepayment = function() {
            $localStorage.anantpaydueid = "";
            $location.path('makepayment');
        }
        $scope.retrypayment = function(id) {
            $localStorage.anantpaymentpage = "Make Payment";
            $localStorage.anantpaydueid = id;
            $location.path('makepayment');
        }
        $scope.paymenthistory = function() {
            $localStorage.anantpaymentpage = "Payment History";
            $location.path('makepayment');
        }
        $scope.paymentdetails = function() {
            $location.path('paymentdetail');
        }
        $scope.paymentdetail = {};
        $scope.userdata = {};
        if ($localStorage.anantusersession && $localStorage.anantuserid) {
            //console.log($localStorage.anantuserdata);
            $scope.userdata.user_id = $localStorage.anantuserid;
            $scope.userdata.name = $localStorage.anantuserdata.profile.full_name;
            $scope.userdata.email = $localStorage.anantuserdata.profile.email;
            $scope.userdata.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
            $scope.userdata.address = $localStorage.anantuserdata.profile.address;
        }
        var payid = $localStorage.anantpaymentid;
        $http.get("https://anant-bajaj-dev.myridz.com/website/payments/" + payid).success(
            function(result) {
                //console.log(result);
                if (result.status == "success") {
                    result.status = "Success"
                } else if (result.status == "failure") {
                    result.status = "Failure"
                }
                $scope.paymentdetail = result;
                var paymentdata = result;
                //console.log(result.file_type);
                if (paymentdata.file_type == 'text/plain') {
                    $scope.imageurl = 'images/Text.png';
                } else if (paymentdata.file_type == 'application/pdf') {
                    $scope.imageurl = 'images/PDF_icon.png';
                } else if (paymentdata.file_type == 'application/msword') {
                    $scope.imageurl = 'images/Word.png';
                } else if (paymentdata.file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    $scope.imageurl = 'images/Word.png';
                } else if (paymentdata.file_type == 'image/jpeg' && paymentdata.web_pay_image != null) {
                    $scope.imageurl = "https://anant-bajaj-dev.myridz.com/" + paymentdata.web_pay_image.url + '?' + paymentdata.updated_at;
                } else if (paymentdata.file_type == 'image/png' && paymentdata.web_pay_image != null) {
                    $scope.imageurl = "https://anant-bajaj-dev.myridz.com/" + paymentdata.web_pay_image.url + '?' + paymentdata.updated_at;
                } else if (paymentdata.file_type == null) {
                    $scope.showimg = true;
                    $scope.imageurl = '/images/Upload.svg';
                } else {
                    $scope.showimg = true;
                    $scope.imageurl = '/images/Upload.svg';
                }
            }).error(
            function(err) {
                $scope.loading = false;

            })
        $scope.uploadfiles = function(id) {
            //console.log(id);
            $('#uploadImage').click();
        }
        $scope.uploaddocument = function(id) {
            //console.log(id);
            /*console.log(id);
            $('#uploadImage').click();*/
            //console.log($scope.image);
            $scope.infomessage = "Uploading, Don't refresh";
            $scope.Showinfoalert = true;
            $scope.fileType = $scope.image.filetype.substr($scope.image.filetype.indexOf("/") + 1);
            var data = "data:application/" + $scope.fileType + ";base64,(" + $scope.image.base64 + ")";
            if ($scope.image.filetype == "text/plain") {
                jQuery("#smallimage").attr('src', textImage);
            } else if ($scope.image.filetype == "image/jpeg" || $scope.image.filetype == "image/png") {
                jQuery("#smallimage").attr('src', jpgImage);
                jQuery("#smallimage").attr('class', 'addmydocsimage');

            } else if ($scope.image.filetype == "application/pdf") {
                jQuery("#smallimage").attr('src', pdfImage);
            } else if ($scope.image.filetype == "application/msword" || $scope.image.filetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                jQuery("#smallimage").attr('src', wordImage);
            }
            var extension;
            if ($scope.image.filetype == "image/jpeg") {
                extension = "jpg";
            } else if ($scope.image.filetype == "text/plain") {
                extension = "txt";
            } else if ($scope.image.filetype == "application/pdf") {
                extension = "pdf";
            } else if ($scope.image.filetype == "application/msword") {
                extension = "doc";
            } else if ($scope.image.filetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                extension = "docx";
            } else {
                extension = "png";
            }
            var name = $scope.image.filename
            var filename = name + "." + extension;
            var sendata = {
                "web_pay_image": data,
                "document_name": filename,
                "file_type": $scope.image.filetype
            };
            //console.log(JSON.stringify({"payment": sendata}));

            var uploadid = $localStorage.anantpaymentid;
            //console.log(uploadid);
            //return false;
            $window.scrollTo(0, 0);
            $http.put("https://anant-bajaj-dev.myridz.com/website/payments/" + uploadid, {
                "payment": sendata
            }).success(
                function(result) {
                    //console.log(result);
                    $scope.loading = false;
                    $timeout(function() {
                        $scope.Showinfoalert = false;
                    }, 0);
                    $scope.successmessage = "File upload successful!";
                    $scope.Showsuccessalert = true;
                    $localStorage.anantpaymentpage = "Payment History";
                    $timeout(function() {
                        $scope.Showsuccessalert = false;
                    }, 3000);
                    $timeout(function() {
                        $location.path('makepayment');
                    }, 2000);

                }).error(
                function(err) {
                    $timeout(function() {
                        $scope.Showinfoalert = false;
                    }, 0);
                    $scope.errormessage = "File upload failed. Try again later";
                    $scope.Showerroralert = true;
                    $timeout(function() {
                        $scope.Showerroralert = false;
                    }, 5000);
                    $window.scrollTo(0, 0);

                })

        }
        $scope.viewimage = function(url,urllink) {
            //console.log(urllink);
            if (urllink) {
                window.open("https://anant-bajaj-dev.myridz.com/" + url);
            }
        }

    });