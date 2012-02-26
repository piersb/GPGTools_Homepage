{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
        <div id="announcement"><b>GPGTools</b> - Secure communication the easy way</div>
            <div class="project2">
                <div class="table">
                                <ul id="horizontal-list">

                <li>
                <a href="installer/index.php" title="The all-in-one installer">
                    <img src="{$root}/installer/images/logo-128px.png" alt="Installer for OpenPGP and all necessary files" title="Installer for OpenPGP and all necessary files" />
                    <br/>
                    Download GPGTools Installer
                </a>
                </li>
                <li>
                <a href="http://support.gpgtools.org/kb/how-to/first-steps-where-do-i-start-where-do-i-begin" title="Quickstart">
                    <img src="{$root}/images/screencast.png" alt="Quickstart" title="Quickstart" />
                    <br/>
                    Read the Quickstart Tutorial
                </a>
                </li>
                <li>
                <a href="http://support.gpgtools.org" title="Support">
                    <img src="{$root}/images/tenderapp-128.png" alt="Tenderapp" title="Support" />
                    <br/>
                    Get GPGTools Support
                </a>
                </li>                </ul>
                </div>
            </div>

            <ul class="sub"></ul>
            <p>GPGTools is a collection of several softwares, bringing
            encryption/decryption and signing of e-mails and files, to you on your mac. (See
            <a href="http://gpg4win.org/" title="OpenPGP for Windows">Gpg4win</a>
            if you use Windows.) The main goal is to bring
            <a href="http://en.wikipedia.org/wiki/Pretty_Good_Privacy">OpenPGP</a>
            - in the form of an easy installer package based on
            <a href="http://www.gpgtools.org/macgpg2/index.html" title="MacGPG2">MacGPG</a> - to Apple's OS X.
            Read the <a href="intro.php" title="Introduction to OpenPGP">introduction</a>,
            in order to get a detailed idea of how PGP works.</p><br>
            <p>The <a href="projects.php" title="The projects behind GPGTools">project section</a>
            provides more information about the included applications and related projects.
            Should you have further questions that are not listed in the
            <a href="faq.php" title="Frequently Asked Questions">FAQ</a> or if
            you want to get the latest news, please do not hesitate to open the
            <a href="about.php" title="have a look at the 'How can I contact you?' section.">
            contact</a> section. Finally, we do appreciate any kind of
            <a href="faq.php#5.3" title="How you can contribute">contributions</a> or
            <a href="donate.php" title="How you can donate">donations</a>.</p>

            </div>
{/block}
