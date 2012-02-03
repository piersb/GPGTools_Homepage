<?php /*compileIgnore*/

$version='2.0a21';
//$release['2.0a30'] = mktime(12, 0, 0, 2, 3, 2012);
$release['2.0a21'] = mktime(14, 23, 0, 12, 27, 2011);
$release['2.0a19'] = mktime(14, 23, 0, 12, 24, 2011);
$release['2.0a4'] = mktime(14, 23, 0, 9, 4, 2011);
$release['2.0a3'] = mktime(14, 23, 0, 8, 21, 2011);
$release['2.0a2'] = mktime(21, 35, 0, 8, 19, 2011);
$release['2.0a1'] = mktime(12, 0, 0, 8, 6, 2011);
$release['1.3.3'] = mktime(12, 0, 0, 03, 22, 2011);
$release['1.3.2'] = mktime(12, 0, 0, 03, 02, 2011);
$release['1.3.1'] = mktime(12, 0, 0, 11, 16, 2010);
$release['1.3.0'] = mktime(12, 0, 0, 07, 27, 2010);
$current=$release[$version];

$theSite->assign('title', 'GPGMail');
$theSite->assign('name', 'gpgmail');
$theSite->assign('img_logo', 'images/logo-128px.png');
$theSite->assign('url_base', 'GPGTools/GPGMail');
$theSite->assign('url_dl', "GPGMail-$version.dmg");
$theSite->assign('url_sig', "GPGMail-$version.dmg.sig");
$theSite->assign('url_beta', '');
$theSite->assign('url_wiki', 'wiki');
$theSite->assign('version', $version);
$theSite->assign('date',     date('d. F Y', $current));
$theSite->assign('month',  date('m', $current));
$theSite->assign('day',  date('d', $current));
$theSite->assign('year',  date('Y', $current));
$theSite->assign('reqs', 'OS X 10.7<br/>(get old releases for: <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.1.2-10.3.dmg">10.3</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.1.2-10.4.dmg">10.4</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.2.0-10.5.dmg">10.5</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.3.3.dmg">10.6</a>)');

