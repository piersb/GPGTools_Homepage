/* Author: Lukas Pitschl */
$(function() {
    /* Adjust the Tipped light skin. */
    Tipped.Skins.light.radius = {size: 4}
    Tipped.Skins.light.background.opacity = 0.95
    Tipped.Skins.light.shadow = {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 1 },
      opacity: .15
    }
    $(".sweet-justice").each(function(i, o) {
        justify($(o))
    })
    $("nav.sections li a, nav.top li a").click(function(e) {
        e.preventDefault()
        var href = $(this).attr("href")
        $(window).scrollTo(href, 600, function() {
            // Ajdust the hash value.
            window.document.location.hash = href
        })
    })
    
    
    
    $("#gpgmail").find(".screenshots").click(function() {
        gpgmailScreenshots()
    })
    
    $("section .container .release-notes").click(function(evt) {
        evt.preventDefault()
        var controller = new SlidingPageController('./gpgmail-release-notes.html')
        controller.show()
    })
    
    // Open the versions tip.
    $(".download .versions-panel").each(function() {
        var id = $(this).attr("id")
        console.log("ID", id)
        Tipped.create(".versions-tip", id, {inline: true, hook: 'bottommiddle',
            target: 'self', offset: { y: 18 }, skin: 'light'
        })
    })
          
    $(".donate").click(function(e) {
        e.preventDefault()
        controller = new DonationPageController()
        controller.show()
    })
    $(".gpgmail-download, .gpgtools-download").click(function(e) {
        e.preventDefault()
        controller = new DonationPageController()
        controller.show()
    })
    
    /* Setup minor feature slider. */
    $(".tool").each(function() {
        var $tool = $(this)
        $tool.find(".minor-features li").each(function() {
            $(this).find("a").click(function(evt) { evt.preventDefault() })
            $(this).hover(function() {
                $tool.find(".arrow").stop()
                var $li = $(this)
                $tool.find(".arrow").animate({"left": $(this).data("arrowPosition") + "px"}, 100, function() {
                    $tool.find(".description").html($li.find("span").html()).css("visibility", "visible")
                })
            }, function() {
            })
        })
        $tool.find(".minor-features").hover(function() {
            $tool.find(".bar").css("visibility","visible")
            $tool.find(".arrow").show()
        }, function() {
            $tool.find(".bar").css("visibility","hidden")
            $tool.find(".arrow").hide()
            $tool.find(".description").css("visibility", "hidden")  
        })
    })
    
})

var PAYPAL_DONATION_URL = 'https://www.paypal.com/cgi-bin/webscr'

