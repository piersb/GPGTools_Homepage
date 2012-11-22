/* Adjust the Tipped light skin. */
Tipped.Skins.light.background.opacity = 0.95

/* Adjust the Lightview skin. */
$.extend(Lightview.Skins, {
    'gpgtools': {
    	radius: {size: 4},
        background: {color: '#ffffff', opacity: 0.95},
        shadow: {
            blur: 2,
            color: '#000',
            offset: {x: 0, y: 1},
            opacity: .15
        },
        overlay: {
            close: true,
            background: '#ffffff',
            opacity: .65
        }
    }
})

$.extend(Lightview.Skins, {
	'screenshots': $.extend(Lightview.Skins.mac, {
		overlay: { background: '#ffffff', opacity: .78 },
		background: {color: '#ffffff', opacity: 0.95},
		radius: { size: 5 }
	})
})

var SITES_URL = '/sites'

/* Author: Lukas Pitschl */
$(function() {
    if(typeof FontDetector != 'undefined') {
		var detector = new FontDetector()
		if(!detector.isAvailable('futura-pt')) {
        	$("head").append($("<link>").attr("rel", "stylesheet").attr("href", "./css/futura.css"))
        }
    }
    
    setupNavbar()
    
    console.time("Initiate website")
    var controller = new GPGToolsController()
    controller.show()
    console.timeEnd("Initiate website")
})

var SANDBOX = true
var PAYPAL_DONATION_URL = 'https://www.paypal.com/cgi-bin/webscr'
var PAYPAL_SANDBOX_DONATION_URL = 'https://www.sandbox.paypal.com/cgi-bin/webscr'
var DOWNLOAD_URL = 'download'

function downloadURLForTool(name, version) {
	name = typeof name == 'undefined' ? '' : name
	version = typeof version == 'undefined' ? '' : version
	if(name == '' || version == '')
		return null
	
	return buildURL([DOWNLOAD_URL, name, version])
}

function buildURL(parts) {
	var baseURL = document.location.origin + document.location.pathname
	var urlParts = baseURL.split("/")
	urlParts = urlParts.slice(0, -1)
	
	var url = $.merge(urlParts, parts).join("/")
	return url
}

function screenshotURL(toolName, image) {
	return buildURL(["images", "screenshots", toolName, image])
}

function setupNavbar() {
	$(".container > header nav > ul li a, .container .important-buttons li a").each(function() {
		var href = $(this).attr("href")
		if(href.substr(0,1) != '#' && href.substr(0,1) != '/')
			$(this).attr("target", "_blank")
	})	
}

$.Class.extend("Controller", {}, {
	_parent: null,
	init: function() {
		_parent = null
	},
	parent: function(controller) {
		if(typeof controller != 'undefined')
			this._parent = controller
		
		return this._parent
	},
    _clickWrapper: function(callback, preventDefault) {
        // Once callback is executed by .click, usually this
        // points to the element which was clicked on.
        // The click wrapper makes sure, that the element is passed
        // and this points to the PageController object.
        var preventDefault = typeof preventDefault != 'undefined' ? preventDefault : true
        var self = this
        return function(e) {
            preventDefault && e.preventDefault()
            if($.isFunction(callback))
                callback.apply(self, [this, e])
        }
    }
})

Controller.extend("ViewController", {}, {
	$superview: null,
	viewSelector: null,
	$view: null,
	init: function(selector) {
		this.$superview = this.$view = null
		this.viewSelector = selector
	},
	setSuperview: function($superview, add) {
		add = typeof add == 'undefined' ? true : add
		if(add)
        	$superview.append(this.view())
        this.$superview = $superview
        this.viewWillAppear($superview)
        return $superview
    },
    view: function($view) {
        if(!this.$view) {
        	this.$view = $(this.viewSelector)
        }
        if($view)
        	this.$view = $view
        
        return this.$view
    },
    hide: function() {
        this.view().hide()
    },
    show: function() {
        this.view().show()
    },
    remove: function() {
        this.view().remove()
    }
})

$.Class.extend("NonDiscreteGPUFixes", {
	fixCanvasBug: function($content) {
	    $content = $($content)
	    if(!$content.hasClass("lv_content_wrapper") && !$content.hasClass("lv_content"))
	    	return
	    
	    $window = $content.parents(".lv_window")
	    
	    if($window.data("fixNonDiscreteGPUCanvasBugFixed"))
	    	return
	    
	    $bubble = $window.find(".lv_bubble")
	    
	    $bubble.find("canvas").hide()
	    
	    var skin = Lightview.Skins.gpgtools
	    
	    function hexToRgb(hex) {
	    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		    return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		    } : null;
		}
	    
	    if(skin.background.color) {
			var rgbColor = hexToRgb(skin.background.color)
			if(rgbColor) {
				var rgbFunc = skin.background.opacity ? "rgba" : "rgb"
				var colorText = rgbColor.r + "," + rgbColor.g + "," + rgbColor.b
				if(skin.background.opacity)
		    		colorText += "," + skin.background.opacity
	    	
		    	colorText = rgbFunc + "(" + colorText + ")"
		    	$bubble.css("background-color", colorText)
			}
	    }
	    
	    if(skin.radius)
		    $bubble.css("border-radius", skin.radius.size)
	    
	    if(skin.border && skin.border.color) {
			var rgbColor = hexToRgb(skin.border.color)
			if(rgbColor) {
				var rgbFunc = skin.border.opacity ? "rgba" : "rgb"
				var colorText = rgbColor.r + "," + rgbColor.g + "," + rgbColor.b
				if(skin.border.opacity)
		    		colorText += "," + skin.border.opacity
	    	
		    	colorText = rgbFunc + "(" + colorText + ")"
		    	$bubble.css("border-color", colorText)
			}
			if(skin.border.size)
	    		$bubble.css("border-width", skin.border.size)
	    }
	    
	    $window.data("fixNonDiscreteGPUCanvasBugFixed", true)
    },
    fixSafariPositionFixedOverlayBug: function() {
	    if(!$(".lv_overlay").is(":visible"))
	    	return
	    // Safari < 6.0.x seems to leak the background color of overlay with
	    // position fixed.
	    function fixOverlay() {
			var $overlay = $(".lv_overlay")
			if(!$overlay.size())
				return
			
			console.log("Yello!")
			
			$overlay.css("width", $(window).width())
	    			.css("height", $(window).height())
	    			.css("height", $(document).height())
	    			.css("width", Math.max($(window).width(), $(document).width()))
	    			.css("position", "absolute")
	    }
	    
	    fixOverlay()
	    $(window).unbind("resize.fixOverlay").bind("resize.fixOverlay", debounce(function() {
		  	fixOverlay()  
	    }, 30))
    }
}, {})

Controller.extend("PageController", {}, {

    init: function(url, additionalOptions) {
        this.gallery = $.isArray(url) ? true : false
        this.pageURL = url
        this.$pageContent = null;
        
        this.options = { options: {
            skin: 'gpgtools', padding: 0
        }}
        if(!this.gallery) {
	    	// Define the basic design for the page lightview.
	    	var type = this.typeOfSource(url)
            this.options = $.extend({url: this.pageURL, type: type},
            						 this.options)
        }
        
        if($.isPlainObject(additionalOptions))
            $.extend(true, this.options, additionalOptions)
    },
    typeOfSource: function(source) {
	    // Allows nodes as sources.
	    if(typeof source == 'object')
	    	return 'inline'
	    if(source.search(/http/) == -1 && source.substr(0,1) != '/' && source.substr(0, 2) != './')
	    	return 'inline'
	    
	    return 'ajax'
    },
    show: function() {
        // contentLoaded allows the page to be further setup
        // after its content is loaded.
        var options = {options: {afterUpdate: this._afterUpdateWrapper(this.contentLoaded)
,
	        					 fixNonDiscreteGPUCanvasBug: NonDiscreteGPUFixes.fixCanvasBug}
}
        $.extend(true, this.options, options)
        var args = []
        if(this.gallery)
        	args.push(this.pageURL)
        
        args.push(this.gallery && this.options.options || this.options)
        
        console.log("Call show with args: ", args)
        
        Lightview.show.apply(Lightview, args)
    },
    _afterUpdateWrapper: function(callback) {
        var self = this
        return function(content) {
            self.$pageContent = $(content)
            // Hide the background canvas until it's fixed for non-discrete gpu macs (FUCK THAT!)
            //self.fixNonDiscreteGPUCanvasBug($(content))
             NonDiscreteGPUFixes.fixSafariPositionFixedOverlayBug()
            if($.isFunction(callback))
                callback.apply(self, [])
        }
    }
})

