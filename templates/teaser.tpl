{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
        <div id="announcement"><b>((TODO)):</b> ((TODO)) <a href="http://nightly.gpgtools.org/" title="Nightly">((TODO))</a></div>
            <div class="project2">
                <div class="table">
                                <ul id="horizontal-list">

                <li>
                <a href="installer/index.php" title="The all-in-one installer">
                    <img src="{$root}/gpgmail/images/logo-128px.png" alt="GPGMail 2.0" title="GPGMail 2.0" />
                    <br/>
                    Final GPGMail 2.0 Release
                </a>
                </li>

                </ul>
                </div>
            </div>
<h3>Final GPGMail 2.0 Released</h3>
<p>((todo))</p>
<h3>New Features</h3>
<p>((todo))</p>
            <div class="project2">
                <div class="table">
                                <ul id="horizontal-list">

                <li> <a
href="gpgmail/images/preferences.png"> <img
class="screenshot" src="gpgmail/images/preferences-small.png" alt="Preferences" title="Preferences" /> <br/>Preferences. </a></li><li> <a
href="gpgmail/images/compose.png"> <img
class="screenshot" src="gpgmail/images/compose-small.png" alt="Encrypting and signing a message" title="Encrypting and signing a message" /> <br/>Encrypting and signing a message. </a></li><li> <a
href="gpgmail/images/decrypted.png"> <img
class="screenshot" src="gpgmail/images/decrypted-small.png" alt="Decrypted and validated message" title="Decrypted and validated message" /> <br/>Decrypted and validated message. </a></li>

                </ul>
                </div>
            </div>


<h3>Help us to develop the next version</h3>
<p>((todo))</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_donations">
<input type="hidden" name="business" value="donations@gpgtools.org">
<input type="hidden" name="lc" value="US">
<input type="hidden" name="item_name" value="GPGTools">
<input type="hidden" name="item_number" value="gpgtools">
<input type="hidden" name="no_note" value="0">
<input type="hidden" name="currency_code" value="EUR">
<input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" style="width:7em; border:0px;">
<input name="on0" value="Publish my sponsor name" type="hidden">
<input name="os0" value="No" type="hidden">
<input name="on1" value="Comment" type="hidden">
<input name="os1" value="Nothing" type="hidden">
<ul >
<li><input name="os0" value="Yes" checked="checked" type="checkbox" style="width:1.5em; vertical-align:middle; margin-top: 0em; margin-bottom: 0em;">Publish my sponsor name (if I donated more than 20 EUR)</li>
<li>A comment about your donation (if you want to): <input name="os1" value="" type="text" style="margin-top: 0em; margin-bottom: 0em;"></li>
</ul>
<img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" style="border:0px;">
</form><br/>
            </div>
{/block}
