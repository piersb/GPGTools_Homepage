/* Author: Lukas Pitschl */
$(function() {
    $(".sweet-justice").each(function(i, o) {
        justify($(o))
    })
    $("nav li a").click(function(e) {
        var href = $(this).attr("href")
        console.log(href)
        $(window).scrollTo("#gpgmail", 600)
        e.preventDefault()
    })
})

function justify($o) {
    // Take the text from the element and stick it into a new span.
    var $container = $("<span>").text($o.text()).hide()
    $o.append($container)
    var startSpacing = 0;
    var maxSpacing = 100;
    var maxWidth = $o.width()
    var optimalSpacing = 0;
    for(var i = 0; i < maxSpacing; i++) {
        $container.css("letter-spacing", i + "px")
        if($container.width() > maxWidth) {
            optimalSpacing = i - 1;
            break;
        }
    }
    $o.css("letter-spacing", optimalSpacing + "px").css("text-align", "center")
}




