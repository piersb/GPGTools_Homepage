{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>Contact</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
		<script>
			window.onload=function () {
				if (window.location.search.search(/spam=1/) != -1) {
					document.getElementById("spamText").style.display = null;
				}
			}
		</script>
        <div id="m_content">
            <h3 id="contactus">Get Support</h3>
            <p>We would be pleased to hear from you!<br><br>
            If you need assistance, do visit our Support Site,<br>
            but first consider reading our <a href="http://support.gpgtools.org/kb/how-to/first-steps-where-do-i-start-where-do-i-begin">Quickstart Tutorial</a>.</p>
            <ul class="sub projects">
                <li><div class="project smallicons"><a href="http://support.gpgtools.org" title="web support"><img src="{$root}/images/tenderapp-64.png" title="web support" alt="web supprt" /><br/>Support Site</a><!--<br/>(or <a href="javascript:linkTo_UnCryptMailto('nbjmup;tvqqpsuAhqhuppmt/psh');">via mail</a>)--></div></li>
                <li><div class="project smallicons"><a href="http://twitter.com/gpgtools" title="twitter"><img src="{$root}/images/twitter.png" title="twitter" alt="twitter" /><br/>Twitter</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <h3>Post a question to our support site</h3>
                <form action="mail.php" method="post" onsubmit="return encrypt();" name="feedback" id="feedback">
                    <b>Email</b> (so we can respond; optional)<br>
                    <input type="email" name="mail" /><br>
                    <b>Spam protection</b> (what it 24 minus 1?)<br>
                    <input type="spam" name="spam" /><span id="spamText" style="display:none; color:red;"> Are you bot?</span><br />
                    <b>Subject</b><br />
                    <input type="text" name="subject" /><br>
                    <b>Message</b><br />
                    <textarea name="message"></textarea><br>
                    <p>In order to answer your questions as fast as possible, this message will be posted<br>
                    to our public support forum where other GPGTools users will be able to help out as well.<br><br>If you're message contains cofidential information or you only want us to see it,<br>please make sure to activate the following checkbox.</p>
                    <input style="width:1.5em;vertical-align:middle;" type=checkbox name="confidential" id="confidential" value="yes" onclick="toggleSecurity();"><span class="small">Only show this message to the GPGTools support staff (this message will be sent encrypted)</span><br/>
                    <input type="submit" name="feedbackbutton" id="feedbackbutton" value="send feedback" />
                    <input type="hidden" name="encrypted" />
                 </form>

            <p class="clear"><br/></p>
            <h3 id="contactyou">For Users</h3>
            <ul class="sub projects">
                <li><div class="project smallicons"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-announce" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Announcements</a></div></li>
                <li><div class="project smallicons"><a href="./files/gpgtools.asc" title="Our OpenPGP Key"><img src="{$root}/images/gpgkey.png" title="Our OpenPGP Key" alt="gpgkey" class="logo2" /><br/>Our OpenPGP Key</a></div></li>
                <li><div class="project smallicons"><a href="appcast.xml" title="subscribe our appcast feed"><img src="{$root}/images/rss.png" title="subscribe our appcast feed" alt="rss" /><br/>Appcast Feed</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <h3 id="getinvolved">For Developers</h3>
            <ul class="sub projects">
                 <li><div class="project smallicons"><a href="http://lists.gpgtools.org/mailman/listinfo/gpgtools-devel" title="join our mailing list"><img src="{$root}/images/mail.png" title="join our mailing list" alt="mailing list" /><br/>Developer List</a></div></li>
                <li><div class="project smallicons"><a href="http://github.com/gpgtools/" title="Github page"><img src="{$root}/images/octocat.png" title="github page" alt="github" class="logo2" /><br/>Github Page</a></div></li>
                <li><div class="project smallicons"><a href="http://gpgtools.lighthouseapp.com/tickets" title="issue tracker"><img src="{$root}/images/lighthouseapp.png" title="issue tracker" alt="lighthouseapp" /><br/>Bug Tracker</a></div></li>
                <li><div class="project smallicons"><a href="http://gpgtools.lighthouseapp.com/events.atom" title="subscribe our bug tracker feed"><img src="{$root}/images/rss.png" title="subscribe our bug tracker feed" alt="rss" /><br/>Tracker Feed</a></div></li>
                <li><div class="project smallicons"><a href="http://support.gpgtools.org/discussions.atom" title="subscribe our support questions feed"><img src="{$root}/images/rss.png" title="subscribe our support questions feed" alt="rss" /><br/>Support Feed</a></div></li>
                <li><div class="project smallicons"><a href="http://nightly.gpgtools.org/" title="nightly builds"><img src="{$root}/images/macgpg_gray.png" title="nightly untested builds" alt="nightly" /><br/>Nightly Builds</a></div></li>
            </ul>
            <p class="clear"><br/></p>
            <p class="hint">Our OpenPGP Key ID: 0x76D78F0500D026C4<br/>Our OpenPGP Fingerprint: 85E3 8F69 046B 44C1 EC9F B07B 76D7 8F05 00D0 26C4</p>
            </ul>         
        </div>
{/block}
