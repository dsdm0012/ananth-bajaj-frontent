'use strict';

// Declare app level module which depends on views, and components
angular.module('anantbajaj', ['ngRoute', 'ngStorage', 'naif.base64', 'angular-flexslider', 'socialLogin', 'rzModule', 'angular-toArrayFilter', 'reg.threesixty', '720kb.socialshare']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/cars', {
                templateUrl: 'views/cars.html?v2.64',
                cache: false,
                controller: 'carsctrl'
            })
            .when('/services', {
                templateUrl: 'views/services.html?v2.64',
                cache: false,
                controller: 'servicesctrl'
            })
            .when('/testdrive', {
                templateUrl: 'views/testdrive.html?v2.64',
                cache: false,
                controller: 'testdrivectrl'
            })
            .when('/insurance', {
                templateUrl: 'views/insurance.html?v2.64',
                cache: false,
                controller: 'insurancectrl'
            })
            .when('/emicalculator', {
                templateUrl: 'views/emicalculator.html?v2.64',
                cache: false,
                controller: 'emicalculatorctrl'
            })
            .when('/pricequote', {
                templateUrl: 'views/pricequote.html?v2.64',
                cache: false,
                controller: 'pricequotectrl'
            })
            .when('/contactus', {
                templateUrl: 'views/contactus.html?v2.64',
                cache: false,
                controller: 'contactusctrl'
            })
            .when('/feedback', {
                templateUrl: 'views/feedback.html?v2.64',
                cache: false,
                controller: 'feedbackctrl'
            })
            .when('/locateusdetail', {
                templateUrl: 'views/locateusdetail.html?v2.64',
                cache: false,
                controller: 'locateusdetailctrl'
            })

        .when('/aboutus', {
            templateUrl: 'views/aboutus.html?v2.64',
            cache: false,
            controller: 'aboutusctrl'
        })
        .when('/pricelist', {
            templateUrl: 'views/pricelist.html?v2.64',
            cache: false,
            controller: 'pricelistctrl'
        })

        .when('/addmycar', {
                templateUrl: 'views/addmycar.html?v2.64',
                cache: false,
                controller: 'addmycarctrl'
            })
            .when('/mybikesdetail', {
                templateUrl: 'views/mybikesdetail.html?v2.64',
                cache: false,
                controller: 'mycarsctrl'
            })
            .when('/updatemycars', {
                templateUrl: 'views/updatemycars.html?v2.64',
                cache: false,
                controller: 'updatemycarsctrl'
            })

        .when('/updateprofile', {
                templateUrl: 'views/updateprofile.html?v2.64',
                cache: false,
                controller: 'updateprofilectrl'
            })
            .when('/makepayment', {
                templateUrl: 'views/makepayment.html?v2.64',
                cache: false,
                controller: 'makepaymentctrl'
            })
            .when('/paymentdetail', {
                templateUrl: 'views/paymentdetail.html?v2.64',
                cache: false,
                controller: 'paymentdetailctrl'
            })
            .when('/bikedetail', {
                templateUrl: 'views/bikedetail.html?v2.64',
                cache: false,
                controller: 'bikedetailctrl'
            })
            .when('/bikecompare', {
                templateUrl: 'views/bikecompare.html?v2.64',
                cache: false,
                controller: 'bikecomparectrl'
            })
            .when('/mobilecompare', {
                templateUrl: 'views/mobilecompare.html?v2.64',
                cache: false,
                controller: 'mobilecomparectrl'
            })
            .when('/testimonial', {
                templateUrl: 'views/testimonial.html?v2.64',
                cache: false,
                controller: 'testimonialctrl'
            })
            .when('/addtestimonial', {
                templateUrl: 'views/addtestimonial.html?v2.64',
                cache: false,
                controller: 'addtestimonialctrl'
            })

        .when('/terms', {
                templateUrl: 'views/terms.html?v2.64',
                cache: false,
                controller: 'termsCtrl'
            })
            .when('/footer', {
                templateUrl: 'views/footer.html?v2.64',
                cache: false,
                controller: 'footerCtrl'
            })
            .when('/privacy', {
                templateUrl: 'views/privacy.html?v2.64',
                cache: false,
                controller: 'privacyCtrl'
            })
            /*           .when('/redirectFaliure', {
                    templateUrl: 'views/redirectFaliure.html?v2.64',
                    cache:false,
                    controller: 'redirectFailPageCtrl'
                })*/

        .otherwise({
            redirectTo: '/',
            templateUrl: 'views/main.html?v2.64',
            cache: false,
            controller: 'mainCtrl'
        });
    }])
    .filter('INR', function() {
        return function(input) {
            if (!isNaN(input)) {
                var currencySymbol = '₹';
                var result = input.toString().split('.');
                var lastThree = result[0].substring(result[0].length - 3);
                var otherNumbers = result[0].substring(0, result[0].length - 3);
                if (otherNumbers != '')
                    lastThree = ',' + lastThree;
                var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                if (result.length > 1) {
                    output += "." + result[1];
                }
                return currencySymbol + output;
            } else {
                return input;
            }
        }
    })
    .filter('INR1', function() {
        return function(input) {
            
            if (!isNaN(input) && input!=null) {
                var currencySymbol = '';
                var result = input.toString().split('.');
                var lastThree = result[0].substring(result[0].length - 3);
                var otherNumbers = result[0].substring(0, result[0].length - 3);
                if (otherNumbers != '')
                    lastThree = ',' + lastThree;
                var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                if (result.length > 1) {
                    output += "." + result[1];
                }
                return currencySymbol + output;
            }
        }
    })
    .filter('sortJobs', function() {
        return function(input) {
            if (input != null) {
                var x = input.filter(Boolean);
                x = x.toString().replace(/-|\s/g, "");
                return x.replace(/,/, ',\n');
            }
        }
    })

