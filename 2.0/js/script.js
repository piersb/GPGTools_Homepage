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
                       viewport: 'scale',
                       width: 580,
                       afterUpdate: function(element) {
                           // Initialize the donation slider.
                           var $slider = $(element).find(".slider");
                           $(element).find(".slider").slider({
                               value: 0,
                               min: 0,
                               max: 485,
                               // Use slide for more precise movement, since it triggers
                               // on every mouse move.
                               slide: function( event, ui ) {
                                   var value = 0
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
                           
                                   
                                   $(element).find(".amount").html( value + " &euro;" );
                                   // Calculate the width of the amount element and position
                                   var left = ui.value - Math.round($(element).find(".amount").width() / 2)
                                   $(element).find(".amount").css("left", left + "px")
                                   
                                   if(value < 15) {
                                      $(element).find("#call-for-donation > ul > li").removeClass('visible')
                                   }
                                   if(value >= 15) {
                                      $(element).find(".gift-15").addClass('visible')
                                      $(element).find(".gift-15").nextAll().removeClass('visible');
                                   }
                                   if(value >= 50) {
                                      $(element).find(".gift-50").addClass('visible')
                                      $(element).find(".gift-50").nextAll().removeClass('visible');
                                   }
                                   if(value >= 100) {
                                      $(element).find(".gift-100").addClass('visible')
                                      $(element).find(".gift-100").nextAll().removeClass('visible');
                                   }
                                   if(value >= 500) {
                                      $(element).find(".gift-500").addClass('visible')
                                      $(element).find(".gift-500").nextAll().removeClass('visible');
                                   }
                                   if(value >= 2000)
                                      $(element).find(".gift-10000").addClass('visible')
                                    // var $slider = $(element).find(".slider")
                                    //                                     var step = $slider.slider('option', 'step');
                                    //                                     if(ui.value < 50) {
                                    //                                         $slider.slider('option', 'step', 2);
                                    //                                     }
                                    //                                     if(ui.value >= 50) {
                                    //                                         $slider.slider('option', 'step', 10);
                                    //                                     }
                                    //                                     if(ui.value >= 100) {
                                    //                                         $slider.slider('option', 'step', 20);
                                    //                                     }
                                    //                                     if(ui.value >= 500) {
                                    //                                         $slider.slider('option', 'step', 30);
                                    //                                     }
                                    //                                     if(ui.value >= 2000) {
                                    //                                         $slider.slider('option', 'step', 40);
                                    //                                     }
                               }
                               
                           });
                           $(element).find(".amount").html( $(element).find(".slider").slider("value") + " &euro;");
                           // Calculate the initial width of the amount element and position
                           var left = Math.round($(element).find(".amount").width() / 2)
                           $(element).find(".amount").css("left", left + "px")
                       }
                },
            type: 'ajax'})
    })
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




