<?php

$DB_TABLES = array();

$DB_TABLES["donation"] = array(
	"id", "transaction_id", "transaction_status", "processed", "type", "section", "email", "display_name", "old_display_name", "firstname", "lastname",
	"amount", "special_url", "accessed", "is_company", "creation_date", "qualifies_to_be_listed", "wants_to_be_listed",
	"note");

function get_schema_for_table($table) {
	global $DB_TABLES;
	
	return $DB_TABLES[$table];
}

?>