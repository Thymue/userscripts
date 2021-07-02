// ==UserScript==
// @name        osu!beatmap mirrors
// @namespace   http://thymo.ga/
// @match       https://osu.ppy.sh/*
// @grant       none
// @version     2021.520.0
// @author      thymue
// @description Appends mirror buttons on beatmapset download page & adds various small stuff to the beatmap page
// @updateURL   https://github.com/Thymue/userscripts/raw/master/beatmapmirrors.user.js
// @downloadURL https://github.com/Thymue/userscripts/raw/master/beatmapmirrors.user.js
// @supportURL  https://osu.ppy.sh/users/7820468
// ==/UserScript==
(() => {
    const obmSettings = {
        "showBeatmapMirrorButtons": true,  
        "enableOsuDirectReplacement": true,
        "showShortenedBeatmapLink" : true
    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    let lastURL = document.location.href;

    document.onreadystatechange = () => {
        if(document.readyState == "complete")
        {
            // Inject on page load first
            injectScriptItems();

            const mutationObserver = new MutationObserver((mutationRecordList) => {
                for(const mutationRecord of mutationRecordList)
                {
                    if(mutationRecord.target.tagName == "BODY")
                    {
                        // Attach mutation observer to the body again because the previous one dies
                        // TODO: Take a look at the options and change if they are not necessary
                        mutationObserver.observe(document.body, {subtree: true, childList: true});
                    }
                }
              
                if(lastURL != document.location.href)
                {
                    lastURL = document.location.href;

                    // TODO: Going back in history breaks this -> hotfixed with the setTimeout dunno if I'll bother myself with finding another solution since this works well

                    // Inject again when body is changed
                    setTimeout(injectScriptItems, 100);
                }
            });
            mutationObserver.observe(document.body, {subtree: true, childList: true});
        }
    }
    
    const beatmapMirrorSites = [
        /*{"name": "Bloodcat", "download_link": "https://bloodcat.com/osu/s/", "icon": "https://bloodcat.com/_data/BloodCat.svg", "iconHeight": 30, "iconWidth": 20},*/ //https://svgur.com/i/Sp6.svg
        {"name": "Chimu", "download_link": "https://chimu.moe/d/", "icon": "https://chimu.moe/static/images/logo-512x512.png", "iconHeight": 30, "iconWidth": 30}, // Bloodcat replacement
        {"name": "Beatconnect", "download_link": "https://beatconnect.io/b/", "icon": "https://beatconnect.io/static/img/logo.png", "iconHeight": 30, "iconWidth": 27},
        {"name": "Nerina", "download_link": "https://nerina.pw/d/", "icon": "https://nerina.pw/static/favicon.ico", "iconHeight": 30, "iconWidth": 31},
        {"name": "Sayobot", "download_link": "https://osu.sayobot.cn/osu.php?s=", "icon": null, "iconHeight": null, "iconWidth": null}//,
        /*{"name": "Hentai ninja", "download_link": "https://hentai.ninja/d/", "icon": "https://hentai.ninja/favicon.ico", "iconHeight": 30, "iconWidth": 27}*/
    ]

    const beatmapMirrorButtons = []
  
    // Create mirror button nodes so when they get added multiple times it just fixes itself
    function createMirrorButtons ()
    {
        for(const mirror of beatmapMirrorSites)
        {
            beatmapMirrorButtons.push($(`
            <a href="${mirror.download_link + document.location.href.split("/")[4].split("#")[0]}" class="btn-osu-big btn-osu-big--beatmapset-header">
              <span class="btn-osu-big__content ">
                <span class="btn-osu-big__left">
                  <span class="btn-osu-big__text-top">${mirror.name} Mirror</span>
                </span>
                <span class="btn-osu-big__icon">
                  ${mirror.icon != null ?
                  "<div style=\"background: url(" + mirror.icon + "); height: " + mirror.iconHeight + "px; width: " + mirror.iconWidth + "px;background-size: cover;\"></div>" : ""}
                </span>
              </span>
            </a>`));
        }
    }
  
    let shortenedLinkElement = $(`<p>removemelol</p>`);

    function injectScriptItems()
    {
        if(document.URL.indexOf("beatmapsets/") >= 0)
        {
            // Add mirror buttons
            if(obmSettings.showBeatmapMirrorButtons)
            {
                for(const mirror of beatmapMirrorButtons)
                {
                    mirror.remove();
                }
              
                beatmapMirrorButtons.splice(0, beatmapMirrorButtons.length);
                createMirrorButtons();
              
                for(const mirror of beatmapMirrorButtons)
                {
                    $(".beatmapset-header__buttons").append(mirror);
                }
            }

            // Make osu!direct button work even without supporter (only if you're playing on a private server and have supporter there)
            if(obmSettings.enableOsuDirectReplacement)
            {
                const osuBeatmapButtons = $(".btn-osu-big.btn-osu-big--beatmapset-header");
                osuBeatmapButtons.each((osuBeatmapButtonIndex) => {
                    if(osuBeatmapButtons[osuBeatmapButtonIndex].href == "https://osu.ppy.sh/home/support")
                    {
                        osuBeatmapButtons[osuBeatmapButtonIndex].setAttribute("href", `osu://dl/${document.URL.split("/")[4].split("#")[0]}`);
                    }
                });
            }
            
            // Add shortened beatmap link on the beatmap page
            if(obmSettings.showShortenedBeatmapLink)
            {
                shortenedLinkElement.remove();
              
                const shortenedLink = `https://osu.ppy.sh/b/${document.URL.split("/")[5]}`;
              
                shortenedLinkElement = $(`
                <div>
                    <h3 class="beatmapset-info__header">Shortened link to this difficulty</h3>
                    <a href="${shortenedLink}">${shortenedLink}</a>
                </div>`);
                $(".beatmapset-stats__row.beatmapset-stats__row--advanced").append(shortenedLinkElement);
            }
        }
    }
})();
