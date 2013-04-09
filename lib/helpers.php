<?php
	define('BASE_DIR', realpath(dirname(__FILE__) . '/../'));
	define('SSL_PORT', 443);
	if(BASE_DIR == '/') die();
	
	require_once BASE_DIR . '/lib/extras/UUID.class.php';
	
	function register_autoloaders() {
		\Slim\Slim::registerAutoloader();
    }
    
    function build_url($path) {
        $protocol = isset($_SERVER["HTTPS"]) ? (($_SERVER["HTTPS"] === "on" || $_SERVER["HTTPS"] === 1 || $_SERVER["SERVER_PORT"] === SSL_PORT) ? "https://" : "http://") :  (($_SERVER["SERVER_PORT"] === SSL_PORT) ? "https://" : "http://");
        $protocol = empty($_SERVER["HTTP_HOST"]) ? "https://" : "http://";
        $host = !empty($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "gpgtools.org";
        $url = sprintf("%s%s/%s", $protocol, $host, is_array($path) ? join($path, "/") : $path);
        
        return $url;
    }
    
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
		$screenshot_url = '../../images/screenshots/' . $tool;
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
    
    function send_main_js($date) {
    	ob_end_clean();
	 	ob_start();
	 	
	 	$config = LLConfig::load("config/site.json");
	 	$section_screenshots = array();
	 	foreach(($sections = $config->get('sections')) as $name => $section) {
		 	$screenshots = $section->get('screenshots');
		 	if(!is_array($screenshots) && !is_object($screenshots))
		 		continue;
		 	
		 	$section_screenshots[$name] = (array)$screenshots;
	 	}
	 	
	 	js_variable("GPGTOOLS_SCREENSHOTS", $section_screenshots);
	 	
	 	readfile(BASE_DIR . '/js/script.base.js');
	 	
	 	$js_code = ob_get_clean();
	 	
	 	// Write new js file to disk to cache it.
	 	// Only if debug mode is not enabled.
	 	if(!$config->get('debug')) {
			$dest_file = BASE_DIR . sprintf("/js/script.%s.js", $date);
			file_put_contents($dest_file, $js_code);
	 	}
	 	
	 	header("Content-Type: text/javascript");
	 	echo $js_code;
	 	exit();
    }
    
	function js_variable($key, $value) {
		echo "var $key = " . json_encode($value) . ";\n";
	}
	
	function add_donation($data, $capture_errors=false, & $errors=array()) {
		if(!isset($data["section"]))
			$data["section"] = true;
		$profile = new \DataFilter\Profile();
		$profile->addPreFilters(array('Trim', 'StripHtml'));
		// Add all possible fields, otherwise they're thrown out by the data
		// filter.
		foreach(get_schema_for_table("donation") as $field) {
			$profile->setAttrib($field, array("required" => false));
		}
			
		$profile->setAttrib("type", 
			array("required" => true, "rules" => array(
				"check_type" => array(
					"constraint" => function($value) {
						return in_array($value, array("paypal", "gumroad", "banktransfer", "bitcoin"));
					},
					"error" => "Invalid type"	
				)
			)
		));
		$profile->setAttrib("email", 
			array("required" => $data["type"] == "gumroad" ? false : true, 
			      "rules" => array(
			          "check_email" => array(
			              "constraint" => "Email",
			              "error" => "Please set a valid email address."
			      ))));
		$profile->setAttrib("amount", 
			array("required" => true, "rules" => array(
				"check_amount" => array("constraint" => "Number",
										"error" => "Amount must be a number."))));	
		
		$profile->setAttrib("section", array("required" => false, "preFilters" => 
			function($in) use($data) {
				$amount = (int) $data["amount"];
				if($amount >= 1000)
					return $data["is_company"] ? "company" : "vip";
				else if($amount >= 75)
					return "friends";
				else if($amount >= 15)
					return "supporters";
				return null;
			}
		));
		
		$profile->setAttrib("display_name", array("required" => true));
		
		if(!$profile->check($data)) {
			if($capture_errors) {
				$errors = $profile->getLastResult()->getInvalidOrMissingErrors();
				return null;
			}
			else
				response_with_errors(array_values($profile->getLastResult()->getInvalidOrMissingErrors()));	
		}
			
		
		$data = $profile->getLastResult()->getValidData();
		
		$id = add("donation", $data);
		
		if(!$capture_errors)
			response_with_success(array("message" => "Successfully added a new donor."));
		
		return $id;
	}
	
	function response_with_error($msg) {
		return _response_with_data(array(), $msg);
	}
	
	function response_with_errors($errors) {
		return _response_with_data(array("errors" => $errors), true);
	}
	
	function response_with_success($data=array()) {
		return _response_with_data($data);
	}
	
	function _response_with_data($data, $error_msg=null) {
		$response = array("success" => $error_msg === null);
		if($error_msg !== null)
			$response["error"] = $error_msg;
		$response = array_merge($response, $data);
		echo json_encode($response);
		exit();
	}
	
	function paypal_config($name, $sandbox=false) {
		$prefix = 'PAYPAL_';
		if($sandbox)
			$prefix .= 'SANDBOX_'; 
		
		return constant($prefix . strtoupper($name));
	}
	
	function section_for_amount($amount, $is_company=false) {
		if($amount >= 1000)
			return !$is_company ? "vip" : "company";
		else if($amount >= 75)
			return "friends";
		else if($amount >= 15)
			return "supporters";
		return "none";
	}
	
	function send_donation_email($to) {
		require_once BASE_DIR . '/lib/extras/swift/swift_required.php';
		
		$message = Swift_Message::newInstance();
		$message->setSubject(ML_PREVIEW_SUBJECT);
		$message->setFrom(array(ML_PREVIEW_FROM_EMAIL => ML_PREVIEW_FROM_NAME));
		$message->setTo($to);
		$message->setReplyTo(ML_PREVIEW_FROM_EMAIL);
		
		$view = LLView::load("early-bird-gift");
		$doc = $view->fetch(array('ml_gpgtools_url' => ML_PREVIEW_GPGTOOLS_URL, 'ml_gpgmail_url' => ML_PREVIEW_GPGMAIL_URL));
		$body = $doc->find("div")->html();
		
		$message->setBody($body);
		
		$mailer = Swift_Mailer::newInstance(Swift_SendmailTransport::newInstance());
		
		// To use the ArrayLogger
		$logger = new Swift_Plugins_Loggers_ArrayLogger();
		$mailer->registerPlugin(new Swift_Plugins_LoggerPlugin($logger));

		$result = $mailer->send($message);
		
		flog("Send donation mail: " . $logger->dump());
		
		return !$result ? false : true;
	}
	
	function authenticated_gumroad() {
		$gumroad = new Gumroad\Client(GUMROAD_USERNAME, GUMROAD_PASSWORD);
		
		return $gumroad;
	}
	
	function transaction_id_form_gumroad_donation() {
		// TODO: Eventually implement check to see if the transaction wasn't already used.
		// (Query DB)
		return UUID::get();
	}
	
	function gumroad_webhook($transaction_id) {
		return implode("/", array(GUMROAD_WEBHOOK_BASE_URL, $transaction_id));
	}
	
	function gumroad_donation_name($amount, $display_name) {
		$name = "GPGTools Donation for $amount euros";
		if(!empty($display_name))
			$name .= " by $display_name";
		return $name;
	}
	
	function gumroad_price_for_amount($amount) {
		return $amount * 100;
	}
	
	function newest_version_from_versions($versions) {
	    if(!is_array($versions) && get_class($versions) != "LLSmartArray")
	        return null;
	    
	    $newest_version = null;
	    foreach($versions as $version) {
	        if($version["newest-version"]) {
	            $newest_version = $version;
	            break;
	        }
	    }
	    
	    if($newest_version === null)
	        // Pick the first version as newest version.
	        return $versions[0];
	    
	    return $newest_version;
	}
	
	function info_from_feature_line($line) {
	    $info = array();
	    $commit_keywords = array("[PATCH]", "[FIX]", "[FEATURE]");
	    $parts = preg_split("/\n\n/", $line);
	    $info["title"] = trim(str_replace($commit_keywords, "", $parts[0]));
	    if(count($parts) > 1) {
	        $lines = preg_split("/\n/", $parts[1]);
	        $info["description"] = array();
	        foreach($lines as $line) {
	            $line = trim($line);
	            if(empty($line))
	                continue;
	            $info["description"][] = $line;
	        }
	    }
	    
	    return $info;
	}
	
	function static_file_with_content($filename, $content) {
	    $dir = dirname($filename);
	    
	    if(!is_dir($dir) && @!mkdir($dir, 0755, true))
	        return;
	    
	    $fp = @fopen($filename, "w");
	    @fputs($fp, $content);
	    @fclose($fp);
	}
	
	function intercept_run_from_cli() {
	    if(php_sapi_name() != "cli")
	        return;
	    
	    $argv = $GLOBALS["argv"];
	    // The first arg is the filename, don't really care about that.
	    array_shift($argv);
	    
	    $shortopts = "m:";
	    $longopts = array("method:");
        $usage = "Usage: index.php [options...] <url>\nOptions:\n -m, --method\tThe HTTP method to simulate: GET, POST, PUT or DELETE";
        
        $fail_with_error = function($error, $retcode=1) use($usage) {
	        echo sprintf("%s\n%s\n", $error, $usage);
	        exit($retcode);
	    };
	    
	    $emphasize = function($msg) {
	        if(!posix_isatty(STDOUT))
	            return $msg;
	        
	        return sprintf("\033[1m%s\033[0m", $msg);
	    };
        
        list($arguments, $options) = parse_cli_options($argv, $shortopts, $longopts);
        
        $url = count($arguments) ? parse_url($arguments[0], PHP_URL_PATH) : "";
        if(!count($arguments) || count($arguments) > 1 || empty($url))
            $fail_with_error($emphasize("No or invalid URL specified."));
	    
	    // Check the method if any given.
	    if(isset($options["method"]) && !in_array(strtolower($options["method"]), array("get", "post", "put", "delete")))
	        $fail_with_error($emphasize(sprintf("Invalid HTTP method: %s", $options["method"])));
	    
	    $url = $arguments[0];
	    $url_parts = parse_url($url);
	    $method = isset($options["method"]) ? strtoupper($options["method"]) : "GET";
	    
	    $data = array();
	    parse_str($url_parts["query"], $data);
        
	    $_SERVER["SERVER_PROTOCOL"] = "HTTP/1.1";
	    $_SERVER["REQUEST_METHOD"] = $method;
	    $_SERVER["REQUEST_URI"] = $url_parts["path"] . (!empty($url_parts["query"]) ? "?" . $url_parts["query"] : "");
	    $_SERVER["QUERY_STRING"] = $url_parts["query"];
	    
	    if($method == "GET")
	        $_GET = array_merge($_GET, $data);
	    if($method == "POST")
	        $_POST = array_merge($_POST, $data);
        
        $_REQUEST = array_merge($_POST, $_GET);
	}
	
	function parse_cli_options($arguments, $shortopts, $longopts=array()) {
	    $arguments = $arguments === null ? $GLOBALS["argv"] : $arguments;
	    
	    $options = getopt($shortopts, $longopts);
	    
	    $options_map = array("m" => "method");
	    $reversed_options_map = array_flip($options_map);
	    
	    // Clean ARGV so it only contains the actual arguments and none
	    // of the options.
	    foreach($arguments as $i => $arg) {
	        if(substr($arg, 0, 1) != "-")
	            continue;
	        
	        // We have an option, remove it.
	        unset($arguments[$i]);
	        
	        // Now let's find if the option has a value.
	        $pos = strpos($arg, "=");
	        // If there's an = in the option, simply remove the arg and be done with it.
	        if($pos !== false)
	            unset($arguments[$i]);
	        else {
	            // Check if the option is in shortops or long opts
	            // and if it allows values.
	            $arg = str_replace("-", "", $arg);
	            
	            if(preg_match("/^.*{$arg}:{1,2}.*$/i", $shortopts)) {
	                unset($arguments[$i + 1]);
	            }
	            else {
	                // Check the longopts.
	                foreach($longopts as $opt) {
	                    if(preg_match("/^{$arg}:{1,2}$/i", $opt))
	                        unset($arguments[$i + 1]);
	                }
	            }
	        }
	    }
	    // Join shortops and longopts if there's a corresponding
	    // longopt for a given shortopt.
	    foreach($options as $o => $a) {
	        // Determine if there's a matching long method. If so,
            // register the option under that name.
            $new_key = in_array($o, array_keys($options_map)) ? $options_map[$o] : (
                in_array($o, array_values($options_map)) ? $reversed_options_map[$o] : null);
            if($new_key !== null && $new_key != $o) {
                $options[$new_key] = $options[$o];
                unset($options[$o]);
            }
	    }
	    $arguments = array_merge($arguments);
        
        return array($arguments, $options);
	}
    
    function is_array_type($array) {
        return is_array($array) || (is_object($array) && get_class($array) == "LLSmartArray");
    }
    
    function http_request($url, $get=true, $data=null, $onSuccess=null, $onError=null) {
        // If data is an array, send a POST request.
        // Otherwise, use get.
        $method = $get ? "GET" : "POST";
        if($get && !empty($data)) {
            $data = is_array($data) ? http_build_query($data) : $data;
            $url .= (strpos($url, "?") != -1 ? "&" : "?") . $data;
        }
        $request = new \cURL\Request($url);
        $request->getOptions()->setTimeout(5)
                              ->setReturnTransfer(true)
                              ->setHTTPVersion(CURL_HTTP_VERSION_1_1)
                              ->setSSLVerifyPeer(1)
                              ->setSSLVerifyHost(2)
                              ->setForbidReuse(1)
                              ->setHTTPHeader(array("Connection: Close"));
        if($method == "POST")
            $request->getOptions()->setPost(true)
                                  ->setPostfields($data);

        $response = $request->send();
        
        if($response->hasError()) {
            is_callable($onError) && $onError($response);
        }
        
        is_callable($onSuccess) && $onSuccess($response);
        
        return $response;
    }
?>