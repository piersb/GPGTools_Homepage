{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>Contact</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
            <h3 id="contactus">How to contact us</h3>
            <p>We would be pleased to hear from you!
            Since we're an open source project and other users having the same
            question or problem might interested in the answer, all your
            messages will be publicly visible. Here are your options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://support.gpgtools.org" title="web support"><img src="{$root}/images/tenderapp.png" title="web support" alt="web supprt" /><br/>Customer Care</a><br/>(or <a href="javascript:linkTo_UnCryptMailto('nbjmup;tvqqpsuAhqhuppmt/psh');">via mail</a>)</div></li>
                <li><div class="project"><a href="http://twitter.com/gpgtools" title="twitter"><img src="{$root}/images/twitter.png" title="twitter" alt="twitter" /><br/>Twitter</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <p>If you want to send us a private message that may contain confidential information, please drop us a line:<br /><br /></p>
                    <form action="http://www.gpgtools.org/mail.php" method="post" onsubmit="return encrypt();" name="feedback" id="feedback">
                    <b>Your email</b> (so we can get back to you - if you want to)<br />
                    <input type="email" name="mail" /><br />
                    <b>The subject</b><br />
                    <input type="text" name="subject" /><br />
                    <b>The message</b><br />
                    <textarea name="message"></textarea><br />
                    <input type="submit" name="feedbackbutton" id="feedbackbutton" value="send feedback" />
                    <input type="hidden" name="encrypted" />
                    </form>

            <p class="clear"><br/></p>
            <h3 id="contactyou">How to keep up to date</h3>
            <p>To stay up to date you have several options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://twitter.com/gpgtools" title="follow us on twitter"><img src="{$root}/images/twitter.png" title="follow us on twitter" alt="twitter" /><br/>Follow us</a></div></li>
                <li><div class="project"><a href="https://plus.google.com/114902699475020542041/?prsrc=3" title="google+"><img src="{$root}/images/gplus-64.png" title="google+" alt="google+" /><br/>Circle us</a></div></li>
                <li><div class="project"><a href="http://twitter.com/statuses/user_timeline/170783148.rss" title="subscribe our twitter feed"><img src="{$root}/images/rss.png" title="subscribe our twitter feed" alt="rss" /><br/>Twitter Feed</a></div></li>
                <li><div class="project"><a href="appcast.xml" title="subscribe our appcast feed"><img src="{$root}/images/rss.png" title="subscribe our appcast feed" alt="rss" /><br/>Appcast Feed</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-announce" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Announcements</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <h3 id="getinvolved">How to get involved</h3>
            <p>To get involved you have again several options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://gpgtools.lighthouseapp.com/tickets" title="issue tracker"><img src="{$root}/images/lighthouseapp.png" title="issue tracker" alt="lighthouseapp" /><br/>Bug Tracker</a></div></li>
                <li><div class="project"><a href="http://gpgtools.lighthouseapp.com/events.atom" title="subscribe our bug tracker feed"><img src="{$root}/images/rss.png" title="subscribe our bug tracker feed" alt="rss" /><br/>Tracker Feed</a></div></li>
                <li><div class="project"><a href="http://support.gpgtools.org/discussions.atom" title="subscribe our support questions feed"><img src="{$root}/images/rss.png" title="subscribe our support questions feed" alt="rss" /><br/>Support Feed</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-users" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>User List</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-devel" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Developer List</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <h3 id="more">How to get more information</h3>
            <p>More interesting links:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://github.com/gpgtools/" title="Github page"><img src="{$root}/images/octocat.png" title="github page" alt="github" class="logo2" /><br/>Github page</a></div></li>
                <li><div class="project"><a href="./files/gpgtools.asc" title="Our OpenPGP Key"><img src="{$root}/images/gpgkey.png" title="Our OpenPGP Key" alt="gpgkey" class="logo2" /><br/>Our OpenPGP Key</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <p class="hint">OpenPGP Key ID: 0x76D78F0500D026C4<br/>OpenPGP Fingerprint: 85E3 8F69 046B 44C1 EC9F B07B 76D7 8F05 00D0 26C4</p>
        </div>
{/block}
