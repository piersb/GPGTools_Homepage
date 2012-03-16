/* Author: Lukas Pitschl */
$(function() {
    $(".sweet-justice").each(function(i, o) {
        justify($(o))
    })
    $("nav li a").click(function(e) {
        var href = $(this).attr("href")
        $(window).scrollTo(href, 600)
        e.preventDefault()
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




