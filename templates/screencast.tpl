{extends file="index.tpl"}
{block name=body}
    <div id="overview">
      <div id="o_content"><h2>Screencast</h2></div>
    </div>
    <div id="spacer">
    </div>
    <div id="main">
        <div id="m_content">
            <h3>Introduction</h3>
            <p>A short screencast (2:39, 70MB) to show you what GPGTools is and how it works:</p>
            <ul class="sub"></ul><p></p>
        </div>
        <div class="video-js-box">
        <video class="video-js" width="680" height="400" controls poster="http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.png">
          <source src="http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.m4v" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          <object id="flash_fallback_1" class="vjs-flash-fallback" width="680" height="400" type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">
            <param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" />
            <param name="allowfullscreen" value="true" />
            <param name="flashvars" value='config={ldelim}"playlist":["http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.png", {ldelim}"url": "http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.m4v","autoPlay":false,"autoBuffering":false{rdelim}]{rdelim}' />
            <img style="border:1px solid black; height:4em; padding: 1em;" src="http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.png" width="680" height="400" alt="Poster Image" title="No video playback capabilities." />
          </object>
        </video>
      </div>
        <p>
          <br />
          <strong>Download Video:</strong>
          <a href="http://dl.dropbox.com/u/1358485/gpgtools/GPGTools.m4v">MP4</a> |
          <a href="http://videojs.com">HTML5 Video Player</a> by VideoJS |
          <a href="http://soehngen.bandcamp.com/album/how-do-you-do">Shut Up Dub</a>, by Christoph Soehngen
        </p>

{/block}
