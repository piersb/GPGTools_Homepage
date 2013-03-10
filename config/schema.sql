-- Holds all donations. --

CREATE TABLE `donation` (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	transaction_id varchar(255),
	transaction_status varchar(255),
	processed boolean,
	type varchar(255) NOT NULL,
	section varchar(255),
	email varchar(255),
	display_name varchar(255),
	old_display_name varchar(255),
	firstname varchar(255),
	lastname varchar(255),
	amount real NOT NULL,
	special_url varchar(255),
	accessed boolean,
	is_company boolean,
	qualifies_to_be_listed boolean DEFAULT '0',
	wants_to_be_listed boolean DEFAULT '0',
	note text,
	creation_date int(11) NOT NULL
);