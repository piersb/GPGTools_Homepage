{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><img src="{$img_logo}" alt="{$title}" title="{$title}" class="logo"/> <h2>{$title}</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="info" {if $title|strtolower == 'gpgmail'}style="margin-top: 8em"{/if}>
    {if $url_dl neq ''}
    <a href="https://github.com/downloads/{$url_base}/{$url_dl}" class='piwik_download' target='_blank' title='start the download'><img src="{$root}/images/download.png" title="download" alt="download" id="download"/></a>
    <h3><a href="https://github.com/downloads/{$url_base}/{$url_dl}" class='piwik_download' target='_blank' title='start the download'>Download ({math equation="ceil(x / 1000000)" x=$changelog[$changelog|@key][1]['sparkle_size']} MB)</a></h3>
    {/if}
    <p>Version {$version}<br/></p>
    <p>{$date}<br/></p>
    <p>Requires {$reqs}<br/></p>
        <hr>
    <p>({if $url_sig neq ''}<a href="https://github.com/downloads/{$url_base}/{$url_sig}" class='piwik_download' target='_blank' title='the gpg file signature'>sig</a>|{/if}{if $url_sig neq ''}<a href="#releasenotes" title='the SHA-1 file checksum'>sha</a>|{/if}{if $url_sig neq ''}<a href="https://github.com/{$url_base}/downloads" title='other files and versions' target='_blank'>others</a>|{/if}<a href="https://github.com/{$url_base}" title='the sources of this project' target='_blank'>src</a>|<a href="https://github.com/{$url_base}/raw/master/LICENSE.txt" title='the license of this project' target='_blank'>license</a>{if $url_beta neq ''}|<a href="https://github.com/downloads/{$url_base}/{$url_beta}" title="not released test version (use at your own risk)" target='_blank'>pre-release</a>{/if}|{if $url_wiki neq ''}<a href="https://github.com/{$url_base}/{$url_wiki}" title="community maintained wiki" target='_blank'>wiki</a>|{/if}<a href="appcast.xml" title='a feed with the latest versions' target='_blank'>feed</a>)</p>
    </div>
    <div id="main">
        <div id="m_content">
        	{if $title|strtolower == 'gpgmail'}
<div id="announcement"> <b>IMPORTANT:</b> We have a first preview of GPGMail for Mountain Lion. Get early access and help development by <a href="https://www.gpgtools.org/donate.html" title="10.8_Donate">donating</a>.			<br><br>
			<b>IMPORTANT:</b> If you're running <b>10.7.5</b> please download and install the newest GPGMail version from <a href="https://nightly.gpgtools.org/GPGMail-latest.dmg">nightly.gpgtools.org</a><br><br>
			<b>IMPORTANT:</b> If you've installed the <b>security update for 10.6.8</b>, please find instructions to fix GPGMail <a href="http://support.gpgtools.org/discussions/everything/1959-osx-update-mail-53-compatibility/page/1?to=%2Fdiscussions%2Feverything%2F1959-osx-update-mail-53-compatibility%2Fpage%2F2%3Fto%3D%252Fdiscussions%252Feverything%252F1959-osx-update-mail-53-compatibility#comment_18890884">here</a></div>
{/if}<br><br>
        	
            <h3 {if $title|strtolower == 'gpgmail'}style="margin-top: 2em"{/if}>Overview</h3>
            {$overview}
            <p><br/><br/></p>


            <h3>Support and Issues</h3>
            <p>Please have a look at the <a href="http://gpgtools.lighthouseapp.com/projects/{$lighthouse}/tickets?q=state%3Aopen&amp;filter=" target='_blank'>list of open issues</a> and ask on our <a href="http://support.gpgtools.org/">support page</a> if you need further help.</p>
            {if is_array($limitations)}
			<p>Often reported limitations:</p>
            <ul id="limitations" class="sub">
				{foreach from=$limitations key=l_id item=l_title}
                <li>{if $l_id != ''}<a href="http://gpgtools.lighthouseapp.com/projects/{$lighthouse}/tickets/{$l_id}">Issue #{$l_id}</a>: {/if}{$l_title}.</li>
				{/foreach}
			</ul>
            {else}
            <p><br/><br/></p>
            {/if}


            {if is_array($features)}
            <br>
            <h3>Main Features</h3>
            <ul id="features" class="sub">
               {foreach from=$features key=f_url item=f_title}
                <li><img src="{$f_url}" alt="{$f_title[1]}" title="{$f_title[1]}" class="icon" /> {$f_title[0]}.</li>
                {/foreach}
            </ul>
            {/if}


            {if is_array($screenshots)}
            <br>
            <h3>Screenshots</h3>
            <ul class="sub projects horizontal">
            {foreach from=$screenshots key=o_url item=o_title}
				{if is_array($o_title)}
					{assign var="o_thumb" value=$o_title[0]}
					{assign var="o_title" value=$o_title[1]}
				{else}
					{assign var="o_thumb" value=$o_url}
				{/if}
                <li>
					<a href="{$o_url}">
						<img class="screenshot" src="{$o_thumb}" alt="{$o_title}" title="{$o_title}" />
						<br/>{$o_title}.
					</a>
				</li>
            {/foreach}
            </ul>
            <p><br class="clear"/></p>
            {/if}


            {if is_array($screencasts)}
            <br>
            <h3>Screencasts</h3>
            <ul class="sub projects horizontal">
            {foreach from=$screencasts key=s_url item=s_title}
                <li>
					<a href="http://www.gpgtools.org/videos/{$s_url}" title='{$s_title}'>
						<img class="screenshot" src="{$root}/images/screencast.jpg" alt="{$s_title}" title="{$s_title}" />
						<br />{$s_title}.
					</a>
				</li>
            {/foreach}
            </ul>
            <p><br class="clear"/></p>
           {/if}

           	<br>
            <h3 id="releasenotes">Release Notes</h3>
            <p>Also have a look at the <a href="{$changelogfile}" target='_blank'>list of all release notes</a> and <a href="https://github.com/{$url_base}/commits" title='last commits' target='_blank'>list of last changes</a>.<br/><br/></p>
			{foreach $changelog as $changes}
				{if $changes@index eq 3}
					{break}
				{/if}
                <p><b>Version {$changes@key} ({$changes[0]}).</b></p>
                <ul class="sub">
                {foreach $changes[1] as $change}
                    {if $change@key|substr:0:7 == 'sparkle'}{continue}{/if}
                    {if $change@key > 0}
                       <li><a href='http://gpgtools.lighthouseapp.com/projects/{$lighthouse}/tickets/{$change@key}' target='_blank'>Issue {$change@key}</a>: {$change}.</li>
                    {else}
                        <li>{$change}.</li>
                    {/if}
                {/foreach}
                </ul>
            {/foreach}
        </div>
{/block}
