txt_info='2 clicks for better data protection: Only when you click here, the button is active and you can send your recommendation on the selected social network. Even when you only enable it, data will be transferred to third parties - see <em>i</ em>.';

    jQuery(document).ready(function($){
      if($('#socialshareprivacy').length > 0){
$('#socialshareprivacy').socialSharePrivacy({
  services : {
    facebook : {
      'status' : 'on',
      'language' : 'en',
      'app_id'      : '217173161670898',
      'txt_fb_off' : 'not connected with facebook',
      'txt_fb_on' : 'connected with facebook',
      'txt_info' : txt_info,
    },
    twitter : {
        'status' : 'on',
        'language' : 'en',
        'txt_twitter_off' : 'not connected with twitter',
        'txt_twitter_on' : 'connected with twitter',
        'txt_info' : txt_info,
    },
    gplus : {
        'status' : 'on',
        'language' : 'en',
        'display_name' : 'Google Plus',
        'txt_gplus_off' : 'not connected with Google+',
        'txt_gplus_on' : 'connected with Google+',
        'txt_info' : txt_info,
    }
  },
  'cookie_domain' : 'gpgtools.org',
  'settings_perma' : 'Agree to activate the social buttons permanently',
  'txt_help' : 'When you activate these fields by clicking, information on Facebook, Twitter and Google are transferred to the United States and may also be stored there. To learn more, click on the <em>i</ em>.',
});
      }
    });

