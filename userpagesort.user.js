// ==UserScript==
// @name         osu!userpage sort
// @namespace    http://thymo.ga/
// @version      2020.819.0
// @description  Automatically sorts people's userpages how you want them to be.
// @author       Thymue
// @include      https://osu.ppy.sh/*
// @include      http://osu.ppy.sh/*
// @updateURL    https://github.com/Thymue/userscripts/raw/master/userpagesort.user.js
// @downloadURL  https://github.com/Thymue/userscripts/raw/master/userpagesort.user.js
// @supportURL   https://osu.ppy.sh/users/7820468
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

//TODO: fix a problem where if you access user profile e.g. from beatmapset page and use back and forward buttons it duplicates oups buttons e.g. the one on the bottom of the page

/*
1.0 - it works pog
1.1 - opening user profile of the same person twice in a row now doesn't break sorting
1.11 - added account_standing to sorting so it won't be first anymore (if you don't want it to)
1.12 - moved to github
2020.311.0 - changed to different version format because I like this more
2020.311.1 - changed @match to @include and added http include just to make sure
2020.726.0 - complete rewrite using jQuery, waitForKeyElements and added configuration and stuff
2020.819.0 - script wasn't working because of some name changes now it should work again
*/

var order = (GM_getValue("oupsOrder") == undefined) ? "" : GM_getValue("oupsOrder").split("\n");
order.splice(order.length - 1, 1); // removes last element from array because it was just empty

waitForKeyElements(".user-profile-pages.ui-sortable", sortPage);

function sortPage() {
    addButtons();
    sort();
    iWannaFeelSpecialToo();
}

function addButtons() {
    if(order == "") {
        $(".js-switchable-mode-page--scrollspy.js-switchable-mode-page--page.js-sortable--page")[0].prepend(
            $('<div id="oups-config-button" style="background:#76906d;text-align:center;font-family:monospace;font-size:20px;cursor:pointer;user-select:none;">Click here to configure userpage sort</div>')[0]
        ); // adds a button above me! page
        $("#oups-config-button").click(showConfigurationScreen);
    }
    $(".footer__row")[0].append(
        $('<a id="oups-footer-reset-button"class="footer__link" style="background:#76906d;text-align:center;font-family:monospace;cursor:pointer;padding:0 5px;user-select:none;">Reset osu Userpage Sort Configuration</a>')[0]
    ); // adds a reset button to the footer
    $("#oups-footer-reset-button").click(resetConfiguration);
}

function showConfigurationScreen() {
    $("body").append(`
    <div id="oups-container" style="transition:all 3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100vw;height:100vh;position:fixed;background:#76906daa;color:white;font-size:3vmin;font-family:monospace;margin:0;z-index:99999;">
		<div id="oups-explanation" style="font-size:2vmin;background:#76906d;margin-bottom:2vh;text-align:center;">Order the items to your liking.<br>Click on an item to move it to the top.</div>
		<div id="me" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">me!</div>
		<div id="recent_activity" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Recent</div>
		<div id="top_ranks" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Ranks</div>
		<div id="historical" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Historical</div>
		<div id="beatmaps" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Beatmaps</div>
		<div id="medals" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Medals</div>
		<div id="kudosu" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Kudosu!</div>
		<div id="account_standing" style="background:#000;user-select:none;cursor:pointer;margin-bottom:1vh">Account Standing</div>
		<div id="oups-save" style="font-size:2vmin;background:#994444;user-select:none;cursor:pointer;">SAVE ORDER</div>
	</div>`);
    $("#me").click(() => {$("#oups-explanation").after($("#me"))}); // moves element under #oups-explanation
    $("#recent_activity").click(() => {$("#oups-explanation").after($("#recent_activity"))});
    $("#top_ranks").click(() => {$("#oups-explanation").after($("#top_ranks"))});
    $("#historical").click(() => {$("#oups-explanation").after($("#historical"))});
    $("#beatmaps").click(() => {$("#oups-explanation").after($("#beatmaps"))});
    $("#medals").click(() => {$("#oups-explanation").after($("#medals"))});
    $("#kudosu").click(() => {$("#oups-explanation").after($("#kudosu"))});
    $("#account_standing").click(() => {$("#oups-explanation").after($("#account_standing"))});
    $("#oups-save").click(() => {
        var order = "";
        var orderElements = $("#oups-container")[0].children;
        for(let i = 0; i < orderElements.length; i++) {
            if(!orderElements[i].getAttribute("id").startsWith("oups-")) order += `${orderElements[i].getAttribute("id")}\n`;
        }
        GM_setValue("oupsOrder", order);
        $("#oups-save").remove();
        $("#oups-explanation")[0].innerText = "There's a reset button at the bottom of the page if you want to change the order later.\nRefresh this page to complete the configuration.";
        $("#oups-container").css("background", "#000000ff");
    });
}

function resetConfiguration() {
    GM_setValue("oupsOrder", "");
    $("#oups-footer-reset-button")[0].innerText = "Now refresh this page.";
}

function sort() {
    if(!order == "") {
        var pages = $(".user-profile-pages.ui-sortable")[0].children;
        order.forEach((orderItem) => {
            for(let i = 0; i < pages.length; i++) {
                if(pages[i].getAttribute("data-page-id") == orderItem) {
                    $(".user-profile-pages.ui-sortable").append(pages[i]);
                    break;
                }
            }
        });
    }
}

function iWannaFeelSpecialToo() {
    if(document.URL.indexOf("7820468") > -1) $(".profile-info__name").after($('<span class="profile-info__title" style="color:#76906d">Sorts userpages for you (˃ᴗ˂)</span>')[0]);
}
