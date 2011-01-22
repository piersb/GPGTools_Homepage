<?php
require('libs/Smarty.class.php');
require('libs/Smarty.config.php');

$theSite->assign('title', 'GPGMail');
$theSite->assign('img_logo', 'gpgmail.png');
$theSite->assign('url_base', 'GPGMail/GPGMail');
$theSite->assign('url_dl', 'GPGMail-1.3.1.pkg');
$theSite->assign('url_sig', 'GPGMail-1.3.1.pkg.sig');
$theSite->assign('url_beta', 'GPGMail-1.3.2rc1.zip');
$theSite->assign('version', '1.3.1');
$theSite->assign('date', '16. November 2010');
$theSite->assign('reqs', 'OS X 10.6');

$theSite->assign('overview', '<p>GPGMail is an open source plugin for Apple Mail. It brings the functionality to sign, verify, encrypt and decrypt mails using the OpenPGP standard.</p><p>Please have a look at the <a href="https://github.com/GPGMail/GPGMail/wiki/Getting-started">getting started</a> and <a href="http://gpgmail.org/faq">FAQ</a> section. It would be nice to <a href="http://www.apple.com/feedback/macosx.html">tell Apple</a> to support bundles for Mail.app officially.</p>');
$theSite->assign('lighthouse', '65764');

$limitations = array(
'11' => 'Unread count goes out of sync',
'94' => 'OpenType fonts are not displayed',
'107' => 'Automatic update not working the system wide installations'
);
$theSite->assign('limitations', $limitations);

$features = array(
'installericon.png' => array('Is part of the <a href="installer.html" title="our main project: the installer">GPGTools Installer</a>', 'Installer'),
"secure.jpg" => array("Sign, encrypt, decrypt, and verify all your mails", "mail security"),
"64bit.jpg" => array("The bundle is 64-bit and Snow Leopard ready", "Snow Leopard")
);
$theSite->assign('features', $features);

$screenshots = array(
"compose.png" => "Composing a message",
"encrypted.png" => "Encrypted message",
"decrypted.png" => "Decrypted message"
);
$theSite->assign('screenshots', $screenshots);

$screencasts = array('encrypt_mail.m4v' => 'Send an encrypted Mail');
$theSite->assign('screencasts', $screencasts);

$theSite->assign('macupdate', "7654");
$theSite->assign('iusethis', "gpgmail");

$changelog = array(
"Issue 221: Fixed compatibility with 10.6.5",
"Issue 14: Added make clean",
"Issue 98: Renamed preference pane to GPGMail",
"Issue 54: Renamed PGP to OpenPGP in the menu",
"Issue 81: Disabled 'update now' button",
"Issue 212: Started to update the logos",
"And many, many other minor updates"
);
$theSite->assign('changelog', $changelog);

$theSite->display('templates/project.tpl');
?>
