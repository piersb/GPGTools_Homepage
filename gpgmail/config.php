<?php /*compileIgnore*/

$version='2.0a30';
$release['2.0a30'] = mktime(15, 5, 0, 2, 13, 2012);
$release['2.0a21'] = mktime(14, 23, 0, 12, 27, 2011);
$release['2.0a19'] = mktime(14, 23, 0, 12, 24, 2011);
$release['2.0a4'] = mktime(14, 23, 0, 9, 4, 2011);
$release['2.0a3'] = mktime(14, 23, 0, 8, 21, 2011);
$release['2.0a2'] = mktime(21, 35, 0, 8, 19, 2011);
$release['2.0a1'] = mktime(12, 0, 0, 8, 6, 2011);
$release['1.4.1'] = mktime(12, 0, 0, 11, 9, 2012);
$release['1.3.3'] = mktime(12, 0, 0, 03, 22, 2011);
$release['1.3.2'] = mktime(12, 0, 0, 03, 02, 2011);
$release['1.3.1'] = mktime(12, 0, 0, 11, 16, 2010);
$release['1.3.0'] = mktime(12, 0, 0, 07, 27, 2010);
$release['1.2.0v56'] = mktime(0, 0, 0, 12, 30, 2008);
$release['1.1.2v46'] = mktime(0, 0, 0, 2, 5, 2006);
$release['1.1.1v44'] = mktime(0, 0, 0, 7, 17, 2005);
$release['1.1v42'] = mktime(0, 0, 0, 4, 29, 2005);
$release['1.0.2v37'] = mktime(0, 0, 0, 5, 14, 2004);
$release['1.0.1v33'] = mktime(0, 0, 0, 11, 17, 2003);
$release['1.0v30'] = mktime(0, 0, 0, 10, 25, 2003);
$release['0.5.4v22'] = mktime(0, 0, 0, 9, 10, 2002);
$release['0.5.3v20'] = mktime(0, 0, 0, 6, 23, 2002);
$release['0.5.2v13'] = mktime(0, 0, 0, 11, 22, 2001);
$release['0.5.1v8'] = mktime(0, 0, 0, 9, 8, 2001);
$release['0.5v4'] = mktime(0, 0, 0, 2, 7, 2001);
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
$theSite->assign('reqs', 'OS X 10.7<br/>(get old releases for: <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.1.2-10.3.dmg">10.3</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.1.2-10.4.dmg">10.4</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.2.0-10.5.dmg">10.5</a>, <a href="https://github.com/downloads/GPGTools/GPGMail/GPGMail-1.4.1.dmg">10.6</a>)');

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
'439' => 'GPGMail is not compatible with 10.8. Look <a href="http://support.gpgtools.org/kb/faq/how-can-i-uninstall-your-software">here</a> for info, on how to remove GPGMail.',
);
$theSite->assign('limitations', $limitations);

