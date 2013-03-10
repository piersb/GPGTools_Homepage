<?php
	define('ROOT_DIR', realpath(dirname(__FILE__) . '/..'));
	define('DB_FILE', ROOT_DIR . '/config/donors.db');

	define('DEBUG', true);
	define('ML_PREVIEW_GPGTOOLS_URL', 'https://gpgtools.org/early-birds/GPGTools-ML1.pkg');
	define('ML_PREVIEW_GPGMAIL_URL', 'https://gpgtools.org/early-birds/GPGMail-v2.0b5-ML3.pkg');
	define('ML_PREVIEW_SUBJECT', 'GPGMail for Mountain Lion says Hello Early Birds!');
	define('ML_PREVIEW_FROM_EMAIL', 'team@gpgtools.org');
	define('ML_PREVIEW_FROM_NAME', 'GPGTools Team');
		
    /* LIVE SETTINGS */
    define('PAYPAL_EMAIL', 'donations@gpgtools.org');
    define('PAYPAL_USERNAME', 'xxx');
    define('PAYPAL_PASSWORD', 'xxx');
    define('PAYPAL_SIGNATURE', 'xxx');
    define('PAYPAL_NVP' , 'https://api-3t.paypal.com/nvp');
    define('PAYPAL_URL', 'https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout');
    
    /* DEMO SETTINGS */
    define('PAYPAL_SANDBOX_EMAIL', 'xxx');
    define('PAYPAL_SANDBOX_USERNAME', 'xxx');
    define('PAYPAL_SANDBOX_PASSWORD', 'xxx');
    define('PAYPAL_SANDBOX_SIGNATURE', 'xxx');
    define('PAYPAL_SANDBOX_NVP', 'https://api-3t.sandbox.paypal.com/nvp');
    define('PAYPAL_SANDBOX_URL', 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout');
    define('PP_CONFIG_PATH', ROOT_DIR . '/config');
    
    define('GUMROAD_USERNAME', 'xxx');
    define('GUMROAD_PASSWORD', 'xxx');
    if($_SERVER['HTTP_HOST'] == 'gpgtools.leftandleaving.com')
    	define('GUMROAD_WEBHOOK_BASE_URL', 'http://gpgtools.leftandleaving.com/gumroad-webhook');
    else if($_SERVER['HTTP_HOST'] == 'gpgtools.allafine.com')
    	define('GUMROAD_WEBHOOK_BASE_URL', 'http://gpgtools.allafine.com/gumroad-webhook');
    
?>