$.Class.extend("Controller", {}, {
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

Controller.extend("PageController", {
    init: function(url, additionalOptions) {
        this.pageURL = url
        this.$pageContent = null;
        // Define the basic design for the page lightview.
        this.options = {url: this.pageURL, options: {
            skin: 'mac', radius: 4.0, padding: 0.0
        }, type: 'ajax'}
        if($.isPlainObject(additionalOptions))
            $.extend(true, this.options, additionalOptions)
        console.log(additionalOptions)
        console.log("This options", this.options)
    },
    show: function() {
        // contentLoaded allows the page to be further setup
        // after its content is loaded.
        var options = {options: {afterUpdate: this._afterUpdateWrapper(this.contentLoaded)}}
        $.extend(true, this.options, options)
        Lightview.show(this.options)
    },
    _afterUpdateWrapper: function(callback) {
        var self = this
        return function(content) {
            self.$pageContent = $(content)
            if($.isFunction(callback))
                callback.apply(self, [])
        }
    }
})

PageController.extend("SlidingPageController", {
    init: function(url, additionalOptions) {
        var defaultOptions = {speed: 400}
        if($.isPlainObject(additionalOptions))
            $.extend(true, defaultOptions, additionalOptions)
        this._super(url, defaultOptions)
    },
    show: function() {
        var $page = this
        $.get(this.pageURL, function(html) {
            Tipped.hideAll()
            var $html = $(html)
            var $div = $("<div>")
            $div.css("position", "absolute").css("z-index", "9999")
            $div.addClass("slide-modal")
            $div.append(html)
            
            $div.hide()
            
            var $overlay = $("<div>")
            $overlay.css("width", $(document).width())
            $overlay.css("height", $(document).height())
            $overlay.addClass("overlay")
            
            $("body").append($div)
            
            $("body").append($overlay.hide())
            
            $div.css("height", $(window).height())
            $div.css("overflow", "auto")
            $div.css("top", $(window).scrollTop() + $(window).height() + 1)
            console.log($div.width())
            $div.css("left", ($(window).width() - $div.width())/2)
            console.log($page.options)
            
            // Disable scrolling on body.
            $("html,body").css("overflow", "hidden")
            
            $div.show()
            $overlay.fadeIn(300, function() {
                $div.animate({top: $(window).scrollTop() + 20}, $page.options.speed)    
            })
        })
    }
})

PageController.extend("ModalPageController", {
    init: function(url, additionalOptions) {
        // Add the options to make the lightview modal.
        var defaultOptions = {options: {
            controls: { close: false }, 
            overlay: { close: false },
            viewport: 'scale'
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
    }
})


ModalPageController.extend("DonationPageController", {
    init: function() {
        var options = {options: {width: 580}}
        var donationOption = null
        
        this._super('./donation-call.html', options)
    },
    contentLoaded: function() {
        console.log("Content loaded")
        var $paymentOptions = this.$pageContent.find(".payment-options")
        
        /*
this.$pageContent.find("#call-for-donation").noisy({
            'intensity' : 1, 
            'size' : 200, 
            'opacity' : 0.08, 
            'fallback' : '', 
            'monochrome' : false
        }).css('background-color', '#fff');
*/
        
        // Setup download buttons.
        this.setupDownload()
        
        // Setup payment options actions.
        var self = this
        $paymentOptions.find(".payment-option").each(function() {
            var $this = $(this)
            var funcName = $this.attr("id").replace("payment-option-", "")
            var fullFuncName = "use" + funcName[0].toUpperCase() + funcName.slice(1)
            $this.click(self._clickWrapper(self[fullFuncName], false))
        })
        
    },
    usePaypal: function(target) {
        this.donationOption = 'paypal'
        this.enableDownload()
        this.showAmountSlider()
        console.log("Use Paypal: ", target)
    },
    useBitcoin: function(target) {
        this.donationOption = 'bitcoin'
        this.enableDownload()
        console.log("Use Bitcoin: ", target)
    },
    useNodonation: function(target) {
        this.donationOption = 'nodonation'
        if(this.donationController)
            this.donationController.hide()
        this.enableDownload()
        this.fitContent()
        console.log("Use Nodonation: ", target)
    },
    showAmountSlider: function() {
        if(!this.donationController) {
            var gifts = [
                {id: 'first', amount: 0, nomarker: true, steps: 3, increment: 5},
                {id: '15', amount: 15, title: '› Early acces to new versions', steps: 7, increment: 5 },
                {id: '50', amount: 50, title: '› Let‘s be friends!<br>You‘re name will be on our website for your support!', 
                 steps: 10, increment: 5},
                {id: '100', amount: 100, title: '› Free T-Shirt', steps: 16, increment: 25},
                {id: '500', amount: 500, title: '› VIP STATUS w/elevated support', steps: 15, increment: 100},
                {id: '10000', amount: 2000, title: '&hearts; &hearts;<br>&hearts; &hearts; &hearts;<br>' + 
                                                   '&hearts; &hearts; &hearts; &hearts;<br>' + 
                                                   '&hearts; &hearts; &hearts; &hearts; &hearts;<br>' + 
                                                   '&hearts; &hearts; &hearts; &hearts; &hearts; &hearts;', 
                 steps: 15, increment: 200}]

            DonationSliderController.viewSelector = "#donation-slider-view"
            var controller = new DonationSliderController(5000, gifts)
            controller.setSuperview(this.$pageContent.find(".donation-slider-container")).removeClass("hidden")
            controller.slideToGift(15)

            this.donationController = controller
        }
        
        this.donationController.show()
        
        this.fitContent()
    },
    enableDownload: function() {
        this.$pageContent.find(".download-options li").addClass("enabled")
    },
    setupDownload: function() {
        this.$pageContent.find(".download-options li a").click(this._clickWrapper(this.download))
    },
    download: function(target) {
        // Don't react if no donation option is set. 
        if(this.donationOption == null)
            return;
        
        if(this.donationOption == 'paypal') {
            console.log("Amount: ", this.donationController)
            this.launchPayPal(this.donationController.amount())
        }
        
        console.log("Start download: ", target)
        // Close the modal.
        this.close()
    },
    launchPayPal: function(amount) {
        var $form = $("<form>").attr("action", PAYPAL_DONATION_URL).attr("method", "post")
        var data = {cmd: '_xclick', business: 'donations@gpgtools.org', lc: 'US', 
                    item_name: 'Help improving GPGTools', no_shipping: '1', 
                    'return': 'http://gpgtools.leftandleaving.com/donate.html',
                    cancel_return: 'http://gpgtools.leftandleaving.com/donate.html',
                    no_note: '1', tax: '0', charset: 'utf-8', cbt: 'Return to GPGTools',
                    currency_code: 'EUR', amount: amount}
        $.each(data, function(key, value) {
            var $input = $("<input>").attr("type", "hidden").attr("name", key).attr("value", value)
            $form.append($input)
        })
        this.$pageContent.find(".download-options").append($form)
        $form.submit()
    }
})

Controller.extend("DonationSliderController", {
    viewSelector: '',
    amountUpdaterInterval: 10,
    maxAmountUpdaterRuntime: 1000
}, {
    init: function(endAmount, gifts) {
        this.endAmount = endAmount
        this.gifts = gifts
        
        var data = {end_amount: endAmount, gifts: gifts}
        this.data = data
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
        $(this.data.gifts).each(function() {
            var gift = this
            
            var $gift = self.view().find(".gift-" + this.id)
            var value = width
            var nomarker = typeof gift.nomarker == 'undefined' ? false : gift.nomarker
            if(!nomarker) {
                $gift.find(".donation-step").click(self._clickWrapper(self.scrollToMarker))
                $gift.find(".donation-step").data('value', value)
                $gift.data('value', value)
                $gift.data('endValue', width + $gift.width())
            }
            else {
                $gift.data('value', 0).data('endValue', $gift.width())
            }
            
            width += $gift.width()
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
        var gifts = this.data.gifts
        var gift = null
        var prevGift = null
        var $gift = null
        var $prevGift = null
        var width = 0
        var self = this
        this.view().find("> ul .gift").each(function(i, o) {
            if(gift != null)
                return false
            
            width += $(this).width()
            // The max value is handled the same as maxValue - 1,
            // so set the the max value to max value - 1.
            if(sliderValue < width || (width >= self.view().find(".gift").eq(-1).data('endValue') && 
               sliderValue <= self.slider().width())) {
                var id = $(this).attr("class").split(" ")[0].replace("gift-", "")
                $gift = $(this)
                $prevGift = $gift.index() > 0 ? self.view().find(".gift").eq($gift.index()-1) : null
                $(gifts).each(function(i, o) {
                    if(gift != null)
                        return false
                    
                    if(this.id == id) {
                        gift = this
                        prevGift = gifts[i]
                    }
                })
            }
        })
        
        var delimiter = $gift.data('endValue') - $gift.data('value')
        var step = Math.round(delimiter/gift.steps)
        var amountBase = prevGift == null ? 0 : prevGift.amount
        var baseWidth = $gift.data('value')
        amount = amountBase + Math.round((sliderValue - baseWidth) / step) * gift.increment
        
        // Account for mis calculations.
        if(amount > this.data.end_amount)
            amount = this.data.end_amount
        // console.log("original value: ", sliderValue, " - delimiter: ", delimiter, " - stepsToDelimiter: ", gift.steps, " - step: ", step,
        //                     " - amountBase: ", amountBase, " - stepValue: ", gift.increment, " - baseWidth: ", baseWidth,
        //                     " - value: ", amount)
        
        return amount
    },
    _updateAndPositionAmount: function(amount, position) {
        var $amountElement = this.slider().find(".amount")
        // Update the displayed amount.
        $amountElement.html(amount + " &euro;").show()
        // Position the amount.
        this._positionAmountElement($amountElement, position)
        
        // Update the gifts to display all before and including amount.
        this._updateGiftsForAmount(amount)
    },
    _positionAmountElement: function($amountElement, value) {
        // Center the amount.
        // Calculate the width of the amount element and position
        var value = typeof value == 'undefined' ? this._value() : value
        var left = value - Math.round($amountElement.width() / 2)
        $amountElement.css("left", left + "px")
    },
    _updateGiftsForAmount: function(amount) {
        var self = this
        
        if(amount >= 15) {
            $(this.data.gifts).each(function() {
                var nomarker = typeof this.nomarker == 'undefined' ? false : this.nomarker
                if(amount >= this.amount && !this.nomarker) {
                    var showSelector = ".gift-" + this.id + " > div"
                    var hideSelector = ".gift-" + this.id
                    self.view().find(showSelector).addClass('visible')
                    self.view().find(hideSelector).nextAll().find('div').removeClass('visible')
                }
            })
        }
        else
            this.view().find("> ul > li > div").removeClass('visible')
    },
    amount: function() {
        var amount = this._normalizedAmountForValue(this._value())
        console.log("This _amonut: ", amount)
        return amount
    },
    setSuperview: function($superview) {
        $superview.append(this.view())
        this.viewWillAppear($superview)
        return $superview
    },
    view: function() {
        if(!this.$view) {
            $.templates("sliderView", {markup: DonationSliderController.viewSelector, 
                                       allowCode: true, debug: false});

            this.$view = $($.render.sliderView(this.data))
        }
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

function justify($o) {
    // Take the text from the element and stick it into a new span.
    var $container = $("<span>").text($o.text()).hide()
    // Add no-wrap to the container.
    $container.css("white-space", "nowrap")
    $o.append($container)
    var height = $container.height()
    var startSpacing = 0;
    var maxSpacing = 100;
    var maxWidth = $o.width()
    var optimalSpacing = 0;
    for(var i = 0; i < maxSpacing; i++) {
        $container.css("letter-spacing", i + "px")
        if($container.width() > maxWidth || $container.height() > height) {
            optimalSpacing = i - 1;
            break;
        }
    }
    $o.css("letter-spacing", optimalSpacing + "px").css("text-align", "center")
}




