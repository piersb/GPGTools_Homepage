{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>About</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
            <h3>What is GPGTools?</h3>
            <p>GPGTools is an open source initiative to bring <a href="http://en.wikipedia.org/OpenPGP">OpenPGP</a> to Apple OS X. This allows you to sign, verify, encrypt and decrypt files and e-mails. The project is originated from efforts revamping GPGMail developments in 2010.</p><ul class="sub"></ul>
            <h3>Why do I need it?</h3>
            <p>The personal privacy is one of the most underestimated goods everyone of us has. By encrypting your data before sending them over the internet you prevent others from reading them during the delivery process. Where the "others" can not only be negligible hackers but more important criminal individuals, business companies or even governments interested in your personal information for various reasons some of them you can't even imagine!</p>
            <p>Another point is the origin of information. Every piece of information has its source that inseparably belongs to it. The source of an information is almost as importand as the information itself. By using GPGTools the reciever of an email or file can be sure the information has been sent by only you. He even can tell if the content has been altered on its way through the internet and is therefore not valid for you. PGP messages cannot be faked! - Not partially, not completely, NOT AT ALL!</p>
            <ul class="sub"></ul>
            <h3>How can I contact you?</h3>
            <p>To contact the GPGTools Project Team please:</p>
            <ul class="sub">
                <li>drop us a mail: <a href="mailto:gpgmail-users@lists.gpgmail.org">to the mailing list</a></li>
                <li>open a bug or feature request: <a href="http://gpgtools.lighthouseapp.com/">at the issue tracker</a></li>
                <li>browse the projects: <a href="http://github.com/gpgtools/">at the github page</a></li>
            </ul>
            <h3>Incubator Projects</h3>
            <p>List of unfinished but interesting projects maintained by the GPGTools Project Team.</p>
            <ul class="sub">
                <li><a href="https://github.com/AlexanderWillner/GPGMail_Mobile/wiki/Introduction">GPGMail mobile</a>. An OpenPGP implementation in JavaScript for mobile devices.</li>
                <li><a href="https://github.com/GPGMail/GPGMail_Preferences">GPGMail/GPGTools Preferences</a>. A system wide preference pane for the GPGTools.</li>
            </ul>
            <h3>Unmaintained Projects</h3>
            <p>List of old unmaintained projects.</p>
            <ul class="sub">
            <li><a href="http://macgpg.sourceforge.net/">MacGPG</a>. GPG related software for OS X (GPGFileTool, GPGDropThing, GPGPreferences, ...).</li>
            <li><a href="http://abkey.far-blue.co.uk/">AB Key</a>. GPG for the OS X address book.</li>
            <li><a href="http://www.far-blue.co.uk/projects/gpgservices.html">GPGService</a>. GPG for the OS X service menu.</li>
            </ul>
        </div>
    </div>
{/block}