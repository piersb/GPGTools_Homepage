(function($) {
	$.fn.delayedTransition = function($el, type, customTransition) {
		if($.isFunction($el) && !$.isFunction(customTransition)) {
			customTransition = $el
			$el = null
		}
		else if($.isFunction(type) && !$.isFunction(customTransition)) {
			customTransition = type
			type = null
		}
			
		type = (typeof $el != 'undefined') && $el != null && $el.constructor == String ? $el : type;
		$el = $el instanceof jQuery ? $el : $(this); 
		
		// Get the deferred from the current element. If it doesn't exist, well
		// create one.
		var deferred = $(this).data("deferred")
		var $this = $(this)
		if(!deferred) {
			// Setup deferred.
			deferred = $.Deferred()
			deferred.progress(function() {
				var transitions = $this.data("lp-transitions")
				if(!transitions)
					return;
				
				var current = transitions.shift()
				if(!current)
					return;
				$this.data("lp-transitions", transitions)
				current()
			})
		}
		var transitions = $(this).data("lp-transitions")
		if(!transitions) {
			$(this).data("lp-transitions", [])
			transitions = $(this).data("lp-transitions")
		}
		var transition = function() {
			// Custom transition is the easiest part. Simply run the transition
			// and pass in the function to notify the deferred.
			// Of course the custom transition has to make sure the function
			// is called, otherwise no more transitions are performed.
			var next = function() {
				deferred.notify()
			}
			if($.isFunction(customTransition))
				customTransition.call($el, next)
			else {
				// Add the animation class to the element and setup it's
				// animation end handler.
				// Prepare an object for animation, by setting its visibility and opacity.
				$el.css("visibility", "visible").css("opacity", "0")
				   .addClass("animated")
				   .on("animationend webkitAnimationEnd oAnimationEnd", next)
				   // Start the CSS animation.
				   .addClass(type)
			}
		}
		
		transitions.push(transition)
		$(this).data("lp-transitions", transitions)
		$(this).data("deferred", deferred)
		
		return this
	}
	$.fn.startTransitions = function() {
		if($(this).data("transition-started"))
			return this
		
		var deferred = $(this).data("deferred")
		if(deferred)
			deferred.notify()
		$(this).data("transition-started", true)
	}
	$.fn.resetTransitions = function() {
		$(this).data("transition-started", false)
		$(this).data("deferred", null)
		$(this).data("lp-transitions", null)
	}
	
	$(function() {
		var ML_COOKIE = "gpgmail-ml-teaser-was-displayed"
		var teaserEnabled = true
		var forceShowTeaser = document.location.href.search(/teaser=1/) == -1 ? false : true;
		var removeTeaserCookie = document.location.href.search(/reset=1/) == -1 ? false : true;
		
		var ec = new evercookie()
		
		if(forceShowTeaser)
			showMLTeaser()
		else if(removeTeaserCookie)
			ec.remove(ML_COOKIE)
		else {
			ec.get(ML_COOKIE, function(value) {
				if(value == null && teaserEnabled) {
					showMLTeaser()
					ec.set(ML_COOKIE, "1")
				}
			})
		}
	})
})(jQuery)
	
	
function showMLTeaser() {
	$("#gpgmail-ml-overlay, #gpgmail-ml-teaser").show()
	var $textSection = $(".ml-text")
	var $textSectionParts = $textSection.find("h2 > span")
	var $continue = $textSection.find(".continue-to-site")
	
	$(".ml-logo").delayedTransition("lightSpeedIn")
				 .delayedTransition($textSection.find("h1"), "scaleFade")
				 .delayedTransition($(".ml-new"), "scaleFade")
				 .delayedTransition($textSectionParts.eq(0), function(next) {
					if($(this).data("old-html")) {
						$(this).html($(this).data("old-html"))
						var options = $(this).data("textillate").options
						if(typeof options != 'undefined')
							clearTimeout(options.in.completedTimeout)
						$(this).data("textillate", null)
					}
					$(this).data("old-html", $(this).html())
					$(this).textillate({in: {effect: "fadeIn", delayScale: 1.4, animationCompleted: next}})
				 })
				 .delayedTransition($textSectionParts.eq(1), "scaleFade")
				 .delayedTransition($textSectionParts.eq(2), function(next) {
					 if($(this).data("old-html")) {
					    $(this).html($(this).data("old-html"))
					 }
					 $(this).data("old-html", $(this).html())
					 $(this).textillate({in: {effect: "fadeIn", delayScale: 1.4, animationCompleted: next}})
				 })
				 .delayedTransition($textSection.find("p").not(".call-for-donation"), function(next) {
					 $(this).css("visibility", "visible").css("opacity", "1").hide().fadeIn(next)
				 })
				 .delayedTransition($textSection.find(".download-ml"), "scaleFade")
				 .delayedTransition($continue, "fade")
				 .delayedTransition(null, function() {
					 // Hide when the user presses esc.
					 $(document).on("keyup.custom", function(e) {
						 if(e.keyCode == 27) {
						 	hideMLTeaser()
						 	$(document).unbind("keypress.custom")
						 }
					 })
				 })
	$(".ml-logo").startTransitions()
	
	$("#gpgmail-ml-teaser .download-ml").unbind("click").click(function(evt) {
		evt.preventDefault()
		var $a = $(this)
		$("#gpgmail-ml-teaser .ml-description").fadeOut(function() {
			$("#gpgmail-ml-teaser .ml-text").find("h2,a,p,.continue-to-site").hide()
			$("#gpgmail-ml-teaser .ml-text").find("h1,.ml-new").removeClass("animated").removeClass("scaleFade").css("opacity", "1").show()
			
			$("#gpgmail-ml-teaser .ml-text").find(".call-for-donation").css("visibility", "visible").show()
			
			$("#gpgmail-ml-teaser .ml-description").fadeIn(function() {
				document.location.href = $a.attr("href")	
			})
		})
	})
	
	$(".ml-launch-teaser").unbind("click").click(function(evt) {
		evt.preventDefault()
		showMLTeaser()
	})
	$continue.find("a").unbind("click").click(function(evt) {
		evt.preventDefault()
		
		hideMLTeaser()
	})
	$("#gpgmail-ml-teaser").find(".donate-creditcard").click(function(evt) {
		hideMLTeaser()
	})
}

function hideMLTeaser() {
	$("#gpgmail-ml-teaser, #gpgmail-ml-overlay").fadeOut(function() {
		$("#gpgmail-ml-teaser").find(".animated").removeClass("animated").removeClass("lightSpeedIn").removeClass("scaleFade").removeClass("fadeIn").removeClass("fade").css("visibility", "hidden").css("opacity", "1")
		$(".ml-logo").resetTransitions()
	})
	
}