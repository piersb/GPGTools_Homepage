<?php /*compileIgnore*/

$version="1.4.11-6";
$release['1.4.11-6'] = mktime(0, 19, 9, 04, 12, 2011);
$release['1.4.11-5'] = mktime(0, 8, 3, 03, 24, 2011);
$release['1.4.11-1'] = mktime(0, 13, 8, 02, 24, 2011);
$current = $release[$version];

$theSite->assign('title',    'MacGPG1');
$theSite->assign('name', 'macgpg1');
$theSite->assign('img_logo', 'images/logo-128px.png');
$theSite->assign('url_base', 'GPGTools/MacGPG1');
$theSite->assign('url_dl',   "MacGPG1-$version.dmg");
$theSite->assign('url_sig',  "MacGPG1-$version.dmg.sig");
$theSite->assign('url_beta', '');
$theSite->assign('url_wiki', '');
$theSite->assign('version',  "$version");
$theSite->assign('date',     date("d. F Y", $current));
$theSite->assign('month',  date("m", $current));
$theSite->assign('day',  date("d", $current));
$theSite->assign('year',  date("Y", $current));
$theSite->assign('reqs',     'OS X >= 10.5');

$theSite->assign('overview', '
	<p>MacGPG1 is an open source Mac OS X port of GnuPG. The project aims at making GnuPG easy to install, maybe provide a native Mac OS X pinentry utility and interact with existing GnuPG tools for Mac OS X.</p>
');
$theSite->assign('short_description', 'MacGPG1 is an open source Mac OS X port of GnuPG. The project aims at making GnuPG easy to install, maybe provide a native Mac OS X pinentry utility and interact with existing GnuPG tools for Mac OS X.');

$theSite->assign('lighthouse', '70639');
$theSite->assign('macupdate', "37252");
$theSite->assign('iusethis', "macgpg1");
$theSite->assign('heise', "14689");
$theSite->assign('cnet', "3000-2092_4-75374714");

$limitations = array(
  '' => 'Very first alpha build!',
);
$theSite->assign('limitations', '');//$limitations);

$features = array(
    "$root/images/installericon.png" => array('Is based on the GPGTools infrastructure and developments', 'Installer'),
    "$root/images/universal.png" => array('Includes executable code for both PPC and Intel processors', 'PPC support'),
    "$root/images/lion.png" => array("Compatible with OS X Lion", 'lion compatible'),
);
$theSite->assign('features', $features);

$screenshots = array(
    'images/volume.png' => array('images/volume-small.png', 'MacGPG1 volume'),
    'images/installer.png' => array('images/installer-small.png', 'MacGPG1 installer')
);
$theSite->assign('screenshots', $screenshots);

$theSite->assign('screencasts', "");


$changelog = array(
    '1.4.11-6' => array(date("d. F Y", $release['1.4.11-6']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.4.11-6']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/MacGPG1/MacGPG1-1.4.11-6.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "3149434",
        '4' => 'Fixed issue with external executables (wrong prefix)',
        'sha' => "Checksum: 80f91ce3962cb8e009122804a51444a02c34b1f3 (SHA-1)",
        )),
    '1.4.11-5' => array(date("d. F Y", $release['1.4.11-5']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.4.11-5']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/MacGPG1/MacGPG1-1.4.11-5.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "3149997",
        '2' => 'Added PPC support',
        'sha' => "Checksum: 090fa41bc4c71a1d110a256d1d9623b5450576ee (SHA-1)",
        )),
    '1.4.11-1' => array(date("d. F Y", $release['1.4.11-1']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.4.11-1']),
        'sparkle_url' => "http://github.com/downloads/GPGTools/MacGPG1/MacGPG1-1.4.11-1.dmg",
        'sparkle_sig' => "",
        'sparkle_size' => "3077981",
        'a' => 'Initial version',
        'sha' => "Checksum: 908eb8b4a4a00fba92bc1f270419c10f2a4b3446 (SHA-1)",
        )),
);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');
?>
