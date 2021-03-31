angular.module('anantbajaj')
  .controller('bikedetailctrl',function ($scope, $http,$rootScope,$localStorage,$window,$route,onlineStatus,$timeout,$rootScope,$location) {
 $http.defaults.headers.common['X-USER-TOKEN']= $localStorage.anantusersession;
	$http.defaults.headers.common['X-USER-EMAIL']= $localStorage.anantusermail; 
    $scope.cardata={};
    $scope.dataToSend={};
    $scope.typename="";
    $scope.transmission="";
    $scope.fuel="";
    $scope.variantdata={};
    $scope.defaultimageurl="";
    $scope.bikeprice={};
    $scope.gallerydata=={};
    $scope.tab=0;
     $scope.showvariantcompare=0;
     $scope.allGalleryImages = {};
    $scope.interior = {};
    $scope.exterior = {};
    $scope.slideContent={};
    $scope.bikemodel={};
    $scope.specificationdata={};
    $scope.showroomdata={};
    $scope.featuredata={};
    $scope.featurelist={};
    $scope.cardefaultimg='';
    $scope.variantpricedata={};
    $scope.bikename={};
    $scope.data360={};
    $scope.totaldata360={};
    $scope.initialcolor="";
    $scope.noimage=false;
    var mobileview=0;
    if($localStorage.anantbikecurrentpage){
           $scope.category=$localStorage.anantbikecurrentpage;
           $scope.classVar= $localStorage.anantbikecurrentpage; 
       }else{
           $scope.category="OVERVIEW";
           $scope.classVar= 'OVERVIEW'; 
       }
    
    $scope.colorname="";
    $scope.loadimg=true;
    $scope.categ="All Variants";
    $window.scrollTo(0, 0);
    /* Bike 360 image initialize*/
        var i;
      $scope.imageList1 = [];
      for( i=1; i>0; i-- ){
        $scope.imageList1.push( 'images1/' + i + '.png' );
      }
      /*$scope.animateThreeSixty = function() {
        $scope.$broadcast('threesixty-animate', 60);
      };*/
     /* End Bike 360 image initialize*/
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
      $scope.downloadbrochure=function(url){
           //console.log(url);
              if(url){
              window.open(url);
              }
          }
        $scope.gototestdrive=function(name){
          $localStorage.anantcartestdrive=name;
          $location.path('testdrive');  
            $window.scrollTo(0, 0);
          }
            $scope.emicalculator=function(name){
          $localStorage.anantcaremibikename=name;
          $location.path('emicalculator');     
          }
                       $scope.gotopayment = function(){	
		     if($localStorage.anantuserid){
              $localStorage.anantpaydueid="";
              $localStorage.anantpaymentpage="";
              $location.path('makepayment');
              $window.scrollTo(0, 0);
              $route.reload();
              }else{
                  $window.scrollTo(0, 0);
                  $localStorage.anantpage="payment";
                  //logintab();
                  $scope.infomessage="Login to Make payment!";
                  $scope.Showinfoalert = true;
                  $timeout(function() {$scope.Showinfoalert = false;},5000);    
              }	
	}

    $scope.newcars = function(){        
        $location.path('cars');     
    }
        $scope.gotohomepage = function(){        
        $location.path('main');     
    }
        $scope.biketype=$localStorage.anantbiketype;
        $scope.bikenameid=parseInt($localStorage.anantcarid);
        
        $scope.changecardata=function(){
            //console.log($scope.bikename);
            $localStorage.anantcarid=$scope.bikename;
            //return false;
            $scope.variantcompare={};
            $scope.loadbikedetail();
        }
        $scope.comparemodel={};
        $scope.bikecomparelist=function(getid){
            var sendid;
            if(getid){
               sendid=getid;
               }else{
                  sendid=$scope.bikename; 
               }
            var bikeidlist={"id":parseInt(sendid)}
                $http.post("https://anant-bajaj-dev.myridz.com/website/compare_data",bikeidlist).success(
                    function(result) {
                        //console.log(result);
                        $scope.comparemodel=result.bikes;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
        }
                     $http.get("https://anant-bajaj-dev.myridz.com/website/bikes").success(
                    function(result) {
                        //console.log(result);
                        $scope.bikemodel=result.bikes;
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
      
     $scope.dataToSend.id = $localStorage.anantcarid;
    $scope.maxpower="";
    $scope.powertorque="";
    $scope.bikecolorfirst="";
    $scope.bikeidset="";
    $scope.brochureurl="";
    //console.log($scope.dataToSend);
     $scope.loadbikedetail=function()
        {
         //console.log($localStorage.anantcarid);
              $http.get("https://anant-bajaj-dev.myridz.com/website/bikes/"+$localStorage.anantcarid).success(
                    function(result) {
                        $scope.loadimg=false;
                        console.log(result);
                        $scope.cardata=result; 
                        $scope.bikeidset=result.id;
                        $scope.bikecomparelist(result.id);
                        $scope.cardetails=result;
                        $scope.brochureurl=result.bike_brochure_url;
                        $scope.variantpricedata=result.price;
                        $scope.defaultimageurl=result.default_bike_data.image_url;
                        $scope.bikecolorfirst=result.bike_colors[0].color;
                        console.log("$scope.bikecolorfirst",$scope.bikecolorfirst);
                        $scope.totaldata360=result.model_full_images;
                        colorchangeinit($scope.bikecolorfirst);
                        if(result.model_full_images[0])
                        {
                            $scope.data360=result.model_full_images[0].image;
                            $scope.initialcolor=result.model_full_images[0].color_name;
                        }
                        else if(!result.model_full_images[0])
                        {
                            $scope.data360=result.model_full_images[1].image;
                            $scope.initialcolor=result.model_full_images[1].color_name;
                        }
                        

                        var specdata=result.specifications;
                         for(var i=0;i<specdata.length;i++){
                             if(specdata[i].specification_type=="Engine"){
                                 var specvalue=specdata[i].values;
                                 for(var j=0;j<specvalue.length;j++){
                                     if(specvalue[j].specifi_name=="Engine Max Power (PS @ RPM)"){
                                         $scope.maxpower=specvalue[j].value;
                                     }
                                     if(specvalue[j].specifi_name=="Engine Max Torque (Nm @RPM)"){
                                         $scope.powertorque=specvalue[j].value;
                                     }
                                 }
                                }
                             
                         }
                        //$scope.transmission=(result.car.car_details[0].transmission).join(" / ");
                        //$scope.fuel=(result.car.car_details[0].fuel_types).join(" / ");
                        //$scope.variantdata=result.car.variants;
                        //$scope.variantdatafilter=result.car.variants;
                        $scope.bikevariantdata=result.bike_varients;
                        $scope.gallerydata=result.bike_gallery[0];
                        //console.log($scope.gallerydata);
                        $scope.specificationdata=result.specifications;
                        $scope.featurelist=result.key_features[0];
                         var count =(result.key_features[0].values.length);
                        $('.carousel-indicators .active').removeClass('active')
                        $("#sidebar-carousel-1 .carousel-indicators li:first").addClass("active");
                        $("#sidebar-carousel-1 .carousel-inner .item:first").addClass("active");
                        $scope.getNumber = function() {
                            return new Array(count);   
                        }
                        //console.log($scope.featurelist);
                        //$scope.sortGalleryImages($scope.gallerydata); 
                        $scope.sortColorImages(result.bike_colors); 
                        //$scope.variantsMenu(result.car.variants);
                        //load360data($scope.data360);
                        videodata();

                        
                        //////console.log(JSON.stringify($scope.variantdata));
                      
                    }).error(
                    function(err) {
                        $scope.loadimg=false;
                         $scope.loading = false;
                       
                    })
}
      function load360data(imagedata){       
          //console.log(imagedata);
          $scope.imageList1 = [];
            for(var i=imagedata.length; i>0; i-- ){
                if(imagedata[i]){
            $scope.imageList1.push(imagedata[i]);
             }
      }
     }
     $scope.loadbikedetail();
         var tempvariantsMenutransmission = [];
     var tempvariantsMenufueltype = [];
     $scope.variantsMenu = function(allvariants)
     {
        $scope.data = allvariants;
        angular.forEach($scope.data, function (key, value) 
        {          
        if (isInArray(key.variant.transmission_type, tempvariantsMenutransmission) == false) {
                            tempvariantsMenutransmission.push(key.variant.transmission_type);
                        }  
       if (isInArray1(key.variant.fuel_type, tempvariantsMenufueltype) == false) {
                            tempvariantsMenufueltype.push(key.variant.fuel_type);
                        }
        });
        $scope.finaltransmission = tempvariantsMenutransmission;
         //console.log($scope.finaltransmission);
        $scope.finalfueltype = tempvariantsMenufueltype;
         //console.log($scope.finalfueltype);

     }
               	function isInArray(value, array) {
            return array.indexOf(value) > -1;
        } 
         	function isInArray1(value, array) {
            return array.indexOf(value) > -1;
        } 
      var temptransmissionlist = [];
     var tempfuel_typeList = [];
     $scope.filter = function(tOrF, category)
     {
          //console.log(category);
         if(tOrF=="a"){
            $scope.categ="All Variants";
            }
         else{
             $scope.categ=category;
         }
         temptransmissionlist = [];
         tempfuel_typeList = [];
        
        $scope.variantfilterdata = $scope.variantdatafilter;
         //console.log($scope.variantfilterdata);
        //$scope.variantdata = {};    
        angular.forEach($scope.variantfilterdata, function (key, value) 
        {
            if(tOrF == 'tr')
            {
                //console.log("inside");
                if(key.variant.transmission_type == category)
                {
                    temptransmissionlist.push(key)
                }                
                $scope.variantdata = temptransmissionlist;
                //console.log($scope.variantdata);
            }
            else if(tOrF == 'fu')
            {
                if(key.variant.fuel_type == category)
                {
                    tempfuel_typeList.push(key)
                }                
                $scope.variantdata = tempfuel_typeList;
                //console.log($scope.variantdata);
            }
            else
            {                
                $scope.variantdata = $scope.variantdatafilter;
                //console.log($scope.variantdata);
            }   
        });
     }

     $scope.gallerytype=function(data){
         //console.log(data);
        if(data=="INTERIOR"){
            $scope.slideContent = $scope.interior;
            //console.log($scope.slideContent);
           }
         else if(data=="EXTERIOR"){
                 $scope.slideContent = $scope.exterior;
             //console.log($scope.slideContent);
                }
         else{
             $scope.slideContent = $scope.interior;
             //console.log($scope.slideContent);
         }
        
    }
     $scope.bikeid={};
         $scope.variantcompare={};
    var bikeid=[];
     $scope.$watch(function() {
         //console.log('in');
         bikeid = [];
        return $scope.variantcompare.ids;
    }, function(value) {
         bikeid = [];
         var defaultid=parseInt($localStorage.anantcarid);
         bikeid.push(defaultid);
        angular.forEach($scope.variantcompare.ids, function(v, k) {
            //console.log(v);
            //console.log(k);
            if(v==true){
                bikeid.push(parseInt(k));
                
        }
        });   
         variantcomparedata()
    }, true);
    function variantcomparedata(){
        $rootScope.query = bikeid;
        //console.log(bikeid);        
        $scope.bikeid=bikeid;
        if($scope.bikeid.length>2 && mobileview==1){
             //$window.scrollTo(0, 0);
              $scope.successmessage="Sorry, Maximum 2 Bike can be compared!";
              $scope.Showsuccessalert = true;
              $timeout(function() {$scope.Showsuccessalert = false;},3000);
             return false;           
           }else if($scope.bikeid.length>3){
              //$window.scrollTo(0, 0);
              $scope.successmessage="Sorry, Maximum 3 Bike can be compared!";
              $scope.Showsuccessalert = true;
              $timeout(function() {$scope.Showsuccessalert = false;},3000);
             return false;
         }
           else if($scope.bikeid.length>=2){
             $scope.showvariantcompare=1;
             //$window.scrollTo(0, 0);
         }
        //$scope.variantdataval=carimage;        
        //$location.path('carcompare'); 
        
    }
   /*    $scope.variantclose= function(carid){
        //console.log(carid);
           delete $scope.variantcompare.ids[carid];
          //$('#var'+carid).attr('checked', false); 
          var filtered = $scope.carid.filter(function(item) { 
              //console.log(item);
              var varid=parseInt(item.variant_id);
        return varid !== carid;  
        });      
            var filtered1 = $scope.variantdataval.filter(function(item1) { 
              //console.log(item1);
              var varid=parseInt(item1.variant_id);
        return varid !== carid;  
        });   
           //console.log(filtered);
          $scope.carid=filtered;
           //console.log(filtered1);
           $scope.variantdataval=filtered1

    }*/
         $scope.bikecomparedetail =function() {
        //console.log($scope.bikeid);
           if($scope.bikeid.length<2){
               $scope.successmessage="Minimum Bike should be two!";
               $scope.Showsuccessalert = true;
               $timeout(function() {$scope.Showsuccessalert = false;},2000);
              }
             else if($scope.bikeid.length>2 && mobileview==1){
             //$window.scrollTo(0, 0);
              $scope.successmessage="Sorry, Maximum 2 Bike can be compared!";
              $scope.Showsuccessalert = true;
              $timeout(function() {$scope.Showsuccessalert = false;},3000);
             return false;           
           }
           else if($scope.bikeid.length>3){
                    $scope.successmessage="Sorry, Maximum 3 Bike can be compared!";
               $scope.Showsuccessalert = true;
               $timeout(function() {$scope.Showsuccessalert = false;},2000);
                   }
           else{
               //console.log($scope.bikeid);
               $localStorage.anantcompareid=$scope.bikeid;
                  if(mobileview==0){
                     $location.path('bikecompare'); 
                  }else{
                     $location.path('mobilecompare'); 
                  }
           }
        	
    };
    //$scope.classVar= 'OVERVIEW'; 
      $scope.goToverview = function(data){
        //if(data){$scope.tabtitle=data;}
            $localStorage.anantbikecurrentpage=data;
            //console.log(data);
            $scope.classVar= data; 
            $scope.category=data;     
	}	
        $scope.goTogallery = function(data){
            //console.log(data);
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
            $scope.category=data;		
	}	
        $scope.goTocolors = function(data){
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
            $scope.category=data;	
	}	
           $scope.goTovideos = function(data){
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
            $scope.category=data;	
	}	
        $scope.goTovariants = function(data){
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
		    $scope.category=data;	
	}	
             $scope.goTocompare = function(data){
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
		    $scope.category=data;	
	}	
        $scope.goTospecification = function(data){
            $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
		    $scope.category=data;		
	}	
             $scope.goToFeatures = function(data){
             $localStorage.anantbikecurrentpage=data;
            $scope.classVar= data; 
		    $scope.category=data;		
	}
             var pricedata=[];
        $scope.showroomprice= function(name){
            pricedata=[];           
              for (var i = 0; i < $scope.variantpricedata.length; i++) {
                  if($scope.variantpricedata[i].price_field_values[0].varient_name==name){
                     //console.log($scope.variantpricedata[i]);
                      pricedata.push($scope.variantpricedata[i]);
                     }
        }            
           $scope.showroomdata=pricedata;
           $("#showroom_price").modal();
        }
          $scope.featureshowcase= function(detail){
            ////console.log(detail);
              $scope.featuredata=detail;
              $("#feature_show").modal();
        }
	   if($localStorage.anantusersession && $localStorage.anantuserid){
         //console.log($localStorage.anantuserdata);
            $scope.bikeprice.user_id=$localStorage.anantuserid;         
            $scope.bikeprice.name = $localStorage.anantuserdata.profile.full_name;
            $scope.bikeprice.email = $localStorage.anantuserdata.profile.email;
            $scope.bikeprice.mobile = parseInt($localStorage.anantuserdata.profile.mobile);
             }
	$scope.sendpricedetail=function(){
          $scope.bikepricequote.submitted = true;
        	if ($scope.bikepricequote.$invalid) {
				return false;
			}                      
            
                $scope.dataToSend = $scope.bikeprice;
                //console.log(JSON.stringify($scope.dataToSend));
                $scope.infomessage="Requesting Price Quote, please wait!";
                $scope.Showinfoalert1 = true;
                $window.scrollTo(0, 0);
                $http.post("https://anant-bajaj-dev.myridz.com/website/email_price",$scope.dataToSend).success(
                    function(result) {
                        //console.log(result);
                        $('#send_price').modal('toggle');
                            $scope.successmessage="Price quote sent to"+$scope.bikeprice.email+"!";
                            $scope.Showsuccessalert = true;
                            $scope.bikeprice={};
                            $scope.bikepricequote.submitted = false;
                            $timeout(function() {$scope.Showsuccessalert = false;},3000);
                            $timeout(function() {$scope.Showinfoalert1 = false;},0);                            
                            $window.scrollTo(0, 0);
                                               
                    }).error(
                    function(err) {
                        $('#send_price').modal('toggle');
                         $scope.errormessage="Something went wrong.Try again later";
                            $scope.Showerroralert = true; 
                            $timeout(function() {$scope.Showinfoalert1 = false;},0);
                            $timeout(function() {$scope.Showerroralert = false;},3000);
                            $window.scrollTo(0, 0);                       
                    })
        
    }
       var tempImageListInterior = [];
     var tempImageListExterior = [];
/*     $scope.sortGalleryImages = function(allGalleryImages)
     {
        $scope.images = allGalleryImages;
        var tempImageList = [];
        $scope.imageList = {};
        var imgLength = $scope.images[0].image_url.length;
        for (var i = 0; i < imgLength; i++) 
        {
            tempImageList.push({
              'image':$scope.images[0].image_url[i], 'category':$scope.images[0].diff_int_ext[i].category
            })
        }
        $scope.imageList = tempImageList;
        angular.forEach($scope.imageList, function (key, value) 
        {
            if(key.category == "Interior" || key.category == "interior")
            {
                tempImageListInterior.push({
                  'image':key.image, 'category':key.category
                })
            }
            else if(key.category == "Exterior" || key.category == "exterior")
            {
                tempImageListExterior.push({
                  'image':key.image, 'category':key.category
                })
            }
        });
        $scope.interior = tempImageListInterior;
         //console.log($scope.interior);
        $scope.exterior = tempImageListExterior;
          //console.log($scope.exterior);
         $scope.slideContent = $scope.exterior;
    
        

     };*/
     var tempColorList = [];
     $scope.web_colors = {};
     $scope.initialImage = {};
       $scope.sortColorImages = function(colorData)
     {
        tempColorList = [];
        $scope.webColors = colorData;
        var numOfColors = $scope.webColors.length;
        $scope.initialImage =  $scope.webColors[0].image;
        for (var i = 0; i < numOfColors; i++) {
          tempColorList.push({
              'colorImage':$scope.webColors[i].image,
              'colorPalletImage':$scope.webColors[i].color_pallet_s3,
              'colorName':$scope.webColors[i].color
              
            })
        }
        $scope.web_colors = tempColorList;           
           $scope.colorval=tempColorList[0].colorName;
              if($scope.initialcolor){
              $scope.colorname=$scope.initialcolor;
              }else{
                  $scope.colorname=tempColorList[0].colorName;
              }
           
     }
           function colorchangeinit(colorData){
              /*console.log($scope.totaldata360);
              console.log(colorData);*/
              $scope.colorname=colorData;
              for(var j=0;j<$scope.totaldata360.length;j++){
                  if($scope.totaldata360[j]){
              if($scope.totaldata360[j].color_name==colorData){
              var imagedata=$scope.totaldata360[j].image;
              }
              }
                    }
              $scope.imageList1 = [];
            for(var i=imagedata.length; i>0; i-- ){
                if(imagedata[i]){
            $scope.imageList1.push(imagedata[i]);
             }
                console.log($scope.imageList1);
      }
       }
          $scope.changeColor = function(colorData)
     {
              /*//console.log($scope.totaldata360);
              console.log(colorData);*/
              $scope.colorname=colorData;
              for(var j=0;j<$scope.totaldata360.length;j++){
                  if($scope.totaldata360[j]){
              if($scope.totaldata360[j].color_name==colorData){
              var imagedata=$scope.totaldata360[j].image;
              }
              }
                    }
              $scope.imageList1 = [];
                if(typeof(imagedata)=='undefined'){
                     $scope.noimage=true;
                     return false;
                 }else{
                     $scope.noimage=false;
                 }
            for(var i=imagedata.length; i>0; i-- ){
                if(imagedata[i]){
            $scope.imageList1.push(imagedata[i]);
            console.log($scope.imageList1);
             }
      }
              //console.log($scope.imageList1);
              /*$scope.colorval=colorData.colorName;
              console.log(colorData);              
              $scope.colorname=colorData.colorName;
        $scope.initialImage = colorData.colorImage;*/
     }
              $scope.changeVideo = function(vid) {
            //console.log(JSON.stringify(vid.items[0].id.videoId));
            $scope.videoView = "https://www.youtube.com/embed/" + vid.items[0].id.videoId;
        }
        $scope.view = {};
        $scope.allMedia = {};
        var links = [];
        var masterYoutubetemp = [];
        $scope.mdVariable = {};
        $scope.increamented = {};
        $scope.mdVariable = this;
        $scope.mdVariable.cruise = $scope.masterData;
        $scope.mdVariable.limit = 1;
        $scope.linksData = {};   
        $scope.masterYoutube = [];
        var domElement = '';
    
        function videodata(){            
        if($scope.cardata){
                $scope.allMedia = $scope.cardata.video_url;
                angular.forEach($scope.allMedia, function(value, key) {
                  if(value){ 
                    if(value.video_url) {
                        links.push(value);
                    }
                      }
                });
                console.log(links[0])
                if(links[0]!=null){
                  $scope.youtube = links[0].video_url;                  
                }

                
                $scope.youtubetoshow = $scope.youtube;
                $scope.videoView = $scope.youtubetoshow[0];  
                if ($scope.youtube.length > 0) {
                    angular.forEach($scope.youtube, function(value, key) {
                        var link = value.split("/");
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
                                masterYoutubetemp.push(result);
                            }).error(
                            function(err) {
                                 console.log(err);
                                $scope.loading = false;
                            })
                    });
                    $scope.masterYoutube = masterYoutubetemp;
                }
            }
        }
             	jQuery(document).ready(function(){
	
        $(window).on("resize", function () {
        var screen = $( window ).width();
            if(screen>0 && screen<768){                            
               mobileview=1;
            }
            else{
                mobileview=0;
            }
         }).resize();	
	 });

	
	
});