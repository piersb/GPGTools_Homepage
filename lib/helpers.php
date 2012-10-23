<?php
	define('BASE_DIR', realpath(dirname(__FILE__) . '/../'));
	
    function short_name($section) {
        return empty($section['short-name']) ? $section['name'] : $section['short-name'];
    }
    
    function current_version($section) {
	    return $section['version-info']['current-version'];
    }
    
    function is_mobile() {
	    $iPod = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
	    $iPhone = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
	    $iPad = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
	    $Android= stripos($_SERVER['HTTP_USER_AGENT'],"Android");
	    $webOS= stripos($_SERVER['HTTP_USER_AGENT'],"webOS");
	    
	    if($iPod !== false || $iPhone !== false || $Android !== false || $webOS !== false)
	    	return true;
	    	
	    return false;
    }
    
    function render_image_tag($path, $rel_path, $attrs) {
	    if(!file_exists($path))
	    	return "";
	    
	    $size = getimagesize($path);
	    $attrs = array_merge(
	    	array("src" => "$rel_path", "width" => $size[0], "height" => $size[1]),
	    	$attrs);
	    
	    $attrs_str = array();
	    foreach($attrs as $key => $value) {
		    $attrs_str[] = sprintf('%s="%s"', $key, addslashes($value));
	    }
	    
	    return sprintf("<img %s />", join(" ", $attrs_str));
    }
    
    function screenshot_thumbnail($tool, $screenshot, $max_width, $max_height) {
		$screenshot_path = BASE_DIR . '/images/screenshots/' . $tool;
		$screenshot_url = dirname($_SERVER["SCRIPT_NAME"]) . '/images/screenshots/' . $tool;
		$path = $screenshot_path . '/' . $screenshot['image'];
		$url = $screenshot_url . '/' . $screenshot['image'];
		
		$size = getimagesize($path);
		
		$ratio = $size[1] / $size[0];
		
		$newRatioHeight = $max_width * $ratio;
		$newRatioWidth = $max_height / $ratio;
		
		$newWidth = $newHeight = 0;
		
		$top = $left = 0;
		
		if($newRatioWidth <= $max_width) {
			$newWidth = $max_width;
			$newHeight = round($newWidth * $ratio);
			$top = ceil(($newHeight - $max_height) / 2);
		}
		else {
			$newHeight = $max_height;
			$newWidth = round($newHeight / $ratio);
			$left = ceil(($newWidth - $max_width) / 2);
		}
		
		$attrs = array("data-full-width" => $size[0], "data-full-height" => $size[1],
					   "width" => $newWidth, "height" => $newHeight, "alt" => $screenshot['title'],
					   "style" => sprintf("position: relative; top: %(s)px; left: %(s)px",
					   					  $top, $left));
		
		return render_image_tag($path, $url, $attrs);
    }
?>