PageController.extend("SlidingPageController", {}, {

    init: function(url, additionalOptions) {
        var defaultOptions = {speed: 400}
        if($.isPlainObject(additionalOptions))
            $.extend(true, defaultOptions, additionalOptions)
        this._super(url, defaultOptions)
    },
    _fetchView: function(pageURL, cb) {
	    if(pageURL.search(/http/) == -1 && pageURL.substr(0,1) != '/' && pageURL.substr(0, 2) != './')
	    	cb($("#" + pageURL))
	    else
	    	$.get(pageURL, cb)
    },
    show: function() {
        var $page = this
        this._fetchView(this.pageURL, function(html) {
            Tipped.hideAll()
            var $html = $(html)
            var $div = $("<div>")
            $div.css("position", "absolute").css("z-index", "9999")
            $div.addClass("slide-modal")
            if(typeof $page.options.options != 'undefined' && 
               typeof $page.options.options.width != 'undefined')
            	$div.css("width", $page.options.options.width)
            $html.show()
            $div.append($html)
            
            $div.hide()
            
            var $overlay = $("<div>")
            $overlay.css("width", $(document).width())
            $overlay.css("height", $(document).height())
            $overlay.addClass("overlay")
            
            $("body").append($div)
            
            $("body").append($overlay.hide())
            
            var hiddenPoint = $(window).scrollTop() + $(window).height() + 1
            
            $div.css("height", $(window).height())
            $div.css("overflow", "auto")
            $div.css("top", hiddenPoint)
            $div.css("left", ($(window).width() - $div.width())/2)
            
            // Disable scrolling on body.
            $("html").css("overflow-x", "hidden").css("overflow-y", "hidden")
            
            $div.show()
            
            $(document).click(function(e){
                if($(e.target).closest(".slide-modal").length == 0) {
                    // .closest can help you determine if the element 
                    // or one of its ancestors is #menuscontainer
                    $div.animate({top: hiddenPoint}, $page.options.speed, function() {
                        $div.hide()
                        $("html").css("overflow-x", "auto").css("overflow-y", "auto")
                        $overlay.fadeOut(300)
                    })
                }
            });
            
            var cb = $page._afterUpdateWrapper($page.contentLoaded)
            $overlay.fadeIn(300, function() {
            	cb($div.get(0))
                $div.animate({top: $(window).scrollTop() + 20}, $page.options.speed)    
            })
        })
    }
})

PageController.extend("ModalPageController", {}, {

    init: function(url, additionalOptions) {
        // Add the options to make the lightview modal.
        var defaultOptions = {options: {
            controls: { close: false }, 
            overlay: { close: true },
            viewport: false,
        }}
        if($.isPlainObject(additionalOptions))
            $.extend(true, defaultOptions, additionalOptions)
        this._super(url, defaultOptions)
    },
    close: function() {
        Lightview.hide()
    },
    fitContent: function() {
        Lightview.refresh()
        this.center()
        var object = this
        
        $(window).unbind('resize.fitContent')
        var id;
        $(window).bind("resize.fitContent", function() {
	        clearTimeout(id);
	        id = setTimeout(function() {
	        	object.center()
	        }, 50);
	    });

/*
        $(window).resize(function() {
	        console.log("Center")
	        object.center()
        })
*/
    },
    center: function() {
	    var scrollTop = $(document).scrollTop()
	    var scrollLeft = $(document).scrollLeft()
	    var $view = this.$pageContent.parents(".lv_window")
	    
	    var offsetTop = scrollTop + Math.round(
	    	($(window).height() - $view.outerHeight(true)) / 2)
	    var offsetLeft = scrollLeft + Math.round(
	    	($(window).width() - $view.outerWidth(true)) / 2)
	    
	    relTop = Math.abs(parseInt($view.css("top")) - offsetTop)
	    relLeft = Math.abs(parseInt($view.css("left")) - offsetLeft)
	    
	    var attrs = {}
	    
	    // The view might already be positioned correctly.
	    if(relLeft > 2)
	    	attrs.left = offsetLeft
	    if(relTop > 2)
	    	attrs.top = offsetTop
	    
	    if(typeof attrs['top'] == 'undefined' && typeof attrs['left'] == 'undefined')
	    	return;
	    
	    $view.animate(attrs)
    }
})

PageController.extend("TippedPageController", {}, {

	init: function(url, additionalOptions) {
		var defaultOptions = {skin: 'light', hideOn: 'click-outside',
							  showOn: 'click'}
		this.pageURL = url
		this.$pageContent = null
		
		if(this.typeOfSource(url) == 'inline')
			defaultOptions.inline = true
		else
			defaultOptions.ajax = true
		
		var object = this
		
		var onShow = this._afterUpdateWrapper(typeof this['viewDidShow'] != 'undefined' ? this.viewDidShow : null)
		var onHide = this._afterUpdateWrapper(typeof this['viewDidHide'] != 'undefined' ? this.viewDidHide : null)
		var onAfterUpdate = this._afterUpdateWrapper(typeof this['contentLoaded'] != 'undefined' ? this.contentLoaded : null)
		
		defaultOptions.onShow = function(content, element) {
			if(object.options.animate)
				$(content).parents(".t_Tooltip").addClass("animated").addClass("bounceInUp")
			
			$(document).bind("keydown.tipped", function(e) {
				if (e.keyCode == 27) {
					Tipped.hide(element)
				}
			});
			onShow(content)
		}
		defaultOptions.onHide = function(content, element) {
			if(object.options.animate)
				$(content).parents(".t_Tooltip").removeClass("animated").removeClass("bounceInUp")
			$(document).unbind("keydown.tipped")
			onHide(content)
		}
		defaultOptions.afterUpdate = function(content, element) {
			onAfterUpdate(content)
		}
		if($.isPlainObject(additionalOptions))
			$.extend(true, defaultOptions, additionalOptions)
		
		this.options = defaultOptions
	},
	nodeOrURLForSource: function(source) {
		if(this.typeOfSource(source) == 'inline')
			return $(source).get(0)
		
		return sourcesl
	},
	target: function(node) {
		Tipped.create(node, this.nodeOrURLForSource(this.pageURL), this.options)
	},
	show: function() {},
	fitContent: function() {
		console.log(this.$pageContent.children())
		Tipped.refresh(this.$pageContent.get(0))
	}
})

TippedPageController.extend("VersionInfoController", {}, {
	toolName: null,
	isSetup: false,
	init: function(name) {
		this.isSetup = false
		var options = {showOn: 'hover', 
					   hideOn: [
					   	{ element: 'tooltip', event: 'mouseleave' },
					   	{ element: 'target', event: 'mouseleave' }
					   ], 
					   hook: 'bottommiddle', offset: {y: 4}}
		this.toolName = name
		
		this._super('#' + name  + ' .versions-panel', options)
	},
	contentLoaded: function() {
		this.setupOlderVersions()
		this.setupSignatureVerification()
		this.setupHashVerification()
		this.setupReleaseNotes()
	},
	setupOlderVersions: function() {
		var object = this
		this.$pageContent.find('.nav a[href*="older-versions"]').click(function(evt) {
			evt.preventDefault()
			evt.stopPropagation()
			object.$pageContent.find("ul.versions").show().css("visibility", "hidden")
			Tipped.refresh(object.$pageContent.get(0))
			
			var fadeInFunc = function(idx) {
				object.$pageContent.find("ul.versions li").eq(idx).fadeIn(200, function() {
					if(idx+1 < object.$pageContent.find("ul.versions li").size())
					fadeInFunc(idx+1)	
				})
			}
			
			
			object.$pageContent.find("ul.versions").css("visibility", "visible")
							   .find("li").hide()
			fadeInFunc(0)
		})
	},
	setupSignatureVerification: function() {
	    var controller = new SignatureVerificationPageController()
	    this.$pageContent.find('a.signature-file').click(function(evt) {
	    	evt.preventDefault()
	    	Tipped.hideAll()
	    	controller.show()
	    })
	    /* Tipped.show(this.$content.find(".versions-panel").get(0)) */
    },
    setupHashVerification: function() {
	    var controller = new HashVerificationPageController()
	    this.$pageContent.find('a.hash').click(function(evt) {
	    	evt.preventDefault()
	    	Tipped.hideAll()
	    	controller.show()
	    })
	    /* Tipped.show(this.$content.find(".versions-panel").get(0)) */
    },
   	setupReleaseNotes: function() {
		var object = this
		var controller = new ReleaseNotesController(this.toolName)
		this.$pageContent.find('.nav a[href*="release-notes"]').click(function(evt) {
			Tipped.hideAll()
			evt.preventDefault()
			controller.show()
		})
	},
	viewDidShow: function() {
		this.$pageContent.find("ul.versions").hide().css("visibility", "visible")
		this.fitContent()
	}
})

