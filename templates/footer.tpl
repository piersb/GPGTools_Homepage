    <footer>
    <hr/><div id="socialshareprivacy"></div>
    </footer>
  </div>
</div>
  <!--[if lt IE 7 ]>
    <script src="./js/libs/dd_belatedpng.js"></script>
    <script> DD_belatedPNG.fix('img, .png_bg'); //fix any <img> or .png_bg background-images </script>
  <![endif]-->

<!-- Piwik -->
<script type="text/javascript">
var _paq = _paq || [];
(function(){
    var u=(("https:" == document.location.protocol) ? "https://{$PIWIK_URL}" : "http://{$PIWIK_URL}");
    _paq.push(['setSiteId', {$IDSITE}]);
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['setDownloadExtensions', 'dmg|zip|pkg|sig']);
    _paq.push(['setDownloadClasses', 'piwik_download']);
    _paq.push(['setDomains', ['*.gpgtools.org', 'github.com']]);
    var d=document,
        g=d.createElement('script'),
        s=d.getElementsByTagName('script')[0];
        g.type='text/javascript';
        g.defer=true;
        g.async=true;
        g.src=u+'piwik.js';
        s.parentNode.insertBefore(g,s);
})();
</script>
<noscript><p><img height="1" width="1" src="http://{$PIWIK_URL}piwik.php?idsite={$IDSITE}&amp;rec=1" style="border:0" alt="" /></p></noscript>
<!-- End Piwik Tag -->
  <!-- social bookmarks -->
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
  <script type="text/javascript" src="{$root}/js/socialshareprivacy/jquery.socialshareprivacy.min.js"></script>
  <script type="text/javascript">
    txt_info='2 clicks for better data protection: Only when you click here, the button is active and you can send your recommendation on the selected social network. Even when you only enable it, data will be transferred to third parties - see <em>i</em> (German).';
    txt_help='When you activate these fields by clicking, information on Facebook, Twitter and Google are transferred to the United States and may also be stored there. To learn more, click on the <em>i</em> (German).';
    jQuery(document).ready(function($){
      if($('#socialshareprivacy').length > 0){
$('#socialshareprivacy').socialSharePrivacy({
  services : {
    facebook : {
        'perma_option': 'off',
        'status' : 'on',
        'language' : 'en',
        'dummy_img' : '{$root}/js/socialshareprivacy/images/dummy_facebook_en.png',
        'app_id'      : '217173161670898',
        'txt_fb_off' : 'not connected with Facebook',
        'txt_fb_on' : 'connected with Facebook',
        'txt_info' : txt_info,
    },
    twitter : {
        'perma_option': 'off',
        'status' : 'on',
        'language' : 'en',
        'dummy_img' : '{$root}/js/socialshareprivacy/images/dummy_twitter.png',
        'txt_twitter_off' : 'not connected with Twitter',
        'txt_twitter_on' : 'connected with Twitter',
        'txt_info' : txt_info,
    },
    gplus : {
        'perma_option': 'off',
        'status' : 'on',
        'language' : 'en',
        'dummy_img' : '{$root}/js/socialshareprivacy/images/dummy_gplus.png',
        'txt_gplus_off' : 'not connected with Google+',
        'txt_gplus_on' : 'connected with Google+',
        'txt_info' : txt_info,
    }
  },
  'cookie_domain' : 'gpgtools.org',
  'settings_perma' : 'Agree to activate the social buttons permanently',
  'css_path' : '{$root}/js/socialshareprivacy/socialshareprivacy.css',
  'txt_help' : txt_help,
});
      }
    });
  </script>
  <!-- social bookmarks -->
  <!-- openPGP -->
        <script src="{$root}/js/mail.js"></script>
        <script src="{$root}/js/hanewin/sha1.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/cast5.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/rsa.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/aes-enc.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/base64.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/mouse.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/hanewin/PGencode.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/openpgp/core.js" type="text/javascript" charset="utf-8" defer="defer"></script>
        <script src="{$root}/js/openpgp/gpgtools.js" type="text/javascript" charset="utf-8" defer="defer"></script>
  <!-- openPGP -->
</body>
</html>
