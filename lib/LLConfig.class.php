<?php
    
    define('BASE_DIR', realpath(dirname(__FILE__) . '/..'));
    define('CONFIG_BASE_DIR', BASE_DIR  . '/config');
    
    require_once BASE_DIR . '/lib/LLSmartArray.class.php';
    
    class LLConfig implements ArrayAccess {
        public static $_instances = array();
        public static $_configBaseDir = CONFIG_BASE_DIR;
        public $_config = array();
        
        public static function load($configFile) {
            $configPath = realpath(BASE_DIR . '/' . $configFile);
            
            if(!file_exists($configPath))
                throw new Exception("$configFile: Config file doesn't exist at $configPath");
            
            if(!isset($instances[$configPath])) {
                $instance = new LLConfig($configPath);
                $instance->_load();
                self::$_instances[$configPath] = $instance;
            }
            
            return self::$_instances[$configPath];
        }
        
        public function __construct($path) {
            $this->_configPath = $path;
        }
        
        private function _load() {
            $configData = file_get_contents($this->_configPath);
            $config = json_decode($configData);
            
            $this->mergeReferencedConfigs($config);
            $this->_config = new LLSmartArray($config);
        }
        
        public function mergeReferencedConfigs(& $config) {
            foreach($config as $key => & $value) {
                if(is_array($value) || is_object($value)) {
                    $this->mergeReferencedConfigs($value);
                }
                else {
                    if(!is_string($value) || 
                      (is_string($value) && substr($value, 0, 2) != './'))
                      continue;
                
                    try {
                        $c = LLConfig::load('config/' . $value);
                        $config->$key = $c->toArray();
                    }
                    catch(Exception $e) {}
                }
            }
        }
        
        public function toArray() {
            return $this->_config;
        }
        
        public function get($key) {
            return $this->offsetGet($key);
        }
        
        public function offsetExists($offset) {
            return isset($this->_config[$offset]);
        }
        
        public function offsetGet($offset) {
            return $this->_config[$offset];
        }
        
        public function offsetSet($index, $value) {}
        public function offsetUnset($index) {}
    }
?>