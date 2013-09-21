// Homepage tiles
function toggleTile(tile) {
	$("div#tiles ul li").each(function() {
		if($(this).attr("id") == $(tile).attr("id")) {
			$(tile).stop(true, true).fadeTo("slow", 1.0);
		} else {
			$(this).stop(true, true).fadeTo("slow", 0.5);
		}
	});
	
	var declaration = $(tile).parent().parent().find(".declaration p");
	
	$("div#tiles ul li").find(".arrow").remove();
	if(declaration.text() != $("img", tile).attr("alt")) {
		declaration.stop(true, true).fadeOut("slow").text($("img", tile).attr("alt")).stop(true, true).fadeIn("slow");
	}
	$(tile).append('<span class="arrow"></span>');
}

$(document).ready(function() {
	
	// Twitter widget
	$(".twitter_stream").tweet({
		username: "envato", // Customize your twitter username here
		count: 2,
		template: "{text}{time}",
		retweets: false,
		loading_text: "loading tweets..."
	});
	
	// Tooltips
	$('a[rel=tipsy]').tipsy({fade: true, gravity: 's', offset: 5});

	// Homepage tiles hover event
	$("div#tiles ul li").hover(function() {
		toggleTile($(this));
	});
		
	// Drop down menus
	$("div#nav ul li ul").each(function() {
		$(this).css({
			'left' : -($(this).width() / 2 - ($(this).parent().width() / 2) + 5)
		});
	});
	$("div#nav ul li").hover(function() {
		if($(this).find("ul").size != 0) {
			$(this).find("ul").stop(true, true).fadeIn("fast");
		}
	}, function() {
		$(this).find("ul").stop(true, true).fadeOut("fast");
	});
	
	$("div#nav ul li").each(function() {
		$("ul li:last a", this).css({ 'border' : 'none' });
	});
	
	// Reviews slideshow
	$("#reviews").tabs({ fx:{ opacity: "toggle" } }).tabs("rotate", 3000, true);
		
	// Gallery hover
	$(".two_column li, .three_column li, .four_column li, .product_image").each(function() {
		$("a", this).append('<div class="hover"></div>');
	});
	$(".two_column li, .three_column li, .four_column li, .product_image").hover(function() {
		$("a", this).find(".hover").stop(true, true).fadeIn(400);
	}, function() {
		$("a", this).find(".hover").stop(true, true).fadeOut(400);
	});
	
	$("div.gallery_wrap a, .post a img, .two a img").hover(function() {
		$(this).animate({ 'opacity' : '0.6' }, 300);
	}, function() {
		$(this).stop(true,true).animate({ 'opacity' : '1' }, 300)
	});
	$("ul.two_column li:nth-child(2n)").addClass("last");
	$("ul.three_column li:nth-child(3n)").addClass("last");
	$("ul.four_column li:nth-child(4n)").addClass("last");
	
	// Gallery Fancyboxes
	$("a.gallery_image, a.lightbox").fancybox({
		'transitionIn'	:	'elastic',
		'speedIn'		:	400, 
		'speedOut'		:	400, 
		'overlayShow'	:	false
	});
	$("a.youtube").click(function() {
		$.fancybox({
				'padding'		: 0,
				'transitionIn'	: 'elastic',
				'overlayShow'	:	false,
				'title'			: this.title,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
				  'wmode'		: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});
		return false;
	});
	$("a.vimeo").click(function() {
		$.fancybox({
			'padding'		: 0,
			'transitionIn'	: 'elastic',
			'overlayShow'	:	false,
			'title'			: this.title,
			'href' 			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			'type'			: 'swf'
	  });
		return false;
	});
	
	// Tabs, toggles and accordions
	$(".tabs").tabs();
	$(".accordion").accordion({ autoHeight: false, header: '.heading' });
	$(".small_accordion").accordion({ autoHeight: false });
	$(".list_accordion").accordion({ autoHeight: false, active: false });
	
	// Post sliders
	$(".post_slider").nivoSlider({
		manualAdvance: true,
		effect: 'fade',
		directionNav: false
	});

	$(".post_slider").each(function() {
		if($(this).find("img").length == 1) {
			$(this).find(".nivo-controlNav").hide();
		}
	});
	
	// Services filter
	$("a.service_sort").click(function() {
		this_a = $(this);
		if(this_a.attr("rel") == "") {
			$(this).addClass("ui-state-active");
			$("div.service_list").find("li").fadeIn(300);
		} else {
			$("a.service_sort[rel='']").removeClass("ui-state-active");
			
			$("div.service_list").find("li").each(function() {
					
				var terms = $(this).attr("class").split(",");
				
				if($.inArray(this_a.attr("rel"), terms) == -1) {
					$(this).fadeOut(300);
				} else {
					$(this).delay(300).fadeIn(300);
				}
				
			});
		}
	});
	
	// Button hover state
	$(".button").stop(true,true).hover(function() {
		$(this).animate({ 'opacity' : '0.8' }, 300);
	}, function() {
		$(this).stop(true,true).animate({ 'opacity' : '1' }, 300)
	});
	$("#commentform #submit").addClass("button blue");
	
	// Ajax contact form
	$('#contact_form').submit(function() {
       
		var this_form = $(this);
  	$.ajax({
  		type: 'post',
  		data: this_form.serialize(),
  		url: 'scripts/send_email.php',
  		success: function(res) {
  			if(res == "true") {
					$(this_form)[0].reset();
					$(".notice").removeClass("error").text("Thank you for contacting us!").addClass("success").fadeIn("fast");
  			} else {
  				$(".notice").text("Please check all fields and try again.").addClass("error").fadeIn("fast");
  			}
  		}
  	});
		
   });
});