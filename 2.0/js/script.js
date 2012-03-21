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
        Lightview.show({url: './donate.html', skin: 'light', type: 'ajax'})
    })
    $(".gpgmail-download").click(function(e) {
        e.preventDefault()
        Lightview.show({url: './donation-call.html', skin: 'light', type: 'ajax'})
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




