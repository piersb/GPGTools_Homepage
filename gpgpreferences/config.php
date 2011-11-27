<?php /*compileIgnore*/

$version='0.9.1';
$release['0.9.1'] = mktime(12, 0, 0, 11, 27, 2011);
$release['0.9'] = mktime(12, 0, 0, 11, 24, 2011);
$release['0.8'] = mktime(12, 0, 0, 10, 17, 2011);
$release['0.7'] = mktime(12, 0, 0, 8, 15, 2011);
$release['0.6'] = mktime(11, 28, 0, 01, 27, 2011);
$release['0.5'] = mktime(11, 28, 0, 01, 26, 2011);
$release['0.4'] = mktime(11, 28, 0, 01, 24, 2011);

$current = $release[$version];

$theSite->assign('title', 'GPGPreferences');
$theSite->assign('name', 'gpgpreferences');
$theSite->assign('img_logo', 'images/logo-128px.png');
$theSite->assign('url_base', 'GPGTools/GPGTools_Preferences');
$theSite->assign('url_dl', "GPGPreferences-$version.dmg");
$theSite->assign('url_sig', "GPGPreferences-$version.dmg.sig");
$theSite->assign('url_beta', '');
$theSite->assign('url_wiki', '');
$theSite->assign('date',     date('d. F Y', $current));
$theSite->assign('version',  "$version");
$theSite->assign('month',  date('m', $current));
$theSite->assign('day',  date('d', $current));
$theSite->assign('year',  date('Y', $current));
$theSite->assign('reqs', 'OS X 10.6');

$theSite->assign('overview', '
	<p>The GPGPreferences pane allows you to set basic GPG options and to fix broken GPG and GPGMail installations (e.g. after an OS X update).</p>
');
$theSite->assign('short_description', 'The GPGPreferences pane allows you to set basic GPG options and to fix broken GPG and GPGMail installations (e.g. after an OS X update).');

$theSite->assign('lighthouse', '66966');
$theSite->assign('macupdate', '11135');
$theSite->assign('iusethis', 'gpgpreferences');
$theSite->assign('heise', '');
$theSite->assign('cnet', '3000-2092_4-25028');

/*
$limitations = array(
'1' => 'The old GPGPreferences are not included, yet',
);
$theSite->assign('limitations', $limitations);
*/

$features = array(
    "$root/images/installericon.png" => array("Is part of the <a href='$root/installer/index.php' title='our main project: the installer'>GPGTools Installer</a>", 'Installer'),
    "$root/images/update.png" => array("Can <a href='$root/faq.php#3.2'>auto-fix GPGMail after an OS update</a>", 'auto-fix'),
    "$root/images/64bit.jpg" => array("The application is 64-bit compatible", "64 bit"),
    "$root/images/lion.png" => array("Compatible with OS X Lion", 'lion compatible'),
);
$theSite->assign('features', $features);

$screenshots = array(
'images/config.png' => array('images/config-small.png', 'Basic configuration'),
'images/fix.png' => array('images/fix-small.png', 'Autofix and links')
);
$theSite->assign('screenshots', $screenshots);
$theSite->assign('screencasts', '');

$changelog = array(
	'0.9.1' => array(date('d. F Y', $release['0.9.1']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.9.1']),
		'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.9.1.dmg',
		'sparkle_sig' => '',
		'sparkle_size' => '378416',
		'sparkle_minOS' => '10.6',
		'29' => 'Pane could not be loaded under some circumstances',
		'sha' => 'Checksum: ebd29f9fb9d68c1f78363082e5b6643d9820c8b6 (SHA-1)',
	)),
	'0.9' => array(date('d. F Y', $release['0.9']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.9']),
		'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.9.dmg',
		'sparkle_sig' => '',
		'sparkle_size' => '378081',
		'sparkle_minOS' => '10.6',
		'21' => 'Renamed to GPGPreferences',
		'24' => 'Added a version number',
		'25' => 'Enhanced the password caching option',
		'27' => 'Fixed the keychain option',
		'sha' => 'Checksum: 7903522b77339114a3faf0d9cbc3904931c82b1d (SHA-1)',
	)),
	'0.8' => array(date('d. F Y', $release['0.8']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.8']),
		'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGTools_Preferences-0.8.dmg',
		'sparkle_sig' => '',
		'sparkle_size' => '364262',
		'sparkle_minOS' => '10.6',
		'20' => 'Fixed support for Mac OS X 10.7.2',
		'a' => 'GUI cleanup',
		'sha' => 'Checksum: 73abbd8d3711b50d306743bc387c0dbc3f8d5b43 (SHA-1)',
	)),
	'0.7' => array(date('d. F Y', $release['0.7']), array(
		'sparkle_date' => date(DATE_RFC2822, $release['0.7']),
		'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.7.dmg',
		'sparkle_sig' => '',
		'sparkle_size' => '354724',
		'sparkle_minOS' => '10.6',
		'a' => 'Support for Mac OS X 10.7',
		'sha' => 'Checksum: 3ca614f5d3c223136431a4297dcedba6b4366632 (SHA-1)',
	)),
    '0.6' => array(date('d. F Y', $release['0.6']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.6']),
        'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.6.dmg',
        'sparkle_sig' => '',
        'sparkle_size' => '656746',
		'sparkle_minOS' => '10.6',
        'a' => 'Updates for OS X 10.6.7',
        'b' => 'Added uninstaller',
        'c' => 'Updated DMG generation script',
        'sha' => 'Checksum: 93f076f06561dbfdc7a7d1f5c680d899d8667f5a (SHA-1)',
    )),
    '0.5' => array(date('d. F Y', $release['0.5']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.5']),
        'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.5.dmg',
        'sparkle_sig' => '',
        'sparkle_size' => '656746',
		'sparkle_minOS' => '10.6',
        'a' => 'Added GPG fix',
    )),
    '0.4' => array(date('d. F Y', $release['0.4']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['0.4']),
        'sparkle_url' => 'http://github.com/downloads/GPGTools/GPGTools_Preferences/GPGPreferences-0.4.dmg',
        'sparkle_sig' => '',
        'sparkle_size' => '656746',
		'sparkle_minOS' => '10.6',
        'a' => 'Initial update for GPGTools integration'
    ))
);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');

?>
