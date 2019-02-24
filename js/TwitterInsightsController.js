app.controller('TwitterInsightsController', ['$scope','$http','$location','$timeout',
 function($scope,$http,$location,$timeout) {

    $scope.hashtags = [];
     
    // Read data and get hashtags
    $http.get("data/insightsData.json").then(function(response) {
        // First function handles success
        var data = response.data;
        // console.log("data ok");
        
        $scope.hashtags = [];

        var index = 0;
        var item = {};
        
        // Preparing hashtags object from json data
        // Every hashtag has 6 fields, each one contains one emotion
        data.forEach(function(group) {
            // Every 6th entry contains last emotion for hashtag
            if(index % 5 == 0 && index != 0) {
                item.hashtag = group.hashtag;
                item.hashtagPercentage = group.countPercentage;
                item.sentimentScore = group.sentimentScore;
                item.sentimentLabel = group.sentimentLabel;
                item[group.trait] = group.traitPercentage;

                // So we push item to the object
                if(index > 0) {
                    $scope.hashtags.push(item);
                    item = {};
                }
            // On first five indexes only emotion and percetage is relevant
            } else {
                item[group.trait] = group.traitPercentage;
            }
            index++;
          });  

        // console.log($scope.hashtags);

    }).catch(function(error) {
        // Second function handles error            
        console.log("Error reading data...")
        $scope.error = "Error reading data...";
    });

    // Dropdown
    $scope.itemClass = "dropItem dropCollapse";
    $scope.dropdownClass = "dropDropdown" ;


    $scope.changeClass = function() {
        if ($scope.itemClass === "dropItem dropCollapse")
            $scope.itemClass = "dropItem";
        else
            $scope.itemClass = "dropItem dropCollapse"; 


        if ($scope.dropdownClass === "dropDropdown dropped") {
            $scope.dropdownClass = "dropDropdown";

            angular.element(document.querySelector('#widgetSection')).css('position','static');
            angular.element(document.querySelector('#insights')).css('padding-bottom','100px');
        } else
            $timeout(function () {
                $scope.dropdownClass = "dropDropdown dropped";

                // We want widgetSelection to be fixed no matter what is height of dropdown menu
                angular.element(document.querySelector('#widgetSection')).css('position','relative');
                angular.element(document.querySelector('#insights')).css('padding-bottom','0px');
            }, 150);
    };

    $scope.startHashtagAnalysis = function(index) {
        $scope.changeClass();
        var hashtag = $scope.hashtags[index];
        $scope.selectedHashtag = hashtag.hashtag;

        // Progress percentage widged
        var $ppc = angular.element( document.querySelector('.progress-pie-chart'));
        var deg = 360*hashtag.hashtagPercentage/100;
        if (hashtag.hashtagPercentage > 50) {
            $ppc.addClass('gt-50');
        }
        angular.element(document.querySelector('.ppc-progress-fill')).css('transform','rotate('+ deg +'deg)');
        angular.element(document.querySelector('.ppc-percents span')).html(hashtag.hashtagPercentage+'%');

    

        // Sparkle progress bars
        angular.forEach(angular.element(document.querySelectorAll(".sparkleProgressbar")), function(value, key){
            var t = angular.element(value);
            var emotion = t.attr('emotion');
            // var barperc = Math.round();
            t.find('.sparkleBar').animate({width:hashtag[emotion]+'%'}, hashtag[emotion]*25);

            function perc() {
                var length = t.find('.sparkleBar').css('width');
                var labelpos = (parseInt(length)-2);
                t.find('.sparkleLabel').css('left', labelpos);
                t.find('.perc').text(emotion);
            }
            perc();
            setInterval(perc, 3000);   
        });

        // Sentiment widged
        var $ppcSentiment = angular.element(document.querySelector('.progress-pie-chart-sentiment'));
        var percentSentiment = parseInt(hashtag.sentimentScore);
        var degSentiment = 360*percentSentiment/100;
        if (percentSentiment > 50) {
        $ppcSentiment.addClass('gt-50');
        } else {
        $ppcSentiment.removeClass('gt-50');
        }
        angular.element(document.querySelector('.ppc-progress-fill-sentiment')).css('transform','rotate('+ degSentiment +'deg)');
        angular.element(document.querySelector('.ppc-percents-sentiment span')).html(percentSentiment+'%');
        angular.element(document.querySelector('.ppc-percents-text-sentiment')).text(hashtag.sentimentLabel);

         // Color change
         if (hashtag.sentimentLabel === 'negative') {
            angular.element(document.querySelector('.sentimentSpan')).css('color','#d60c0c');
            angular.element(document.querySelector('.ppc-percents-text-sentiment')).css('color','#d60c0c');
        } else if (hashtag.sentimentLabel === 'positive') {
            angular.element(document.querySelector('.sentimentSpan')).css('color','#16af08');
            angular.element(document.querySelector('.ppc-percents-text-sentiment')).css('color','#16af08');
        } else {
            angular.element(document.querySelector('.sentimentSpan')).css('color','#99871d');
            angular.element(document.querySelector('.ppc-percents-text-sentiment')).css('color','#99871d');
        }  
    };       
  }]);