ViewController.extend("DonationController", {}, {
	toolName: null,
    toolVersion: null,
    sectionSliderController: null,
    donateOnly: false,
    fitContentOnAppear: true,
    init: function(toolName, toolVersion) {
	    this.sectionSliderController = null
	    this.donateOnly = false
	    this.toolName = toolName
	    this.toolVersion = toolVersion
	    
	    var view = $('#call-for-donation').clone()
	    
	    this._super(view)
    },
	viewWillAppear: function() {
		this.setupPaymentOptions()
	},
	setupPaymentOptions: function() {
		var $paymentOptions = this.view().find(".payment-options")
		
		// Setup payment options actions.
        var self = this
        $paymentOptions.find(".payment-option").each(function() {
            var $this = $(this)
            var funcName = $this.attr("id").replace("payment-option-", "")
            var fullFuncName = "use" + funcName[0].toUpperCase() + funcName.slice(1)
            $this.click(self._clickWrapper(self[fullFuncName], false))
        })
        
        
        if(!this.donateOnly) {
        	this.view().find(".intro .download").show().end()
        			   .find(".tool-logo div").hide().end().find("." + this.toolName).show()
        }
        else {
        	this.view().find(".intro .download").hide()
        	this.updateDownloadButton(null, "Donate")
        }
        // Setup download buttons.
        this.setupDownload()
        
        // Setup the various sections.
        this.setupSectionSlider()
        
        /* this.fitContent() - Still necessary? */
        // Slide to the first section
    	this.sectionSliderController.showSection(0)
    	if(this.fitContentOnAppear)
    		this.fitContent(refreshSlider=false)
	},
	setupDownload: function() {
        this.view().find(".download-button").click(this._clickWrapper(this.download))
        this.disableDownload()
    },
    download: function(target) {
	    var object = this;

        // Don't react if no donation option is set. 
        if(this.donationOption == null)
            return;
        
        if(this.donationOption == 'paypal') {
        	this.sectionSliderController.showSection(1, function() {
	        	setTimeout(function() {
		        	object.launchPayPal(object.donationController.amount())
	        	}, 500)
	        })	
        }
        else if(this.donationOption == 'nodonation') {
        	var url = downloadURLForTool(this.toolName, this.toolVersion)
        	if(url == null)
        		return
        	document.location.href = url
        }        
    },
    usePaypal: function(target) {
        this.donationOption = 'paypal'
        this.enableDownload()
        this.showAmountSlider()
    },
    useBitcoin: function(target) {
        this.donationOption = 'bitcoin'
        this.enableDownload()
    },
    useNodonation: function(target) {
        this.donationOption = 'nodonation'
        this.hideAmountSlider()
        this.enableDownload()
    },
    useAlternative: function(target) {
	  	this.view().find(".payment-options-container").removeClass("hover").addClass("hover")
	  	this.donationOption = null
	  	this.disableDownload()
	  	  
    },
    useBack: function(target) {
	  	this.view().find(".payment-options-container").removeClass("hover")
	  	this.donationOption = null
	  	this.disableDownload()
	  	  
    },
    enableDownload: function() {
       this.view().find(".download-button").css("opacity", 1.0)
       this.updateDownloadButton(this.donationOption)
    },
    disableDownload: function() {
	    this.view().find(".download-button").css("opacity", 0.5)
    },
    updateDownloadButton: function(type, msg) {
    	var $button = this.view().find("a.button")
    	var type = typeof type == 'undefined' ? '' : type
	    var title = 'Download'
	    if(type == 'paypal')
	    	title = 'Donate & Download'
	    if(type == 'paypal' && this.donateOnly)
	    	title = 'Donate'
	    
	    if(typeof msg != 'undefined')
	    	title = msg
	    $button.html(title)
    },
    setupSectionSlider: function() {
    	console.log("setting up slider for: ", this.view())
        this.sectionSliderController = new SectionVerticalSliderController(this.view())
        this.sectionSliderController.sectionCallback(1, "before", function($slide) {
            if($slide.data("spinner-is-setup"))
				return;
			var $title = $slide.find(".forwarding-to-paypal")
			var height = $slide.height()
			var spinnerHeight = 42
			var padding = $title.css("padding-top")
			titleOffset = Math.round(($slide.height() - $title.outerHeight()) / 2)
			$slide.css("padding-top", titleOffset + parseInt(padding) + (spinnerHeight / 2))
			$slide.css("height", height - titleOffset)
			$title.spin({color: '#646464', top: -67})
			
			$slide.data("spinner-is-setup", true)
        })
    },
    showAmountSlider: function() {
        if(!this.donationController) {
            var defaultGift = 0
            this.view().find(".donation-slider-container").find(".gifts .gift").each(function() {
            	if(parseInt($(this).data("default")) > 0) {
            		defaultGift = $(this).data("id")  
            		return;
            	}
            })
            var controller = new DonationSliderController(5000, defaultGift, this.view().find(".donation-slider-container").find(".donation-slider"))
            controller.setSuperview(this.view().find(".donation-slider-container").removeClass("hidden"))
            controller.slideToGift(defaultGift)

            this.donationController = controller
        }
        
        this.donationController.show()
        this.fitContent()
    },
    hideAmountSlider: function() {
	    if(this.donationController)
            this.donationController.hide()
        this.fitContent()
    },
    launchPayPal: function(amount) {
    	var toolInfo = this.toolName + '-' + this.toolVersion
    	if(this.donateOnly)
    		toolInfo = 'nodownload'
    	
    	paypalURL = SANDBOX ? PAYPAL_SANDBOX_DONATION_URL : PAYPAL_DONATION_URL
        var $form = $("<form>").attr("action", paypalURL).attr("method", "post")
        var data = {cmd: '_xclick', business: 'donations@gpgtools.org', lc: 'US', 
                    item_name: 'Help improving GPGTools', no_shipping: '1', 
                    'return': createURL('#download-' + toolInfo),
                    cancel_return: createURL('#download-nodonation'),
                    no_note: '1', tax: '0', charset: 'utf-8', cbt: 'Return to GPGTools',
                    currency_code: 'EUR', amount: amount}
        $.each(data, function(key, value) {
            var $input = $("<input>").attr("type", "hidden").attr("name", key).attr("value", value)
            $form.append($input)
        })
        this.view().find(".download-options").append($form)
        $form.submit()
    },
    fitContent: function(refreshSlider) {
    	refreshSlider = refreshSlider || true
	    if(refreshSlider)
	    	this.sectionSliderController.refresh()
        this.parent().fitContent(this)
    }
})

TippedPageController.extend("DonationPageController", {}, {
	donationController: null,
    init: function() {
        var options = {showOn: 'click', hideOn: 'click-outside', offset: {y: 0},
        			   animate: true}
        /* var donationOption = null */
        this.donationController = new DonationController()
        this.donationController.donateOnly = true
        this.donationController.parent(this)
        console.log("View: ", this.donationController.view())
        this._super(this.donationController.view(), options)
        console.log("this.$pageContent: ", this.$pageContent)
    },
    viewDidShow: function() {
    	this.reinsertDonationViewIfNecessary()
    },
    reinsertDonationViewIfNecessary: function() {
	    // Check if pageContent has the call-for-donation view.
    	// If it was hijacked by the friends page controller. re-insert it.
	    if(!this.$pageContent.find("#call-for-donation").size()) {
	    	this.$pageContent.append($("#call-for-donation"))
	    	this.fitContent()
	    }
	    this.fitContent()
    },
    contentLoaded: function() {
    	this.reinsertDonationViewIfNecessary()
    	
/*
    	var controller = 
    	controller.donateOnly = true
    	controller.parent(this)
    	controller.setSuperview(this.$pageContent, add=false)
*/
        this.donationController.setSuperview(this.$pageContent, add=false)
    	this.donationController.show()
    }
})

