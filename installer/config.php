<?php /*compileIgnore*/

//$bversion="";
//$release["$bversion"] = mktime(12, 0, 0, 11, 9, 2011);
$theSite->assign('url_beta',  "");//"GPGTools-$bversion.dmg");

$version='2013.5.20';

$release['2013.5.20'] = mktime(17, 0, 0, 5, 20, 2013);
$release['20130330'] = mktime(12, 0, 0, 03, 30, 2013);
$release['20120318'] = mktime(12, 0, 0, 03, 18, 2012);
$release['20120317'] = mktime(12, 0, 0, 03, 17, 2012);
$release['20111224'] = mktime(12, 0, 0, 12, 24, 2011);
$release['20111127'] = mktime(12, 0, 0, 11, 27, 2011);
$release['20111117'] = mktime(12, 0, 0, 11, 17, 2011);
$release['20111114'] = mktime(12, 0, 0, 11, 14, 2011);
$release['20111110'] = mktime(12, 0, 0, 11, 10, 2011);
$release['20111109'] = mktime(12, 0, 0, 11, 9, 2011);
$release['20110711'] = mktime(19, 00, 0, 07, 11, 2011);
$release['20110322'] = mktime(14, 05, 0, 03, 22, 2011);
$release['20110302'] = mktime(11, 28, 0, 03, 02, 2011);
$release['20110214'] = mktime(17, 10, 0, 02, 14, 2011);
$release['2011.02.01'] = mktime(12, 0, 0, 02, 01, 2011);
$release['2011.01.25'] = mktime(12, 0, 0, 01, 25, 2011);
$release['2011.01.18beta1'] = mktime(12, 0, 0, 01, 18, 2011);
$release['2011.01.05_1'] = mktime(13, 0, 0, 01, 05, 2011);
$release['2011.01.05'] = mktime(12, 0, 0, 01, 05, 2011);
$release['2011.01.03'] = mktime(12, 0, 0, 01, 23, 2011);
$current = $release[$version];

$theSite->assign('title',    'Installer');
$theSite->assign('name', 'installer');
$theSite->assign('img_logo', 'images/logo-128px.png');
$theSite->assign('url_base', 'GPGTools/GPGTools');
$theSite->assign('url_dl',   "GPGTools-$version.dmg");
$theSite->assign('url_sig',  "GPGTools-$version.dmg.sig");
$theSite->assign('url_wiki', 'wiki');
$theSite->assign('date',     date("d. F Y", $current));
$theSite->assign('version',  date("Y.m.d", $current));
$theSite->assign('month',  date("m", $current));
$theSite->assign('day',  date("d", $current));
$theSite->assign('year',  date("Y", $current));
$theSite->assign('reqs',     '>= OS X 10.6');

