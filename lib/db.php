<?php
	require_once realpath(dirname(__FILE__)) . '/../config/config.inc.php';
	require_once ROOT_DIR . '/config/schema.php';
	
	function db() {
		if(!isset($GLOBALS["db"])) {
			$GLOBALS["db"] = new PDO(sprintf("sqlite:%s", DB_FILE), null, null,
									 array(PDO::ATTR_EMULATE_PREPARES => false,
									       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
			if(!table_exists("donation"))
				create_db($GLOBALS["db"], 'schema.sql');
		}
		return $GLOBALS["db"];
	}
	
	function table_exists($table, $conn=null) {
		$conn = $conn ? $conn : db();
		$stmt = $conn->prepare(sprintf("SELECT name FROM sqlite_master WHERE type='table' AND name='%s'",
									   $table));
		$stmt->setFetchMode(PDO::FETCH_NAMED);
		$stmt->execute();
		
		$row = $stmt->fetch();
		
		if($row['name'] == $table)
			return true;
		
		return false;
	}
	
	function create_db($conn, $schema_sql_file) {
		// Load the contents of the schema file.
		$sql = file_get_contents(ROOT_DIR . '/config/' . $schema_sql_file);
		$conn->exec($sql);
	}
	
	function add($table, $data) {
		$schema = get_schema_for_table($table);
		unset($schema["id"]);
		
		if(!isset($data["creation_date"]) && in_array("creation_date", $schema))
			$data["creation_date"] = time();
		
		$sorted_data = array();
		$fields = array();
		$question_marks = array();
		foreach($schema as $field) {
			$fields[] = "`{$field}`";
			$sorted_data[":" . $field] = $data[$field];
			$question_marks[] = ":$field";
		}
		$sql = "INSERT INTO $table (" . join(",", $fields) . ") VALUES (" . join(",", $question_marks) . ")";
		$db = db();
		//echo "SQL: $sql<br>";
		$stmt = $db->prepare($sql);
		
		try {
			$stmt->execute($sorted_data);	
		}
		catch(Exception $e) {
			flog("Exception: $e");
			return null;
		}
		
		return $db->lastInsertId();
	}
	
	function select($table, $fields=array("*"), $where="", $where_data=array(), $order_by="", $limit="", $group_by="") {
		$db = db();
		if(!empty($fields) && !is_array($fields))
			$fields = array($fields);
		$sql = "SELECT " . join(",", $fields) . " FROM $table";
		if(!empty($where)) {
			$sql .= " WHERE $where";
		}
		if(!empty($order_by))
			$sql .= " ORDER BY $order_by";
		if(!empty($limit))
			$sql .= " LIMIT $limit";
		if(!empty($group_by))
			$sql .= " GROUP BY $group_by";
		
		$stmt = $db->prepare($sql);
		$stmt->setFetchMode(PDO::FETCH_NAMED);
		$stmt->execute($where_data);
		return $stmt;
	}
	
	function update($table, $data, $where="", $where_data=array()) {
		$schema = get_schema_for_table($table);
		unset($schema["id"]);
		
		$db = db();
		$update_fields = $update_data = array();
		if(empty($where) && (int)$data["id"] > 0) {
			$where = "id=:id";
			$where_data = array(":id" => $data["id"]);
			unset($data["id"]);
		}
		if(is_array($data)) {
			foreach($data as $key => $value) {
				if(!in_array($key, $schema))
					continue;
				$update_fields[] = "$key=:$key";
				$update_data[":$key"] = $value;
			}
		}
		else {
			$update_fields = array("$data");
		}
		$sql = "UPDATE $table SET " . join(",", $update_fields);
		if(!empty($where))
			$sql .= " WHERE $where";
		/* echo $sql . "<br>"; */
		$stmt = $db->prepare($sql);
		/*
echo "<pre>";
		print_r(array_merge($update_data, $where_data));
		echo "</pre>";
*/
		return $stmt->execute(array_merge($update_data, $where_data));
	}
	
	function update_multi($table, $data, $where="", $where_fields=array()) {
		$db = db();
		$update_fields = $update_data = array();
		if(!is_array($data[0]))
			$data = array($data);
		
		$update_datas = array();
		$i = 0;
		foreach($data as $item) {
			$data_item = array();
			foreach($item as $key => $value) {
				if($i == 0 && !in_array($key, $where_fields)) {
					$update_fields[] = "$key=:$key";
				}		
				$data_item[":$key"] = $value;
			}
			$update_datas[] = $data_item;  
			$i++;
		}
		
		$sql = "UPDATE $table SET " . join(",", $update_fields) . " WHERE $where";
		$stmt = $db->prepare($sql);
		foreach($update_datas as $item) {
			$stmt->execute($item);
		}
		return;
	}
	
	function delete($table, $where="", $where_data=array()) {
		$db = db();
		$sql = "DELETE FROM $table";
		if(!empty($where))
			$sql .= " WHERE $where";
		$stmt = $db->prepare($sql);
		return $stmt->execute($where_data);
	}
	
	function create_or_update($table, $data) {
		if((int) $data["id"] > 0)
			return update($table, $data);
		
		return add($table, $data);
	}
	
	function truncate($table) {
		$db = db();
		$sql = "TRUNCATE $table";
		$db->prepare($sql)->execute();
	}
?>