.filter('updatedDate', function() {
        return function(input) {
            if (input != null) {
                var x = input.substring(0, 10);
                return x.split('-').reverse().join('-');
            }
        }
    })
    .filter('req_skills', function() {
        return function(input) {
            if (input != null) {
                var x = input.replace(/-/g, '\n- ');
                return x;
            }
        }
    })
    .filter('updatedDate', function() {
        return function(input) {
            if (input != null) {
                var x = input.substring(0, 10);
                return x.split('-').reverse().join('-');
            }
        }
    })
    .filter('doSort', function() {
        return function(val) {
            if (val >= 10000000) {
                val = (val / 10000000).toFixed(2) + ' Cr';
            } else if (val >= 100000) {
                val = (val / 100000).toFixed(2) + ' L';
            } else if (val >= 1000) {
                val = (val / 1000).toFixed(2) + ' K';
            }
            return val;
        };
    })
    .config(function(socialProvider) {
        socialProvider.setGoogleKey("624962207080-ebj1961lkiu7ft72vmimhkqjvvamkdu9.apps.googleusercontent.com");
        socialProvider.setFbKey({
            appId: "424346957987936",
            apiVersion: "v2.10"
        });
    })
.run(function($rootScope, $route, $location){
   //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
   //bind in induvidual controllers.
   $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });        

/*   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
       console.log($rootScope.actualLocation);
       console.log(newLocation);
        if($rootScope.actualLocation === newLocation) {
            console.log('Why did you use history back?');
        }
    });*/
})

    .factory('onlineStatus', ["$window", "$rootScope", function($window, $rootScope) {
        var onlineStatus = {};

        onlineStatus.onLine = $window.navigator.onLine;

        onlineStatus.isOnline = function() {
            return onlineStatus.onLine;
        }

        $window.addEventListener("online", function() {
            onlineStatus.onLine = true;
            $rootScope.$digest();
        }, true);

        $window.addEventListener("offline", function() {
            onlineStatus.onLine = false;
            $rootScope.$digest();
        }, true);

        return onlineStatus;

    }])
    .directive('autoSubmitForm', ['$timeout', 'autoSubmitFormDelegate', function($timeout, autoSubmitFormDelegate) {
        return {
            replace: true,
            scope: {},
            template: '<form action="https://secure.payu.in/_payment" method="post">' +
                '<div ng-repeat="(key,val) in formData">' +
                '<input type="hidden" name="{{key}}" value="{{val}}" />' +
                '</div>' +
                '</form>',
            link: function($scope, element, $attrs) {

                autoSubmitFormDelegate.submitCallback = function(data) {
                    console.log(data);
                    $scope.formData = data;
                    //alert(JSON.stringify("submitform "+data));
                    $timeout(function() {
                        element[0].submit();
                    });
                };
            }
        }
    }])

.factory('autoSubmitFormDelegate', function() {
    var delegate = {};

    delegate.submitCallback = null;

    delegate.submitForm = function(data) {
        if (delegate.submitCallback) {
            console.log(data);
            delegate.submitCallback(data);
        }
    }

    return delegate;
});