$theSite->assign('overview', '
	<p>The GPGTools are a collection of open source tools for encryption on Mac OS X, gathered in an all-in-one-Installer solution.
	It installs/updates all related OpenPGP applications, plugins and dependencies. You can choose which components to install.</p>
');
$theSite->assign('short_description', 'The GPGTools are a collection of open source tools for encryption on Mac OS X, gathered in an all-in-one-Installer solution. It installs/updates all related OpenPGP applications, plugins and dependencies. You can choose which components to install.');

$theSite->assign('lighthouse', '65162');
$theSite->assign('macupdate', "9417");
$theSite->assign('iusethis', "gpgtoolsinstaller");
$theSite->assign('heise', "78714");
$theSite->assign('cnet', "3000-2092_4-75335253");

//$limitations = array();
//$theSite->assign('limitations', $limitations);

$features = array(
    "$root/images/osx108_64px.png" => array("Compatible with OS X Mountain Lion", 'mountain lion compatible'),
    "$root/images/64bit.jpg" => array("All applications are 64-bit compatible", '64 bit'),
    "$root/gpgmail/images/logo-35px.png" => array("Integrated <a href='$root/gpgmail/index.php'>GPGMail</a>", 'GPGMail'),
    "$root/keychain/images/logo-35px.png" => array("Integrated <a href='$root/keychain/index.php'>GPG Keychain Access</a>", 'GPG Keychain Access'),
    "$root/gpgservices/images/logo.png" => array("Integrated <a href='$root/gpgservices/index.php'>GPGServices</a>", 'GPGServices'),
    "$root/gpgpreferences/images/logo-35px.png" => array("Integrated <a href='$root/gpgpreferences/index.php'>GPGPreferences</a>", 'GPGPreferences'),
    "$root/macgpg2/images/logo-35px.png" => array("Integrated <a href='$root/macgpg2/index.php'>MacGPG 2</a>", 'gpg2, gpg-agent, pinentry-mac, macgpg2')
);
$theSite->assign('features', $features);

$screenshots = array(
'images/volume.png' => array('images/volume-small.png', 'The installation volume'),
'images/installer.png' => array('images/installer-small.png', 'List of components you can choose from')
);
$theSite->assign('screenshots', $screenshots);

/*$screencasts = array(
'install_gpgtools.m4v' => 'Install GPGTools'
);
$theSite->assign('screencasts', $screencasts);
*/
$changelog = array(
    '2013.5.20' => array(date("d. F Y", $release['2013.5.20']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2013.5.20']),
        'sparkle_url' => 'https://s3.amazonaws.com/gpgtools/GPGTools-2013.5.20.dmg',
        'sparkle_size' => '16558134',
        'a' => 'Mountain Lion compatible version of GPGMail',
        'sha' => "Checksum: 9f9fea935b3ce90d8d04542a754b8778f82a8b1b (SHA-1)",
        )),
    '20130330' => array(date("d. F Y", $release['20130330']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['20130330']),
        'sparkle_url' => 'https://s3.amazonaws.com/gpgtools/GPGTools-20130330.dmg',
        'sparkle_size' => '16733302',
        'a' => 'Update: Added the latest versions (GPG Keychain Access 1.0, GPGServices 1.8, MacGPG2 2.0.19)',
        'sha' => "Checksum: 617427f478990228f72683cc15d359df5b56a69c (SHA-1)",
        )),
    "20120318" => array(date("d. F Y", $release["20120318"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20120318"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20120318.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "50402184",
        'a' => 'Fix: Closed an <a href="http://gpgtools.lighthouseapp.com/projects/65162/milestones/140600">GPGMail installation issue on OS X 10.5 and 10.6</a>',
        'sha' => "Checksum: 184bf74e55c509da0aa4943ab7cc39ecd5caf99f (SHA-1)",
        )),
    "20120317" => array(date("d. F Y", $release["20120317"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20120317"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20120317.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "50402398",
        'a' => 'Updated: Using the Latest tools now (GPGMail 2.0a30, GPGServices 1.7a4, GKA 1.0b7, MacGPG2 2.0.18, ...)',
        'b' => 'Fix: Closed <a href="http://gpgtools.lighthouseapp.com/projects/65162/milestones/129372">24 installer related tickets</a>',
        'sha' => "Checksum: a419272955a6088544bd57f1b2c0c7521f246eb4 (SHA-1)",
        )),
    "20111224" => array(date("d. F Y", $release["20111224"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111224"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111224.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "35653922",
        'a' => 'Please note: GPGMail has no correct error messages in this version',
        '60' => 'Fix: Installer removed important libraries under some circumstances',
        '101' => 'Fix: Installation on 10.5 did not work under some circumstances',
        '106' => 'Fix: Installation on 10.5 hang under some circumstances',
        '104' => 'Fix: Better permissions for GnuPG config',
        '107' => 'Updated: GPGMail Alpha 19',
        'sha' => "Checksum: ac1b6d9a73db4b291195a185bbf24d32dd185a70 (SHA-1)",
        )),
    "20111127" => array(date("d. F Y", $release["20111127"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111127"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111127.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "34168317",
        '89' => 'Fix: GPGPreferences might not open under some circumstances (OS X 10.6 only)',
        '94' => 'Fix: Installer did hang under some circumstances (OS X 10.5 only)',
        '95' => 'Added: GPG Keychain Access for OS X 10.5',
        '97' => 'Updated: GPGPreferences 0.9.1',
        '98' => 'Enhancement: Open GPG Keychain Access automatically if there is no secret key',
        'sha' => "Checksum: ec0f360a38053bb7bc7f5ea0d980e70ebf88d632 (SHA-1)",
        )),
    "20111117" => array(date("d. F Y", $release["20111117"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111117"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111117.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "32653203",
        '91' => 'Updated: GPG Keychain Access 1.0b3',
        '92' => 'Downgrade: GPG Services 1.6',
        'sha' => "Checksum: fe5512dac8029a9396bb98956592bbaff297ea3e (SHA-1)",
        )),
    "20111114" => array(date("d. F Y", $release["20111114"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111114"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111114.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "28973271",
        '90' => 'Updated: GPG Keychain Access 1.0b1',
        'sha' => "Checksum: b4f3bd6191fe93737e37b9c64e007f11c27dafed (SHA-1)",
        )),
    "20111110" => array(date("d. F Y", $release["20111110"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111110"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111110.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "28973271",
        '86' => 'Fix: Missing GPGPreferences',
        '87' => 'Fix: Broken Enigmail for Thunderbird 3.1',
        'sha' => "Checksum: c748d54b2b1111b85118d2083769a7fbdfe5b913 (SHA-1)",
        )),
    "20111109" => array(date("d. F Y", $release["20111109"]), array(
        'sparkle_date' => date(DATE_RFC2822, $release["20111109"]),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20111109.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "28973271",
        'b' => 'Update: GPG Keychain Access 1.0a4',
        'd' => 'Added: Enigmail 1.3.3 for Thunderbird 7 and 8',
        '83' => 'Added: Enigmail 1.3.2 for Thunderbird 6',
        '69' => 'Added: GPGMail for 10.7 (Lion) - Alpha4',
        '79' => 'Added: GPGTools public OpenPGP key',
        '85' => 'Added: GPGTools autofixes',
        '82' => 'Update: GPGToolsPreferences 0.8',
        '76' => 'Update: Enigmail 1.2.1 for Thunderbird 5',
        '77' => 'Fix: Wrong permissons for Enigmail plugin',
        '78' => 'Fix: Enhanced Thunderbird detection',
        '64' => 'Fix: Update GPG Keychain Access when it was moved',
        '63' => 'Fix: MacGPG2 on NFS volumes',
        'a' => 'Many other small fixes',
        'sha' => "Checksum: 183b5cccf160276a9ee055aaa9db49da1280ff78 (SHA-1)",
        )),
    '20110711' => array(date("d. F Y", $release['20110711']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['20110711']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110711.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "22287032",
        'a' => 'Update: GPGServices 1.6',
        'b' => 'Update: GPG Keychain Access 0.8.13',
        'c' => 'Added: MacGPG1 1.4.11-6',
        'd' => 'Added: GPGMail for 10.5',
        'e' => 'Added: Enigmail 1.2 for Thunderbird 5',
        'f' => 'Enhancement: GPGMail version chosen by OS X release',
        'g' => 'Enhancement: GPGServices only gets installed if OS X >= 10.6',
        'h' => 'Fix: Installer now works under OS X 10.5',
        '70' => 'Fix: Detection of Thunderbird',
        '67' => 'Fix: MacGPG2 does not work with Thunderbird',
        'sha' => "Checksum: 4ac5133cf8c9fd86eb35511765b6af90374b05d4 (SHA-1)",
        )),
    '20110322' => array(date("d. F Y", $release['20110322']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['20110322']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110322.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "19625272",
        'a' => 'Update: GPGMail 1.3.3',
        'b' => 'Update: GPG Keychain Access 0.8.6',
        'c' => 'Update: GPGServices 1.5',
        '54' => 'Fix: Verification if mail is running give false positives (thank you Patrik)',
        'sha' => "Checksum: 2c3685155ac5ee1be25fb69b4eeb3ef34486d252 (SHA-1)",
        )),
    '20110302' => array(date("d. F Y", $release['20110302']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['20110302']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110302.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "19174951",
        'c' => 'Enhancement: now compatible with Snow Leopard 10.6.7',
        'a' => 'Update: GPGMail 1.3.2',
        'b' => 'Update: GPG Keychain Access 0.8.4',
        '51' => 'Enhancement: Remove "no-use-standard-socket" from gpg-agent.conf',
        '52' => 'Enhancement: Add a key server if none exists',
        'sha' => "Checksum: 446559bba04ab5c4704b9942d4179da8ab0f56ee (SHA-1)",
        )),
    '20110214' => array(date("d. F Y", $release['20110214']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['20110214']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110214.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "19043995",
        'a' => 'Update: MacGPG2.0.17-9',
        '51' => 'Enhancement: automatically removing no-use-standard-socket from gpg-agent.conf',
        'sha' => "Checksum: 59b3aa790803a8f678842e5ee3ae6d4c4ba5fc55 (SHA-1)",
        )),
    '2011.02.01' => array(date("d. F Y", $release['2011.02.01']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.02.01']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110201.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "30086116",
        '19' => 'Highlight: automatically add new UUIDs (so already compatible with 10.6.7)',
        '38' => 'Enhancement: the user is now forced to close Mail.app',
        '47' => 'Enhancement: removing old pinentry configurations from gpg.conf',
        '49' => 'Fixed: issues on clean OS X installations',
        '46' => 'Fixed: issues updating old preference panes',
        '43' => 'Fixed: issues with users in OpenDirectory folders',
        '42' => 'Fixed: issues with the uninstaller when gpg is not installed',
        )),
    '2011.01.25' => array(date("d. F Y", $release['2011.01.25']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.01.25']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110125.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "29573564",
        'a' => 'MacGPG: 2.0.17',
        'b' => 'GPGMail: 1.3.2rc1',
        'c' => 'GPG Keychain Access: 0.8.3b',
        'd' => 'GPGServices: 1.3',
        'e' => 'GPGPreferences: 0.4 (GPGMail autofix only)',
        'f' => 'Enigmail: 1.1.2',
        'g' => 'Many other small bug fixes',
        )),
    '2011.01.18beta1' => array('18. January 2011', array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.01.18beta1']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110118_beta1.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "27150208",
        'a' => 'Update: GPGMail 1.3.2rc1',
        'b' => 'Update: GPG Keychain Access 0.8.0b',
        '37' => 'Does not break GPG2 anymore',
        '9' => 'Now based on MacGPG2 2.0.17rc3',
        '34' => 'Added GPGServices',
        '28' => 'Updated uninstaller',
        '13' => 'Added pka support',
        '12' => 'Remove start-gpg-agent',
        '29' => 'Updated icons',
        )),
    '2011.01.05_1' => array('15. January 2011', array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.01.05_1']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110105_1.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "12205736",
        'a' => 'Update: GPGMail 1.3.2beta',
        '15' => 'Fixed check for OS requirements',
        '26' => 'Fixed permission issues',
        '27' => 'Added check for GPG2',
        )),
    '2011.01.05' => array('15. January 2011', array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.01.05']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110105.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "11519130",
        '15' => 'Fixed check for OS requirements',
        '26' => 'Fixed permission issues',
        '27' => 'Added check for GPG2',
        )),
    '2011.01.03' => array('03. January 2011', array(
        'sparkle_date' => date(DATE_RFC2822, $release['2011.01.03']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/GPGTools/GPGTools-20110103.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "11518950",
        'a' => 'no release notes',
        )),
);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');

?>
