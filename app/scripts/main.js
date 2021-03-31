angular.module('anantbajaj')
  .controller('mainCtrl',function ($scope, $http,$rootScope,$timeout,$localStorage,$window,onlineStatus,$location) {

    $scope.offlinemode=true;
    $('.carousel-indicators').css('opacity', '.1');
    	    $scope.onlineStatus = onlineStatus;//onlineStatus
    $scope.$watch('onlineStatus.isOnline()', function(online) {
        $scope.online_status_string = online ? 'online' : 'offline';  

        if($scope.online_status_string == 'offline')
        {
            $window.scrollTo(0, 0);
            $scope.errormessage="Check your internet connection and try again..";
            $scope.Showerroralert = true; 
            $scope.offlinemode=false;
         
        }     
        if($scope.online_status_string == 'online')
        {            
            $scope.Showerroralert = false; 
            $scope.offlinemode=true;
        }

    });
    $scope.hideindicator=true;
    //$("#loading1").show();
    //$("#loading2").show();
    $("#newloader").css('background-image', "url(/images/loader-64x/Preloader_11.gif)");
    $("#newloader1").css('background-image', './images/loader-64x/Preloader_11.gif');
    var screendata=1;
     $scope.usedcar = function(){
        $localStorage.ananttabid=1;
		$location.path('usedcar');		
	}
      $scope.newcars = function(){
        $localStorage.ananttabid=1;
		$location.path('cars');		
	}
            	$scope.goToService = function(){
                    $localStorage.ktmmotornavid=1;
                    $localStorage.ananttabid=3;
		$location.path('services');		
	}
    $scope.goTotestdrive = function(data){
        $localStorage.ktmmotornavid=0;
        $localStorage.ananttabid=3;
		$location.path('testdrive');		
	}	
     $scope.goToinsurance = function(){
         $localStorage.ktmmotornavid=2;
         $localStorage.ananttabid=3;
		$location.path('insurance');		
	}	
      $scope.goToemicalculator = function(data){
          $localStorage.ktmmotornavid=3;
          $localStorage.ananttabid=3;
		$location.path('emicalculator');		
	}	
       $scope.goTopricequote = function(data){
           $localStorage.ktmmotornavid=4;
           $localStorage.ananttabid=3;
		$location.path('pricequote');		
	}	
        $scope.goTocontactus = function(data){
            $localStorage.ktmmotornavid=5;
            $localStorage.ananttabid=3;
		$location.path('contactus');		
	}	
         $scope.goTofeedback = function(data){
             $localStorage.ktmmotornavid=6;
             $localStorage.ananttabid=3;
		$location.path('feedback');		
	}
        $scope.goTopayment = function(data){	
		//$location.path('feedback');		
	}
        $scope.TestAngularMethod = function (bikeid,biketype) {
        $localStorage.anantcarid=bikeid;
        $localStorage.anantbiketype=biketype;
        $localStorage.anantbikecurrentpage="";
          $timeout(function() {           
              $location.path('bikedetail');
          },0);
		
        //alert('Hello you are calling angular js method.');
    }
             	$scope.goTobikedetail = function(bikeid,name){
        //console.log(bikeid);
        $localStorage.anantcarid=bikeid;
        $localStorage.anantbiketype=name;
        $localStorage.anantbikecurrentpage="";
		$location.path('bikedetail');		
	}
        $scope.bannerredirect=function(bikeid,biketype){
            if(bikeid){
                $localStorage.anantcarid=bikeid;
                $localStorage.anantbiketype=biketype;
                $localStorage.anantbikecurrentpage="";
                $location.path('bikedetail');
               }        	
                }
       $scope.bannerdata={};
       $scope.mobilebanner={};
       $scope.testimonialdata={};
       $scope.biketype={};
       $scope.poweredby="";
        $scope.number = 5;

              /*$scope.branddata={"brand":"KHT_Motors"};*/
                     //console.log($scope.branddata);
                $http.get("https://anant-bajaj-dev.myridz.com/website/web_banners").success(
                    function(result) {
                        //console.log(result);
                        $scope.hideindicator=false;
                        $scope.bannerdata=result.web_banners;
                        var count =(result.web_banners.length)-1;
                        $scope.getNumber = function() {
                            return new Array(count);   
                        }
                                                 
                    }).error(
                    function(err) {
                         $scope.loading = false;   
                    })
      $http.get("https://anant-bajaj-dev.myridz.com/website/banners").success(
                    function(result) {
                        //console.log(result);
                        $scope.mobilebanner=result.banners;
                        var count =(result.banners.length)-1;
                        $scope.getNumber1 = function() {
                            return new Array(count);   
                        }
                                                 
                    }).error(
                    function(err) {
                         $scope.loading = false;   
                    })
           $scope.bikedata={};
           $scope.bikemodeldata={};
                    $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.hideindicator=false;
                        $scope.bikedata=result.bikes;                        
                            var bikedata=result.bikes
                            //$scope.classVar= bikedata[0].bike_type; 
                            $scope.classVar= "ALL"; 
                        var bikemodel=['ALL'];
                        for (i = 0; i < bikedata.length; i++) {
                        if (bikemodel.indexOf(bikedata[i].bike_type) == -1) {
                            bikemodel.push(bikedata[i].bike_type);
                        }
                        }
                        //console.log(JSON.stringify(bikemodel));
                        $scope.biketype=bikemodel;
                        
                /*         var bikefilterdata=[];
                 for (i = 0; i < bikedata.length; i++) {
                     if (bikedata[i].bike_type == bikedata[0].bike_type) {
                         bikefilterdata.push(bikedata[i]);
                        }
                        }*/
                //console.log(bikefilterdata);
                        //$scope.bikemodeldata=bikefilterdata;
                        $scope.bikemodeldata=result.bikes;
                        reloaddata();
                        initSlider();
                        biketypeinit();
                        bikedetailinit();
                    }).error(
                    function(err) {
                         //$location.path('makepayment');	
                    })
        $http.get("https://anant-bajaj-dev.myridz.com/website/get_all_testmonial").success(
                    function(result) {
                        //console.log(result);
                        var testarray=[];
                        for(var i=0;i<result.testmonials.length;i++){
                            if(result.testmonials[i].visible==true){
                                var data=result.testmonials[i];
                                testarray.push(data);
                               }
                        }
                        $scope.testimonialdata=testarray;
                                                 
                    }).error(
                    function(err) {
                         $scope.loading = false;   
                    })

	$scope.testimonial = function(){
		$location.path("testimonial");
	}
    //$scope.view.toShow = 'vids';
