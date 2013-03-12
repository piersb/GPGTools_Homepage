<?php
    if(!defined('BASE_DIR'))
        define('BASE_DIR', realpath(dirname(__FILE__) . '/..'));
    define('BASE_DIR_VIEW', BASE_DIR . "/views");
    
    require_once BASE_DIR . '/lib/phpQuery/phpQuery.php';
    
    class LLView {
        public static $_instances = array();
        public static $_viewBaseDir = BASE_DIR_VIEW;
        public $_config = array();
        public static $_extension = "html";
        public $outputType = "html";
        
        public static function load($view) {
            // Check if the output type of the view is defined.
            $parts = preg_split("/:/", $view);
            
            $outputType = "html";
            if(!empty($parts[1]) && $parts[1] == "xml")
                $outputType = "xml";
            
            $view = $parts[0];
        	$view = substr($view, 0, strrpos($view, ".") ? strrpos($view, ".") : strlen($view));
        	$viewPath = realpath(self::$_viewBaseDir . '/' . $view . "." . self::$_extension);
            
            if(!file_exists($viewPath))
                throw new Exception("$view: View doesn't exist at $viewPath");
            
            if(!isset($instances[$viewPath])) {
                $instance = new LLView($viewPath);
                $instance->outputType = $outputType;
                self::$_instances[$viewPath] = $instance;
            }
            
            return self::$_instances[$viewPath];
        }
        
        public function __construct($viewPath) {
            $this->_viewPath = $viewPath;
        }
        
        public function set($key, $value) {
            $this->_config[$key] = $value;
        }
        
        public function render($config=array(), $fetch=false) {
            if(is_array($config))
                $this->_config = array_merge($this->_config, $config);
            
            return $this->_render($this->_config, $fetch);   
        }
        
        public function fetch($config=array()) {
	        return $this->render($config, true);
        }
        
        private function _render($config=array(), $fetch=false) {
            $doc_stack = array();
        
            // Load the given view as doc.
            $doc = $this->loadDocument($this->_viewPath, $config);
            $doc_stack[] = $doc;
        
            while($doc->find('base-view')->size()) {
                $base_view =  $doc->find('base-view')->attr('href');
                $doc = $this->loadDocument($base_view, $config);
                $doc_stack[] = $doc;
            }
        
            if(count($doc_stack) == 1)
                return $fetch ? $doc_stack[0] : $doc_stack[0]->htmlOuter();
        
            $doc_stack = array_reverse($doc_stack);
        
            // Site doc is the first doc.
            $doc = $doc_stack[0];
            for($i=1; $i < count($doc_stack); $i++) {
                $site_doc = $doc_stack[$i];
            
                $doc = $this->fillDocument($doc, $site_doc);
            }
        
            $content = phpQuery::newDocumentHTML($doc);
            if($fetch)
            	return $content;
            
            $content = $content->htmlOuter();
        
            $content = $this->cleanContent($content);
        
            return $content;
        }
        
        private function loadDocument($view_path, $config) {
            $content = $this->loadViewContents($view_path, $config);
            if($this->outputType == "xml") {
                $doc = phpQuery::newDocumentXML($content);
                return $doc;
            }
            
            try {
                $doc = phpQuery::newDocumentXHTML($content);
            }
            catch(Exception $e) {
                $doc = phpQuery::newDocumentHTML($content);
            }
            
            return $doc;
        }
        
        private function loadViewContents($view_path, $config=array()) {
            if($view_path == "")
                throw new Exception("Path can't be empty");
            
            if(file_exists(BASE_DIR . '/lib/helpers.php'))
                require_once BASE_DIR . '/lib/helpers.php';
                
            $_params = $config;
            extract($config);
        
            ob_start();
            include sprintf("%s/%s", BASE_DIR_VIEW, str_replace(BASE_DIR_VIEW, "", $view_path));
            $content = ob_get_clean();
            
            return $content;
        }
        
        private function fillDocument($doc, $site_doc) {
            foreach($site_doc->find('[fill]') as $el) {
                $pq_el = pq($el);
                $this->fill($doc, $site_doc, $pq_el);
            }
        
            $doc->find('body')->addClass("ASWOME");
        
            return $doc;
        }
        
        private function fill($doc, $site_doc, $node) {
            $method = $node->attr('method');
            $method = str_replace("-", "_", $method);
            $parts = preg_split("/_/", $method);
            $method = array_shift($parts);
            $children = array_shift($parts) == "children" ? true : false;
            $selector = $node->attr('fill');
            $nodes = $children ? $node->children() : $node;
            $method_name = $method == "replace" ? "replaceWith" : $method;
            // Treat special case for replace.
            $node->removeAttr('fill')->removeAttr('method');
            $doc_node = $doc->find($selector);
            
            if($method == "replace" && $children) {
                $doc_node->empty();
                $method_name = "append";
            }
            if(stristr($method,"wrap")) {
                $method_name = $method == "wrap" ? $method : "wrapInner";
                $nodes = $node->htmlOuter();
            }
            if(!method_exists($doc_node, $method_name))
                return;
            
            $doc_node->{$method_name}($nodes);
        }
        
        private function cleanContent($content) {
            if($this->outputType != "xml") {
                $content = str_replace('<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' . "\n", '', $content);
                $content = str_replace('<?xml version="1.0"?>', '', $content);
            }
            
            return $content;
        }
        
        private function removeHTMLComments($html) {
            // Remove all comments.
            return trim(preg_replace("/<!--(.*)-->/msU", "", $html));
        }
    }
    
    /**
     * Define some helper functions to be used in views.
     */
    function render_view($view, $config=array()) {
        $v = LLView::load($view);
        return $v->render($config);
    }
    
?>