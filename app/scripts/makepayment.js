angular.module('anantbajaj')
    .controller('makepaymentctrl', function($scope, $http, $localStorage, $window, $timeout, $rootScope, $route, $location, autoSubmitFormDelegate) {
        $http.defaults.headers.common['X-USER-TOKEN'] = $localStorage.anantusersession;
        $http.defaults.headers.common['X-USER-EMAIL'] = $localStorage.anantusermail;
        //console.log('make payment started');
        $scope.category = "Make Payment";
        $scope.classVar = "Make Payment";
        $scope.payduelength = $localStorage.anantpayduecount;
 
        var pagename = $localStorage.anantpaymentpage;
        //console.log(pagename);
        if (pagename == "Make Payment") {
            $scope.classVar = "Make Payment";
            $scope.category = "Make Payment";

        } else if (pagename == "Payment Due") {
            $scope.classVar = "Payment Due";
            $scope.category = "Payment Due";

        } else if (pagename == "Payment History") {
            $scope.classVar = "Payment History";
            $scope.category = "Payment History";

        }
        $scope.addmycar = function() {
            $localStorage.anantaddcarservice = 0;
            $localStorage.anantaddcarinsurance = 0;
            $location.path('addmycar');
        }
        $scope.addmycarpayment = function() {
            $localStorage.anantaddcarservice = 0;
            $localStorage.anantaddcarinsurance = 0;
            $('#add_mycar').modal();
            //$location.path('addmycar');		
        }
        $scope.makepayment = function(data) {
            $localStorage.anantpaymentpage = data;
            $scope.classVar = data;
            $scope.category = data;
            $localStorage.anantpaydueid = "";
            $route.reload();
        }
        $scope.paymentdue = function(data) {
            $localStorage.anantpaydueid = "";
            $localStorage.anantpaymentpage = data;
            $scope.classVar = data;
            $scope.category = data;
        }
        $scope.paymenthistory = function(data) {
            $localStorage.anantpaydueid = "";
            $localStorage.anantpaymentpage = data;
            $scope.classVar = data;
            $scope.category = data;
        }
        $scope.paymentdetails = function(id) {
            $localStorage.anantpaymentid = id;
            $location.path('paymentdetail');
            //window.location.replace('#!/paymentdetail');
        }
        var startDate = new Date('01-01-1990');
        $('#datepicker1').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy',
            endDate: "today"
        })

        $('#datepicker3').datepicker({
            todayHighlight: true,
            autoclose: true,
            format: 'dd-mm-yyyy'
        });

        $scope.payduelength = $localStorage.anantpayduecount;
        $scope.mycars = {};
        $scope.mycarcardetails = {};
        $scope.payment = {};
        $scope.cardetails = {};
        $scope.dealerdata = {};
        $scope.dataToSend = {};
        //$scope.payment.booked='same';
        $scope.addmycarpage = false;
        if ($localStorage.anantusersession && $localStorage.anantuserid) {
            //console.log($localStorage.anantuserdata);
            $scope.payment.user_id = $localStorage.anantuserid;
            $scope.payment.name = $localStorage.anantuserdata.profile.full_name;
            $scope.payment.email = $localStorage.anantuserdata.profile.email;
            if ($localStorage.anantuserdata.profile.mobile) {
                $scope.payment.phone = parseInt($localStorage.anantuserdata.profile.mobile);
            }
            //$scope.payment.address = $localStorage.anantuserdata.profile.address;
        }
        /*   $scope.branddata={"brand":"KHT_Motors"};
           $scope.payment.dealer_brand="KHT_Motors";*/
        //console.log($scope.branddata);

        $http.get("https://anant-bajaj-dev.myridz.com/website/dealers").success(
            function(result) {
                //console.log(result.dealers);
                $scope.dealerdata = result.dealers;
            }).error(
            function(err) {
                $scope.loading = false;

            })
        $scope.paymentdata = {};
        $scope.sendid = {
            "user_id": $localStorage.anantuserid
        };
        //console.log($scope.sendid);
        $http.post("https://anant-bajaj-dev.myridz.com/website/get_user_due_payments", $scope.sendid).success(
            function(result) {
                //console.log(result);
                $scope.paymentdata = result.users;
            }).error(
            function(err) {
                //console.log(err);
                $scope.loading = false;

            })
        $scope.paymentrecord = {};
        $scope.sendid = {
            "user_id": $localStorage.anantuserid
        };
        //console.log(JSON.stringify($scope.sendid));
        $http.post("https://anant-bajaj-dev.myridz.com/website/get_user_completed_payments", $scope.sendid).success(
            function(result) {
                //console.log(result);
                $scope.paymentrecord = result.users;
            }).error(
            function(err) {
                $scope.loading = false;

            })
        $scope.paynow = function(id) {
                $localStorage.anantpaydueid = id;
                $scope.classVar = "Make Payment";
                $scope.category = "Make Payment";
                $scope.row2 = 1;
                $scope.row3 = 1;
                $scope.row4 = 1;
                $scope.paymentduedata();
            }
            // $scope.mycars.dealer_brand="KHT_Motors";
            //console.log($scope.branddata);
        $http.get("https://anant-bajaj-dev.myridz.com/web/get_all_bikes").success(
            function(result) {
                //console.log(result);
                $scope.mycarcardetails = result.bikes;
            }).error(
            function(err) {
                $scope.loading = false;
            })

        var testDriveFuels = [];
        $scope.testFuels = function() {
            if ($scope.mycars.bike == "Other") {
                $scope.othercarselected = true;
            } else {
                $scope.othercarselected = false;
            }
        }
        $scope.dealertype = "";
        $scope.customfield = false;
        $scope.changemodel = function() {
            $scope.customfield = false;
            //$scope.payment.payment_mode='';
            //$scope.payment.booking_person_name="";
            var type = $scope.payment.entity_type;
            if (type == "Booking down-payment" || type == "Insurance Renewal" || type == "Accessories") {
                $scope.dealertype = 'Sales';
            } else {
                $scope.dealertype = 'Service';
            }
            if (type == "Booking down-payment" || type == "Other") {
                $scope.addmycarpage = false;
                $http.get("https://anant-bajaj-dev.myridz.com/web/get_all_bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.showmodel = false;
                        $scope.custommodel = true;
                        $scope.cardetails = result.bikes;
                    }).error(
                    function(err) {
                        $scope.loading = false;
                    })
            } else {
                $scope.data = {
                    "user_id": $localStorage.anantuserid
                };
                //console.log($scope.data);
                $http.post("https://anant-bajaj-dev.myridz.com/web/mybikes_with_user", $scope.data).success(
                    function(result) {
                        //console.log(result);
                        $scope.showmodel = true;
                        $scope.custommodel = false;
                        if (result.payments.length == 0) {
                            $scope.addmycarpage = true;
                        } else if (result.payments.length == 1) {
                            $scope.row3 = 1;
                            var modelid = result.payments[0].id;
                            if (typeof(modelid) != "undefined" && modelid != null) {
                                $scope.payment.bike_id = modelid.toString();
                            }
                        }

                        $scope.mycardetails = result.payments;
                    }).error(
                    function(err) {
                        $scope.loading = false;

                    })
            }

        }
        $scope.paydue = false;
        $scope.paysubmit = false;
        $scope.payment.payid = "";
        $scope.paymentduedata = function() {
            if ($localStorage.anantpaydueid) {
                //$scope.paymentdata={};
                $scope.paydue = true;
                var paymentid = $localStorage.anantpaydueid;
                $http.get("https://anant-bajaj-dev.myridz.com/website/payments/" + paymentid).success(
                    function(result) {
                        ////console.log(result);
                        $scope.payment.payid = result.id;
                        $scope.payment.entity_type = result.entity_type;
                        $scope.payment.amount = parseFloat(result.amount);
                        $scope.payment.payment_mode = result.payment_mode;
                        var type = result.entity_type;
                        if (result.booking_person_name) {
                            $scope.payment.booked = 'different';
                            $scope.payment.booking_person_name = result.booking_person_name;
                        } else {
                            $scope.payment.booked = 'same';
                        }
                        if (type == "Booking down-payment" || type == "Insurance Renewal" || type == "Accessories") {
                            $scope.dealertype = 'Sales';
                        } else {
                            $scope.dealertype = 'Service';
                        }
                        if (type == "Booking down-payment" || type == "Other") {
                            $scope.addmycarpage = false;
                            $http.get("https://anant-bajaj-dev.myridz.com/web/get_all_bikes").success(
                                function(result) {
                                    //console.log(result);
                                    $scope.showmodel = false;
                                    $scope.custommodel = true;
                                    $scope.cardetails = result.bikes;
                                }).error(
                                function(err) {
                                    $scope.loading = false;
                                })
                        } else {
                            $scope.data = {
                                "user_id": $localStorage.anantuserid
                            };
                            //console.log($scope.data);
                            $http.post("https://anant-bajaj-dev.myridz.com/web/mybikes_with_user", $scope.data).success(
                                function(result) {
                                    //console.log(result);
                                    $scope.showmodel = true;
                                    $scope.custommodel = false;
                                    if (result.payments.length == 0) {
                                        $scope.addmycarpage = true;
                                    }

                                    $scope.mycardetails = result.payments;
                                }).error(
                                function(err) {
                                    $scope.loading = false;

                                })
                        }
                        var dealerid = result.dealer_id;
                        if (typeof(dealerid) != "undefined" && dealerid != null) {
                            $scope.payment.dealer_id = dealerid.toString();
                        }
                        var modelid = result.bike_id;
                        if (typeof(modelid) != "undefined" && modelid != null) {
                            $scope.payment.bike_id = modelid.toString();
                        }
                    }).error(
                    function(err) {
                        $scope.loading = false;

                    })

            }
        }
        if ($localStorage.anantpaydueid) {
            $scope.classVar = "Make Payment";
            $scope.category = "Make Payment";
            $scope.row2 = 1;
            $scope.row3 = 1;
            $scope.row4 = 1;
            $scope.paymentduedata();
        }

        $scope.makepaymentnow = function() {
            $scope.paymentform.submitted = true;
            //$scope.paymentform1.submitted = true;
            if ($scope.paymentform.$invalid) {
                return false;
            }
            /*  if ($scope.paymentform1.$invalid) {
				return false;
			} */
            //$scope.payment.dealer_brand="KHT_Motors";
            $scope.payment.bike_id = parseInt($scope.payment.bike_id);
            $scope.payment.dealer_id = parseInt($scope.payment.dealer_id);
            $scope.payment.phone=($scope.payment.phone).toString();
            $scope.dataToSend.payment = $scope.payment;
            //console.log(JSON.stringify($scope.dataToSend));
            $scope.infomessage = "Please wait ... Redirecting to payment ";
            $scope.Showinfoalert = true;
            $window.scrollTo(0, 0);
            //return false;
            if ($scope.payment.payid) {
                $localStorage.anantpaymentid = $scope.payment.payid;
                $scope.paysubmit = true;
                $http.post("https://anant-bajaj-dev.myridz.com/website/pay_now", '{"id":' + $scope.payment.payid + '}').success(function(res) {
                    //console.log(res);                             
                    $scope.formData = res;
                    if ($scope.formData) {
                        setTimeout(function() {
                            $timeout(function() {
                                $scope.Showinfoalert = false;
                            }, 0);
                            document.getElementById('payNow').click();
                        }, 300);
                    }

                }).error(
                    function(err) {
                        $scope.paysubmit = false;
                        $timeout(function() {
                            $scope.Showinfoalert = false;
                        }, 0);
                        $scope.errormessage = "Something went wrong.Try again later";
                        $scope.Showerroralert = true;
                        $timeout(function() {
                            $scope.Showerroralert = false;
                        }, 3000);
                        $window.scrollTo(0, 0);
                    })

            } else {
                $scope.paysubmit = true;
                //console.log($scope.dataToSend);
                $http.post("https://anant-bajaj-dev.myridz.com/website/payments", $scope.dataToSend).success(
                    function(result) {
                        //console.log(result);
                        //$timeout(function() {$scope.Showinfoalert = false;},0);
                        var manualpayid = result.id
                        $localStorage.anantpaymentid = manualpayid;
                        //console.log(manualpayid);
                        if (manualpayid) {
                            $http.post("https://anant-bajaj-dev.myridz.com/website/pay_now", '{"id":' + manualpayid + '}').success(function(res) {
                                //console.log(res);
                                $scope.formData = res;
                                if ($scope.formData) {

                                    setTimeout(function() {
                                        $timeout(function() {
                                            $scope.Showinfoalert = false;
                                        }, 0);
                                        document.getElementById('payNow').click();
                                    }, 300);
                                }

                            }).error(
                                function(err) {
                                    $scope.paysubmit = false;
                                    $timeout(function() {
                                        $scope.Showinfoalert = false;
                                    }, 0);
                                    $scope.errormessage = "Something went wrong.Try again later";
                                    $scope.Showerroralert = true;
                                    $timeout(function() {
                                        $scope.Showerroralert = false;
                                    }, 3000);
                                    $window.scrollTo(0, 0);
                                })
                        }
                    }).error(
                    function(err) {
                        $scope.paysubmit = false;
                        $timeout(function() {
                            $scope.Showinfoalert = false;
                        }, 0);
                        $scope.errormessage = "Something went wrong.Try again later";
                        $scope.Showerroralert = true;
                        $timeout(function() {
                            $scope.Showerroralert = false;
                        }, 3000);
                        $window.scrollTo(0, 0);
                    })
            }

        }
        $scope.save = function($form) {
            if ($form.$valid) {
                $form.commit();
            }
        };
        $scope.addcarpayment = function() {

            $scope.mycarspayment.submitted = true;
            if ($scope.mycarspayment.$invalid) {
                return false;
            }
            if ($scope.mycars.bike == "Other") {

                if (typeof($scope.mycars.other_model) == "undefined" || $scope.mycars.other_model == "") {
                    $scope.modelinvalid = true;
                    return false;
                } else {
                    $scope.mycars.bike = $scope.mycars.other_model;
                    $scope.modelinvalid = false;
                }
                //$scope.mycars.my_bike_id='';               
            }
            $scope.infomessage = "please wait ...";
            $scope.Showinfoalert = true;
            // $window.scrollTo(0, 0);
            $scope.mycars.user_id = $localStorage.anantuserid;
            $scope.mycars.date_of_purchase = $('#datepicker1').val();
            $scope.mycars.insurance_expiry = $('#datepicker3').val();
            $scope.dataToSend.my_bike = $scope.mycars;
            //console.log(JSON.stringify($scope.dataToSend));
            $http.post("https://anant-bajaj-dev.myridz.com/website/my_bikes", $scope.dataToSend).success(
                function(result) {
                    $scope.row3 = 1;
                    //console.log(result);
                    $scope.showmodel = true;
                    $scope.custommodel = false;
                    //$scope.mycardetails=result.my_car;    
                    $scope.successmessage = "Bike Added Successful ";
                    $scope.Showsuccessalert = true;
                    $scope.mycars = {};
                    $scope.mycarspayment.submitted = false;
                    $scope.addmycarpage = false;
                    $timeout(function() {
                        $scope.Showsuccessalert = false;
                    }, 1000);
                    $timeout(function() {
                        $scope.Showinfoalert = false;
                    }, 0);
                    $('#add_mycar').modal("hide");
                    $scope.data = {
                        "user_id": $localStorage.anantuserid
                    };
                    $http.post("https://anant-bajaj-dev.myridz.com/web/mybikes_with_user", $scope.data).success(
                        function(result) {
                            //console.log(result);
                            $scope.mycardetails = result.payments;
                            if (result.payments.length == 1) {
                                var modelid = result.payments[0].id;
                                if (typeof(modelid) != "undefined" && modelid != null) {
                                    $scope.payment.bike_id = modelid.toString();
                                }
                            }
                        }).error(
                        function(err) {})

                }).error(
                function(err) {
                    $scope.errormessage = "Something went wrong.Try again later";
                    $scope.Showerroralert = true;
                    $timeout(function() {
                        $scope.Showinfoalert = false;
                    }, 0);
                    $timeout(function() {
                        $scope.Showerroralert = false;
                    }, 3000);
                    $('#add_mycar').modal("hide");
                    //$window.scrollTo(0, 0);                        
                })
        }

    })
    .directive("ngFormCommit", [function() {
        return {
            require: "form",
            link: function($scope, $el, $attr, $form) {
                $form.commit = function() {
                    $el[0].submit();
                };
            }
        };
    }])