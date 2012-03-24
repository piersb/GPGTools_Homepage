/* Author: Lukas Pitschl */
$(function() {
    $(".sweet-justice").each(function(i, o) {
        justify($(o))
    })
    $("nav.sections li a").click(function(e) {
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
    
    Tipped.create("section .container .release-notes a", "./gpgmail-release-notes.html", 
        { ajax: true, skin: 'light', hook: 'leftmiddle', fixed: true,
          closeButton: true });
          
    $(".donate").click(function(e) {
        e.preventDefault()
        Lightview.show({url: './donate.html', skin: 'mac', type: 'ajax'})
    })
    $(".gpgmail-download").click(function(e) {
        e.preventDefault()
        Lightview.show({url: './donation-call.html', 
            options: { skin: 'mac', radius: 4.0, padding: 0.0, 
                       controls: { close: false },
                       viewport: false,
                       width: 580,
                       afterUpdate: function(element) {
                           // Initialize the donation slider.
                           var $slider = $(element).find(".slider");
                           $(element).find(".slider").slider({
                               value: 0,
                               min: 0,
                               max: 485,
                               animate: 400,
                               // Use slide for calculation of the actual value to display, since it triggers
                               // on every mouse move.
                               slide: function(event, ui) { slideChange(element, event, ui) },
                               // Needs to be set for change as well, otherwise
                               // programatically changing the value doesn't have
                               // any immediate influence.
                               // change: function(event, ui) { slideChange(element, event, ui) },
                               start: function(event, ui) { 
                                   // If the user used the drag handle, the source element
                                   // is an anchor otherwise it's a div. The amount updater is only
                                   // used if a click on the slide bar occcurs.
                                   if(!$(event.srcElement).is("a"))
                                       runAmountUpdater(element)
                               }
                           });
                           $(element).find(".amount").html( $(element).find(".slider").slider("value") + " &euro;");
                           // Calculate the initial width of the amount element and position
                           var left = Math.round($(element).find(".amount").width() / 2)
                           $(element).find(".amount").css("left", left + "px")
                            
                           // Setup the donation step switcher.
                           $(element).find(".donation-step").click(function(evt) {
                               evt.preventDefault()
                               var amountPositionMap = {"15": 20, "50": 105, "100": 211, 
                                                        "500": 307, "10000": 408}
                               var $parent = $(this).parent("li")
                               var classes = $parent.attr("class").split(/\s+/)
                               var endAmount = classes[0].replace("gift-", "")
                               
                               // Hide the current amount.
                               //$slider.find(".amount").hide()
                               runAmountUpdater(element)
                               
                               $slider.slider('value', amountPositionMap[endAmount])
                           })
                           // Display the slider.
                           $(element).find(".payment-options").find("input[type=radio]").click(function() {
                               console.log(this)
                               if($(this).is(":checked")) {
                                   console.log("Enabled")
                                   // Reset the amount value.
                                   $slider.slider('value', 0)
                                   $(element).find("#call-for-donation .optional").removeClass("hidden")
                                   // Animate to 15 euros.
                                   $(element).find("li.gift-15 .donation-step").click()
                               }
                               else {
                                   console.log("Disabled")
                                   $(element).find("#call-for-donation .optional").addClass("hidden")
                               }
                               Lightview.refresh()
                           })
                           
                           
                           
                       }
                },
            type: 'ajax'})
    })
})


function runAmountUpdater(element) {
    var SLIDER_ANIMATION_INTERVAL = setInterval(function() {
           var endValue = $(element).find(".slider").slider('value')
           var value = $(element).find(".ui-slider-handle").position().left
           var amount = calculateAmount(value)
           
           $(element).find(".amount").html(amount + " &euro;" );
           // Calculate the width of the amount element and position
           var left = value - Math.round($(element).find(".amount").width() / 2)
           $(element).find(".amount").css("left", left + "px")
           
           updateGiftsForAmount(element, amount)
           
           // Stop once the position is matched.
           if(value == endValue)
               clearInterval(SLIDER_ANIMATION_INTERVAL)
       }, 10)
       // Sometimes the exact position is not matched for some reason,
       // so stop the Amount updater latest after 1 sec.
       setTimeout(function() {
           clearInterval(SLIDER_ANIMATION_INTERVAL)
       }, 1000)
}

function calculateAmount(actualValue) {
    var value = 0
    var ui = {value: actualValue}
    if(ui.value < 20) {
       var delimiter = 20;
       var stepsToDelimiter = 3;
       var step = Math.round(delimiter/stepsToDelimiter);
       var amountBase = 0;
       var stepValue = 5;
       value = amountBase + Math.round((ui.value - 0) / step) * stepValue;
   }
   else if(ui.value < 105) {
       var delimiter = 105 - 20;
       var stepsToDelimiter = 7;
       var step = Math.round(delimiter/stepsToDelimiter);
       var amountBase = 15;
       var stepValue = 5;
       value = amountBase + Math.round((ui.value - 20) / step) * stepValue;
   }
   else if(ui.value < 211) {
          var delimiter = 211 - 105;
          var stepsToDelimiter = 10;
          var step = Math.round(delimiter/stepsToDelimiter);
          var amountBase = 50;
          var stepValue = 5;
          value = amountBase + Math.round((ui.value - 105) / step) * stepValue;
   }
   else if(ui.value < 307) {
        var delimiter = 307 - 211;
        var stepsToDelimiter = 16;
        var step = Math.round(delimiter/stepsToDelimiter);
        var amountBase = 100;
        var stepValue = 25;
        value = amountBase + Math.round((ui.value - 211) / step) * stepValue;
    }
    else if(ui.value < 408) {
        var delimiter = 408 - 307;
        var stepsToDelimiter = 15;
        var step = Math.round(delimiter/stepsToDelimiter);
        var amountBase = 500;
        var stepValue = 100;
        value = amountBase + Math.round((ui.value - 307) / step) * stepValue;
    }
    else if(ui.value <= 485) {
        var delimiter = 485 - 408;
        var stepsToDelimiter = 15;
        var step = Math.round(delimiter/stepsToDelimiter);
        var amountBase = 2000;
        var stepValue = 200;
        value = amountBase + Math.round((ui.value - 408) / step) * stepValue;
    }
    return value
}

function updateGiftsForAmount(element, amount) {
    if(amount < 15)
        $(element).find(".donation-slider > ul > li > div").removeClass('visible')
    
    if(amount >= 15) {
        $(element).find(".gift-15 > div").addClass('visible')
        $(element).find(".gift-15").nextAll().find("div").removeClass('visible');
    }
   if(amount >= 50) {
      $(element).find(".gift-50 > div").addClass('visible')
      $(element).find(".gift-50").nextAll().find("div").removeClass('visible');
   }
   if(amount >= 100) {
      $(element).find(".gift-100 > div").addClass('visible')
      $(element).find(".gift-100").nextAll().find("div").removeClass('visible');
   }
   if(amount >= 500) {
      $(element).find(".gift-500 > div").addClass('visible')
      $(element).find(".gift-500").nextAll().find("div").removeClass('visible');
   }
   if(amount >= 2000)
      $(element).find(".gift-10000 > div").addClass('visible')
}

function slideChange(element, event, ui ) {
    var value = calculateAmount(ui.value)
       
    $(element).find(".amount").html( value + " &euro;" );
    // Calculate the width of the amount element and position
    var left = ui.value - Math.round($(element).find(".amount").width() / 2)
    $(element).find(".amount").css("left", left + "px")
    $(element).find(".amount").show()
    
    updateGiftsForAmount(element, value)
}


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




