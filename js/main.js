// $.noConflict();
// jQuery( document ).ready(function( $ ) {
//     var dropdown = $('.dropdown');
//     var item = $('.item');

//     item.on('click', function() {
//         item.toggleClass('collapse');
    
//         if (dropdown.hasClass('dropped')) {
//             dropdown.toggleClass('dropped');
//         } else {
//             setTimeout(function() {
//             dropdown.toggleClass('dropped');
//             }, 150);
//         }
//     });
// });

// $(function(){
  
//   $('.shinyController').bind("DOMSubtreeModified",function(){
    
//     var textArray =  $('.shinyController').text().split("|");
    
//     // Progress percentage widged
//     var $ppc = $('.progress-pie-chart'),
//       percent = parseInt(textArray[0]),
//       deg = 360*percent/100;
//     if (percent > 50) {
//       $ppc.addClass('gt-50');
//     }
//     $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
//     $('.ppc-percents span').html(percent+'%');
    
//     // Sparkle progress bars
//     $('.sparkleProgressbar').each(function(){
//   		var t = $(this);
//   		var index = t.attr('index'),
//   		    dataperc = textArray[parseInt(index)],
//   				barperc = Math.round(dataperc*5.56);
//   		t.find('.sparkleBar').animate({width:barperc}, dataperc*25);
//   		/*t.find('.sparkleLabel').append('<div class="perc"></div>');*/
  		
//   		function perc() {
//   			var length = t.find('.sparkleBar').css('width'),
//   				emotion = t.attr('emotion'),
//   				labelpos = (parseInt(length)-2);
//   			t.find('.sparkleLabel').css('left', labelpos);
//   			t.find('.perc').text(emotion);
//   		}
//   		perc();
//   		setInterval(perc, 3000); 
// 	  });
	  
	     
//     // Color change
//     if (textArray[8].search('negative') > -1) {
//       $('.sentimentSpan').css('color','#d60c0c');
//       $('.ppc-percents-text-sentiment').css('color','#d60c0c');
//     } else if (textArray[8].search('positive') > -1) {
//         $('.sentimentSpan').css('color','#16af08');
//         $('.ppc-percents-text-sentiment').css('color','#16af08');
//     } else {
//           $('.sentimentSpan').css('color','#99871d');
//           $('.ppc-percents-text-sentiment').css('color','#99871d');
//     }
	  
// 	  // Sentiment widged
//     var $ppcSentiment = $('.progress-pie-chart-sentiment'),
//       percentSentiment = parseInt(textArray[7]),
//       degSentiment = 360*percentSentiment/100;
//     if (percentSentiment > 50) {
//       $ppcSentiment.addClass('gt-50');
//     } else {
//       $ppcSentiment.removeClass('gt-50');
//     }
//     $('.ppc-progress-fill-sentiment').css('transform','rotate('+ degSentiment +'deg)');
//     $('.ppc-percents-sentiment span').html(percentSentiment+'%');
//     $('.ppc-percents-text-sentiment').text(textArray[8]);
    
//   });
    
// });