$scope.getbikename = function(name){
    //$("#loading1").show();
    //$("#loading2").show();
    $("#newloader").css('background-image', "url(/images/loader-64x/Preloader_11.gif)");
    $("#newloader1").css('background-image', "url(/images/loader-64x/Preloader_11.gif)");
    if(name !="ALL"){
       $scope.classVar= name; 
       }else{
       $scope.classVar= "ALL"; 
       }
    
    //console.log(name);
    $scope.bikemodeldata={};
                 var bikedata= $scope.bikedata;
                 var bikefilterdata=[];
                if(name !="ALL"){
                 for (i = 0; i < bikedata.length; i++) {
                     if (bikedata[i].bike_type == name) {
                         bikefilterdata.push(bikedata[i]);
                        }
                        }
                //console.log(bikefilterdata);
                $scope.bikemodeldata=bikefilterdata;
                }else{
                    $scope.bikemodeldata=$scope.bikedata;
                }
                if(bikefilterdata.length==1){
                   screendata=1;
                   }
                reloaddata();
    initSlider();
    //biketypeinit();
    bikedetailinit();
	}

    

        
        $scope.view = {};
        $scope.allMedia = {};
        var links = [], happyCust = [], s3images = [];
        var masterYoutubetemp = [];
        $scope.mdVariable = {};
        $scope.increamented = {};
        $scope.mdVariable = this;
        $scope.mdVariable.cruise = $scope.masterData;
        $scope.mdVariable.limit = 1;
        $scope.linksData = {};
        $scope.happyCustData = {};
        $scope.photosData = {};
        $scope.masterYoutube = [];
        var domElement = '';
        $scope.brand = {
            "dealer_brand": "KHT_Motors"
        };

        domElement = document.getElementById("vidTab");
        domElement.classList.add("tabActivee");
        $scope.view.toShow = 'vids';

        $scope.getClick = function(value) {
            //console.log(value);
            var domElement = '';
            /*domElement = document.getElementById("allTab");
            domElement.classList.remove("tabActivee");*/
            /*domElement = document.getElementById("picTab");
            domElement.classList.remove("tabActivee");*/
            domElement = document.getElementById("vidTab");
            domElement.classList.remove("tabActivee");
            domElement = document.getElementById("hapCustTab");
            domElement.classList.remove("tabActivee");
            switch(value) 
            {

                case 0:
                    domElement = document.getElementById("allTab");
                    domElement.classList.add("tabActivee");
                    $scope.view.toShow = 'all';
                    break;
                case 1:
                    domElement = document.getElementById("picTab");
                    domElement.classList.add("tabActivee");
                    $scope.view.toShow = 'pics';
                    break;
                case 2:
                    domElement = document.getElementById("vidTab");
                    domElement.classList.add("tabActivee");
                    $scope.view.toShow = 'vids';
                    break;
                case 3:
                    domElement = document.getElementById("hapCustTab");
                    domElement.classList.add("tabActivee");
                    $scope.view.toShow = 'hapCust';
                    break;
                default:
                    domElement = document.getElementById("allTab");
                    domElement.classList.add("tabActivee");
                    $scope.view.toShow = 'all';
            } 
        }


        $scope.changeVideo = function(vid,rowid) {
            ////console.log(JSON.stringify(vid.items[0].id.videoId));
            $scope.videoView = "https://www.youtube.com/embed/" + vid.items[0].id.videoId;
            $scope.poweredby=$scope.youtubetoshow[rowid].powered_by;
        }

        
        $http.get("https://anant-bajaj-dev.myridz.com/web/customer_galleries").success(
            function(result) 
            {
                //console.log(result);
                $scope.allMedia = result.customer_galleries;
                angular.forEach($scope.allMedia, function(value, key) {
                    ////console.log(value);
                    if (value.video_url) {
                        links.push(value);
                    }
                });

                angular.forEach($scope.allMedia, function(value, key) {
                    if (value.image.url) {
                        var x = '';
                        x = "https://anant-bajaj-dev.myridz.com" + value.image.url
                        happyCust.push({
                            'image': x
                        });
                    }
                });

                angular.forEach($scope.allMedia.s3_links, function(value, key) {
                    if (value.s3) {
                        s3images.push({
                            'image': value.s3
                        });
                    }
                });
                //console.log(links);
                //console.log(happyCust);
                $scope.youtube = links;                
                $scope.youtubetoshow = $scope.youtube;
                //console.log($scope.youtubetoshow);
                $scope.videoView = $scope.youtubetoshow[0].video_url;
                $scope.poweredby=$scope.youtubetoshow[0].powered_by;
                $scope.happyCustData = happyCust;
                divideGalleryagain($scope.happyCustData);
                $scope.photosData = s3images;
                divideGallery($scope.photosData);
                if ($scope.youtube.length > 0) {
                    angular.forEach($scope.youtube, function(value, key) {
                        //console.log(value);
                        var link = value.video_url.split("/");
                        var videoId = link[link.length - 1];
                        $http.get("https://www.googleapis.com/youtube/v3/search", {
                            params: {
                                key: "AIzaSyBYWsf-3NOYaO4smFooZSUEo3IR4uoyGlQ",
                                type: 'video',
                                part: 'id,snippet',
                                q: videoId
                            }
                        }).success(
                            function(result) {
                                //console.log(result);
                                masterYoutubetemp.push(result);
                            }).error(
                            function(err) {
                                 console.log(err);
                                $scope.loading = false;
                            })
                    });
                    $scope.masterYoutube = masterYoutubetemp;
                }

          
            }).error(
            function(err) {
                $scope.loading = false;
            })


            function divideGallery(data)
            {
                $scope.masterDataPics = {};
                $scope.masterDataLengthPics = 0;
                $scope.dataToShowPics = {};
                var arraysPics = [], sizePics = 8;
                while (data.length > 0){
                    arraysPics.push(data.splice(0, sizePics));
                }
                $scope.masterDataPics = arraysPics;
                $scope.masterDataLengthPics = $scope.masterDataPics.length;
                $scope.dataToShowPics = $scope.masterDataPics[0];
            }


            function divideGalleryagain(data)
            {
                $scope.masterData = {};
                $scope.masterDataLength = 0;
                $scope.dataToShow = {};
                var arrays = [], size = 8;
                while (data.length > 0){
                    arrays.push(data.splice(0, size));
                }
                $scope.masterData = arrays;
                $scope.masterDataLength = $scope.masterData.length;
                $scope.dataToShow = $scope.masterData[0];
            }

            

            $scope.loadMorehc = function() {
              $scope.increamented = $scope.mdVariable.limit + 1;
              $scope.mdVariable.limit = $scope.increamented > $scope.masterData.length ? $scope.masterData.length : $scope.increamented;
            };

            $scope.openModalCDImages = function(data, index) 
            {
                //console.log(index);
                $scope.imageList = data;
                $scope.imageIndex = index;
                setTimeout(function() {
                    $("#bannerCarousell").carousel(index);
                }, 100);
            }
             function initSlider(){
                  $('#bikemobile_gallery').css('display', 'none');
               setTimeout(function() {
               jQuery('.slider-nav').slick('slickRemove');
               jQuery('.slider-nav').slick('unslick');
                   //terminates (only run if slick is initialized)
               jQuery('.slider-nav').slick({
                  slidesToShow: screendata,
                  slidesToScroll: 1,
                  /*asNavFor: '.slider-for',*/
                  dots: false,
                  infinite: false,
                  arrows: false,
                  centerMode: true,
                  focusOnSelect: true
                });
  
                }, 100);
                       setTimeout(function() {
                      //$("#loading2").hide();
                      $("#newloader1").css('background-image', 'none');
                      $('#bikemobile_gallery').css('display', 'block'); 
                      $('.slider-nav').get(0).slick.setPosition();
                 },800);
             }
            function biketypeinit(){
                  setTimeout(function() {
                  jQuery('.multiple-items').slick('slickRemove');
                  jQuery('.multiple-items').slick('unslick');
                  jQuery('.multiple-items').slick({
                      infinite: false,
                      slidesToShow: 3,
                      autoplay: false,
                      draggable:false,
                      slidesToScroll: 3,
                       prevArrow:"<button type='button' class='slick-prev pull-left arrowleft' style='left: -30px;'><img style='width: 16px;height: 24px;margin-top:-10px;' src='../images/home/arrowleft.png'></button>",
        nextArrow:"<button type='button' class='slick-next pull-right arrowright' style='right: -30px;'><img style='width: 16px;height: 24px;margin-top:-10px;' src='../images/home/arrowright.png'></button>"
                    });    
                  },0);
            }
              function bikedetailinit(){
                  $('#bikegallery').css('display', 'none');
                  setTimeout(function() {           
                  jQuery('.autoplay').slick('slickRemove');
                  jQuery('.autoplay').slick('unslick');
                  jQuery('.autoplay').slick({
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: false,
                  autoplay: false,
                  autoplaySpeed: 2000,                                              
        prevArrow:"<button type='button' class='slick-prev pull-left arrowleft' style='left: -50px;top: 50%;'><img style='width: 45px;height: 45px;margin-top:-26px;' src='../images/home/Slider-left.png'></button>",
        nextArrow:"<button type='button' class='slick-next pull-right arrowright' style='right: -50px;top: 50%;'><img style='width: 45px;height: 45px;margin-top:-26px;' src='../images/home/Slider-right.png'></button>"
});
                  },0);
                       setTimeout(function() {
                      //$("#loading1").hide();
                      $("#newloader").css('background-image', 'none');
                      $('#bikegallery').css('display', 'block'); 
                      $('#bikegallery').get(0).slick.setPosition();
                 },500);
            }
              	jQuery(document).ready(function(){
	
 jQuery('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav',
	 autoplay: false
});
jQuery('.slider-nav').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  /*asNavFor: '.slider-for',*/
  arrows: false,
  infinite: false,
  dots: false,
  centerMode: true,
  focusOnSelect: true

});
          jQuery('.multiple-items').slick({
                      infinite: false,
                      slidesToShow: 3,
                      autoplay: false,
                      draggable:false,
                      slidesToScroll: 3
                    });
                    jQuery('.autoplay').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  autoplaySpeed: 2000,
});
      /*              jQuery(window).on("resize", function () {
                    var screen = $( window ).width();
                        console.log(screen);
                        if(screen>600 && screen<768){                            
                           screendata=2;
                            initSlider();
                           }
});*/
        $(window).on("resize", function () {
        var screen = $( window ).width();
            //console.log(screen);
            if(screen>600 && screen<768){                            
               screendata=2;
                initSlider();
            }
            else{
                screendata=1;
            }
         }).resize();	
	 });
	
})


.directive('myDirective', function() {

    return {
        link: function(scope, element, attributes) {
            element.contents().find('html').bind('click', function() {
                alert("hello");
            });
        }
    };
})

.filter("trustUrl", function($sce) {
    return function(Url) {
        return $sce.trustAsResourceUrl(Url);
    };
});
