$(function() {
    $(".lightview-bug").click(function(e) {
        e.preventDefault()
        Lightview.show({url: './donation-call-lightview.html', 
            options: { skin: 'mac', radius: 4.0, padding: 0.0, 
                       controls: { close: false },
                       width: 580,
                       afterUpdate: function(element) {
                           // Display the slider.
                           $(element).find(".payment-options").find("input[type=radio]").click(function() {
                               console.log(this)
                               if($(this).is(":checked")) {
                                   console.log("Enabled")
                                   // Reset the amount value.
                                   $(element).find("#call-for-donation .optional").removeClass("hidden")
                               }
                               else {
                                   console.log("Disabled")
                                   $(element).find("#call-for-donation .optional").addClass("hidden")
                               }
                               console.log("Refreshing lightview")
                               console.log("Current height: ", $("#lv_window").height())
                               Lightview.refresh()
                           })
                       }
                },
            type: 'ajax'})
    })
})