/*
* @Author: HelKyle
* @Date:   2015-12-14 23:36:31
* @Last Modified by:   HelKyle
* @Last Modified time: 2015-12-15 00:33:18
*/

//节流器
function throttle(method, context) {
     clearTimeout(method.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }, 50);
}

(function($) {
    var configModule = {
      scrollTopTime: 250,
      mobileWidth: 768,
      navItemPrefix: "navitem-"
    };

    $(".tooltip").tooltipster({
       animation: "fade",
       delay: 200,
       touchDevices: false,
       trigger: "hover",
       position: "bottom",
       'maxWidth': 300
    });

    $("#sidebar-nav").on("click", "li", function(event) {
        event.preventDefault();
        /* Act on the event */
        $this = $(this);
        $this.siblings().removeClass("active");
        $this.addClass("active");

        var index = $this.attr("id").split('-')[1];

        if (typeof index == "string") {
            var $ele = $("#" + index);
            if ($ele.length) {
                $("#main-content").animate({
                    scrollTop: $ele.position().top + 6},
                    configModule.scrollTopTime,
                    function() {
                });
            }
        }
        var winWidth = $( window ).width();
        if (winWidth < configModule.mobileWidth) {
          $("#open-sidebar").click();
        }
    });
    $("#open-sidebar").on("click", function() {
      $(this).toggleClass('open');
      $('body').toggleClass('sidebar-open');
    });

    $('.author-meta').on("mouseenter", function() {
      $(this).addClass('hover');
    }).on("mouseleave", function() {
      $(this).removeClass('hover');
    });

    //滚动时触发
    var headers = $('.section__header'),
      section = $('.section'),
    	nav = $('#sidebar-nav'),
    	offset = 0;
    var userScrolling = false;

    setInterval(function() {
  	  throttle(onScroll);
    },  300);

    function onScroll() {
      if (userScrolling) {

      	var cur_pos = $('#main-content').scrollTop();
  			// headers.each(function() {
  			// 	var top = $(this).position().top,
  			// 	    bottom = top + $(this).outerHeight();
        //
  			// 	if (cur_pos >= (top - offset) && cur_pos <= (bottom + offset)) {
  			// 	  	toggleNav($(this).attr('id'));
  			// 	  	return;
  			// 	}
  			// });
        section.each(function() {
          var top = $(this).position().top,
              bottom = top + $(this).outerHeight();
              if (cur_pos >= (top - offset) && cur_pos <= (bottom + offset)) {
      				  	toggleNav($(this).find('.section__header').attr('id'));
      				  	return;
      				}
        });

      }
      userScrolling = false;
    }

	$('#main-content').on('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function (e) {
	  //  throttle(onScroll, this);
      //用户滚动时才会触发
      if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
         userScrolling = true;
      }

	});

	function toggleNav(id) {
		nav.find('li').removeClass('active');
	    $('#' + configModule.navItemPrefix + id).addClass('active');
	}
})(jQuery);

//多说评论
var duoshuoQuery = {short_name:"w3ctrain"};
(function() {
  var ds = document.createElement('script');
  ds.type = 'text/javascript';ds.async = true;
  ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
  ds.charset = 'UTF-8';
  (document.getElementsByTagName('head')[0]
  || document.getElementsByTagName('body')[0]).appendChild(ds);
})();