$theSite->assign('overview', '
	<p>GPGMail is an open source plugin for Apple Mail. It brings the functionality to sign, verify, encrypt and decrypt mails using the OpenPGP standard.</p>
	<p>Please have a look at the <a href="https://github.com/GPGTools/GPGMail/wiki/Getting-started">getting started</a> and <a href="https://github.com/GPGTools/GPGMail/wiki/FAQ">FAQ</a> section.
	It would be nice to <a href="http://www.apple.com/feedback/macosx.html">tell Apple</a> to support bundles for Mail.app officially.</p>
');
$theSite->assign('short_description', 'GPGMail is an open source plugin for Apple Mail. It brings the functionality to sign, verify, encrypt and decrypt mails using the OpenPGP standard.');

$theSite->assign('lighthouse', '65764');
$theSite->assign('macupdate', '7654');
$theSite->assign('iusethis', 'gpgmail');
$theSite->assign('heise', '74690');
$theSite->assign('cnet', '3000-2144_4-7335');

$limitations = array(
'' => 'Currently GPGMail for Lion is an early alpha version under development',
);
$theSite->assign('limitations', $limitations);

$features = array(
    "$root/images/lion.png" => array("Compatible with OS X Lion", 'lion compatible'),
    "$root/images/64bit.jpg" => array('The bundle is 64-bit ready', '64 bit'),
    "$root/images/installericon.png" => array("Is part of the <a href='$root/installer/index.php' title='our main project: the installer'>GPGTools Installer</a>", 'Installer'),
    "$root/images/secure.jpg" => array('Sign, encrypt, decrypt, and verify all your mails', 'mail security'),
    "$root/images/update.png" => array("Integrated update mechanism and installer can <a href='$root/faq.php#3.2'>auto-fix the current installation</a> after an OS update", 'update mechanism'),
);
$theSite->assign('features', $features);

$screenshots = array(
'images/preferences.png' => array('images/preferences-small.png', 'Preferences'),
'images/compose.png' => array('images/compose-small.png', 'Encrypting and signing a message'),
'images/decrypted.png' => array('images/decrypted-small.png', 'Decrypted and validated message')
);
$theSite->assign('screenshots', $screenshots);

$screencasts = array('encrypt_mail.m4v' => 'Send an encrypted Mail');
$theSite->assign('screencasts', $screencasts);

$changelog = array(
/*    '2.0a30' => array(date('d. F Y', $release['2.0a30']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a30']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a30.dmg',
        'sparkle_sig' => 'MCsCFHNVKZ00tVNeFu7jOBmxymmrxTsrAhMtLgfYLmztN/M8ZePUr8Y17yLq',
        'sparkle_size' => '3543551',
        'sparkle_minOS' => '10.7',
        'sparkle_version' => '200 (a30)',
        'a' => 'Disabled excessive logging',
        'sha' => 'Checksum: de23cc7e85c967fcafb33dd43f73659a1b73fe88 (SHA-1)',
        )),*/
    '2.0a21' => array(date('d. F Y', $release['2.0a21']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a21']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a21.zip',
        'sparkle_sig' => 'MCwCFFbaiEjAcorXsJxSstsTL+u08lm6AhQrBEEarWClFbMl2r8Py/TA1T3hdg==',
        'sparkle_size' => '3463494',
        'sparkle_minOS' => '10.7',
        'sparkle_version' => '153 (a21)',
        'a' => 'Just another update that fixes some issues and enhances the stability',
        'sha' => 'Checksum: 65aa08be0b05324c82bd73af95e4c7985648342d (SHA-1)',
        )),
    '2.0a19' => array(date('d. F Y', $release['2.0a19']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a19']),
        'sparkle_url' => '',
        'sparkle_sig' => '',
        'sparkle_size' => '3485385',
        'sparkle_minOS' => '10.7',
        'sparkle_version' => '01 (a19)',
        'a' => 'Special binary-only Xmas Release 2011 for 10.7',
        'b' => 'Enhanced the stability a lot, not introduced new features',
        'c' => 'Still alpha quality (e.g. missing error messages)',
        'sha' => 'Checksum: 7849dc2c6ebb9a16622a71f336033d330e936f13 (SHA-1)',
        )),
    '2.0a4' => array(date('d. F Y', $release['2.0a4']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a4']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a4.zip',
        'sparkle_sig' => 'MCwCFB0X4UZ5O6lxmc7DwEBaqYv5njoSAhQNkP9QjXiAQsfDcPRBZlkuw5ZmRg==',
        'sparkle_size' => '1955283',
        'sparkle_minOS' => '10.7',
        'sparkle_version' => '21 (a4)',
        'a' => 'Fourth alpha for 10.7',
        'b' => 'Closed <a href="http://gpgtools.lighthouseapp.com/projects/65764-gpgmail/tickets?q=tagged%3A2.0a4">38 tickets</a>',
        'c' => 'Submitted <a href="https://github.com/GPGTools/GPGMail/commits/lion">65 commits,  119 files changed, 6675 insertions, 3461 deletions</a>',
        'sha' => 'Checksum: 91463d97da7a302cca2fbc93695ad980485b9264 (SHA-1)',
        )),
    '2.0a3' => array(date('d. F Y', $release['2.0a3']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a3']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a3.zip',
        'sparkle_sig' => 'MCwCFAkO9b3aqEX4PYpOsz2/sbZ8bQUFAhQhmnTKXr37yE3Ov+kFsbTd1BQtGA==',
        'sparkle_size' => '1936168',
        'sparkle_minOS' => '10.7',
        'a' => 'Third alpha for 10.7',
        'sha' => 'Checksum: 3f21326824fa108bae0c97c4c22716e6b485b824 (SHA-1)',
        )),
    '2.0a2' => array(date('d. F Y', $release['2.0a2']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a2']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a2.zip',
        'sparkle_sig' => 'MCwCFFboZcQHP0j6CVH8SYDRBmFs9fA2AhRYxSU3dgFNPXoVMJwnKcGxjad/0w==',
        'sparkle_size' => '1946022',
        'sparkle_minOS' => '10.7',
        'a' => 'Second alpha for 10.7',
        'b' => 'Fixed over 50 major and minor issues',
        'sha' => 'Checksum: 0d7b8e9d53d4d122f790146515de4f043e3c8458 (SHA-1)',
        )),
    '2.0a1' => array(date('d. F Y', $release['2.0a1']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a1']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a1.mailbundle.zip',
        'sparkle_sig' => 'MCwCFA4bt7Iad/8rLOVXc01ThGH1+BpJAhRC1iIU45+OAzfHGZPqMSbupF5P0w==',
        'sparkle_size' => '2746726',
        'sparkle_minOS' => '10.7',
        'a' => 'First alpha for 10.7',
        'sha' => 'Checksum: d3f4be6345f5ddb57162f97357c5c3efd2f1be78 (SHA-1)',
        )),
    '1.3.3' => array(date('d. F Y', $release['1.3.3']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.3.3']),
        'sparkle_url' => 'http://github.com/downloads/gpgtools/GPGMail/GPGMail-1.3.3.zip',
        'sparkle_sig' => 'MC0CFDF/nJUUuhpYNh25VUwb1yH+TgH0AhUAgpedhe7sUZqf9+IO+st35OQVw8o=',
        'sparkle_size' => '3181052',
        'a' => 'Important: Fixed compatibility with final OS X 10.6.7 release',
        'b' => 'Fix: French localization',
        '136' => 'Fix: Encryption/signing only with in-key-mentioned mail addresses broken',
        'sha' => 'Checksum: e9d334141767efee588494dc73595eed43ad4064 (SHA-1)',
        )),

    '1.3.2' => array(date('d. F Y', $release['1.3.2']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.3.2']),
        'sparkle_url' => 'http://github.com/downloads/gpgtools/GPGMail/GPGMail-1.3.2.zip',
        'sparkle_sig' => 'MCwCFHXIwXKI/rZRw9Ssx9KOXTuaNyGSAhROjBBaw4G2X2PMyI9Ww9SYa7XqUQ==',
        'sparkle_size' => '3179912',
        'a' => 'Important: Our new home is http://gpgtools.org',
        'b' => 'Important: Now compatible with OS X 10.6.7',
        'c' => 'Important: You might have to recheck your GPGMail configuration',
        '3' => 'Fix: Checked "Encrypt reply to OpenPGP-encrypted message" does not work',
        '19' => 'Fix: Choose key for encryption does not show keys.',
        '20' => 'Fix: Invalid crypto engine',
        '27' => 'Fix: GPG Exception - Bad Passphrase (pinentry-mac crash)',
        '97' => 'Fix: GPGMail does not sign though it is set by default',
        '108' => 'Fix: GPGMail not signing by default when set to choose keys by account',
        '112' => 'Fix: Current Build of GPGMail Is Not Supported On Mac OS X 10.6.7 (10J842)',
        '115' => 'Fix: Rename PGP to OpenPGP',
        '132' => 'Fix: Can not decrypt recently sent messages',
        '134' => 'Fix: Mail.bundle gets deactivated by Mail.app each time Mail.app is opened',
        '2' => 'Enhancement: Provide a compressed DMG with a background image',
        '15' => 'Enhancement: Add "Comment" section to signature',
        '96' => 'Enhancement: Change warning about missing private key',
        '104' => 'Enhancement: Installer should have a look at /L/M/B',
        '122' => 'Enhancement: Add Logo to the window, which appears when checking for updates',
        'd' => 'Old issue 23: Fixed the "Use Keychain to store passphrases" bug',
        'e' => 'Old issue 79: Fixed the "Encrypted reply to an encrypted message" bug',
        'f' => 'Old issue 81: Fixed the "update now button" bug',
        'g' => 'Old issue 97: Fixed the "check for update pulldown menu" bug',
        'h' => 'Old issue 110: Fixed the "password chaching/timeout" bug',
        'i' => 'Old issue 192: Added the "Do not check for updates at the first start" feature',
        'j' => 'Old issue 197: Fixed the "show passphrase setting" bug',
        'k' => 'Old issue 210: Fixed the "no longer prompted to enter passphrase" bug',
        'l' => 'Old issue 233: Fixed the "bundle is a folder" bug',
        'm' => 'Old issue 236: Fixed the "wrong bundle version and icon shown" bug',
        'n' => 'Translation: Swedish (thank you Mischa!)',
        'o' => 'Other: New icons (thank you Josef!)',
        'p' => 'Other: Shared preferences for different GPG tools',
        'q' => 'Other: Massive code cleanup',
        'sha' => 'Checksum: 57ceb923ec6eebba49496ff135b70a68e7e0bc30 (SHA-1)',
        )),
	'1.3.1' => array(date('d. F Y', $release['1.3.1']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.3.1']),
        'sparkle_url' => 'http://github.com/downloads/gpgmail/GPGMail/GPGMail-1.3.1.zip',
        'sparkle_sig' => 'MC0CFQCCKRaaP1fD3HBy9634f7cl+1ZgkwIUBserUijOEUalQmEfIDWhdHG+yUk=',
        'sparkle_size' => '2448070',
		'a' => 'Issue 221: Fixed compatibility with 10.6.5',
		'b' => 'Issue 14: Added make clean',
		'c' => 'Issue 98: Renamed preference pane to GPGMail',
		'd' => 'Issue 54: Renamed PGP to OpenPGP in the menu',
		'e' => "Issue 81: Disabled 'update now' button",
		'f' => 'Issue 212: Started to update the logos',
		'g' => 'And many, many other minor updates',
        'sha' => 'Checksum: b5f76a2c5667fd15b98c70ab2745f510f58c8eae (SHA-1)',
        )),
	'1.3.0' => array(date('d. F Y', $release['1.3.0']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.3.0']),
        'sparkle_url' => 'http://www.gpgmail.org/sparkle/GPGMail-1.3.0.zip',
        'sparkle_sig' => 'MCwCFFRFvroZn2nLSSr7jKqFCiVVmGaMAhQBGcgwkBFsLhenIgCGg0ViGQOvcw==',
        'sparkle_size' => '2451447',
		'a' => 'Added Sparkle updates',
		'b' => 'Changed web site, author, copyright, and e-mail address information to reflect the new project structure',
        ))

);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');

?>
