angular.module('anantbajaj')
  .controller('aboutusctrl',function ($scope, $http,$window,$rootScope,$location,onlineStatus) {
    $("#hidenavbar").hide();
	//console.log('aboutus started');
	
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
    $scope.imagedata={};
    $scope.imagedata1={};
    $("#loading").show();
    $("#loading1").show();
      $scope.category="ANANT BAJAJ";
      $scope.changecontent = function(data){
        //if(data){$scope.tabtitle=data;}
            //console.log(data);
            $scope.classVar= data; 
            $scope.category=data;     
	}
      var imageurl=[];
           $scope.gallerydata = function(data){
            //console.log(data);
               $("#loading").show();
               $("#loading1").show();
               $scope.imgvar=data;
               imageurl=[];
               //$scope.imagedata={};
               var totaldata=$scope.imagedata1;
               //$scope.imagedata={};
               if(data=="all"){
                   $scope.imagedata=totaldata;
                   bikedetailinit();
               }else{                   
               for(var i=0;i<totaldata.length;i++){
                   //console.log(totaldata[i].category);
                   //console.log(data);
                   if(totaldata[i].category==data){
                       imageurl.push(totaldata[i]);
               }
                   
                  
                                 
	       }
                   
                   $scope.imagedata=imageurl;
                   //console.log(JSON.stringify($scope.imagedata[0]));
                   bikedetailinit(); 
               }
           }
      
          $http.get("https://anant-bajaj-dev.myridz.com/website/get_about_us_data").success(
                    function(result) {
                        //console.log(result);
                        $scope.imagedata1=result.about_us_pages;
                        $scope.imagedata=result.about_us_pages;
                        bikedetailinit();
                    }).error(
                    function(err) {
                         $scope.loading = false;                       
                    })
             function bikedetailinit(){
                  $('#galleryimage').css('display', 'none');
                  $('#galleryimage1').css('display', 'none');
                  setTimeout(function() {           
                  jQuery('.multiple-items1').slick('slickRemove');
                  //jQuery('.multiple-items1').slick('unslick');
                  jQuery(".multiple-items1").not('.slick-initialized').slick({
                  //jQuery('.multiple-items1').slick({
                      infinite: false,
                      slidesToShow: 4,
                      autoplay: false,
                      draggable:false,
                      slidesToScroll: 4,                                          
        prevArrow:"<button type='button' class='slick-prev pull-left arrowleft' style='left: -50px;top: 50%;'><img style='width: 35px;height: 35px;margin-top:-26px;' src='../images/home/Slider-left.png'></button>",
        nextArrow:"<button type='button' class='slick-next pull-right arrowright' style='right: -50px;top: 50%;'><img style='width: 35px;height: 35px;margin-top:-26px;' src='../images/home/Slider-right.png'></button>"
});
                  },1000);
                     setTimeout(function() {           
                  jQuery('.multiple-items2').slick('slickRemove');
                  //jQuery('.multiple-items1').slick('unslick');
                  jQuery(".multiple-items2").not('.slick-initialized').slick({
                  //jQuery('.multiple-items1').slick({
                      infinite: false,
                      slidesToShow: 1,
                      autoplay: false,
                      draggable:false,
                      slidesToScroll: 1,                                          
        prevArrow:"<button type='button' class='slick-prev pull-left arrowleft' style='left: -50px;top: 50%;'><img style='width: 35px;height: 35px;margin-top:-26px;' src='../images/home/Slider-left.png'></button>",
        nextArrow:"<button type='button' class='slick-next pull-right arrowright' style='right: -50px;top: 50%;'><img style='width: 35px;height: 35px;margin-top:-26px;' src='../images/home/Slider-right.png'></button>"
});
                  },1000);
                 setTimeout(function() {
                      $("#loading").hide();
                      $("#loading1").hide();
                      $('#galleryimage').css('display', 'block'); 
                      $('#galleryimage').get(0).slick.setPosition();
                      $('#galleryimage1').css('display', 'block'); 
                      $('#galleryimage1').get(0).slick.setPosition();
                 },1500);
            }
	
	
	
});