$features = array(
    "$root/images/lion.png" => array("Compatible with OS X Lion", 'lion compatible'),
    "$root/images/64bit.jpg" => array('The bundle is 64-bit ready', '64 bit'),
    "$root/images/installericon.png" => array("Is part of the <a href='$root/installer/index.php' title='our main project: the installer'>GPGTools Installer</a>", 'Installer'),
    "$root/images/secure.jpg" => array('Sign, encrypt, decrypt, and verify all your mails', 'mail security'),
    "$root/images/update.png" => array("Sparkle Updates", 'update mechanism'),
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
    '2.0a30' => array(date('d. F Y', $release['2.0a30']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['2.0a30']),
        'sparkle_url' => 'https://github.com/downloads/GPGTools/GPGMail/GPGMail-2.0a30.zip',
        'sparkle_sig' => 'MC0CFC5Lw/SoO5f+NnTbBcQHopTTJg5SAhUAhwCu0QMBMh2UdzBc5MJNFeTjFps=',
        'sparkle_size' => '5779188',
        'sparkle_minOS' => '10.7',
        'sparkle_version' => '201 (a30)',
        'a' => 'Disables excessive logging which might have written sensitive information to /var/log/system.log* in some cases.',
        'sha' => 'Checksum: cce665b098ec7cc747d3a2995f9c06be15ad6525 (SHA-1)',
        ), 
        /* Allow for extra notes to be added. */
        '<br><br><b>IMPORTANT SECURITY UPDATE</b><br><br><b>DISCLAIMER: Please be aware that GPGMail is still in alpha stadium.<br>Be very careful about using it on machines containing sensitive information.</b>'),
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
    /*'1.4.1' => array(date('d. F Y', $release['1.4.1']), array(
        'sparkle_date' => date(DATE_RFC2822, $release['1.4.1']),
        'sparkle_url' => 'http://github.com/downloads/gpgtools/GPGMail/GPGMail-1.4.1.dmg',
        'sparkle_sig' => '',
        //'sparkle_version' => '00001 (a0141)',
        'sparkle_maxOS' => '10.6',
        'sparkle_size' => '3453715',
        'a' => 'Fix: Fixed compatibility with final OS X 10.6.8 release',
        'sha' => 'Checksum: ca0329ab56acd6f4bfb66327e914be39f2d70fad (SHA-1)',
        )),*/        
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
        )),
	'1.2.0v56' => array(date('d. F Y', $release['1.2.0v56']), array(
		'a' => 'Available for 10.5 Leopard only',
		'b' => 'Now under BSD license (more liberal than before)',
		'c' => 'Project now located on SourceForge.net',
		'd' => 'Better compatibility when decrypting messages from old mailers (e.g. handles encrypted attachments)',
		'e' => 'Added Swedish localization by Erik Hedlund',
		'f' => 'Added new keyserver to list (SKS)',
		'g' => 'For ASCII encrypted/signed messages, enforces use of quoted-printable - more robust - Thanks to Greg A. Woods',
		'h' => 'Fixed support for <code>gpg2</code> (provided that you have a working agent - see FAQ)',
		'i' => 'Fixed problem with <code>GPGOpenPGPExecutablePath</code> (no longer necessary in most cases - see documentation)',
		'j' => 'Fixed bug when sending signed+encrypted (ASCII) message with untrusted recipient, and GPGMail set to trust no key: an exception was logged, instead of being displayed to user.',
		'k' => 'Fixed bug: was still signing when automatic signing but no matching account',
		'l' => 'Fixed bug with manual choice of encryption keys: message might be sent without encryption/signature',
		'm' => 'Fixed bug: draft additional headers were not removed when message was delivered',
		'n' => 'Fixed bug with manual choice of keys: choice was lost when displaying again key list',
		'o' => 'Fixed bug with AppleScript-generated messages, and redisplayed PGP buttons',
		'p' => 'Fixed dependency on <code>/usr/local/bin/gpg</code>',
		'q' => 'Fixed positioning of compose accessory view',
		'r' => 'Fixed bug with ’verbose’ option in gpg.conf file',
		's' => 'Fixed toggle triangle state (showing/hiding the extended signature info)',
		't' => 'Fixed case where public key choice was still automatic even after user chose keys manually',
		'u' => 'Fixed initial automatic choice of key according to account',
		'v' => 'Fixed initial sign/encrypt settings, when they should be set by default',
		'w' => 'Fixed bug with disabled toolbar items on detached viewers',
		'x' => 'Fixed UI-compatibility problems with MailTags',
		'y' => 'Fixed bug with non-English locales',
		'z' => 'Fixed bug with ’Reply to All’ button',
		'aa' => 'No longer supports Tiger (10.4)',
		'ab' => 'No longer supports Panther (10.3)'
		)), 
	
	'1.1.2v46' => array(date('d. F Y', $release['1.1.2v46']), array(
		'a' => 'Last version for Panther/10.3',
		'b' => 'Panther: fixed crashes',
		'c' => 'Tiger: built as Universal Binary',
		'd' => 'Now needs <code>gpg</code> &gt;= 1.4.x',
		'e' => 'Tiger: temporarily disabled display of PGP elements in composer window when window is created via AppleScript, to avoid unsolvable bug - you can still change PGP settings via menu Message/PGP.',
		'f' => 'Mail no longer freezes when with using untrusted keys for encryption',
		'g' => 'Now fills in automatically PGP Key Download search field as soon as a key is missing (except when already performing search/import)',
		'h' => 'Fixed passphrase encryption when signature was toggled on',
		'i' => 'Fixed crash after message delivery failure',
		'j' => 'Dutch localization by Marc-Siebren Kwadijk',
		'k' => 'Added hidden user default, <code>GPGOpenPGPExecutablePath</code>',
		'l' => 'Fixed uncaught exceptions when <code>gpg</code> not configured correctly',
		'm' => 'Better error message when error related to specific key',
		'n' => 'Better key server-related error messages (not yet localized though)',
		'o' => 'Now accepts SHA-256, SHA-384 and SHA-512 hash algorithms',
		'p' => 'Fixed compatibility-problem with MailTags',
		'q' => 'Fixed sorting of keys in key chooser dialog',
		'r' => 'Fixed bug when "only if message is unread" prefs were followed (when checked) even when automatic decryption/authentication was unchecked',
		's' => 'Fixed problem where encryption was not settable until signing had been set, in some cases.',
		't' => 'No longer tries to decrypt text/plain attachments',
		'u' => 'Tries to decrypt/verify application/octet-stream attachments',
		'v' => 'Fixed alignments in new message window'
		)), 
	
	'1.1.1v44' => array(date('d. F Y', $release['1.1.1v44']), array(
		'a' => 'Changed keyboard shortcuts for sign/encrypt/decrypt/verify, using same as PGP, because our ones didn’t work on Tiger anylonger',
		'b' => 'Tiger: Fixed compatibility problem with Enigmail encrypted messages that could not get decrypted',
		'c' => 'Fixed unlocalized error message NO_VALID_PRIVATE_KEY',
		'd' => 'Tiger: added separator line to compose window (thanks to Felix Schaumburg)',
		'e' => 'Changed pref text: reply to <strong>PGP</strong> encrypted/signed',
		'f' => 'Warning icon was no longer displayed when missing PGP keys',
		'g' => 'Tiger: toolbar icons take less space now',
		'h' => 'Tiger: Encryption/signing works again when performed from menu/toolbar buttons, without PGP buttons in composer',
		'i' => 'Tiger: it was no longer possible to choose any PGP keys manually',
		'j' => 'Spanish localization by Sergio Rodríguez Concha',
		'k' => 'Finnish localization fix by Seppo Laaksonen',
		'l' => 'Japanese localization by Tomio Arisaka',
		'm' => 'Sender’s PGP information (sign/encrypt/MIME) stored in AddressBook is no longer evaluated by rules',
		'n' => 'When evaluating for reply/forwarded, don’t use signed/encrypted information from S/MIME messages',
		'o' => 'Fixed German localization',
		'p' => 'Added hidden option, <code>GPGAddCustomHeaders</code>',
		'q' => 'Tiger: Fixed install on 10.4.1 and later',
		'r' => 'Fixed alignment of some items in composer window',
		's' => 'Now links to MacGPGME dynamically, to avoid license problem',
		't' => 'ASCII signed messages: fixed problem with Usenet signatures',
		'u' => 'Tiger: fixed auto-decryption/auto-verification of unread messages',
		'v' => 'Tiger: fixed refresh problem of compose accessory view when To/CC fields get higher',
		'w' => 'Tiger: fixed iPhoto problem',
		'x' => 'Added Danish localization by Sebastian Adorjàn Dyhr',
		'y' => 'Fixed some ASCII signature verification problems',
		'z' => 'Fixed UI bug when message is created by AppleScript',
		'aa' => 'Tiger: Fixed assertion failure when verifying messages',
		'ab' => 'Tiger: Was sometimes failing to report error'
		)), 
	
	'1.1v42' => array(date('d. F Y', $release['1.1v42']), array(
		'a' => 'Added support for Tiger (10.4)',
		'b' => 'Fixed invalid display of keys being revoked/expired/disabled/invalid',
		'c' => 'Fixed compatibility problem with Windows’ EudoraGPG, thanks to Georg Wedemeyer',
		'd' => 'Fixed Finnish translation (courtesy of Asko Kauppi)',
		'e' => 'Added basic support for AddressBook groups',
		'f' => 'Added automatic settings (encryption, signature) based on current context',
		'g' => 'Added retrieval of people <code>gpg</code> options from their Address Book card (set by Robert Goldsmith’s ABKey bundle)',
		'h' => 'No longer tries to use invalid secret key when encrypting',
		'i' => 'Got rid of GPGMEProxyServer',
		'j' => 'Much faster PGP operations, notably key listing',
		'k' => 'When a draft is restored, the encryption and signature states are restored too',
		'l' => 'Fixed problem with attachments having non-ASCII filenames: now these chars are replaced by ’_’, but that doesn’t affect final filename, except maybe on old mail clients.',
		'm' => 'Fixed bug with default private key which needed to be selected manually to get actually selected',
		'n' => 'Lot of new options',
		'o' => 'Added PGP-settings conflict resolution panel on delivery',
		'p' => 'Now correctly recognizes revoked/disabled keys',
		'q' => 'No longer reports wrongly a hash algo choice error instead of the unability to sign',
		'r' => 'Only English, French, Finnish and German localizations are complete',
		's' => 'And more... to be documented'
		)), 
	
	'1.0.2v37?' => array(date('d. F Y', $release['1.0.2v37']), array(
		 'a' => 'New icons by Michel Poulain (thanks also to Moritz Guth)',
		 'b' => 'Corrected default key selection restoration',
		 'c' => 'Corrected Spanish localization',
		 'd' => 'Corrected scrolling of signature banner title',
		 'e' => '10.2: no longer fails to load 10.3-compiled version, but catches error and reports it to user',
		 'f' => 'New (hidden) option, <code>GPGRefreshesKeysOnVolumeMount</code>, to disable automatic refresh of keys when volume is (un)mounted; default value is YES.',
		 'g' => 'New (hidden) option, <code>GPGDisablesSMIME</code>, to totally disable S/MIME encryption/signature. Default value is NO.',
		 'h' => 'No longer considers text/plain attachments as potential PGP parts',
		 'i' => 'Fixed incompatibility with PGP7/Outlook: for encrypted messages, always uses <code>content-transfer-encoding: 7bit</code>',
		 'j' => 'When keychain passphrase was wrong, keychain item was not deleted',
		 'k' => 'Corrected recognition of disabled/revoked secret/public keys',
		 'l' => 'User could select revoked private key -&gt; signed message was empty',
		 'm' => 'New feature: if user shows all keys (no filter), then display key status (revoked/disabled/expired)',
		 'n' => 'New feature: extended key server list, like in GPGPreferences',
		 'o' => 'New feature: show alert when signer’s key is revoked/disabled/...',
		 'p' => 'Fixed: if you select passphrase encryption then turn it back off, the signing option is unticked (when it should be ticked).',
		 'q' => 'New feature: after encryption failure due to missing keys, user can now select to send unencrypted',
		 'r' => 'Fixed: 10.3: Account pulldown menu in composer window is randomly greyed. Happens as soon as changing account changes PGP key, from now on.',
		 's' => '10.3: changed disclosure triangle in signature banner',
		 't' => 'Compose window: warning icon is now displayed in popdown menu',
		 'u' => 'Added hidden option <code>GPGUsesAlwaysCRLF</code> to always use CRLF as line-ending for PGP-inline encryption/signing; default value is NO.',
		 'v' => 'Corrected recognition of disabled/revoked public keys in compose panel',
		 'w' => 'Fixed enabling/disabling of toolbar/menu items when multiple windows are open',
		 'x' => 'Fixed rare dead-lock at startup',
		 'y' => 'Last release with 10.2-compatibility'
		 )), 
	
	'1.0.1v33' => array(date('d. F Y', $release['1.0.1v33']), array(
		'a' => 'When PGPmail is installed, you’re no longer forced to quit, but you’re warned that it’s at your own risks.',
		'b' => 'No longer leaves orphan GPGMEProxyServer processes on quit or crash',
		'c' => 'Corrected some error messages',
		'd' => 'Key search results sometimes didn’t display correct names (problem with accents)',
		'e' => 'Key search now displays "revoked" status in results',
		'f' => 'Now refreshes keys each time a volume has been (un)mounted',
		'g' => 'Added Finnish localization by Seppo Laaksonen',
		'h' => 'Added Japanese localization by Kory Talmage',
		'i' => 'Applied typographical rules to French localization',
		'j' => 'Corrected some resizing errors',
		'k' => 'Corrected installation problem with FileVault',
		'l' => 'Corrected installation problem in <code>/Network/Users/</code>',
		'm' => 'Corrected problem with some keys which have ISOLatin1 string encoding for the userIDs, when decrypting/signing',
		'n' => 'Installer checks now system version',
		'o' => 'No longer leaves a sticky "Done." message in the status view',
		'p' => 'Added Korean localization by Sangduk Park',
		'q' => 'Corrected problem with other mailers that added an empty line between each line when verifying/decrypting a PGP message',
		'r' => 'Replying/forwarding/redirecting a decrypted message now quotes the decrypted message'
		)), 
	
	'1.0v30' => array(date('d. F Y', $release['1.0v30']), array(
		'a' => 'Completely reviewed code; now uses GPGME (indirectly)',
		'b' => 'Replaced most of modal dialogs by non-modal ones, à la Junk Mail',
		'c' => 'Added support for KeyChain, thanks to Annard Brouwer',
		'd' => 'Added support for multiple secret keys',
		'e' => 'User can now choose private/public keys; automatically, or manually',
		'f' => 'Added symetric encryption support (encryption without key, only with shared passphrase)',
		'g' => 'Preferences panel has been completely revamped, with new options',
		'h' => 'New option: enable/disable trust of keys according to web-of-trust',
		'i' => 'New option: choose OpenPGP-MIME format; automatically, or manually',
		'j' => 'User can use BCC recipients too',
		'k' => 'Decryption of encrypted and signed messages no longer fails when when signature cannot be checked (missing key, etc.)',
		'l' => 'Corrected AppleScript incompatibility',
		'm' => 'New option: sign when encrypting',
		'n' => 'New option: decrypt/authenticate automatically only when message is unread',
		'o' => 'New option: in passphrase panel, you can display typed passphrase',
		'p' => 'When encrypting message, if you miss a key, GPGMail will try to find one on your default keyserver.',
		'q' => 'Added ability to search for keys on keyservers.',
		'r' => 'New option: line wrapping',
		's' => 'New option: always encrypt',
		't' => 'After computer sleep, passphrase timeout is now reset',
		'u' => 'Corrected Installer problem with path containing aliases/links',
		'v' => 'Corrected problem with format=flowed',
		'w' => 'Now checks presence of PGPmail',
		'x' => 'Hash algorithm is set according to your gpg preferences',
		'y' => 'Dropped support for 10.1',
		'z' => 'Added support for 10.3'
		)), 
	
	'0.5.4v22' => array(date('d. F Y', $release['0.5.4v22']), array(
		'a' => 'Added Swedish translation from Daniel Aarno',
		'b' => 'Added Italian translation from Filippo Stefanelli',
		'c' => 'Corrected some glitches with passphrase panel',
		'd' => 'No longer leaves files in <code>/tmp</code>',
		'e' => 'Added an installer',
		'f' => 'Documentation translated in French',
		'g' => 'License has been modified',
		'h' => 'Corrected Korean translation',
		'i' => 'Added support for MacOS X 10.2.x',
		'j' => 'Corrected compatibility problem between contextual menu and other Mail plug-ins'
		)), 
	
	'0.5.3v20' => array(date('d. F Y', $release['0.5.3v20']), array(
		'a' => 'Added Spanish translation from Sergio Rodríguez Concha',
		'b' => 'Added French translation from Michel Poulain',
		'c' => 'Added Japanese translation from Tomio Arisaka',
		'd' => 'Added beautiful icons from Michel Poulain',
		'e' => 'Modified "decrypted" icon, by Jamin Wilson',
		'f' => 'Added new userDefaults, <code>GPGOpenPGPStyleOnly</code> (default value is NO), to force always using OpenPGP-style encryption/signing',
		'g' => 'Corrected problems with attachments which were not yet loaded',
		'h' => 'Corrected problem with Kotoeri input method',
		'i' => 'Added German translation from Hauke Müller',
		'j' => 'Added Danish translation from Thomas Dyhr',
		'k' => 'Stopped support for MacOS X Server (Rhapsody)',
		'l' => 'Added Korean translation from Sangduk Park',
		'm' => 'Added support for encapsulated signature (RFC1847); this is now the default method used when encrypting a signed message with OpenPGP style.',
		'n' => 'Corrected state of newly added toolbar buttons',
		'o' => 'Corrected problems due to character sets (no longer forces use of UTF8)',
		'p' => 'Added contextual menu for decryption/authentication',
		'q' => 'Corrected header decoding bug',
		'r' => 'Corrected signature bug',
		's' => 'Corrected compatibility problems with Sylpheed, Evolution, Entourage, Outlook, Eudora, etc.',
		't' => 'Corrected compatibility problem with MacOS X 10.1.5',
		'u' => 'Added basic support for HTML signed/encrypted messages',
		'v' => 'Corrected problem with gpg 1.0.7: you no longer need to sign keys before using them for encryption. With gpg 1.0.6, you still need to: if you don’t, encryption is refused.',
		'w' => 'Corrected problems with MailPriority &gt;= 1.1'
		)), 
	
	'0.5.2v13' => array(date('d. F Y', $release['0.5.2v13']), array(
		'a' => 'Ported to MacOS X 10.1.x',
		'b' => 'Corrected problems with character sets',
		'c' => 'Added keyboard shortcuts',
		'd' => 'Now needs gpg version &gt;= 1.0.6',
		'e' => 'No version for MacOS X Server 1.x'
		)), 
	
	'0.5.1v8' => array(date('d. F Y', $release['0.5.1v8']), array(
		'a' => 'Ported to MacOS X 10.0.4',
		'b' => 'Corrected bugs in the application of RFC 3156',
		'c' => 'Corrected lots of other bugs'
		)), 
	
	'0.5v4' => array(date('d. F Y', $release['0.5v4']), array(
		'a' => 'initial release, for MacOS X Server 1.x and MacOS X Public Beta'
				 )) 
              

	
	
	
	
);
$theSite->assign('changelog', $changelog);
$theSite->assign('changelogfile', 'changelog.php');

?>
