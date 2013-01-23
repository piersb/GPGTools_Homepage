{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>Projects</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
            <h3 id="installer" class="clear">The GPGTools Installer</h3>
            <p>The main goal is to provide an easy installer for GnuPG and
            all related tools on OS X.</p>
            <ul class="sub projects">
                <li><div class="project"><a href="installer/index.php"><img src="{$root}/installer/images/logo-128px.png" alt="Installer OpenPGP and related tools" title="Installer for OpenPGP and related tools" class="logo"/><br/>Installer</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <h3 id="maintained" class="clear">Maintained Projects</h3>
            <p>List of maintained projects that are (mostly) included in the installer:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="gpgmail/index.php"><img src="{$root}/gpgmail/images/logo-128px.png" alt="OpenPGP plugin for Apple Mail" title="OpenPGP plugin for Apple Mail" class="logo"/><br/>GPGMail</a></div></li>
                <li><div class="project"><a href="keychain/index.php"><img src="{$root}/keychain/images/logo-128px.png" alt="Keychain for OpenPGP" title="Keychain for OpenPGP" class="logo"/><br/>GPG Keychain Access</a></div></li>
                <li><div class="project"><a href="macgpg1/index.php"><img src="{$root}/macgpg1/images/logo-128px.png" alt="Mac OS X bindings for GnuPG 1.x" title="Mac OS X bindings for GnuPG 1.x" class="logo"/><br/>MacGPG1</a></div></li>
                <li><div class="project"><a href="macgpg2/index.php"><img src="{$root}/macgpg2/images/logo-128px.png" alt="Mac OS X bindings for GnuPG 2.x" title="Mac OS X bindings for GnuPG 2.x" class="logo"/><br/>MacGPG2</a></div></li>
                <li><div class="project"><a href="gpgservices/index.php"><img src="{$root}/gpgservices/images/logo-128px.png" alt="Mac OS X GPG Services Menu" title="Mac OS X GPG Services Menu" class="logo"/><br/>GPGServices</a></div></li>
                <li><div class="project"><a href="gpgpreferences/index.php"><img src="{$root}/gpgpreferences/images/logo-128px.png" alt="Mac OS X GPG System Preferences" title="Mac OS X GPG System Preferences" class="logo"/><br/>GPGPreferences</a></div></li>
                <li><div class="project"><a href="mobile/index.php"><img src="{$root}/mobile/images/logo-128px.png" alt="Mobile OpenPGP" title="Mobile OpenPGP" class="logo"/><br/>Mobile OpenPGP</a></div></li>
            </ul>
            <p class="clear"><br/></p>
        </div>
{/block}
