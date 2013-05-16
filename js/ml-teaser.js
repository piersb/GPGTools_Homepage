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
			
		type = typeof $el != 'undefined' && $el.constructor == String ? $el : type;
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
	
	$(function() {
		var ML_COOKIE = "gpgmail-ml-teaser-displayed"
		var teaserEnabled = false
		var forceShowTeaser = document.location.href.search(/teaser=1/) == -1 ? false : true;
		if((!$.cookie(ML_COOKIE) && teaserEnabled) || forceShowTeaser) {
			showMLTeaser()
			$.cookie(ML_COOKIE, '1')
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
					$(this).textillate({in: {effect: "fadeIn", delayScale: 1.4, animationCompleted: next}})
				 })
				 .delayedTransition($textSectionParts.eq(1), "scaleFade")
				 .delayedTransition($textSectionParts.eq(2), function(next) {
					 $(this).textillate({in: {effect: "fadeIn", delayScale: 1.4, animationCompleted: next}})
				 })
				 .delayedTransition($textSection.find("p"), function(next) {
					 $(this).css("visibility", "visible").css("opacity", "1").hide().fadeIn(next)
				 })
				 .delayedTransition($textSection.find(".download-ml"), "scaleFade")
				 .delayedTransition($continue, "fade")
	$(".ml-logo").startTransitions()
	
	$continue.find("a").unbind("click").click(function(evt) {
		evt.preventDefault()
		
		$("#gpgmail-ml-teaser, #gpgmail-ml-overlay").fadeOut()
	})
}