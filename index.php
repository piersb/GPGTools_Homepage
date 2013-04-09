<?
    require_once './lib/LLConfig.class.php';
    require_once './lib/LLView.class.php';
    require_once './lib/LLPayPalIPNListener.class.php';
    require_once './lib/extras/Slim/Slim.php';
    require_once './lib/extras/Gumroad/Client.php';
    require_once './lib/helpers.php';
    require_once './lib/db.php';
    
    // Register Slim framework auto loader.
    register_autoloaders();
    // Check if the script is called from cli and react appropriately.
    intercept_run_from_cli();
    
    $config = LLConfig::load("config/site.json");
    
    $app = new \Slim\Slim(array('view' => new \Slim\Extras\Views\LLView()));
    $app->add(new \Slim\Middleware\ContentTypes());
    
    $app->get('/', function() use($app, $config) {
	   	$view = is_mobile() ? "ios" : "index";
	   	$app->render($view, array(
	   		'config' => $config, 
	   		'sections' => $config->get('sections')));
    });
    
    $app->get('/message', function() {
	    require_once './lib/message.php';
		send_support_message();
		exit();
    });
    
    $app->get('/:tool/screenshots', function() {
	    render_screenshots($_SERVER['REQUEST_URI']);
        exit();
    });
    
    $app->get('/:tool/release-notes', function($tool) {
	    render_release_notes($tool);
	    exit();
    });
    
    $app->get('/:tool/download', function() {
	    download_tool($_SERVER['REQUEST_URI']);
    });
    
    $app->get('/js/:script', function($script) {
	   	$js_date = array();
	   	preg_match("{/script\.([0-9]+)\.js}", $script, $js_date);
	   	send_main_js($js_date[1]);
    });
    
    $app->map('/donation', function() {
	    add_donation($_REQUEST);
    })->via('GET', 'POST');
    
    // Generate the appcast for the requested tool.
    // The appcast will only include the latest version, since older
    // versions are irrelevant.
    $app->get('/releases/:name/appcast.xml', function($name) use($app, $config) {
        $section = $config->get('sections')->get($name);
        if(!$section)
            exit();
        
        $version_info = $section->get('version-info');
        if(!$version_info)
            exit();
        
        $newest_version = newest_version_from_versions($version_info["versions"]);
        if($newest_version === null)
            exit();
        
        $app->response()->header("Content-Type", "text/xml");
        ob_start();
        $app->render("release/appcast:xml", array("version_info" => $version_info, "tool" => $section, 
                                               "name" => $name, "newest_version" => $newest_version));
        $output = ob_get_flush();
        // Cache the output so it only has to be regenerated if the file changes.
        static_file_with_content("releases/$name/appcast.xml", $output);
    });
    
    // Generate the release notes for a tool from its version file.
    $app->get('/releases/:name/release-notes.html', function($name) use($app, $config) {
        $section = $config->get('sections')->get($name);
        if(!$section)
            exit();
        
        $version_info = $section->get('version-info');
        if(!$version_info)
            exit();
        
        ob_start();
        $app->render("release/release-notes", array("general" => $config->get("general"), "versions" => $version_info->get("versions")));
        $output = ob_get_flush();
        // Cache the output so it only has to be regenerated if the file changes.
        static_file_with_content("releases/$name/release-notes.html", $output);
    });
    
    // Display a preview of what the release notes will look like.
    // Release notes are coming from post data.
    $app->post('/releases/:name/preview-release-notes', function($name) use($app, $config) {
        $release_notes_json = $_POST["release_notes"];
        $release_notes = json_decode($release_notes_json);
        
        if($release_notes === null)
            exit();
        if(!isset($release_notes->info))
            exit();
        $app->render("release/release-notes", array("general" => $config->get("general"), "versions" => new LLSmartArray(array($release_notes))));
    });
    
    // React to updates on lighthouse, by for example posting them to our HipChat room.
    $app->map('/api/lighthouse-update', function() use($app, $config) {
        $notification = $app->request()->getBody();
        if(!isset($notification["version"]) || !isset($notification["version"]["project_id"]))
            return;
        
        $notification = $notification["version"];
        $url = "https://api.hipchat.com/v1/rooms/message";
        $room_id = "GPGTools";
        $from = "Lighthouse";
        $project_url = sprintf("https://gpgtools.lighthouseapp.com/projects/%s/tickets", $notification["project_id"]);
        $projects = array("65764" => "GPGMail",
                          "65684" => "GPG Keychain Access",
                          "66966" => "GPGPreferences",
                          "67607" => "GPGServices",
                          "65161" => "GPGTools Homepage",
                          "65162" => "GPGTools Installer",
                          "73378" => "Libmacgpg",
                          "66001" => "MacGPG2",
                          "65964" => "Organization");
        
        flog(sprintf("[LIGHTHOUSE UPDATE] [%s]:\n\t%s", date("Y-m-d H:i:s"), json_encode($notification)), "cache/lighthouse.log");
        
        // Check if attributes have been added.
        $attribute_update = count($notification["diffable_attributes"]);
        // Check if a ticket or a comment has been added.
        $new_ticket_or_comment = !$attribute_update && !empty($notification["body"]);
        $new_ticket = $notification["version"] == 1;
        $new_comment = !$new_ticket;
        $project_name = $projects[$notification["project_id"]];
        
        $attribute_map = array("state" => "Ticket state", "assigned_user" => "Responsible User", "importance" => "Importance",
                               "milestone" => "Milestone");
        $importance_map = array("1" => "High", "2" => "Medium", "3" => "Low");
        
        $message = "";
        if($new_ticket_or_comment) {
            if($new_ticket) {
                $message = sprintf('New ticket "%s" was created in <a href="%s">%s</a> by %s<br><a href="%s">%s</a>', 
                                     $notification["title"], $project_url, $project_name, 
                                     $notification["creator_name"], $notification["url"], $notification["url"]);
            }
            else {
                $message = sprintf('%s added a comment to ticket "%s" in <a href="%s">%s</a><br><br>%s<br><br><a href="%s">%s</a>',
                                   $notification["creator_name"], $notification["title"], $project_url, $project_name,
                                   mb_substr($notification["body_html"], 0, 200), $notification["url"], $notification["url"]);
            }
        }
        else if($attribute_update) {
            $attribute_info = array();
            if(count($notification["diffable_attributes"]) > 1) {
                foreach($notification["diffable_attributes"] as $attribute => $old_value) {
                    $name = isset($attribute_map[$attribute]) ? $attribute_map[$attribute] : $attribute;
                    $to_value = "";
                    if($attribute == "importance") {
                        $old_value = $importance_map[$old_value];
                        $to_value = $importance_map[$notification["importance"]];
                    }
                    else if($attribute == "assigned_user") {
                        $to_value = $notification["assigned_user_name"];
                    }
                    else if($attribute == "milestone") {
                        $to_value = $notification["milestone_title"];
                    }
                    else if($attribute == "state")
                        $to_value = $notification["state"];
                    
                    $attribute_info[] = sprintf("* %s was changed from %s to %s", $name, $old_value === null ? "N/A" : $old_value, 
                                                $to_value);
                }
                $attribute_info_str = join($attribute_info, "<br>");

                $message = sprintf('Attributes of ticket "%s" in <a href="%s">%s</a> have been changed by %s<br><br>%s<br><br><a href="%s">%s</a>',
                                   $notification["title"], $project_url, $project_name, $notification["creator_name"], $attribute_info_str,
                                   $notification["url"], $notification["url"]);
            }
            else {
                if(in_array("milestone", array_keys($notification["diffable_attributes"])))
                    $message = sprintf('Milestone of ticket "%s" has been changed to "%s" in <a href="%s">%s</a> by %s<br><a href="%s">%s</a>',
                                       $notification["title"], $notification["milestone_title"], $project_url, $project_name, $notification["creator_name"],
                                       $notification["url"], $notification["url"]);
                elseif(in_array("state", array_keys($notification["diffable_attributes"])))
                    $message = sprintf('Status of ticket "%s" has been changed to "%s" in <a href="%s">%s</a> by %s<br><a href="%s">%s</a>',
                                       $notification["title"], $notification["state"], $project_url, $project_name, $notification["creator_name"],
                                       $notification["url"], $notification["url"]);
                elseif(in_array("assigned_user", array_keys($notification["diffable_attributes"])))
                    $message = sprintf('%s is now responsible for ticket "%s" in <a href="%s">%s</a><br><a href="%s">%s</a>',
                                       $notification["assigned_user_name"], $notification["title"], $project_url, $project_name,
                                       $notification["url"], $notification["url"]);
                elseif(in_array("importance", array_keys($notification["diffable_attributes"])))
                    $message = sprintf('Importance of ticket "%s" has been changed to "%s" in <a href="%s">%s</a><br><a href="%s">%s</a>',
                                       $notification["title"], $notification["importance_name"], $project_url, $project_name, 
                                       $notification["url"], $notification["url"]);
            }
        }
        
        $params = array("format" => "json", "auth_token" => HIPCHAT_TOKEN,
                        "room_id" => $room_id, "from" => "Lighthouse",
                        "message" => $message,
                        "message_format" => "html",
                        "color" => "purple");
        flog(sprintf("\tHIPCHAT MESSAGE: %s\n", json_encode($params)), "cache/lighthouse.log");
        $response = http_request($url, true, $params);
    })->via('POST', 'GET');
    
    $app->post('/ipn/:type', function($type) use($app) {
	    $type = strtolower($type);
	    
	    if($type == "gumroad") {
		    flog(sprintf("[GUMROAD] [%s]:\n\t%s\n\t%s\n", date("Y-m-d H:i:s"),
	    				json_encode($_POST),
	    				json_encode($_SERVER)));
		    return;
	    }
	    
	    $donationInfoFromNotification = function($notification) use($type) {
		    $wants_to_be_listed = strtolower($notification["option_selection1"]) == "yes" ? true : false;
		    $qualifies_to_be_listed = (float) $notification["mc_gross"] >= 15 ? true : false;
		    $status = strtolower($notification["payment_status"]);
		    $info = array("transaction_status" => $status,
		    			  "display_name" => $wants_to_be_listed ?$notification["option_selection2"] : "",
		    			  "wants_to_be_listed" => $wants_to_be_listed,
		    			  "qualifies_to_be_listed" => $qualifies_to_be_listed,
		    			  "note" => $notification["option_selection3"],
		    			  "amount" => $notification["mc_gross"],
		    			  "firstname" => $notification["first_name"],
		    			  "lastname" => $notification["last_name"],
						  "transaction_id" => $notification["txn_id"],
						  "email" => $notification["receiver_email"],
						  "type" => "paypal",
						  "is_company" => false);
			
			return $info;     			  
	    };
	    
	    $listener = new LLPayPalIPNListener(DEBUG ? PAYPAL_SANDBOX_EMAIL : PAYPAL_EMAIL, DEBUG);
	    $listener->transactionHasBeenProcessed = function($transaction_id, $status) {
		  	$donation = select("donation", "*", "transaction_id = ?", array($transaction_id))->fetch();
		  	// If the transaction has not yet been processed, 
		  	// update the status to the received
		  	// one (for example to handle echecks.
		  	$processed = $donation["processed"];
		  	update("donation",
		  		   array("transaction_status" => strtolower($status)), 
		  			   	 "id = :id", array("id" => $donation["id"]));
		  	
		  	return $processed;
		  	
	    };
	    $listener->validNotificationReceived = function($notification) use($app, $type, $donationInfoFromNotification) {
		    flog(sprintf("%s - [VALID]:\n\t%s\n", date("Y-m-d H:i:s"),
	    				json_encode($notification)));
	    	$info = $donationInfoFromNotification($notification);
		    $app->applyHook('donation.completed', $info);
	    };

	    $listener->invalidNotificationReceived = function($notification) {
		    flog(sprintf("%s - [INVALID]:\n\t%s\n", date("Y-m-d H:i:s"),
		    json_encode($notification)));
		};
		
    	
    	$listener->handleNotification($app->request()->getBody());
    });
    
    $app->get('/gumroad-test', function() {
		$gumroad = new Gumroad\Client(GUMROAD_USERNAME, GUMROAD_PASSWORD);
		echo "<pre>";
		print_r($gumroad->getLinks());
		echo "</pre>"; 
    });
    
    $app->get('/gumroad-add', function() {
	  	$gumroad = authenticated_gumroad();
	  	$link = $gumroad->addLinkWithParams(array('name' => 'Donation for 10 euros - test 4',
	  								   'url' => 'http://gpgtools.allafine.com/gumroad-webhook/xh372',
	  								   'price' => 10.5,
	  								   'webhook' => 1,
	  								   'shownOnProfile' => 0,
	  								   'customReceipt' => 'This is some custom text which is displayed after donation is complated.'));
	  	echo "<pre>Return Link";
	  	print_r($link);
	  	echo "</pre>";
    });
    
    $app->map('/gumroad-link', function() use($app) {
	  	/*
$_POST = array();
	  	$_POST['amount'] = $_GET['amount'] ? $_GET['amount'] : 25;
	  	$_POST['add_to_friends'] = true;
	  	$_POST['display_name'] = $_GET['name'] ? $_GET['name'] : 'Jamie Jackson';
	  	$_POST['message'] = "Hey GPGTools-Team! You guys (and girls?) really rock! Fantastic work. Still needs some work on the UI but I'm sure you'll get their quickly!";
	  	
*/
	  	$data = $_POST;
	  	
	  	$transaction_id = transaction_id_form_gumroad_donation();
	  	$webhook_url = gumroad_webhook($transaction_id);
	  	$amount = (float) $data["amount"];
	  	
	  	$donation_data = array("transaction_id" => $transaction_id, "type" => "gumroad",
	  						   "display_name" => $data["display_name"], 
	  						   "amount" => $amount, 
	  						   "qualifies_to_be_listed" => (float) $data["amount"] >= 15 ? true : false,
	  						   "wants_to_be_listed" => $data['add_to_friends'] == '1' ? true : false,
	  						   "note" => $data["message"]); 
	  	
	  	$gumroad = authenticated_gumroad();
	  	$link = $gumroad->addLinkWithParams(array('name' => gumroad_donation_name($amount, $data["display_name"]),
	  											  'price' => $amount,
	  											  'url' => $webhook_url,
	  											  'webhook' => 1, 'shownOnProfile' => 0));
	  	
	  	$donation_data["special_url"] = $link->id;
	  	
	  	// Add the donation in the database.
	  	$id = add_donation($donation_data, $capture_errors=true, $errors);
	  	if(!$id)
	  		response_with_error("Failed to create donation.");
	  	
	  	response_with_success(array('url' => $link->shortURL));
    })->via('POST', 'GET');
    
    $app->map('/gumroad-webhook/:transaction_id', function($transaction_id) use($app) {
    	flog(sprintf("[Gumroad webhook] [%s] [%s]:\n\t%s\n\t%s\n", date("Y-m-d H:i:s"), $name,
	    			 json_encode($_POST),
	    			 json_encode($_SERVER)));
	    // Gumroad requires this to be text/plain.
	    $app->response()->header('Content-Type', 'text/plain');
	    
    	$request = $app->request();
	    // Find the donation by transaction id.
	    $donation = select("donation", "*", "transaction_id = ?", array($transaction_id))->fetch();
	    
	    $email = $request->params('email');
	    // No donation with that id, out of here!
	    if(!$donation || $request->params('permalink') != $donation["special_url"] ||
	       gumroad_price_for_amount($donation["amount"]) != $request->params('price') || empty($email))
	    	die("Now looky here. Trying to play with transaction id's. You're definitely a naughty one.");
	    
	    // Check if the donation has already been processed.
	    if($donation["transaction_status"] == "completed" ||
	       $donation["processed"] || !empty($donation["email"]))
	       die("Sorry, but we're closed for business. Once is enough!");
	    
	    update("donation", array("email" => $request->params('email'), "transaction_status" => "completed"), "id = :id", array("id" => $donation["id"]));
	    
	    $donation["email"] = $emails;
	    $donation["transaction_status"] = "completed";
	    
	    // Delete the gumroad link now.
	    $gumroad = authenticated_gumroad();
	    $gumroad->disableLinkWithID($request->params('permalink'));
	    
	    $app->applyHook('donation.completed', $donation);
	    
	    echo "http://gpgtools.allafine.com/this-is-rocking";
    })->conditions(array('transaction_id' => '[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}'))
      ->via('GET', 'POST');
    
    // This hook is invoked for each donation which is processed by
    // our payment gateways.
    $app->hook('donation.completed', function($donation) {
	    flog(sprintf("Donation received:\n\t%s", json_encode($donation)));
	    $errors = array();
		 
	    // Process the donation further only if the status is pending or
	    // completed.
	    $donation["processed"] = in_array($donation["transaction_status"], 
	    								  array("completed", "pending")) ? true : 
	    								  								   false;
	    // Check if a donation already exists for the transaction.
	    // This might be the case if the first status was neither completed nor
	    // pending.
	    $existing_donation = select("donation", "*", "transaction_id = ?", array($donation["transaction_id"]))->fetch();
	    if(!$existing_donation["id"])
	    	// Store the donation info.
	    	$donation_id = add_donation($donation, $capture_errors=true, $errors);
		else {
			update("donation",
		  		   array("processed" => $donation["processed"]), 
		  			   	 "id = :id", array("id" => $existing_donation["id"]));
		  	$donation_id = $existing_donation["id"];
		}
			
		
		// Leave here if the donation is not yet to be further processed.
		if(!$donation["processed"])
			return;
		
		// And last, check if the 
		
		if($donation_id)
			flog(sprintf("[%s]: success\n", $donation["transaction_id"]));
		else
			flog(sprintf("[%s]: failure - %s\n", $donation["transaction_id"], json_encode($errors)));
		
		// Check the amount and send out the GPGMail Mountain Lion preview email
		// if that's alright.
		if($donation["amount"] >= 15)
			send_donation_email(DEBUG === true ? 'lukas.pitschl@me.com' : 
												 $donation['email']);
	});
    
    $app->run();
    
    function flog($msg, $file="./paypal-ipn.log") {
	    if(!DEBUG)
	    	return;
	    
	    $fh = @fopen($file, "a");
        if(!$fh) {
        	echo $msg . "\n";
        	return;
        }
        fputs($fh, $msg . "\n");
        fclose($fh);
    }
    
    function render_screenshots($uri) {
        $config = LLConfig::load("config/site.json");
		
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
    
    function render_release_notes($name) {
	    $config = LLConfig::load("config/site.json");
		
		$tool = $name;
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
