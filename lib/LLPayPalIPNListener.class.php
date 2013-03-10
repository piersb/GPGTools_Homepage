<?php

define('PAYPAL_SANDBOX_IPN_VERIFICATION_URL', 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_notify-validate');
define('PAYPAL_IPN_VERIFICATION_URL', 'https://www.paypal.com/cgi-bin/webscr?cmd=_notify-validate');
	
class LLPayPalIPNListener {
	private $_verificationURL = null;
	private $_sandboxed = true;
	private $_accountEmail = null;
	private $_testAccountEmail = null;
		
	public function __construct($accountEmail, $sandboxed=false) {
		$this->_accountEmail = $accountEmail;
		$this->_testAccountEmail = "seller@paypalsandbox.com";
		$this->_sandboxed = $sandboxed;
	}
	
	public function handleNotification($notification) {
		parse_str($notification, $data);
		
		// Check with PayPal if this is a valid notification.
		$response = $this->_verifyNotification($notification);
		
		if($response->hasError()) {
			$error = $response->getError();
			flog(sprintf("Failed to verify notification: %s (%s)", 
				 $error->getMessage(), $error->getCode()));
			return;
		}
		
		$status = strtoupper($response->getContent());
		if($status == "VERIFIED")
			$this->_shouldHandleNotification($data) && 
				is_callable($this->validNotificationReceived) && 
				call_user_func($this->validNotificationReceived, $data);
		else if($status == "INVALID")
			is_callable($this->invalidNotificationReceived) && call_user_func($this->invalidNotificationReceived, $data);
	}
	
	private function _shouldHandleNotification($notification) {
		// Check if the paypal account email matches the one given
		// by IPN. It's possible someone else is using our IPN URL.
		$accountEmail = $this->_accountEmail;
		
		if($notification["business"] != $accountEmail) {
			flog(sprintf("Business email doesn't match - origin of the IPN might not be our account: %s != %s", $notification["business"], $accountEmail));
			return false;
		}
		
		// Avoid processing the donation again if it already has been
		// processed, by checking if a transaction with that ID already
		// exists in a database and if the status is already completed.
		// This check is performed by an external function.
		// If no external function is setup, ignore the check.
		if(is_callable($this->transactionHasBeenProcessed)) {
			$processed = call_user_func($this->transactionHasBeenProcessed, 
										$notification["txn_id"], $notification["payment_status"]);
			flog(sprintf("Transaction %s has already been processed?: %s",
						 $notification["txn_id"], $processed ? "Yes" : "No"));
			return !$processed;
		}
		
		return true;
	}
	
	private function _verifyNotification($notification) {
		// Send the received notification data back to PayPal to
		// verify if it should be further processed.
		// If VERIFIED is received, call the function installed to handle
		// valid notifications, otherwise invoke the function installed to handle
		// invalid ones.
		$response = $this->_call($this->_option("ipn_verification_url"), false, $notification);
		
		return $response;
	}
	
	private function _option($name) {
		$prefix = "PAYPAL_";
		if($this->_sandboxed)
			$prefix .= "SANDBOX_";
		$name = $prefix . strtoupper($name);
		
		if(defined($name))
			return constant($name);
	}
	
	private function _call($url, $get=true, $data=null, $onSuccess=null, $onError=null) {
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
}
	
?>