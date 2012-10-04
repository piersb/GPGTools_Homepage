<?php
	define('SMALL_LIMIT', 512);
	define('LARGE_LIMIT', 131072);
	define('SPAM_ANSWER', 23);
	define('TENDER_PRIVATE_AREA_ADDRESS', 'tender2+cb5e0468ac58e282553f031abe813da40c4fc3b9b@tenderapp.com');
	define('TENDER_PUBLIC_AREA_ADDRESS', 'tender2+c1da82452ba855b39682ca42fd417db2b38492325@tenderapp.com');
	define('FROM_ADDRESS', 'GPGTools Website Message <noreply@gpgtools.org>');
	define('ANONYMOUS_USER', 'Anonymous GPGTools User');
	
	function sanitized_data($data) {
        foreach($data as $key => $value) {
            $data[$key] = filter_var($value, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
        }
        return $data;
    }
    
    function is_valid_email($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    function validate_message($data) {
	    $errors = array();
		
		if((int) $data['ham'] != SPAM_ANSWER)
			$errors[] = 'ham';
		if(empty($data['message']))
			$errors[] = 'message';
		if(!empty($data['email']) && !is_valid_email($data['email']))
			$errors[] = 'email';
		
		return $errors;
    }

    function anonymized_from($email) {
	    // Prevent exposing the email addresses of our users via Tender.
        // Try to make a readable name from the given email address.
        $email_parts = preg_split("/@/", $email);
        $name_parts = preg_replace("/([\+\.\-]+)/", " ", $email_parts[0]);
        $name_parts = preg_split("/ /", $name_parts);
        $new_name_parts = array();
        foreach(array_slice($name_parts, 0, 2) as $part)
            $new_name_parts[] = ucfirst($part);
        $name = join(" ", $new_name_parts);
        if(empty($name))
            $name = ANONYMOUS_USER;
        
        return $name;
    }

	function send_support_message() {
		$response = array("success" => true, "errors" => array());
		
		$data = sanitized_data($_REQUEST);
		if((int) $data['private'] == 1)
			$data['message'] = $data['encrypted_message'];
		
		$errors = validate_message($data);
		
		if(count($errors)) {
			$response['success'] = false;
			$response['errors'] = $errors;
			echo json_encode($response);
			return;
		}
		
		$data['message'] = substr($data['message'], 0, LARGE_LIMIT);
		$data['subject'] = substr($data['subject'], 0, SMALL_LIMIT);
		
		$subject = empty($data['subject']) ? "Message" : $data['subject'];
		$subject .= " (web)";
		$to = (int) $data['private'] == 1 ? TENDER_PRIVATE_AREA_ADDRESS : TENDER_PUBLIC_AREA_ADDRESS;
		
		$headers = array();
		$from = FROM_ADDRESS;
		
		if(is_valid_email($data['email'])) {
			$from = anonymized_from($data['email']);
			$from .= " <" . $data['email'] . ">";
		}
		$headers[] = "From: $from";
		
		mail($to, $subject, $data['message'], join("\r\n", $headers));
		
		echo json_encode($response);
		return;
	}
?>