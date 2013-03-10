<?php

namespace Gumroad;

/**
 * Gumroad API Client
 *
 * @package Gumroad
 * @author  Kazunori Ninomiya <kazunori.ninomiya@gmail.com>
 * @license http://www.opensource.org/licenses/mit-license.php The MIT License
 */
class Client
{
    const END_POINT = 'https://gumroad.com/api/v1';

    public  $token;
    public  $endpoint;
    private $_timeout;
    private $_username;
    private $_password;
    private $_autoLogin = false;

    private $_apiResponseLinkMap = array("description" => "description", "name" => "name", 
    									 "preview_url" => "previewURL", "require_shipping" => "requireShipping",
    									 "webhook" => "webhook", "id" => "id", "price" => "price", 
    									 "currency" => "currency", "shown_on_profile" => "shownOnProfile", 
    									 "url" => "url", "country_available" => "countryAvailable",
    									 "remaining" => "remaining", "formatted_price" => "formattedPrice", 
    									 "short_url" => "shortURL", "views" => "views", "purchases" => "purchases", 
    									 "total" => "total", "custom_receipt" => "customReceipt");

    public function __construct($username=null, $password=null)
    {
        $this->token    = null;
        $this->endpoint = self::END_POINT;
        $this->_timeout = 2000;
        $this->_username = $username;
        $this->_password = $password;
    }

    public function getAuthenticateUrl()
    {
        return $this->endpoint . '/sessions';
    }

    public function getLinkUrl($id = '')
    {
        $url = $this->endpoint . '/links';
        if (strlen($id) > 0) {
            $url .= '/' . $id;
        }
        return $url;
    }

    public function setTimeout($timeout)
    {
        if (is_numeric($timeout)) {
            $this->_timeout = $timeout < 0 ? 1 : (int)$timeout;
        }
        return $this;
    }

    public function getTimeout()
    {
        return $this->_timeout;
    }

    public function authenticate($email, $password)
    {
        $params = array('email'    => $email,
                        'password' => $password);
        $url = $this->getAuthenticateUrl();
        $response = $this->_request('POST', $url, $params);
        $this->token = $response->token;

        return $this;
    }

    public function deauthenticate()
    {
        $url = $this->endpoint . '/sessions';
        $this->_request('DELETE', $url);
        $this->token = null;

        return $this;
    }

    public function addLink(Link & $link)
    {
    	$params = $link->toArray($this->_apiResponseLinkMap);
    	
    	$url = $this->getLinkUrl();
        $response = $this->_request('POST', $url, $params);
        
        $link->setFromArray((array) $response->link, $this->_apiResponseLinkMap);
        
        return $this;
    }
    
    public function addLinkWithParams(array $params) {
	    $link = new Link($params);
	    
	    $this->addLink($link);
	    
	    return $link;
    }

    public function editLink(Link $link)
    {
        $params = $link->toArray($this->_apiResponseLinkMap);
    	
    	$url = $this->getLinkUrl($link->id);
        $this->_request('PUT', $url, $params);

        return $this;
    }

    public function deleteLink(Link $link)
    {
        $url = $this->getLinkUrl($link->id);
        $this->_request('DELETE', $url, array());

        return $this;
    }
    
    public function disableLinkWithID($id) {
	    $link = new Link();
	    $link->id = $id;
	    
	    $this->disableLink($link);
    }

    public function enableLink(Link $link)
    {
        $url = $this->getLinkUrl($link->id) . '/enable';
        $this->_request('PUT', $url);
    }

    public function disableLink(Link $link)
    {
        $url = $this->getLinkUrl($link->id) . '/disable';
        $this->_request('PUT', $url);
    }

    public function getLink($id)
    {
        $url = $this->getLinkUrl($id);
        $response = $this->_request('GET', $url);
        return new Link((array) $response->link, $this->_apiResponseLinkMap);
    }

    public function getLinks()
    {
        $url = $this->getLinkUrl();
        $response = $this->_request('GET', $url);

        $links = array();
        foreach ($response->links as $link) {
            $links[] = new Link((array) $link, $this->_apiResponseLinkMap);
        }
        return $links;
    }

    private function _authenticateIfPossible($params=array()) {
	    // Check if username and password were setup before hand
	    // and that no token is available.
	    // Also don't try to authenticate if the params contain username
	    // and password which is already an authentication call.
	    if($this->token !== null)
	    	return;
	    
	    if(is_array($params) && (isset($params['username']) || isset($params['password'])))
	    	return;
	    
	    // Checks are fine, now let's authenticate.
	    $this->authenticate($this->_username, $this->_password);
    }

    private function _request($method, $url, array $params = array())
    {
    	$this->_authenticateIfPossible($params);
    
        $data = http_build_query($params);
        $ch   = curl_init();

        switch (strtoupper($method)) {
            case 'GET':
                if ($data != '') {
                    $url = $url . '?' . $data;
                }
                break;

            case 'POST':
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                break;

            case 'PUT':
            case 'DELETE':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                break;

            default:
                break;
        }

        if ($this->token !== null) {
            curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($ch, CURLOPT_USERPWD, $this->token . ':');
        }

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, $this->_timeout);
        $response = curl_exec($ch);

        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (preg_match('/\A(404|403|500)\z/', $code)) {
            throw new Exception('Network Error');
        }

        $error = curl_error($ch);
        if ($error) {
            throw new Exception($error);
        }

        $response = @json_decode($response);
        if (!$response) {
            throw new Exception('Network Error');
        }
        else if (!$response->success) {
            $message = 'Unknown Error';
            if (isset($response->error->message)) {
                $message = $response->error->message;
            }
            else if (isset($response->message)) {
                $message = $response->message;
            }
            throw new Exception($message);
        }

        return $response;
    }
}
