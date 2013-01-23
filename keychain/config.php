<?php /*compileIgnore*/


$version='1.0b7';

$release['1.0b7'] = mktime(12, 0, 0, 3, 8, 2012);
$release['1.0b6'] = mktime(12, 0, 0, 12, 19, 2011);
$release['1.0b5'] = mktime(12, 0, 0, 11, 25, 2011);
$release['1.0b3'] = mktime(12, 0, 0, 11, 16, 2011);
$release['1.0b2'] = mktime(12, 0, 0, 11, 15, 2011);
$release['1.0b1'] = mktime(12, 0, 0, 11, 12, 2011);
$release['0.8.13'] = mktime(12, 0, 0, 7, 11, 2011);
$release['0.8.10'] = mktime(12, 0, 0, 4, 29, 2011);
$release['0.8.7'] = mktime(12, 0, 0, 3, 24, 2011);
$release['0.8.6'] = mktime(12, 0, 0, 3, 22, 2011);
$release['0.8.4'] = mktime(12, 0, 0, 2, 22, 2011);
$release['0.8.2b'] = mktime(12, 0, 0, 1, 23, 2011);
$release['0.8.1b'] = mktime(12, 0, 0, 1, 22, 2011);
$release['0.8.0b'] = mktime(12, 0, 0, 1, 16, 2011);
$release['0.3.1b'] = mktime(12, 0, 0, 12, 11, 2010);
$current=$release[$version];

