<?
    require_once './lib/LLConfig.class.php';
    require_once './lib/LLView.class.php';
    require_once './lib/helpers.php';
    
    $config = LLConfig::load("config/site.json");
    
    if($_SERVER['REQUEST_URI'] == '/message') {
		require_once './lib/message.php';
		send_support_message();
		exit();
    }
    else if(stristr($_SERVER['REQUEST_URI'], '/screenshots')) {
        render_screenshots($_SERVER['REQUEST_URI']);
        exit();
    }
    else if(stristr($_SERVER['REQUEST_URI'], '/release-notes')) {
	    render_release_notes($_SERVER['REQUEST_URI']);
	    exit();
    }
    else if(stristr($_SERVER['REQUEST_URI'], '/download')) {
	    download_tool($_SERVER['REQUEST_URI']);
    }
    
    if(is_mobile()) {
	    $view = LLView::load("ios");
	    $view->set('config', $config);
	    echo $view->render(array('sections' => $config->get('sections')));
	    exit();
    }
    
    $view = LLView::load("index");
    $view->set('config', $config);
    echo $view->render(array('sections' => $config->get('sections')));
    
    function render_screenshots($uri) {
        $config = LLConfig::load("config/site.json");
		
		if (!preg_match("#/([^/]+)/screenshots#", $uri, $matches))
			return;
		        
        $tool = $matches[1];
        $sections = $config->get('sections');
        
        if(!$sections)
            return;
        
        $toolConfig = $sections->get($tool);
        
        if(!$toolConfig)
            return;
        
        $view = LLView::load("modals/screenshots");
        
        $view->set('config', $config);
        $view->set('tool', $tool);
        $view->set('screenshots', $toolConfig->get('screenshots', array()));
        echo $view->render();
    }
    
    function render_release_notes($uri) {
	    $config = LLConfig::load("config/site.json");
		
		if (!preg_match("#/([^/]+)/release-notes#", $uri, $matches))
			return;
		
        $tool = $matches[1];
        $sections = $config->get('sections');
        
        if(!$sections)
            return;
        
        $toolConfig = $sections->get($tool);
        
        if(!$toolConfig)
            return;
        
        $view = LLView::load("modals/release-notes");
        
        $view->set('config', $config);
        $view->set('tool', $tool);
        $view->set('versions', $toolConfig->get('version-info')->get('versions', array()));
        
        echo $view->render();
    }
    
    function download_tool($uri) {
	    $parts = parse_url($uri);
	    $path = $parts["path"];
	    
	    $path_parts = preg_split("{/}", $path);
	    
	    array_shift($path_parts);
	    array_shift($path_parts);
	    
	    function bail_out() {
		    //header("Location: https://www.gpgtools.org");
	    	exit();
	    }
	    
	    if(count($path_parts) != 2)
	    	bail_out();
	    
	    $config = LLConfig::load("config/site.json");
	    
	    $name = $path_parts[0];
	    $wanted_version = $path_parts[1];
	    $sections = $config->get('sections');
	    if(!$sections)
	    	bail_out();
	    
	    $tool = $sections->get($name);
	    if(!$tool)
	    	bail_out();
	    
	    $info = $tool->get('version-info');
	    if(!$info)
	    	bail_out();
	    
	    $versions = $info->get('versions');
	    
	    $found_version = null;
	    
	    foreach($versions as $version) {
		    if($version["version"] == $wanted_version)
		    	$found_version = $version;
	    }
	    
	    if(!$found_version)
	    	bail_out();
	    
	    $url = $found_version["sparkle"]["url"];
	    
	    if(!$url)
	    	bail_out();
	    
	    header("Location: " . $url);
	    exit();
    }
?>