ModalPageController.extend("DownloadDonationPageController", {}, {
    donationController: null,
    init: function(toolName, toolVersion) {
    	this.donationController = null
        /* var options = {showOn: 'click', hideOn: 'click-outside', offset: {y: 0}} */
        var options = {}
        /* var donationOption = null */
        
        var controller = new DonationController(toolName, toolVersion)
    	controller.parent(this)
    	this.donationController = controller
        
        this._super('call-for-donation', options)
        // In this case the view of the donation controller has to be replaced,
        // otherwise it will point to the cloned node, which Lightview doesn't support.
        // Fucking lightview!
        // Man this is tedious!
        controller.view($("#call-for-donation"))
    },
    contentLoaded: function() {
    	this.donationController.setSuperview(this.$pageContent, add=false)
    	this.donationController.show()
    }
})

ViewController.extend("DonationSliderController", {
    amountUpdaterInterval: 10,
    maxAmountUpdaterRuntime: 1000
}, {

    init: function(endAmount, defaultGift, donationSliderView) {
		this.defaultGift = defaultGift
		
		this._super(donationSliderView || '.donation-slider')
    },
    viewWillAppear: function() {
        // Setup Gift Markers.
        this.setupGiftMarker()
        // Setup the slider ui.
        this.setupSlider()
    },
    slider: function() {
        if(!this.$slider) {
            this.$slider = this.view().find(".slider")
        }
        return this.$slider
    },
    setupSlider: function() {
        var sliderOptions = {
            value: 0, min: 0, max: this._sliderWidth(),
            animate: 400}
        // Setup the handlers.
        // Use slide for calculation of the actual value to display, since it triggers
        // on every mouse move.
        var self = this
        sliderOptions.slide = function(event, ui) { self._slide.apply(self, [event, ui]) }
        // Needs to be set for change as well, otherwise
        // programatically changing the value doesn't have
        // any immediate influence.
        sliderOptions.start = function(event, ui) { self._start.apply(self, [event, ui]) }
        // Setup the slider.
        this.slider().slider(sliderOptions)
    },
    setupGiftMarker: function() {
        var self = this
        var width = 0
        this.$view.find("li.gift").each(function() {
            var $gift = $(this)
            var value = width
            var nomarker = $gift.data("nomarker") == '' ? false : parseInt($gift.data("nomarker"))
            if(!nomarker) {
                $gift.find(".donation-step").click(self._clickWrapper(self.scrollToMarker))
                $gift.find(".donation-step").data('value', value)
                $gift.data('value', value)
                $gift.data('endValue', width + $gift.outerWidth())
            }
            else {
                $gift.data('value', 0).data('endValue', $gift.outerWidth())
            }
            
            width += $gift.outerWidth()
        })
    },
    scrollToMarker: function(target) {
        this._runAmountUpdater()
        this.slider().slider('value', $(target).data('value'))
    },
    slideToGift: function(id) {
        var $gift = this.view().find(".gift-" + id)
        if(!$gift.size())
            return
        this.scrollToMarker($gift.find(".donation-step").get(0))
    },
    _sliderWidth: function() {
        return this.view().find(".slider").width()
    },
    _slide: function(event, ui) {
        var amount = this._normalizedAmountForValue(ui.value)
        
        this._updateAndPositionAmount(amount)
    },
    _start: function(event, ui) {
        // If the user used the drag handle, the source element
        // is an anchor otherwise it's a div. The amount updater is only
        // used if a click on the slide bar occcurs.
        if(!$(event.srcElement).is("a"))
            this._runAmountUpdater()
    },
    _value: function() {
        return this.slider().slider('value')
    },
    _sliderHandle: function() {
        return this.slider().find(".ui-slider-handle")
    },
    _runAmountUpdater: function() {
        var self = this
        var SLIDER_ANIMATION_INTERVAL = setInterval(function() {
            var endValue = self._value()
            var value = self._sliderHandle().position().left
            var amount = self._normalizedAmountForValue(value)
            
            self._updateAndPositionAmount(amount, value)
            
            // Stop once the position is matched.
            if(value == endValue)
                clearInterval(SLIDER_ANIMATION_INTERVAL)
        }, DonationSliderController.amountUpdaterInterval)
        
        // Sometimes the exact position is not matched for some reason,
        // so stop the Amount updater latest after 1 sec.
        setTimeout(function() {
            clearInterval(SLIDER_ANIMATION_INTERVAL)
        }, DonationSliderController.maxAmountUpdaterRuntime)
    },
    _normalizedAmountForValue: function(sliderValue) {
        var amount = 0
        // Find closest gift to the slider value.
        var gifts = this.view().find(".gifts .gift")
        var gift = null
        var prevGift = null
        var $gift = null
        var $prevGift = null
        var width = 0
        var self = this
        this.view().find(".gifts .gift").each(function(i, o) {
            if(gift != null)
                return false
            
            width += $(this).outerWidth()
            // The max value is handled the same as maxValue - 1,
            // so set the the max value to max value - 1.
            if(sliderValue < width || (width >= self.view().find(".gift").eq(-1).data('endValue') && 
               sliderValue <= self.slider().width())) {
                var id = $(this).attr("class").split(" ")[0].replace("gift-", "")
                $gift = $(this)
                $prevGift = $gift.index() > 0 ? self.view().find(".gift").eq($gift.index()-1) : null
                gifts.each(function() {
                	if(gift != null)
                		return false
                	
                	if($(this).data("id") == id) {
	                	gift = $(this)
	                	prevGift = gifts.eq(i)
                	}
                })
            }
        })
        
        var delimiter = $gift.data('endValue') - $gift.data('value')
        var step = delimiter/gift.data("steps")
        var amountBase = prevGift == null ? 0 : prevGift.data("amount")
        var baseWidth = $gift.data('value')
        amount = amountBase + (((sliderValue - baseWidth) / step) * gift.data("increment"))
        
        amount = Math.floor(amount)
        
        // Account for mis calculations.
        if(amount > this.$view.find("ul.gifts").data("end-amount"))
            amount = this.$view.find("ul.gifts").data("end-amount")
        
        return amount
    },
    _updateAndPositionAmount: function(amount, position) {
        var $amountElement = this.slider().find(".ui-slider-handle")
        // Update the displayed amount.
        $amountElement.html(amount).show()
        // Position the amount.
        
        // Update the gifts to display all before and including amount.
        this._updateGiftsForAmount(amount)
    },
    _updateGiftsForAmount: function(amount) {
        var self = this
        
        if(amount >= this.defaultGift) {
            this.view().find(".gifts .gift").each(function() {
                var nomarker = $(this).data("nomarker") == '' ? false : parseInt($(this).data("normarker"))
                if(amount >= $(this).data("amount") && !nomarker) {
                    var showSelector = ".gift-" + $(this).data("id") + " > div"
                    var hideSelector = ".gift-" + $(this).data("id")
                    self.view().find(showSelector).removeClass('invisible')
                    self.view().find(hideSelector).nextAll().find('div').addClass('invisible')
                }
            })
        }
        else
            this.view().find(".gifts .gift > div").addClass('invisible')
        
        if(amount >= 4000) {
	        var height = this.view().find(".gifts").height()
	        var offset = this.view().find(".gifts").position().top + 10
	        this.view().find(".gift").find("div").addClass("invisible")
	        this.view().find(".donation-gift-heart").height(height).css("top", offset).show()
        }
        else {
	        this.view().find(".donation-gift-heart").hide()
        }
    },
    amount: function() {
        var amount = this._normalizedAmountForValue(this._value())
        return amount
    }
})

ModalPageController.extend("DownloadPageController", {
	cookieIdPrefix: 'gpgtools-tool',
	cookieValue: 'we-have-the-best-users',
	downloadPageControllerForURL: function(url) {
		var info = DownloadPageController.downloadInfoFromURL(window.location)
		var controller = new DownloadPageController()
		controller.donation = info.donation
		controller.name = info.name
		controller.version = info.version
		return controller
	},
	downloadInfoFromURL: function(url) {
		parts = url.hash.split("-")
		var info = {donation: true, version: null, name: null}
	
		if(parts.length != 3) {
			info.donation = false
			return info
		}
	
		info.name = parts[1]
		info.version = parts[2]
	
		return info
	},
	rememberDonation: function(name, version) {
		var id_prefix = this.cookieIdPrefix
		var id = [id_prefix, name, version].join('-')
		$.cookie(id, this.cookieValue, {expire: 365})
	},
	donatedBefore: function(name, version) {
		var id_prefix = this.cookieIdPrefix
		var id = [id_prefix, name, version].join('-')
		if($.cookie(id) == this.cookieValue)
			return true
		return false
	}
}, {
	
	init: function() {
		var options = {options: {width: 400}}
		
		this._super('download-page', options)
	},
	contentLoaded: function() {
		var object = this
		var $button = this.$pageContent.find("a.button")
		if(this.name) {
			this.$pageContent.find(".tool-logo").addClass(this.name)
			this.$pageContent.find(".tool-logo ." + this.name).show()
			var url = downloadURLForTool(this.name, this.version)
			$button.attr("href", url)
		}
		else {
			$button.html("Close")
		}
		$button.click(function(evt) {
			if(!object.name)
				evt.preventDefault()
			if(object.name)
				DownloadPageController.rememberDonation(object.name, object.version)
			window.document.location.hash = ''
			if(!object.name)
				object.close()
			else
				setTimeout(function() { object.close() }, 500)
		})
		this.fitContent()
	}
})

