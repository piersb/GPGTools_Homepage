{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>Contact</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
            <h3>Overview</h3>
            <p>This page is about how you can contact us and how to keep up to date:</p>
            <ul class="sub">
                <li><a href="#contactus">How to contact us</a></li>
                <li><a href="#contactyou">How to keep up to date</a></li>
                <li><a href="#more">How to get more information</a></li>
            </ul>

            <h3 id="contactus">How to contact us</h3>
            <p>We would be pleased to hear from you! Since we're an open source project, all your comments will be publicly visible. Here are your options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://support.gpgtools.org" title="web support"><img src="{$root}/images/tenderapp.png" title="web support" alt="web supprt" /><br/>Customer Care</a></div></li>
                <li><div class="project"><a href="http://gpgtools.lighthouseapp.com/tickets" title="issue tracker"><img src="{$root}/images/lighthouseapp.png" title="issue tracker" alt="lighthouseapp" /><br/>Bug Tracker</a></div></li>
                <li><div class="project"><a href="http://twitter.com/gpgtools" title="twitter"><img src="{$root}/images/twitter.png" title="twitter" alt="twitter" /><br/>Twitter</a></div></li>
                <li><div class="project"><a href="https://plus.google.com/114902699475020542041/?prsrc=3" title="google+"><img src="{$root}/images/gplus-64.png" title="google+" alt="google+" /><br/>Google</a></div></li>
                <li><div class="project"><a href="javascript:linkTo_UnCryptMailto('nbjmup;tvqqpsuAhqhuppmt/psh');" title="mail support"><img src="{$root}/images/mail.png" title="mail support" alt="mail support" /><br/>Mail</a></div></li>
                <!--
                <li><div class="project"><a href="javascript:linkTo_UnCryptMailto('nbjmup;hqhuppmt.vtfstAmjtut/hqhuppmt/psh');" title="write to our user mailing list"><img src="{$root}/images/mail.png" title="write to our user mailing list" alt="mail" /><br/>Mail to users</a></div></li>
                <li><div class="project"><a href="javascript:linkTo_UnCryptMailto('nbjmup;hqhuppmt.efwfmAmjtut/hqhuppmt/psh');" title="write to our developer mailing list"><img src="{$root}/images/mail.png" title="write to our developer mailing list" alt="mail" /><br/>Mail to developers</a></div></li>
                -->
            </ul>
            <p class="clear"><br/></p>
            <p>If you want to send us a private mail, please drop us a line:</p>
            <p class="clear"><br/></p>
                    <form action="http://www.gpgtools.org/mail.php" method="post" onsubmit="return encrypt();" name="feedback" id="feedback">
                        Your <b>message</b>: <input type="text" name="message" />
                        and <b>mail</b> (optional): <input type="email" name="mail" />
			<input type="hidden" name="encrypted" />
                        <input type="submit" name="feedbackbutton" id="feedbackbutton" value="send feedback" />
                    </form>

            <p class="clear"><br/></p>
            <h3 id="contactyou">How to keep up to date</h3>
            <p>To stay up to date you have several options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://twitter.com/gpgtools" title="follow us on twitter"><img src="{$root}/images/twitter.png" title="follow us on twitter" alt="twitter" /><br/>Follow us</a></div></li>
                <li><div class="project"><a href="https://plus.google.com/114902699475020542041/?prsrc=3" title="google+"><img src="{$root}/images/gplus-64.png" title="google+" alt="google+" /><br/>Circle us</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-users" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>User List</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-devel" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Developer List</a></div></li>
            </ul>
            <p class="clear">And some more read-only options:</p>
            <ul class="sub projects">
                <li><div class="project"><a href="http://twitter.com/statuses/user_timeline/170783148.rss" title="subscribe our twitter feed"><img src="{$root}/images/rss.png" title="subscribe our twitter feed" alt="rss" /><br/>Twitter Feed</a></div></li>
                <li><div class="project"><a href="appcast.xml" title="subscribe our appcast feed"><img src="{$root}/images/rss.png" title="subscribe our appcast feed" alt="rss" /><br/>Appcast Feed</a></div></li>
                <li><div class="project"><a href="http://support.gpgtools.org/discussions.atom" title="subscribe our support questions feed"><img src="{$root}/images/rss.png" title="subscribe our support questions feed" alt="rss" /><br/>Support Feed</a></div></li>
                <li><div class="project"><a href="http://gpgtools.lighthouseapp.com/events.atom" title="subscribe our bug tracker feed"><img src="{$root}/images/rss.png" title="subscribe our bug tracker feed" alt="rss" /><br/>Tracker Feed</a></div></li>
                <li><div class="project"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-announce" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Announcements</a></div></li>
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
