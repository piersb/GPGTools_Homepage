$(function() {
    var updateVersionIdx = $('[data-version="' + paramFromQuery("updateVersion") + '"]').index()
    var currentVersionIdx = $('[data-version="' + paramFromQuery("appVersion") + '"]').index()
    var osVersion = paramFromQuery("osVersion")
    
    console.log("osVersion: ", osVersion)
    
    if(updateVersionIdx == -1 && currentVersionIdx == -1)
        return
    
    $(".version").hide()
    $(".version").each(function() {
        var satisfiesMinVersion = !$(this).data("min-os") ? 1 : compareVersions(osVersion, $(this).data("min-os")) >= 0
        var satisfiesMaxVersion = !$(this).data("max-os") ? 1 : compareVersions(osVersion, $(this).data("max-os")) <= 0
        
        var versionSatisfiesRequirements = satisfiesMinVersion && satisfiesMaxVersion
        
        console.log("satisfiesMinVersion: ", satisfiesMinVersion, " compare-versions: ", compareVersions(osVersion, $(this).data("min-os")))
        
        if($(this).index() >= updateVersionIdx && $(this).index() < currentVersionIdx && versionSatisfiesRequirements)
            $(this).show()
    })
})

var URL_QUERY_STRING = null
function paramFromQuery(key) {
    if(URL_QUERY_STRING == null) {
        var queryVars = document.location.search ? document.location.search.substr(1).split('&') : []
        URL_QUERY_STRING = {}
        for(var i = 0; i < queryVars.length; ++i) {
            var parts = queryVars[i].split("=")
            URL_QUERY_STRING[parts[0]] = parts.length == 2 ? parts[1] : ""
        }
    }
    if(typeof key == "undefined")
        return URL_QUERY_STRING
    
    return key in URL_QUERY_STRING ? URL_QUERY_STRING[key] : null;
}

function compareVersions(a, b) {
    var v1 = a.toString().split('.')
    var v2 = b.toString().split('.')
    
    for(var i = 0; i < Math.min(v1.length, v2.length); i++) {
        var res = parseInt(v1[i]) - parseInt(v2[i])
        if (res != 0)
            return res >= 1 ? 1 : -1
    }
    return 0
}