SlidingPageController.extend("NewsPageController", {}, {
	
	init: function() {
		this._super('news-page', {options: {width: 840}})
	},
	contentLoaded: function() {
	}	
})

Controller.extend("GPGToolsController", {}, {
	
	init: function() {
		
	},
	show: function() {
		if(this.shouldShowDownloadPage()) {
    		var controller = DownloadPageController.downloadPageControllerForURL(window.location)
    		controller.show()
    	}
    	
		this.setupNavigation()
		this.setupContactForm()
		this.setupDonationModal()
		this.setupSections()
	},
	shouldShowDownloadPage: function() {
		if(window.location.hash.search(/#download-/) == -1)
			return false
		
		return true
	},
	setupNavigation: function() {
		// Scroll to tool section if one of the main 
		$("nav.sections li a").click(function(e) {
	        var href = $(this).attr("href")
	        e.preventDefault()
	        $(window).scrollTo(href, 600, function() {
	            // Ajdust the hash value.
	            window.document.location.hash = href
	        })
	    })
	    // Open Friends page.
	    var controller = new FriendsPageController()
	    $("nav a.friends").tip(controller)
	    
	    var controller = new TeamPageController()
	    $("nav a.team").tip(controller)
	    
	    this.setupBackToTop()
	},
	setupBackToTop: function() {
		// Calculate main section height.
	    mainSectionHeight = $("section#gpgtools.main").height()
	    var $backToTop = $('<div><a href="#gpgtools"></a></div>').addClass("back-to-top")
		$("body").append($backToTop)
		$backToTop.hide()
		$backToTop.find("a").click(function(e) {
			e.preventDefault()
			var href = $(this).attr("href")
			$(window).scrollTo(href, 400, function() {})
		})
		$(window).scroll(function() {
			var top = $(window).scrollTop()
			if($backToTop.is(":animated"))
				return
			
			if(top >= (mainSectionHeight - 20)) {
				 !$backToTop.is(":visible") && $backToTop.fadeIn(200)
			}
			else
				$backToTop.fadeOut(200)
		})
	},
	setupSections: function() {
		$("section").each(function() {
			var controller = new ToolController($(this).data("name"))
			controller.show()
		})
	},
	setupDonationModal: function() {
		$("nav a[href*=donate]").tip(new DonationPageController())
	},
	setupContactForm: function() {
		$("nav a[href*=contact]").tip(new ContactPageController())
	}
})

Controller.extend("ToolController", {}, {
	toolName: null,
	
	init: function(name) {
		this.toolName = name
		this.$content = $('section#' + name)
	},
	show: function() {
		this.setupDownload()
		this.setupScreenshots()
		this.setupVersions()
		this.setupMinorFeatureSlider()
	},
	setupScreenshots: function() {
	   var object = this
        this.$content.find(".screenshots").click(function(evt) {
            evt.preventDefault()
/*
            Lightview.show([{url: 'images/screenshots/gpgmail/GPGMail encrypted - error.png',
            				 title: 'GPGMail shows an error if the decryption failed. Show details contains the actual error from GPG and tries to give pointers on how to solve the problem.'}, 
            				'images/screenshots/gpgmail/GPGMail encrypted - key missing.png', 
            				'images/screenshots/gpgmail/GPGMail encrypted.png'], 
            			   { controls: { type: 'relative', slider: { items: 5 } }, skin: 'screenshots',
            			     fixNonDiscreteGPUCanvasBug: NonDiscreteGPUFixes.fixCanvasBug});
*/
            
            var controller = new ScreenshotsPageController(object.toolName)
            controller.show()
        })
	},
	setupVersions: function() {
		var controller = new VersionInfoController(this.toolName)
    	this.$content.find(".versions-tip").tip(controller)
    },
    setupDownload: function() {
	    var object = this
/*
	    var controller = new DonationPageController()
	    controller.toolName = 
	    controller.toolVersion = 
*/
		var toolName = object.$content.data("name")
		var toolVersion = object.$content.data("version")
	    	
	    this.$content.find(".download .action-button").click(function(evt) {
	    	evt.preventDefault()
	    	if(DownloadPageController.donatedBefore(toolName, toolVersion)) {
		    	var url = downloadURLForTool(toolName, toolVersion)
		    	if(url == null)
		    		return
		    	document.location.href = url
	    	}
	    	else {
		    	Tipped.hideAll()
		    	var controller = new DownloadDonationPageController(toolName, toolVersion)
		    	controller.show()
	    	}
	    })
	    //this.$content.find(".action-button.download").tip(controller)
	    
	    
	    /*
this.$content.find(".action-button.download").click(function(e) {
	    	e.preventDefault()
	    	Tipped.hideAll()
	    	controller.show()
	    })
*/
    },
    setupMinorFeatureSlider: function() {
	    var object = this
	    var $tool = this.$content
	    $tool.find(".minor-features li").each(function() {
			var $a = $(this).find("a")
	    	$a.click(function(evt) { evt.preventDefault() })
	    	$a.hover(function() {
				var $bar = $tool.find(".bar")
				var $arrow = $tool.find(".arrow")
	    		$bar.css("visibility","visible")
		    	$arrow.show()
				
	    		var $li = $(this).parent()
	    		var showDescription = function() {
	    			if($tool.find(".arrow:visible").size() && $tool.find(".bar:visible").size()) {
	    				$tool.find(".description").html($li.find("span").html())
		    										  .css("visibility", "visible")
		    			
	    			}
	    		}
				
				var arrowLeft = this.offsetWidth / 2 + $li.offset().left - $bar.offset().left - 4
				
	    		if(parseInt($arrow.css("left")) == arrowLeft) {
		    		showDescription()
	    		}
	    		else {
		    		$arrow.animate({"left": arrowLeft + "px"},
	    			100, showDescription)
		    		
	    		}
	    	})
	    })
	    var onOut = function() {
		   	$tool.find(".bar").css("visibility","hidden")
  		   	$tool.find(".arrow").hide()
  		   	$tool.find(".description").css("visibility", "hidden")
	    }
	    $tool.find(".minor-features").hover(function() {
		   	if($tool.find(".description").css("visibility") == 'visible')
		   		$tool.find(".bar").css("visibility","visible")
	    },
	    onOut).mousemove(function(e) {
	    	if($(e.srcElement).is("ul"))
	    		onOut()
	    })
	}
})

ModalPageController.extend("SignatureVerificationPageController", {}, {

	init: function(selector) {
		selector = selector || 'signature-verification-page'
		this._super(selector, {})
	},
	contentLoaded: function() {
		/* Vertically center the step number. */
		this.$pageContent.find(".intro li a").each(function() {
			var height = $(this).height()
			var $step_nr = $(this).find(".step-nr")
			var offset = Math.round((height - $step_nr.height()) / 2)
			$step_nr.css("margin-top", offset)
		})
		console.error("Check this code.")
		
		var object = this
		this.$pageContent.find(".verification-step-link").click(function(evt) {
			evt.preventDefault()
			evt.stopPropagation()
			
			object.$pageContent.find(".steps").find(".active").removeClass("active")
			$(this).addClass("active")
			
			var regex = /#([^0-9]+)([0-9]+)/
			var parts = regex.exec(this.hash)
			var baseString = parts[1]
			var image;
			
			if (baseString == "hash-verification") {
				image = hash_verification_small_images[parts[2]]
			} else {
				image = signature_verification_small_images[parts[2]]
			}
			
			var $currentImage = object.$pageContent.find(".verification-image.current-image")
			var $otherImage = object.$pageContent.find(".verification-image:not(.current-image)")
			
			if ($currentImage.attr("src") == image)
				return;
				
			
			$otherImage.attr("src", image)
			$otherImage.hide()
			$otherImage.addClass("current-image")
			$currentImage.removeClass("current-image")
			$otherImage.fadeIn(200)
		})
	}
})

SignatureVerificationPageController.extend("HashVerificationPageController", {}, {
	init: function() {
		this._super('hash-verification-page', {})
	}
})

TippedPageController.extend("FriendsPageController", {}, {
	$switcher: null, 
	sectionController: null,
	setupCompleted: false,
	previousDonationWindowOwner: null,
	init: function() {
		this.$switcher = null
		this.sectionController = null
		
		var id = 'friends-page'
		
		//this.prepareSectionScroller(id)
		
		this._super('#' + id, {animate: true})
	},
	prepareSectionScroller: function(id) {		
		var $container = $("<div>").attr("id", id)
		$container.append(
			$("<div>").addClass("lp-slider")
					  .addClass("lp-vertical-slider"))
			.find(".lp-vertical-slider").append(
				$("#friends-page").addClass("lp-slide"))
		    .append($("#call-for-donation").addClass("lp-slide"))
		
		$("#modals").append($container)
	},
	viewDidHide: function() {
		this.$pageContent.find("#friends-page").css("margin-top", "0px").show()
		this.$pageContent.css("overflow", "")
		// Append the call-for-donation window to the panels node again.
		//$("#modals").append($("#call-for-donation").hide())	
	},
	viewDidShow: function() {
		this.$pageContent.find("#call-for-donation").hide().end()
						 .find("#friends-page").show()
		this.fitContent()
	},
	contentLoaded: function() {
		var object = this
    	
    	this.sectionController = new SectionController(this.$pageContent.find("#friends-page"))
		this.sectionController.parent(this)
		this.sectionController.showDefault()
		
		this.prepareSections()
		
		this.$pageContent.find(".lp-section .show-donation-page").unbind('click').click(function(evt) {
			evt.preventDefault()
			evt.stopPropagation()
			
			var controller = new DonationController()
			controller.donateOnly = true
			// We'll later fit the content into the tipped, once it has fully appeared
			// otherwise the height calculation is fucked up (Yeah, might be a bug... but
			// refactoring the whole slider thingy now is very very tedious.
			controller.fitContentOnAppear = false
			controller.parent(object)
			// Adding the donation panel to the tipped friends window.
			controller.setSuperview(object.$pageContent)
			
			// Set overflow to hidden so the old content properly disappears.
			object.$pageContent.css("overflow", "hidden")
			var $modal = object.$pageContent.find("#friends-page")
			var height = $modal.outerHeight()
			
			$modal.animate({"margin-top": height * -1}, 300, function() {
				$modal.hide()
				controller.show()
				controller.fitContent()
			})
		})
		
		this.$pageContent.find(".switcher").children(".lp-slide").each(function() {
			
			if(!$(this).find(".lp-horizontal-slider").size())
				return
			
			var pagesController = new SectionHorizontalSliderController($(this))
			pagesController.showSection(0)
			
			if(!$("body").data("pagesController") && $(this).find(".lp-horizontal-slider").size())
				$("body").data("pagesController", pagesController)
			
			var $slide = $(this)
			$slide.data("slider-index", 0)
			
			$(this).find("nav a.prev").addClass("disabled")
			if(!pagesController.isLastSection())
				$(this).find("nav a.next").removeClass("disabled")
			else
				$(this).find("nav a.next").addClass("disabled")
			
			var showSection = function(index) {
				pagesController.showSection(index)

				index == 0 ? $slide.find("nav a.prev").addClass("disabled") : $slide.find("nav a.prev").removeClass("disabled")

				pagesController.isLastSection() ? $slide.find("nav a.next").addClass("disabled") : $slide.find("nav a.next").removeClass("disabled")

			} 
			
			$(this).find("nav a").click(function(evt) {
				evt.preventDefault()
				if($(this).hasClass("disabled"))
					return
				
				var index = $slide.data("slider-index")
				
				if($(this).hasClass("prev"))
					index--
				else
					index++
				
				if(index < 0 || index >= pagesController.count())
					index = 0
				
				showSection(index)
				
				$slide.data("slider-index", index)
			})
		})
		this.setupCompleted = true
	},
	prepareSections: function() {
		this.prepareFriendsSection()
		this.prepareSupportersSection()
	},
	prepareSupportersSection: function() {
		var supporters = []
		const pageHeight = 260
		var $content = this.$pageContent.find(".lp-slide.supporters .content")
		this.$pageContent.find(".lp-slide.supporters ul li").each(function() {
			supporters.push($(this).html())
		})
		
		$content.addClass("invisible").show()
		
		
		this.$pageContent.find(".lp-slide.supporters").find("ul").remove()
		$content.html("").append(
			$("<div>").addClass("lp-slider").addClass("lp-horizontal-slider")
					  .data("slide-width", 310).append(
				$("<div>").addClass("lp-horizontal-slider-container").addClass("clearfix")
			)
		)
		
		var $sliderContainer = $content.find(".lp-horizontal-slider-container")
		
		var i
		const maxLength = 610
		var textLength = 0
		var iStart = 0
		
		for (i in supporters) {
			var supporter = supporters[i]
			var length = supporter.length + 2
			
			if (textLength + length > maxLength) {
				var $slide = $("<div>").addClass("lp-slide invisible")
				var ttt = supporters.slice(iStart, i).join(", ")
				$slide.html(ttt)
				$sliderContainer.append($slide)
				
				iStart = i
				textLength = 0
			}
			
			textLength += length
		}
		if (textLength > 0) {
			var $slide = $("<div>").addClass("lp-slide invisible")
			$slide.html(supporters.slice(iStart).join(", "))
			$sliderContainer.append($slide)
		}
		
		$content.removeClass("invisible")
	},
	prepareFriendsSection: function() {
		// Get a list of all friends
		var friends = []
		const pageHeight = 260
		var $list = this.$pageContent.find(".lp-slide.friends ul")
		var $content = this.$pageContent.find(".lp-slide.friends .content")
		$list.find("li").each(function() {
			friends.push($(this).html())
		})

		// Remove any entries
		$list.empty()
		
		$list.css("height", "auto")
		
		var lastOnPage = []
		var page = 0
		var i = 0
		var count = friends.length
		const maxPerPage = 26
		
		//How many friends can be displayed on a page?
		while (i < count) {
			var max = count - i > maxPerPage ? i + maxPerPage : count
			for (; i < max; i++) {
				var $li = $("<li>").html(friends[i])
				$list.append($li)
			}
			while ($list.height() > pageHeight) {
				$list.find(":last").detach()
				$list.find(":last").detach()
				i -= 2
			}
			lastOnPage[page] = i
			page++
			
			$list.empty()
		}
		
		$list.remove()
		
		//Prepare div
		$content.html("").append(
			$("<div>").addClass("lp-slider").addClass("lp-horizontal-slider")
					  .data("slide-width", 320).append(
				$("<div>").addClass("lp-horizontal-slider-container").addClass("clearfix")
			)
		)
		
		//Fill with friends
		var $sliderContainer = $content.find(".lp-horizontal-slider-container")
		i = 0
		for(page in lastOnPage) {
			var $slide = $("<ul>").addClass("lp-slide invisible")
			for (; i < lastOnPage[page]; i++) {
				$slide.append($("<li>").html(friends[i]))
			}
			
			$sliderContainer.append($slide)
		}
		$content.removeClass("invisible")
	},
	fitContent: function(target) {
		var target = target || null
		if(target && target == this.donationController) {
			this.sectionSlider.refresh()
			this.sectionSlider.showSection(1)
		}
		this._super()
	}
})

TippedPageController.extend("TeamPageController", {}, {
	$switcher: null, 
	init: function() {
		this.$switcher = null
		this._super('#team-page', {animate: true, containment: '.container'})
	},
	contentLoaded: function() {
		this.sectionController = new SectionController(this.$pageContent)
		this.sectionController.parent(this)
		this.sectionController.showDefault()
	}
})

ModalPageController.extend("ReleaseNotesController", {}, {
	$switcher: null,
	toolName: null,
	scrollDownAllowed: true,
	scrollUpAllowed: false,
	init: function(name) {
		this.$switcher = null
		this.toolName = name
		this._super(buildURL([this.toolName, "release-notes"]), {})
	},
	contentLoaded: function() {
		var object = this
		
		/* First, calculate if it's necessary to show the older-versions
		 * scroller.
		 */
		$versionScroller = this.$pageContent.find(".version-scroller")
		var scrollerIsActive = true
		var height = $versionScroller.height()
		var versionHeight = 0
		$versionScroller.find(".versions .lp-section").each(function() {
			versionHeight += $(this).height()
		})
		
		// Hide the older-versions button if not necessary.
		if(versionHeight <= height) {
			scrollerIsActive = false
			this.$pageContent.find(".older-versions").hide()
			$versionScroller.find(".shadow").hide()
		}
		
		/* Show your-area first, unless another one is selected. */
		this.sectionController = new SectionController(this.$pageContent, noDefault=true)
		this.sectionController.parent(this)
		this.sectionController.switchSection(0)
		this.sectionController.afterSwitch = function(prevIdx, idx, $slide) {
			var direction = prevIdx < idx ? 'next' : 'prev'
			if(idx != prevIdx) {
				object.$pageContent.find(".version-scroller .scroll-top").fadeOut()
				object.$pageContent.find(".lp-section-nav").data("idx", idx-1)
				if(scrollerIsActive) {
					object.scrollVersionNav(direction, function() {
						if(object.scrollUpAllowed)
							object.$pageContent.find(".version-scroller .scroll-top").fadeIn()
					})
				} 
			}
		}
		
		var object = this
		var startIdx = 0
		var $nav = this.$pageContent.find(".lp-section-nav")
		var $versionScroller = object.$pageContent.find(".version-scroller")
		this.$pageContent.find(".lp-section-nav").data("idx", startIdx)
		this.$pageContent.find(".older-versions").click(function(evt) {
			evt.preventDefault()
			if(!$(this).hasClass("disabled")) {
				var height = $nav.find(".lp-section").outerHeight(true)
				var currentIndex = $nav.data("idx")
				var itemsVisible = Math.floor($versionScroller.height() / height)
				
				$nav.data("idx", (currentIndex + itemsVisible) - 1)
				
				
				
				object.scrollVersionNav('next', function() {
					if(object.scrollUpAllowed)
						object.$pageContent.find(".version-scroller .scroll-top").fadeIn()
				})
			}
		})
		
		this.$pageContent.find(".scroll-top").click(function(evt) {
			$(this).fadeOut()
			evt.preventDefault()
			var $this = $(this)
			
			var marginTop = Math.abs(parseInt($nav.css("marginTop")))
			var height = $nav.find(".lp-section").outerHeight(true)
			var overlaps = marginTop % height != 0
			var lastHiddenIndex = Math.floor(marginTop / height)  
			var itemsVisible = Math.floor($versionScroller.height() / height)
			
			if(overlaps)
				$nav.data("idx", lastHiddenIndex - itemsVisible)
			
			object.scrollVersionNav('prev', function() {
				if(object.scrollUpAllowed)
					$this.fadeIn()
			})
		})
		this.$pageContent.find(".version-scroller").hover(function() {
			if(object.scrollUpAllowed)
				$(this).find(".scroll-top").fadeIn(200)
		}, function() {
			$(this).find(".scroll-top").fadeOut(200)			
		})
	},
	scrollVersionNav: function(direction, cb) {
		var $nav = this.$pageContent.find(".lp-section-nav")
		if($nav.is(":animated")) {
			return;
		}
			
		var idx = $nav.data("idx")
		if(direction == 'next')
			idx++
		else
			idx--
		
		if(idx < 0)
			idx = 0
		else if(idx > this.$pageContent.find(".lp-section").size() - 1)
			idx = this.$pageContent.find(".lp-section").size() - 1
		
		$nav.data("idx", idx)
		var height = $nav.find(".lp-section").outerHeight(true)
		marginTop = height * idx * -1
		maxMarginTop = this.$pageContent.find(".versions.lp-section-nav").height() - 
					   this.$pageContent.find(".version-scroller").height()
		
		var scrollerHeight = this.$pageContent.find(".version-scroller").height()
		
		if(marginTop < 0)
			this.$pageContent.find(".version-scroller .shadow-top").show()
		else
			this.$pageContent.find(".version-scroller .shadow-top").hide()
		
		if(Math.abs(marginTop) + scrollerHeight >=
		   this.$pageContent.find(".versions.lp-section-nav").height()) {
			this.$pageContent.find(".older-versions").css("opacity", 0.6).addClass("disabled")
			marginTop -= (scrollerHeight - $nav.find(".lp-section:last").position().top) * -1
			this.$pageContent.find(".version-scroller .shadow").hide()
		}
		else {
			this.$pageContent.find(".older-versions").css("opacity", 1.0).removeClass("disabled")
			this.$pageContent.find(".version-scroller .shadow").show()
		}
		if(marginTop < 0)
			this.scrollUpAllowed = true
		else
			this.scrollUpAllowed = false
		
		if(Math.abs(marginTop) > maxMarginTop)
			marginTop = maxMarginTop * -1
		if(direction == 'prev' && marginTop > 0)
			marginTop = 0
		
		$nav.animate({'marginTop': marginTop}, cb || null)
		this.$pageContent.find(".version-scroller").hover()
	}
	
	/*
,
	switchSection: function(idx) {
		this.$switcher.children().hide()
		this.$pageContent.find(".intro ul li").removeClass("active")
											  .eq(idx).addClass("active")
		this.$switcher.children().eq(idx).show()	
	}
*/
})

Controller.extend("SectionController", {}, {
	$parent: null,
	$sectionContainer: null,
	$sections: null,
	$sectionContents: null,
	sectionSliderController: null,
	_parent: null,
	noDefault: false,
	afterSwitch: null,
	init: function(parent, noDefault) {
		var noDefault = typeof noDefault == 'undefined' ? false : noDefault
		this.noDefault = noDefault
		this.$sectionContainer = this.$sections = this.$sectionContents = this.sectionSliderController = this._parent = this.afterSwitch = null
		
		this.$parent = $(parent)
		this.setupSections()
	},
	setupSections: function() {
		this.sectionSliderController = new SectionVerticalSliderController(this.$parent)
		
		this.$sectionContainer = this.$parent.find(".lp-section-nav")
		this.$sections = this.$sectionContainer.find(".lp-section")
		this.$sectionContents = this.$parent.find(".lp-sections")
		
		var object = this
		this.$sections.click(function(evt) {
			evt.preventDefault()
			evt.stopPropagation()
			object.switchSection(object.noDefault ? $(this).index() : $(this).index()+1)			
		})
		if(!this.noDefault) {
			this.$parent.click(function(evt) {
			evt.preventDefault()
			
			if(!$(evt.target).parents(".lp-sections").size())
				object.switchSection(0)
			})
		}
	},
	switchSection: function(idx) {
		this.$sectionContents.children().eq(idx).show()
		
		// 0 is general page, with no list item selected.
		var prevIdx = this.$sections.parent().find(".active").index()
		
		if(idx > 0 || this.noDefault)
			this.$sections.removeClass("active").eq(this.noDefault ? idx : idx - 1).addClass("active")
		else
			this.$sections.removeClass("active")
		
		var object = this
		this.sectionSliderController.showSection(idx, function($slide) {
			if($.isFunction(object.afterSwitch))
				object.afterSwitch(prevIdx, idx, $slide)
		}, 'after')
		this.refresh()
	},
	showDefault: function() {
		this.$parent.click()
	},
	parent: function(parent) {
		if(typeof parent != 'undefined')
			this._parent = parent
		
		return this._parent
	},
	refresh: function() {
		if(!this._parent)
			return
		
		this.parent().fitContent()
	}
})

Controller.extend("SectionVerticalSliderController", {}, {
	$slider: null,
	$slides: null,
	$sliderParent: null,
	maxHeight: 0,
	padding: 0,
	callbacks: {},
	init: function(sliderParent) {
		/* Not sure if it's a bug or not, but resetting every instance variable,
		   otherwise it retains its value on new instances.
		 */
		this.$slider = this.$slides = this.$sliderParent = null
		this.maxHeight = this.padding = 0
		this.callbacks = {}
		 
		this.$sliderParent = $(sliderParent)
		this.buildSlider()
	},
	buildSlider: function(refresh) {
		var refresh = typeof refresh == 'undefined' ? false : refresh 
		this.$slider = this.$sliderParent.find(".lp-vertical-slider").first()
		this.padding = this.$slider.outerHeight() - this.$slider.height()
		this.$slides = this.$slider.children(".lp-slide")
		var maxHeight = 0
		var totalHeight
		this.$sliderParent.show().css("visibility", "hidden")
		this.$slides.show().css("visibility", "hidden").each(function() {
			$(this).css("height", "auto")
			maxHeight = Math.max(maxHeight, $(this).height())
		})
		this.$sliderParent.css("visibility", "visible").show()
		this.$slides.css("visibility", "visible").show()
		console.log("Max height: ", maxHeight)
		this.$slides.height(maxHeight + this.padding)
		this.$slider.height(maxHeight)
		this.$slides.show()
		this.maxHeight = maxHeight
		if(!refresh)
			this.$slides.addClass("invisible")
	},
	refresh: function() {
		this.buildSlider(true)
	},
	showSection: function(idx, cb, type) {
    	var type = typeof type == 'undefined' ? 'after' : 'before'
    	var cb = cb || null
    	if($.isFunction(cb))
    	   this.sectionCallback(idx, type, cb)
		
		var offset = ((this.maxHeight + this.padding) * idx) * -1
		
		var beforeCb = this.sectionCallback(idx, "before")
		var afterCb = this.sectionCallback(idx, "after")
		if($.isFunction(beforeCb))
            beforeCb(this.$slides.eq(idx))
		
		this.$slides.removeClass("invisible")
		var object = this
		if($.isFunction(afterCb))
			this.$slides.eq(0).animate({'margin-top': offset}, function() {
    			 afterCb(object.$slides.eq(idx))
            })
		else
			this.$slides.eq(0).animate({'margin-top': offset})
	},
	sectionCallback: function(idx, type, cb) {
    	if($.isFunction(cb))
            this.callbacks[type + '-' + idx] = cb
        return this.callbacks[type + '-' + idx]
	}
})

Controller.extend("SectionHorizontalSliderController", {}, {
	$slider: null,
	$slides: null,
	$sliderParent: null,
	$sliderContainer: null,
	maxWidth: 0,
	slideWidth: 0,
	padding: 0,
	callbacks: {},
	currentIdx: 0,
	init: function(sliderParent) {
		this.$slider = this.$slides = this.$sliderParent = this.$sliderContainer = null
		this.maxWidth = this.slideWidth = this.padding = this.currentIdx = 0
		this.callbacks = {}
		this.$sliderParent = $(sliderParent)
		this.buildSlider()
	},
	buildSlider: function(refresh) {
		var refresh = typeof refresh == 'undefined' ? false : refresh 
		this.$slider = this.$sliderParent.find(".lp-horizontal-slider")
		this.padding = this.$slider.outerWidth() - this.$slider.width()
		this.$slides = this.$slider.find(".lp-slide")
		this.$sliderContainer = this.$slider.find(".lp-horizontal-slider-container")
		var maxWidth = 0
		var totalHeight
		var object = this
		//console.time("calculate maxWidth")
		//console.log("Slides length: ", this.$slides.size()) 
		//console.time("Get width")
		//this.$slides.show().addClass("invisible")
		//console.timeEnd("Get width")
		//this.$slides.show().addClass("invisible")
		// Save time on calculating width if we know it.
		if(this.$slider.data("slide-width") != null) {
			this.slideWidth = this.$slider.data("slide-width")
			maxWidth = (this.slideWidth + this.padding) * this.$slides.size()
		}
		else {
			this.$slides.each(function() {
				if(!object.slideWidth)
					object.slideWidth = $(this).width()
				
				maxWidth += $(this).width() + object.padding
			})
		}	
		
		//console.log("Slide width: ", this.slideWidth, " Max width: ", maxWidth,
		//			" slices: ", this.$slides.size())
		
		this.$slider.width(object.slideWidth)
		this.$sliderContainer.width(maxWidth)
		this.maxWidth = maxWidth
		if(!refresh)
			this.$slides.addClass("invisible")
	},
	refresh: function() {
		this.buildSlider(true)
	},
	showSection: function(idx, cb, type) {
    	var type = typeof type == 'undefined' ? 'after' : 'before'
    	var cb = cb || null
    	this.currentIdx = idx
    	if($.isFunction(cb))
    	   this.sectionCallback(idx, type, cb)
		
		var offset = ((this.slideWidth + this.padding) * idx) * -1
		
		var beforeCb = this.sectionCallback(idx, "before")
		var afterCb = this.sectionCallback(idx, "after")
		if($.isFunction(beforeCb))
            beforeCb(this.$slides.eq(idx))
		
		this.$slides.removeClass("invisible")
		var object = this
		if($.isFunction(afterCb))
			this.$sliderContainer.animate({'margin-left': offset}, function() {
    			 afterCb(object.$slides.eq(idx))
            })
		else
			this.$sliderContainer.animate({'margin-left': offset})
	},
	sectionCallback: function(idx, type, cb) {
    	if($.isFunction(cb))
            this.callbacks[type + '-' + idx] = cb
        return this.callbacks[type + '-' + idx]
	},
	isLastSection: function() {
		if(this.currentIdx >= this.count() - 1)
			return true
		
		return false
	},
	count: function() {
		return this.$slides.size()
	}
})

PageController.extend("ScreenshotsPageController", {}, {
    init: function(toolName) {
        this.toolName = toolName
        
        var options = {options: {
            overlay: {close: true}, viewport: 'scale',
            skin: 'screenshots', padding: 10}
        }
		
		var screenshots = GPGTOOLS_SCREENSHOTS[this.toolName]
		
		$.each(screenshots, function() {
			this.url = screenshotURL(toolName, this.image)
			this.caption = this.description
		})
		console.log("Screenshots: ", screenshots)
		
		this._super(screenshots, options)
    }
})

TippedPageController.extend("ContactPageController", {}, {
	sliderController: null,
	init: function() {
		this.sliderController = null
		this._super('#contact-page', {animate: true, containment: '.container'})
	},
	contentLoaded: function() {
		this.setupSectionSlider()
		this.setupForm()
		
		this.sliderController.showSection(0)
	},
	setupForm: function() {
		var $form = this.$pageContent.find("form")
		var $dataNodes = $form.find("*")
		var $message = $form.find("textarea[name=message]")
			
		var object = this
		this.sliderController.sectionCallback(1, "after", function($slide) {
			if($form.find("input[name=private]").is(":checked")) {
				var encryptedMessage = encryptMessage($message.val())
				$form.append($("<input>").attr("type", "hidden").attr("name", "encrypted_message").val(encryptedMessage))
				$dataNodes = $.merge($form.find("[name=encrypted_message]"), $dataNodes.not($message))
			}
			var formData = $dataNodes.serialize() 
			
			$.postJSON($form.attr("action"), formData, function(o) {
				if(typeof o.success != 'undefined' && o.success)
					object.sliderController.showSection(2)
				else {
					// Delay the slide back a little for a better effact
					setTimeout(function() {
						object.sliderController.showSection(0, function() {
							object.showErrors(o, $form)
						})
					}, 250)
				}
			})		
		})
		
		$form.submit(function(evt) {
			evt.preventDefault()
			
			object.sliderController.showSection(1)
		})
		
		$form.find(".button").click(function(evt) {
			evt.preventDefault()
			
			$form.submit()
		})
	},
	setupSectionSlider: function() {
		this.sliderController = new SectionVerticalSliderController(this.$pageContent)
		this.sliderController.sectionCallback(1, "before", function($slide) {
			var $title = $slide.find("h1")
			var height = $slide.height()
			var spinnerHeight = 42
			var padding = $title.css("padding-top")
			titleOffset = Math.round(($slide.height() - $title.outerHeight()) / 2)
			$title.css("margin-top", titleOffset + parseInt(padding) + (spinnerHeight / 2))
			//$slide.css("height", height - titleOffset)
			$title.spin({color: '#646464', top: -67})
		})
	},
	viewDidHide: function() {
		var $element = this.$pageContent
		
		$element.find(".switcher form").css("margin-top", "0px")
		$element.find("form").find("input").not("input:checkbox").val('').end()
							 .find("textarea").html('').end()
							 .find("input:checkbox").removeAttr('checked')
	},
	showErrors: function(result, $form) {
		$form.find("input,textarea").each(function() {
			$(this).removeClass("error").parent().removeClass("error")
			if($.inArray($(this).attr("name"), result.errors) != -1)
				$(this).addClass("error").parent().addClass("error")
		})
		// Focus first error.
		$form.find("input.error,textarea.error").first().focus()
	}
})
