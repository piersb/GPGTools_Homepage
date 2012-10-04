<?php
    
    class LLSmartArray extends ArrayIterator {
        public function __construct($object) {
            $object = is_null($object) ? array() : $object;
            $this->_index = 0; 
            parent::__construct($object);
        }
        
        public function offsetGet($index) {
            $object = parent::offsetGet($index);
            if(is_array($object) || is_object($object))
                $object = new LLSmartArray($object);
            return $object;
        }
        
        public function get($index, $default=null) {
            if(!$this->offsetExists($index) && $default !== null) {
                return $default;
            }
            return $this->offsetGet($index);
        }
        
        public function offsetSet($key, $value) {
            parent::offsetSet($key, $value);
        }
        
        public function current() {
            $current = parent::current();
            if(is_array($current) || is_object($current))
                $current = new LLSmartArray($current);
            return $current;
        }
        
        public function next() {
            $this->_index++;
            return parent::next();
        }
        
        public function index() {
            return $this->_index;
        }
    } 
?>