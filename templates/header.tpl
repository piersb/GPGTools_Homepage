<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>{$title} | {if $subtitle neq ''}{$subtitle} | {/if}GPGTools (OpenPGP Tools for Apple OS X)</title>
  <meta name="description" content="{$title} | {if $subtitle neq ''}{$subtitle} | {/if}GPGTools - OpenPGP/PGP/GPG tools for Apple OS X (GPGMail, GPG Keychain Access, ...). To encrypt, decrypt, validate, and sign files and e-mails.">
  <meta name="author" content="GPGTools Project Team">
  <meta name="keywords" content="OpenPGP, PGP, GPG, Encryption, Decryption, Security, Apple, OS X, Mail, Keychain, Digital Signatures">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="all" />
  <link href="https://plus.google.com/114902699475020542041/" rel="author" />
  {if $prefetch neq ''}
  <link rel="prerender" href="{$prefetch}">
  <link rel="prefetch" href="{$prefetch}">
  {/if}
  <link rel="shortcut icon" href="{$root}/favicon.ico">
  <link rel="apple-touch-icon" href="{$root}/apple-touch-icon.png">
  <link rel="stylesheet" media="all" href="{$root}/css/style.css?v=2">
  <link rel="stylesheet" media="all" href="{$root}/css/ml-teaser.css?1368977159">
  <!--[if (gt IE 9)|!(IE)]><!-->   <link rel="stylesheet" media="screen and (min-device-width: 1024px)" href="{$root}/css/badge.css?v=2" /> <!--<![endif]-->
  <link href="http://twitter.com/statuses/user_timeline/170783148.rss" rel="alternate" title="recent tweets" type="application/rss+xml" />
  <link href="appcast.xml" rel="alternate" title="recent releases" type="application/rss+xml" />
  <link href="http://gpgtools.lighthouseapp.com/events.atom" rel="alternate" title="recent code changes and issues" type="application/rss+xml" />
  <script src="{$root}/js/libs/modernizr-1.6.min.js"></script>
  {literal}
  <script type="text/javascript" src="//use.typekit.net/cnm0xto.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  {/literal}
</head>

<body>
  <div id="gpgmail-ml-overlay"></div>
  <div id="gpgmail-ml-teaser">
    <div class="ml-content clearfix">
      <div class="ml-logo">
        <img src="/images/ml-teaser/gpgmail-ml-logo.png" width="408" height="687" alt="GPGMail Mountain Lion Logo">
      </div>
      <div class="ml-text">
	    <div class="ml-new"><img src="/images/ml-teaser/new-badge.png" alt="new-badge" width="95" height="53" /></div>
		<hgroup>
		  <h1>GPGMail</h1>
		  <h2><span>The new GPGMail is here with full support for</span><span class="highlight">OS X 10.8 Mountain Lion</span>.</span><span>We couldn't be more excited to finally share it with you!</span></h2>
		  <h2 class="call-for-donation"><span class="highlight">Thank you for downloading GPGMail.</span> <span>We really hope you like it as much as we do!</span></h2>
		</hgroup>
		<p>Please consider that while this version is working really well,
		   we still consider it to be a beta version. Expect the occasional crash
		   and please report any bugs on our <a href="http://support.gpgtools.org">Support Platform</a>.</p>
		<p class="call-for-donation">We couldn't have done this without our fantastic donators!<br>So if you like our apps, please consider donating so we can keep making them even better for you.<br><br>We really appreciate it.</p>
		<a href="{$gpgmail_ml_url}" class="action-button download-ml"><span>GET IT NOW!</span></a>
		<a class="call-for-donation donate-creditcard action-button" href="#">Donate via Credit Card</a>
		<div class="continue-to-site"> or <a href="#">&nbsp;&nbsp;&nbsp;Continue to site</a></div>
		<div class="call-for-donation other-donation-options"> or <a href="#" class="call-for-donation">&nbsp;&nbsp;see other payment options</a></div>
      </div>
    </div>
  </div>
  <div id="container">
    <header>
      <div id="foo">
          <div id="logo">
            <a href="{$root}/index.php"><img src="{$root}/macgpg1/images/logo-128px.png" alt="GPGTools" title="GPGTools" class="logo"/></a>
            <h1><a href="{$root}/index.php" id="header">GPGTools</a></h1>
          </div>
          <div id="navigation">
            <ul>
              <li><a href="{$root}/projects.php" title="more information about the included applications and related projects">Projects</a>|</li>
              <li><a href="http://support.gpgtools.org/kb" title="frequently asked questions">FAQ</a>|</li>
              <li><a href="{$root}/about.php" title="how to contact us">Contact</a>|</li>
              <li><a href="{$root}/donate.php" title="how to donate">Donate</a></li>
            </ul>
          </div>
      </div>
    </header>
