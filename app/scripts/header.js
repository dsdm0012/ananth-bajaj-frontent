angular.module('anantbajaj')
  .controller('headerCtrl',function ($scope, $http,$rootScope,$timeout,$localStorage,onlineStatus, $location, $route, $anchorScroll,$window) {
	//console.log('Home Page');
    //$location.path('main');	
    //console.log($location.path());
    $scope.tab=0;
    var sideMenuOpen = true;
	var sideLoginOpen = true;
    $scope.logincss="loginnav";
    $localStorage.anantpagename="";
	var sideNavWidth = document.getElementById("mySidenav");
	var sideLoginNavWidth = document.getElementById("loginNav");

     	    $scope.onlineStatus = onlineStatus;//onlineStatus
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status_string = online ? 'online' : 'offline';  

        if($scope.online_status_string == 'offline')
        {
            //$window.scrollTo(0, 0);
            $scope.errormessage="Check your internet connection and try again..";
            $scope.Showerroralert1 = true; 
            $scope.Showerroralert2 = true;                                                 
         
        }     
        if($scope.online_status_string == 'online')
        {
            $scope.Showerroralert1 = false;
            $scope.Showerroralert2 = false;          
        }

    });
    $scope.scrollheader=function(){
        $window.scrollTo(0, 0);
    }
                  $scope.contactno="";
                  $scope.getno= {"category":"Support Number"};
                  $http.post("https://anant-bajaj-dev.myridz.com/website/get_contact_numbers",$scope.getno).success(
                    function(result) {
                        $scope.contactno=result.contact_numbers[0].number;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    }) 
       if($localStorage.anantuserid){
          var data={"user_id": $localStorage.anantuserid};
                    $http.post("https://anant-bajaj-dev.myridz.com/website/get_user_due_payments",data).success(
                    function(result) {
                        //console.log(result);
                        var totalrecord=result.users;                     
                        $scope.paymenttotal=totalrecord.length;
                        $localStorage.anantpayduecount=totalrecord.length;                                         
                    }).error(
                    function(err) {
                         //$location.path('makepayment');	
                    })
       }
          $scope.paymentdue=function(){
            $localStorage.anantpaymentpage = "Payment Due";
            $location.path('makepayment');
            $route.reload();
          }
        $scope.bikedata={};
        $scope.bikemodel_type={};

                    $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikedata=result.bikes;
                    }).error(
                    function(err) {
                         //$location.path('makepayment');	
                    })
                   $http.get("https://anant-bajaj-dev.myridz.com/website/bikes_with_type").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikemodel_type=result;
                                                 
                    }).error(
                    function(err) {
                         $scope.loading = false;   
                    })
       $scope.mycarsdetail = function(){
              if(jQuery('.navbar-toggle').css('display') !='none'){
            jQuery('.navbar-toggle').trigger( "click" );
        }
		$location.path('mybikesdetail');		
	}
     
    $scope.data={};
    $scope.user={};
    $scope.login={};
    $scope.userdata={};
    $scope.paymenttotal="";
    $scope.username="";
    $scope.imglink="";
    $scope.loginsession=true;
    $scope.loginvalid=false;
    $scope.imageurl='images/home/profile.png';
    //console.log($localStorage.anantuserdata);
    if($localStorage.anantissocial==1 && $localStorage.anantsocialdata){
          //console.log($localStorage.anantsocialdata);
        $scope.socialdata=$localStorage.anantsocialdata;
        $scope.loginsession=false;
        $scope.loginvalid=true;
        $scope.username=$scope.socialdata.name;
        $scope.imageurl=$scope.socialdata.imageUrl;
       }
    else if($localStorage.anantuserdata && $localStorage.anantissocial==0){
        //console.log($scope.username);
        $scope.userid=$localStorage.anantuserdata;
        $scope.loginsession=false;
        $scope.loginvalid=true;
        $localStorage.anantuserid=$scope.userid.id;
       $scope.username=$localStorage.anantusername;
        if($localStorage.anantprofileimg){
            //console.log('img xxx');
            //console.log($localStorage.anantprofileimg);
             $scope.imageurl="https://anant-bajaj-dev.myridz.com"+$localStorage.anantprofileimg; 
            $('#profileimg').attr('src', $scope.imageurl);
            $('#profileimg1').attr('src', $scope.imageurl);
           }
        else if($scope.userid.profile.profile_image.url){
        $scope.imageurl="https://anant-bajaj-dev.myridz.com"+$scope.userid.profile.profile_image.url+'?'+$scope.userid.profile.updated_at;
           }
       }
    else{
         $scope.loginvalid=false;
         $scope.loginsession=true;
     }
         if ($localStorage.anantchecked && $localStorage.anantchecked != '') {
                    $('#remember_me').attr('checked', 'checked');
                    $scope.login.email=$localStorage.anantusermail;
                    $scope.login.password=$localStorage.anantpassword;
                } else {
                    $('#remember_me').removeAttr('checked');
                    $scope.login.email='';
                    $scope.login.password='';
                }
         $('#remember_me').click(function() {          
                    if ($('#remember_me').is(':checked')) {
                        $localStorage.anantusermail = $scope.login.email;
                        $localStorage.anantpassword = $scope.login.password;
                        $localStorage.anantchecked = $('#remember_me').val();
                    } else {
                        $localStorage.anantusermail = '';
                        $localStorage.anantpassword = '';
                        $localStorage.anantchecked = '';
                    }
                })
    $scope.loadimage =function(data){
        $scope.imglink=data.default_bike_data.web_s3_url;
    }
    $scope.homepage=function(){
        $timeout(function() {
          window.location.reload();
        },200);
       
    }
     $scope.goToHome = function(){
        $localStorage.ananttabid=0;
        $("#hidenavbar").hide();
         $localStorage.anantpage="main";
		$location.path('main');		
	}
	$scope.goToCars = function(){
        $localStorage.ananttabid=1;
        $("#hidenavbar").hide();
        $localStorage.anantpage="cars";
		$location.path('cars');		
	}
    $scope.goToAccessories = function(){
        $localStorage.ananttabid=2;
        $("#hidenavbar").hide();
        $localStorage.anantpage="accessories";
		$location.path('accessories');		
	}
       $scope.goTopayment = function(data){	
		     if($localStorage.anantuserid){
              $localStorage.anantpaydueid="";
              $localStorage.anantpaymentpage="";
              $location.path('makepayment');	
              $route.reload();
              }else{
                  $localStorage.anantpage="payment";
                  //logintab();
                  $window.scrollTo(0, 0);
                  $scope.infomessage="Login to Make payment!";
                  $scope.Showinfoalert = true;
                  $timeout(function() {$scope.Showinfoalert = false;},5000);    
              }	
	}
    $scope.goTobikedetail = function(bikeid,name){
        //console.log(bikeid);
        //console.log(name);
        $localStorage.anantcarid=bikeid;
        $localStorage.anantbiketype=name;
        $localStorage.anantbikecurrentpage="";
		$location.path('bikedetail');
        $route.reload();
	}
        $scope.goTobikedetail1 = function(bikeid,name){
        //console.log(bikeid);
        //console.log(name);
        $localStorage.anantcarid=bikeid;
        $localStorage.anantbiketype=name;
        $localStorage.anantbikecurrentpage="";
		$location.path('bikedetail');
        if(jQuery('.navbar-toggle').css('display') !='none'){
            jQuery('.navbar-toggle').trigger( "click" );
        }
            closeNav();
            closeNavService();
            closeMyAccount();
            $('.navbar-collapse.in').collapse('hide');
            $("#barid").removeClass("change");
        $route.reload();
	}
        $scope.hidemenu =function(){
             closeNav();
            closeNavService();
            closeMyAccount();
            $('.navbar-collapse.in').collapse('hide');
            $("#barid").removeClass("change");
        }
               function hidemenulogin(){
             closelogin();
            $('.navbar-collapse.in').collapse('hide');
            $("#barid").removeClass("change");
        }


  $scope.usedcar = function(){
        $localStorage.ananttabid=1;
      $localStorage.anantpage="usedcar";
    $location.path('usedcar');    
  }
      $scope.newcars = function(){
        $localStorage.ananttabid=1;
          $localStorage.anantpage="cars";
    $location.path('cars');   
  }
	
	/*$scope.goTonavbar = function(){
        $localStorage.ananttabid=3;
        $localStorage.ktmmotornavid='';
        $("#hidenavbar").show();
        $localStorage.anantcartestdrive='';
        $localStorage.anantpage="testdrive";
		$location.path('testdrive');		
	}*/
      	$scope.goToService = function(data){
        $localStorage.ktmmotortabtitle="SERVICE BOOKING";
		$location.path('services');		
	}
    $scope.goTotestdrive = function(data){
        $localStorage.ktmmotortabtitle="TEST RIDE";
		$location.path('testdrive');		
	}	
     $scope.goToinsurance = function(data){	
         $localStorage.ktmmotortabtitle="INSURANCE";
		$location.path('insurance');		
	}	
      $scope.goToemicalculator = function(data){
          $localStorage.ktmmotortabtitle="EMI CALCULATOR";
          $localStorage.anantcaremibikename="";
		$location.path('emicalculator');		
	}	
       $scope.goTopricequote = function(data){	
           $localStorage.ktmmotortabtitle="PRICE QUOTE";
		$location.path('pricequote');		
	}	
        $scope.goTocontactus = function(data){
            $localStorage.ktmmotortabtitle="ENQUIRY";
		$location.path('contactus');		
	}	
         $scope.goTofeedback = function(data){	
             $localStorage.ktmmotortabtitle="FEEDBACK";
		$location.path('feedback');		
	}
      $scope.myaccount = function(){
        $localStorage.anantpage="myaccount";
		$location.path('myaccount');		
	}
        $scope.myprofile = function(){
        $localStorage.anantpage="profile";
               if(jQuery('.navbar-toggle').css('display') !='none'){
            jQuery('.navbar-toggle').trigger( "click" );
        }
		$location.path('updateprofile');		
	}
	
	$scope.gotolocateus = function(){
        $localStorage.anantpage="locateus";
		$location.path('locateusdetail');
	}
    $scope.goToCareers = function(){
        $localStorage.anantpage="careers";
		$location.path('careers');
	}
     $scope.goToAboutus = function(){
         $localStorage.anantpage="aboutus";
		 $location.path('aboutus');
	}
       $scope.logintab = function(){
           $localStorage.anantpage="main";
           $scope.login={};
           $scope.data.name="";
           $scope.data.mobile="";
           $scope.data.email="";
           $scope.data.password="";
           $('#myTabfirst a:first').tab('show');
           $('#signin_tab').addClass('active');
           $scope.signupform.submitted = false;
           $scope.loginform.submitted = false;
           $("#myModal").modal();
	}
            var logintab = function () {
           $scope.login={};
           $scope.data.name="";
           $scope.data.mobile="";
           $scope.data.email="";
           $scope.data.password="";
           $('#myTabfirst a:first').tab('show');
           $('#signin_tab').addClass('active');
           $scope.signupform.submitted = false;
           $scope.loginform.submitted = false;
           $("#myModal").modal();
	}
                $scope.cleardata=function(){
                $scope.user={};
                $scope.loginformanant.submitted = false;
                $scope.signupanant.submitted = false;
            }
            $scope.pricelist={};
            if($localStorage.anantusersession && $localStorage.anantuserid){
                $scope.pricelist.name = $localStorage.anantuserdata.profile.full_name;
                $scope.pricelist.email = $localStorage.anantuserdata.profile.email;
                $scope.pricelist.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
             }
    $scope.normallogin = function(){
            $("#hidenavbar").hide();
          $scope.loginformanant.submitted = true;
          //$scope.submitted = true;
          $localStorage.anantpaydueid="";
        	if ($scope.loginformanant.$invalid) {
				return false;
			}
        if($localStorage.anantfirstemail){
            $scope.userdata={"session": {"email":$localStorage.anantfirstemail,"password": $localStorage.anantfirstpass}}; 
           }else{
               $scope.userdata={"session": {"email":$scope.user.email,"password": $scope.user.password}}; 
           }
      
       //console.log(JSON.stringify($scope.userdata));
            //return false;
             $http.post("https://anant-bajaj-dev.myridz.com/website/sessions",$scope.userdata).success(
                    function(result) {
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        //console.log(result);
                        var res=result;                     
                       if(result.user.profile.profile_image.url){
                       $scope.imageurl="https://anant-bajaj-dev.myridz.com"+result.user.profile.profile_image.url+'?'+result.user.profile.updated_at;
                       }else{
                         $scope.imageurl='images/home/profile.png';
                       }                       
                        $scope.loginsession=false;
                        $scope.loginvalid=true;
                        $scope.users=result.user;
                        $localStorage.anantissocial=0; 
                        $scope.username=result.user.profile.full_name;
                        $localStorage.anantuserdata=result.user;
                        $localStorage.anantuserid=result.user.id;
                        $localStorage.anantusersession=result.user.authentication_token;
                        $localStorage.anantusername=result.user.profile.full_name;
                        $localStorage.anantusermail=result.user.profile.email;
                        $localStorage.anantprofileid=result.user.id;
                        //$('#myModal').modal('toggle');
                         closeSidePanel();
                        $("#dialogWrapper").hide();
                        hidemenulogin();
                        $scope.successmessage="Successfully Logged in.";
                        $route.reload();
                        $scope.Showsuccessalert = true;   
                        $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	                    $http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail;
                        $timeout(function() {$scope.Showsuccessalert = false;},3000);
                        $localStorage.anantfirstemail="";
                        $localStorage.anantfirstpass="";
                        if(result.user.sign_in_count==1){
                          setTimeout(function() {
                            $location.path('updateprofile');
                          }, 100);                  
                         }
                        
                        var data={"user_id": $localStorage.anantuserid};
                    console.log(JSON.stringify(data));
                    $http.post("https://anant-bajaj-dev.myridz.com/website/get_user_due_payments",data).success(
                    function(result) {      
                        //console.log(result);
                        var totalrecord=result.users;  
                        $scope.paymenttotal=totalrecord.length;
                        $localStorage.anantpayduecount=totalrecord.length;
                           if($localStorage.anantpage=="payment"){
    	                    if(totalrecord.length > 0){
                           $location.path('paymentdue');
                           }else{
                               $localStorage.anantpaymentpage='';
                               $location.path('makepayment');	
                           }
                           }                        
                    }).error(
                    function(err) {
                         //$location.path('makepayment');	
                       
                    })                       
                                
                    }).error(
                    function(err) {
                           //console.log(err);
                          if(err.errors){
                           $scope.errormessage=err.errors;
                           }
                        else{
                            $scope.errormessage="Something went wrong.Try again later";
                        }                                              
                        $scope.Showerroralert2 = true; 
                        $timeout(function() {$scope.Showerroralert2 = false;},3000);                        
                    })
	}
        $scope.signup = function(){
        $("#hidenavbar").hide();
               $scope.signupanant.submitted = true;
        	if ($scope.signupanant.$invalid) {
				return false;
			}
       $scope.userdata={"user": {"name":$scope.user.name,"email":$scope.user.email,"password": $scope.user.password,"mobile": $scope.user.mobile,"social_login":0}};
       //console.log(JSON.stringify($scope.userdata));
             $localStorage.anantfirstemail=$scope.user.email;
             $localStorage.anantfirstpass=$scope.user.password;
            //return false;
            $scope.infomessage="Please wait ...";
                $scope.Showinfoalert = true;
             $http.post("https://anant-bajaj-dev.myridz.com/website/users",$scope.userdata).success(
                    function(result) {
                        //console.log(result);
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        var res=result; 
                        //$scope.dealerdata=result.dealers;
                        //$('#myModal').modal("hide");
                        $scope.successmessage="Registration Successful";
                        $route.reload();
                        $scope.Showsuccessalert = true;  
                        
                        closeSidePanel();
                        hidemenulogin();
                        $("#dialogWrapper").hide();
                        $scope.signupanant.submitted = false;
                        $timeout(function() {$scope.Showsuccessalert = false;},3000);
                        if(result.user.sign_in_count==0){
                          /* $scope.user.email=$scope.user.email;
                           $scope.user.password: $scope.user.password;*/
                          setTimeout(function() {
                             $scope.normallogin();
                          }, 100);                  
                         }else{
                             $scope.user={};
                             $localStorage.anantfirstemail="";
                             $localStorage.anantfirstpass="";
                         }
                                
                    }).error(
                    function(err) {
                        console.log(err);
                         $timeout(function() {$scope.Showinfoalert = false;},0); 
                        if(err.errors.email){
                           $scope.errormessage=err.errors.email[0];
                           }
                        else{
                            $scope.errormessage="Something went wrong.Try again later";
                        }                                              
                        $scope.Showerroralert1 = true; 
                        $timeout(function() {$scope.Showerroralert1 = false;},4000);                        
                       
                    })
	}
        	function closeSidePanel(){
            if(sideLoginOpen == false){
                sideLoginNavWidth.style.width = "0px";
                sideLoginOpen = true;
            }
            if(sideMenuOpen == false){
                sideNavWidth.style.width = "0px";
                sideMenuOpen = true;
            }/*else{
				sideNavWidth.style.width = "250px";
				sideMenuOpen = false;
			}*/
                $('html, body').css({overflow:'auto',height: 'auto'});
                $('.carousel-indicators,#gallery_slider,#carousel .flex-direction-nav').css('opacity', '1');
                
	}	
                        $scope.logout = function(){
                var userid=$localStorage.anantuserid;
                $http.delete("https://anant-bajaj-dev.myridz.com/website/sessions/"+userid).success(
                    function(result) {
                        //console.log("Logged Out");
                        $scope.tab=0;
                        $localStorage.anantissocial="";
                        $localStorage.anantuserdata="";
                        $localStorage.anantsocialdata="";
                        $localStorage.anantuserid="";
                        $localStorage.anantusername="";
                        $localStorage.ananttabid="";
                        $localStorage.anantpagename="";
                        $localStorage.ananttabindex="";
                        $localStorage.anantbikecurrentpage="";
                        $route.reload();
                        $scope.loginsession=true;
                        $scope.loginvalid=false;  
                        $scope.successmessage="Logout Successful";
                        $scope.Showsuccessalert = true;                         
                        $timeout(function() {$scope.Showsuccessalert = false;},3000);
                        closeMyAccount();
                        $('.navbar-collapse.in').collapse('hide');
                        $("#barid").removeClass("change");
                           if(jQuery('.navbar-toggle').css('display') !='none'){
            jQuery('.navbar-toggle').trigger( "click" );
        }
                        $location.path('main');
                    }).error(
                    function(err) {
                         $scope.loading = false;
                            $scope.tab=0;
                        $localStorage.anantissocial="";
                        $localStorage.anantuserdata="";
                        $localStorage.anantsocialdata="";
                        $localStorage.anantuserid="";
                        $localStorage.anantusername="";
                        $localStorage.anantpagename="";
                        $localStorage.ananttabid="";
                        $localStorage.ananttabindex="";
                        $route.reload();
                        $scope.loginsession=true;
                        $scope.loginvalid=false;  
                        $scope.successmessage="Logout Successful";
                        $scope.Showsuccessalert = true;                         
                        $timeout(function() {$scope.Showsuccessalert = false;},3000);
                        closeMyAccount();
                        $('.navbar-collapse.in').collapse('hide');
                        $("#barid").removeClass("change");
                           if(jQuery('.navbar-toggle').css('display') !='none'){
            jQuery('.navbar-toggle').trigger( "click" );
        }
                        $location.path('main');
                    })
                }
          $scope.forgotpassword = function(){
          $scope.forgotform.submitted = true;
        	if ($scope.forgotform.$invalid) {
				return false;
			}
       $scope.userdata={"email":$scope.forgot.email};
       //console.log(JSON.stringify($scope.userdata));
              $scope.infomessage="please wait ...";
              $scope.Showinfoalert = true;
             $http.post("https://anant-bajaj-dev.myridz.com/website/passwords",$scope.userdata).success(
                    function(result) {
                        //console.log(result);
                        $scope.forgot={};
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        //$('#forgotpassword').modal('toggle');
                        closeSidePanel();
                        $('#forgotpassword').modal('toggle');
                        $("#dialogWrapper").hide();
                        $scope.successmessage="Reset link sent to your Email ID";
                        $scope.Showsuccessalert = true;                         
                        $timeout(function() {$scope.Showsuccessalert = false;},3000);
                        $scope.forgotform.submitted = false;
                                
                    }).error(
                    function(err) {
                        $timeout(function() {$scope.Showinfoalert = false;},0);
                        //console.log(err);                         
                           if(err.errors){
                            $scope.forgot={};
                            $scope.Showerroralert2 = true;
                            $scope.errormessage=err.errors;
                            $timeout(function() {$scope.Showerroralert2 = false;},3000);
                            $scope.forgotform.submitted = false;
                           }
                        else{
                            $scope.forgot={};
                            $scope.Showerroralert2 = true;
                            $scope.errormessage="Something went wrong.Try again later";
                            $timeout(function() {$scope.Showerroralert2 = false;},3000);
                            $scope.forgotform.submitted = false;
                        } 
                       
                    })
	}
          	$scope.sendpricedetail=function(){
          $scope.pricelistemailform.submitted = true;
        	if ($scope.pricelistemailform.$invalid) {
				return false;
			}                      
            
                $scope.dataToSend = $scope.pricelist;
                //$scope.dataToSend = {};
                console.log(JSON.stringify($scope.dataToSend));
                //return false;
                $scope.infomessage="Please Wait ...";
                $scope.Showinfoalert1 = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/price_chart_pdf",$scope.dataToSend).success(
                    function(result) {
                        console.log(result);
                        $localStorage.anantpricelist=result;
                        $('#send_pricelist').modal('toggle');
                            //$scope.successmessage="Price quote sent to"+$scope.bikeprice.email+"!";
                            //$scope.Showsuccessalert = true;
                            $scope.pricelist={};
                            $scope.pricelistemailform.submitted = false;
                            //$timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert1 = false;},0);                            
                            $window.scrollTo(0, 0);
                            $location.path('pricelist');
                                               
                    }).error(
                    function(err) {
                        $('#send_pricelist').modal('toggle');
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showinfoalert1 = false;},0);
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);                       
                    })
        
    }
	var customeEventListener=$rootScope.$on('event:social-sign-in-success', function(event, userDetails){
           //console.log(userDetails);
           $scope.user = {};
           $localStorage.anantpaydueid="";

           $scope.user.name = userDetails.name;
            if(userDetails.email)
            {
              $scope.user.email = userDetails.email;
            }
            else
            {
              $scope.user.facebook_id = userDetails.uid;
            }
           $scope.user.facebook_id = userDetails.uid;
           $scope.user.social_login = 1;
           $scope.user.facebook_login = true;
           //$scope.user.dealer_brand = "KHT_Motors";
           $scope.user.provider = userDetails.provider;  
           $rootScope.userImage = userDetails.imageUrl;
           $scope.imageurl=userDetails.imageUrl;
           $localStorage.anantsocialdata = userDetails;
           $localStorage.anantissocial = 1;
           $localStorage.anantprovider = userDetails.provider;
           $localStorage.anantsocialimage = userDetails.imageUrl;
           //console.log($scope.user);

           $http.post("https://anant-bajaj-dev.myridz.com/website/users", JSON.stringify({"user": $scope.user}),{cache: true}).success(
           function(result) {      
               //console.log(result);
               $timeout(function() {$scope.Showinfoalert = false;},0);
               $scope.loginsession=false;
                        $scope.loginvalid=true;
                $scope.username=result.user.profile.full_name;
                        $localStorage.anantuserdata=result.user;
                        $localStorage.anantuserid=result.user.id;
                        $localStorage.anantusersession=result.user.authentication_token;
                        $localStorage.anantusername=result.user.profile.full_name;
                        $localStorage.anantusermail=result.user.profile.email;
                        $localStorage.anantprofileid=result.user.id;  
                        closeSidePanel();
                        hidemenulogin();
                        $("#dialogWrapper").hide();
               $scope.successmessage="Successfully Logged in.";
               $route.reload();
               if(!result.user.email)
                {
                  setTimeout(function() {
                    $location.path('updateprofile');
                  }, 1000);
                  
                }
               else if(result.user.sign_in_count==0){
                  setTimeout(function() {
                    $location.path('updateprofile');
                  }, 1000);
                  
                         }
               $scope.Showsuccessalert = true;                        
               $timeout(function() {$scope.Showsuccessalert = false;},3000);
                    var data={"user_id": $localStorage.anantuserid};
                    $http.post("https://anant-bajaj-dev.myridz.com/website/get_user_due_payments",data).success(
                    function(result) { 
                        //console.log(result);
                        var totalrecord=result.users; 
                        $scope.paymenttotal=totalrecord.length;
                        $localStorage.anantpayduecount=totalrecord.length;
                           if($localStorage.anantpage=="payment"){
    	                    if(totalrecord.length > 0){
                                $localStorage.anantpaymentpage="Payment Due";
                           $location.path('paymentdue');
                           }else{
                                $localStorage.anantpaymentpage="Make Payment";
                                $localStorage.anantpaydueid="";
                                $location.path('makepayment');	
                           }
                           }                        
                    }).error(
                    function(err) {
                         //$location.path('makepayment');	
                       
                    })
            }).error(
               function(err) {
                    $scope.loading = false;
                       if(err.errors){
                           $scope.errormessage=err.errors;
                           }
                        else{
                            $scope.errormessage="Something went wrong.Try again later";
                        }                                              
                        $scope.Showerroralert2 = true; 
                        $timeout(function() {$scope.Showerroralert2 = false;},3000);
            })
     })
      $scope.$on('$destroy', function() {
        customeEventListener();
  });
	
	$scope.scrollTo = function (id) {
		var old = $location.hash();
		$location.hash(id);
		$anchorScroll();
		$location.hash(old);
  	}
    
    
   /* Login code*/
    $scope.closeNav = function() {
		sideNavWidth.style.widthh = "0px";
		sideMenuOpen = true;
	};
	$scope.openNav = function() {
			if(sideMenuOpen == true){
				sideNavWidth.style.width = "250px";
				sideMenuOpen = false;
			}else if(sideMenuOpen == false){
				sideNavWidth.style.widthh = "0px";
				sideMenuOpen = true;
				//$scope.closeNav();
			}
	};
	
	$scope.closeLoginNav = function() {
		sideLoginNavWidth.style.widthh = "0px";
		sideLoginOpen = true;
	};
	$scope.openLoginNav = function(tabIndex) {
        //console.log(tabIndex);
         $("#dialogWrapper").show();
         $('html, body').css({overflow:'hidden',height: '100%'});
         $("#logincaret").hide();
         $('.carousel-indicators,#gallery_slider, #carousel .flex-direction-nav').css('opacity', '0.2');
         $(".se-pre-con").css("background","none");
		jQuery("#myTab li:eq("+tabIndex+") a").tab('show');
			if(sideLoginOpen == true){
				sideLoginNavWidth.style.width = "300px";
				sideLoginOpen = false;
			}else{
                $('html, body').css({overflow:'auto',height: 'auto'});
                $('.carousel-indicators,#gallery_slider,#carousel .flex-direction-nav').css('opacity', '1');
				$scope.closeLoginNav();
			}
	};
    	jQuery(document).ready(function(){
		 jQuery("body").click(function(e) {
			 //console.log(e.target.id);
			if (e.target.id == "mySidenav" || jQuery(e.target).parents("#mySidenav").size()) { 
				
			}else if(e.target.id == "loginNav" || jQuery(e.target).parents("#loginNav").size()){
				
				
			}else if(e.target.id == "menubutton"){
				 if(sideMenuOpen == false){
					sideNavWidth.style.width = "0px";
					sideMenuOpen = true;
				}else{
					sideNavWidth.style.width = "250px";
					sideMenuOpen = false;
				}
			}else if(e.target.id == "loginlink"){
				//$scope.openLoginNav(0);
			}else if(e.target.id == "registerlink"){
				//$scope.openLoginNav(1);
			} else {
                $("#dialogWrapper").hide();
				closeSidePanel();
				
			}
			 
			 
		});
		 
	 });
        	jQuery(document).ready(function(){
        $(window).on("resize", function () {
        var screen = $( window ).width();
            //console.log(screen);
            if(screen>766){                            
               $scope.logincss="loginnav";
            }
            else{
                $scope.logincss="sidenav";
            }
         }).resize();	
	 });

	
	
});