$theSite->assign('title', 'GPG Keychain Access');
$theSite->assign('name', 'keychain');
$theSite->assign('img_logo', 'images/logo-128px.png');
$theSite->assign('url_base', 'GPGTools/GPGKeychainAccess');
$theSite->assign('url_dl', "GPG%20Keychain%20Access-$version.dmg");
$theSite->assign('url_beta', '');
$theSite->assign('url_sig', "GPG%20Keychain%20Access-$version.dmg.sig");
$theSite->assign('url_wiki', 'wiki');
$theSite->assign('version', $version);
$theSite->assign('date',     date("d. F Y", $current));
$theSite->assign('month',  date("m", $current));
$theSite->assign('day',  date("d", $current));
$theSite->assign('year',  date("Y", $current));
$theSite->assign('reqs', 'OS X >= 10.6<br/>(get old release for: <a href="https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.13.dmg">10.5</a>, <a href="https://github.com/downloads/GPGTools/GPGKeychainAccess/GPGKeychainAccess%20(old).tbz2">10.4</a>)');
$theSite->assign('minOS', '10.6');

	
$theSite->assign('overview', '
	GPG Keychain Access is an open source application for Mac OS X.
	It allows the user to manage OpenPGP keys, e.g. creating, adjusting and verifying keys and communication with the key servers.<p>
	<p>Please have a look at the <a href="http://support.gpgtools.org/kb">Knowledge Base</a>.</p>
');
$theSite->assign('short_description', 'GPG Keychain Access is an open source application for Mac OS X. It allows the user to manage OpenPGP keys, e.g. creating, adjusting and verifying keys and communication with the key servers.');


$theSite->assign('lighthouse', '65684');
$theSite->assign('macupdate', "17201");
$theSite->assign('iusethis', "gpgkeychainaccess");
$theSite->assign('heise', "78953");
$theSite->assign('cnet', "3000-2144_4-23925");

$theSite->assign('limitations', "");

$features = array(
    "$root/images/installericon.png" => array("Is part of the <a href='$root/installer/index.php' title='our main project: the installer'>GPGTools Installer</a>", 'Installer'),
    "$root/images/secure.jpg" => array("Create, delete, find, sign, and verify all your keys", "key management"),
    "$root/images/64bit.jpg" => array("The application is 64-bit compatible", "64 bit"),
    "$root/images/lion.png" => array("Compatible with OS X Lion", 'lion compatible'),
);
$theSite->assign('features', $features);

$screenshots = array(
'images/keys.png' => array('images/keys-small.png', 'List of installed keys')
);
$theSite->assign('screenshots', $screenshots);

$screencasts = array(
'create_key.m4v' => 'Create a private key'
);
$theSite->assign('screencasts', $screencasts);

$changelog = array(
	'1.0b7' => array(date('d. F Y', $release['1.0b7']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b7']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG Keychain Access-1.0b7.dmg',
		'sparkle_sig' => 'MC0CFGyPE3bV8D/7vn0+AgHdCbi9j69IAhUAjE1cLWRs9vnggyqazNQGioy0Rz8=',
		'sparkle_size' => '2331332',
		'sparkle_minOS' => '10.6',
		'101' => 'Toolbar info button added',
		'111' => 'Tone expired keys gray',
		'95' => 'Offer a key upload after key generation',
		'a' => 'Italian localization',
		'b' => 'Russian localization',
		'c' => 'Dutch localization',
		'sha' => 'Checksum: 467813128dff9e7e5958033b760e8b4f729cf1f3 (SHA-1)'
	)),
	'1.0b6' => array(date('d. F Y', $release['1.0b6']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b6']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG Keychain Access-1.0b6.dmg',
		'sparkle_sig' => 'MC0CFHwJqoOQtJswVZsov3sU7WfwY6x6AhUAq3XvpaO7tHfmZNFeESH5a7ksVmA=',
		'sparkle_size' => '1948826',
		'sparkle_minOS' => '10.6',
		'94' => 'Copy & Paste for files',
		'a' => 'Spanish bug fixed',
		'sha' => 'Checksum: b42465bf3af02eb5dfdc5b82cc1a0a9322868316 (SHA-1)'
	)),
	'1.0b5' => array(date('d. F Y', $release['1.0b5']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b5']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG Keychain Access-1.0b5.dmg',
		'sparkle_sig' => 'MC0CFAphEA5vxFgJlgpAf60aszukDSOZAhUAiGOWvuUggVahhdWY4zas2dtNr9c=',
		'sparkle_size' => '1579707',
		'sparkle_minOS' => '10.6',
		'96' => '--gen-key command line argument added',
		'98' => 'Import revocation certificate bug fixed',
		'99' => 'Sign key bug fixed',
		'sha' => 'Checksum: 7a705bcf869b5bb949d3e980cd15984cc3327f1f (SHA-1)'
		)),
	'1.0b3' => array(date('d. F Y', $release['1.0b3']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b3']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG Keychain Access-1.0b3.dmg',
		'sparkle_sig' => 'MC0CFHX7lciB2SuqL0a/yXrqAhcEWvslAhUAmoZjmmKwbxrtJ7kjkVjtdynCNT4=',
		'sparkle_size' => '1575244',
		'sparkle_minOS' => '10.6',
		'77' => 'No default-key bug fixed',
		'sha' => 'Checksum: 9853ea898ae1f3f61c1aa5f156db6f8835994cf5 (SHA-1)'
		)),
	'1.0b2' => array(date('d. F Y', $release['1.0b2']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b2']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG Keychain Access-1.0b2.dmg',
		'sparkle_sig' => 'MCwCFGHIIEyaJXMrsgYFTtRyQuN707EsAhRYk/LRfiz+xYkBL9ykk8mxxlDpfg==',
		'sparkle_size' => '1576246',
		'sparkle_minOS' => '10.6',
		'a' => 'FOUND_KEY_DESCRIPTION_FORMAT bug fixed',
		'b' => 'Algorithm name bug fixed',
		'c' => 'Support to import keys from files with non standard extension',
		'sha' => 'Checksum: a4b5670d2484f61f83aa35c3a7123818b16a6373 (SHA-1)'
		)),
	'1.0b1' => array(date('d. F Y', $release['1.0b1']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['1.0b1']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-1.0b1.dmg',
		'sparkle_sig' => 'MCwCFC9h2fRuhyjK86yLvmcM+DaZLfJ7AhRT5fFi826H1Tem/5wwPOwTmrOdxQ==',
		'sparkle_size' => '1569975',
		'sparkle_minOS' => '10.6',
		'a' => 'Use Libmacgpg',
		'b' => 'Better keyserver support',
		'c' => 'Better error messages',
		'sha' => 'Checksum: 086e8aa88d7d34176631867e8d6986308b3a1332 (SHA-1)'
		)),
	'0.8.13' => array(date('d. F Y', $release['0.8.13']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.8.13']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.13.dmg',
		'sparkle_sig' => 'MCwCFCZhBce+cV1NZiERCAMAyjGcsZjnAhR9DL9aQgEMlXgghuSjix+XhZa3vQ==',
		'sparkle_size' => '1409076',
		'51' => 'Subkey selection bug fixed',
		'c' => 'Some fixes in the localizations',
		'sha' => 'Checksum: 36454c5a72d062c8b0c3ffc473008811b456cabe (SHA-1)'
		)),
	'0.8.10' => array(date('d. F Y', $release['0.8.10']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.8.10']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.10.dmg',
		'sparkle_sig' => 'MC0CFErZFkgCBVyCOIg1poI/POR8QNywAhUAhXmsNF266rFUDWPAC2KxpXiEHyY=',
		'sparkle_size' => '1518043',
		'a' => 'Added *.gpg to Drag & Drop file types',
		'b' => '#48: Added findExecutableWithName',
		'c' => 'Use --keyserver parameter',
		'sha' => 'Checksum: ef105e5a0b01e843d2cd1ad539d24dc7664fc828 (SHA-1)'
		)),
	'0.8.7' => array(date('d. F Y', $release['0.8.7']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.8.7']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.7.dmg',
		'sparkle_sig' => 'MCwCFGSTjR3eaXlh5+onDy2QzyjQeYA0AhRFDSo+zmpoSaFmcQibbkYodNWNVg==',
		'sparkle_size' => '1516862',
		'a' => 'Fixed crash on startup',
		'b' => 'Better german localization',
		'sha' => 'Checksum: fa06410597db8e258c5199b1a2c8fad9f23a9bc5 (SHA-1)'
		)),
	'0.8.6' => array(date('d. F Y', $release['0.8.6']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.8.6']),
		'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.6.dmg',
		'sparkle_sig' => 'MCwCFAFcJaNuFoTiADilH/vBpGEFmUapAhQt7YSVbKN+40Iw+Nmyat8J6eB2PA==',
		'sparkle_size' => '1517149',
		'a' => 'French localization',
		'b'	=> 'Fixed a bug with the algorithm preferences',
		'sha' => 'Checksum: 73a71cc8b42b0a97aa30398b03a6956b46431c3a (SHA-1)'
		)),
    '0.8.4' => array(date("d. F Y", $release['0.8.4']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.8.4']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.4.dmg",
        'sparkle_sig' => "MCwCFCy2D7OdIs5pI9akgg/LA/9gsqPDAhRSYfBdPAzLqNDbwYVd8ljZJBrgfg==",
        'sparkle_size' => "1262263",
        "20" => "Save toolbar configuration",
        "a" => "Added Cmd+R shortcut to View > Refresh menu item",
        "b" => "Added long key type to Key Inspector",
        'sha' => "Checksum: e8e696bc879e0d9de9aa7d9e9e54bf052cf6baaf (SHA-1)"
        )),
    '0.8.2b' => array(date("d. F Y", $release['0.8.2b']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.8.2b']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.2b.dmg",
        'sparkle_sig' => "MCwCFEmnKqzPj+XBj3Fy3yqBU1LwT6y+AhRtjSDtsJcHRprEu5dKQZiFvHeIsA==",
        'sparkle_size' => "1786936",
        "a" => "Removed support to start gpg-agent",
        'sha' => "Checksum: 510e67b107bf5b97a404d68828d24ad7e6864521 (SHA-1)"
        )),
    '0.8.1b' => array(date("d. F Y", $release['0.8.1b']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.8.1b']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGKeychainAccess/GPG%20Keychain%20Access-0.8.1b.dmg",
        'sparkle_sig' => "MC0CFGlksDkuvMZ+zX4y2tel8F+BFtPqAhUAoesG5GFjuGaBIUq+j8/fqH4diqA=",
        'sparkle_size' => "1784179",
        "a" => "Added keyserver preferences"
        )),
    '0.8.0b' => array(date("d. F Y", $release['0.8.0b']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.8.0b']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGKeychainAccess/GPGKeychainAccess-0_8_0b.tar.bz2",
        'sparkle_sig' => "MC4CFQCO61zx/KqfaHW6O0Xo5WXWEDY4ogIVAJGYjrvvOk3SfLBktrJiR9R9cSsm",
        'sparkle_size' => "1069156",
        "a" => "Added support for MacGPG2-2.0.17"
        )),
    '0.3.1b' => array(date("d. F Y", $release['0.3.1b']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.3.1b']),
        'sparkle_url' => "http://github.com/downloads/gpgmail/GPGKeychainAccess/GPGKeychainAccess-0_3_1b.tar.bz2",
        'sparkle_sig' => "MCwCFDeqwRaC7E67ua6BcOCsprTVV3BVAhRtjcXp9u173+TG+mg21cXjRCMyhg==",
        'sparkle_size' => "1069448",
        "a" => "Right click context menu",
        "b" => "Added new icons",
        "c" => "Added support for algorithm preferences",
        "d" => "Showing validity"
        )),
);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');

?>
