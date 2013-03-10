<?php

namespace Gumroad;

/**
 * Gumroad Link
 *
 * @package Gumroad
 * @author  Kazunori Ninomiya <kazunori.ninomiya@gmail.com>
 * @license http://www.opensource.org/licenses/mit-license.php The MIT License
 */
class Link
{
    public $_allowedKeys = array("id", "name", "url", "price", "description",
    						   "previewURL", "requireShipping", "webhook",
    						   "currency", "shownOnProfile", "countryAvailable",
    						   "remaining", "formattedPrice", "shortURL", "views",
    						   "purchases", "total", "customReceipt");
    
    public function __construct(array $params = array(), $keyMap=array())
    {
    	if(is_array($keyMap) && count($keyMap) > 0)
    		$this->setFromArray($params, $keyMap);
    	else {
	    	foreach ($params as $key => $param) {
            	if (!in_array($key, $this->_allowedKeys))
            		continue;
	            	
	            $this->${key} = $param;
	        }
    	}
    }
    
    public function toArray($keyMap=array()) {
	    $link = array();
	    if(is_array($keyMap) && count($keyMap) > 0) {
		    foreach($keyMap as $key => $value) {
			    if(!isset($this->${value}))
		    		continue;
		    		
		    	$link[$key] = $this->${value};
		    }
	    }
	    else {
		    foreach($this->_allowedKeys as $key) {
		    	if(!isset($this->${key}))
		    		continue;
		    	
			    $link[$key] = $this->${key};
		    }
	    }
	    
	    return $link;
    }
    
    public function setFromArray($params, $keyMap=array()) {
	    foreach($keyMap as $key => $value) {
			if(isset($this->${value}) || (isset($this->${value}) && !isset($params[$key])))
				continue;
			
			$this->${value} = $params[$key];
	    }
    }
}
