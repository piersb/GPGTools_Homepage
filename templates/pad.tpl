<?xml version="1.0" encoding="UTF-8" ?>
<XML_DIZ_INFO>
	<MASTER_PAD_VERSION_INFO>
		<MASTER_PAD_VERSION>3.10</MASTER_PAD_VERSION>
		<MASTER_PAD_EDITOR></MASTER_PAD_EDITOR>
		<MASTER_PAD_INFO></MASTER_PAD_INFO>
	</MASTER_PAD_VERSION_INFO>
	<Company_Info>
		<Company_Name>GPGTools Project Team</Company_Name>
		<Address_1>No Street</Address_1>
		<Address_2 />
		<City_Town>No City</City_Town>
		<State_Province />
		<Zip_Postal_Code>0000</Zip_Postal_Code>
		<Country>No Country</Country>
		<Company_WebSite_URL>http://gpgtools.org</Company_WebSite_URL>
		<Contact_Info>
			<Author_First_Name>GPGTools></Author_First_Name>
			<Author_Last_Name>Project Team </Author_Last_Name>
			<Author_Email>gpgtools-org@lists.gpgtools.org</Author_Email>
			<Contact_First_Name>GPGTools</Contact_First_Name>
			<Contact_Last_Name>Project Team</Contact_Last_Name>
			<Contact_Email>gpgtools-org@lists.gpgtools.org</Contact_Email>
		</Contact_Info>
		<Support_Info>
			<Sales_Email>gpgtools-users@lists.gpgtools.org</Sales_Email>
			<Support_Email>gpgtools-users@lists.gpgtools.org</Support_Email>
			<General_Email>gpgtools-users@lists.gpgtools.org></General_Email>
			<Sales_Phone />
			<Support_Phone />
			<General_Phone />
			<Fax_Phone />
		</Support_Info>
	</Company_Info>
	<Program_Info>
		<Program_Name>{$title}</Program_Name>
		<Program_Version>{$version}</Program_Version>
		<Program_Release_Month>{$month}</Program_Release_Month>
		<Program_Release_Day>{$day}</Program_Release_Day>
		<Program_Release_Year>{$year}</Program_Release_Year>
		<Program_Cost_Dollars />
		<Program_Cost_Other_Code />
		<Program_Cost_Other />
		<Program_Type>Freeware</Program_Type>
		<Program_Release_Status>New Release</Program_Release_Status>
		<Program_Install_Support>Install and Uninstall</Program_Install_Support>
		<Program_OS_Support>Mac OS X</Program_OS_Support>
		<Program_Language>English</Program_Language>
		<Program_Change_Info />
		<Program_Specific_Category>Utilities</Program_Specific_Category>
		<Program_Category_Class>Security &amp; Privacy::Encryption Tools</Program_Category_Class>
		<Program_Categories />
		<Program_System_Requirements />
		<File_Info>
			<File_Size_Bytes>{$changelog[$changelog|@key][1]['sparkle_size']}</File_Size_Bytes>
			<File_Size_K>{math equation="round(x / 1000)" x=$changelog[$changelog|@key][1]['sparkle_size']}</File_Size_K>
			<File_Size_MB>{math equation="round(x / 1000000)" x=$changelog[$changelog|@key][1]['sparkle_size']}</File_Size_MB>
		</File_Info>
		<Expire_Info>
			<Has_Expire_Info>N</Has_Expire_Info>
			<Expire_Count />
			<Expire_Based_On />
			<Expire_Other_Info />
			<Expire_Month />
			<Expire_Day />
			<Expire_Year />
		</Expire_Info>
	</Program_Info>
	<Program_Descriptions>
		<English>
			<Keywords />
			<Char_Desc_45 />
			<Char_Desc_80 />
			<Char_Desc_250>{$short_description}</Char_Desc_250>
			<Char_Desc_450 />
			<Char_Desc_2000 />
		</English>
	</Program_Descriptions>
	<Web_Info>
		<Application_URLs>
			<Application_Info_URL>http://www.gpgtools.org/{$name}/index.html</Application_Info_URL>
			<Application_Order_URL />
			<Application_Screenshot_URL>http://www.gpgtools.org/images/{$screenshots|@key}</Application_Screenshot_URL>
			<Application_Icon_URL>http://www.gpgtools.org/images/{$img_logo}</Application_Icon_URL>
			<Application_XML_File_URL>http://www.gpgtools.org/{$name}/pad.xml</Application_XML_File_URL>
		</Application_URLs>
		<Download_URLs>
			<Primary_Download_URL>{$changelog[$changelog|@key][1]['sparkle_url']}</Primary_Download_URL>
			<Secondary_Download_URL />
			<Additional_Download_URL_1 />
			<Additional_Download_URL_2 />
		</Download_URLs>
	</Web_Info>
	<Permissions>
		<Distribution_Permissions />
		<EULA />
	</Permissions>
</XML_DIZ_INFO>
