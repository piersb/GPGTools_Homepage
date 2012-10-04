window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

$.postJSON = function(url, data, callback) {
	$.post(url, data, callback, "json");
};

$.fn.spin = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    var defaults = {
    	lines: 13, // The number of lines to draw
    	length: 7, // The length of each line
    	width: 4, // The line thickness
    	radius: 10, // The radius of the inner circle
    	rotate: 0, // The rotation offset
    	color: '#000', // #rgb or #rrggbb
    	speed: 1, // Rounds per second
    	trail: 60, // Afterglow percentage
    	shadow: false, // Whether to render a shadow
    	hwaccel: false, // Whether to use hardware acceleration
    	className: 'spinner', // The CSS class to assign to the spinner
    	zIndex: 2e9, // The z-index (defaults to 2000000000)
    	top: 'auto', // Top position relative to parent in px
    	left: 'auto' // Left position relative to parent in px
    };

    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if(typeof opts == 'undefined')
    	opts = {}
    
    opts = $.extend({}, defaults, opts)
    
    if (opts !== false) {
      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
    }
    
    // Center the spinner within the parent if top or left is center.
    if(typeof opts.top != 'undefined' && opts.top == 'center') {
	    var height = $this.height()
	    $this.find("." + opts.className).css("top", Math.round(height/2))
    }
    if(typeof opts.left != 'undefined' && opts.left == 'center') {
	    var width = $this.width()
	    $this.find("." + opts.className).css("left", Math.round(width/2))
    }
  });
  return this;
};

$.fn.tip = function(controller) {
	return this.each(function() {
		controller.target(this)
		
		return this
	})
}

function createURL(part) {
	var baseURL = window.location.protocol + '//' + window.location.host
	if(typeof part == 'undefined')
		return baseURL
	
	return baseURL + '/' + part
}