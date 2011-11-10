<?php
require('libs/Smarty.class.php');
require('libs/Smarty.config.php');

$theSite->assign('title', 'Screencast');
$theSite->display('templates/screencast.tpl');

?>
