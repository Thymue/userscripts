// ==UserScript==
// @name         osu!userpage sort
// @namespace    http://thymo.ga/
// @version      1.12
// @description  Automatically sorts people's userpages how you want them to be.
// @author       Thymue
// @match        https://osu.ppy.sh/*
// @updateURL    https://github.com/Thymue/userscripts/raw/master/userpagesort.user.js
// @downloadURL  https://github.com/Thymue/userscripts/raw/master/userpagesort.user.js
// @supportURL   https://osu.ppy.sh/users/7820468
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*
    1.0 - it works pog
    1.1 - opening user profile of the same person twice in a row now doesn't break sorting
    1.11 - added account_standing to sorting so it won't be first anymore (if you don't want it to)
    1.12 - moved to github
    */

    /*
    beatmaps
    me
    historical
    recent_activity
    medals
    kudosu
    top_ranks
    account_standing
    */
    let order = `me
    recent_activity
    top_ranks
    historical
    beatmaps
    medals
    kudosu
    account_standing`

    let lastUrl = "";
    function checkUrl() {
        if(window.location.href != lastUrl) {
            if(window.location.href.startsWith("https://osu.ppy.sh/users/")) {
                waitForLoad();
            }
            lastUrl = window.location.href;
        }
        setTimeout(() => checkUrl(), 50);
    }

    function waitForLoad() {
        if(document.querySelector(".osu-layout__row.ui-sortable") == null) setTimeout(() => waitForLoad(), 50);
        else setTimeout(() => sort(), 100);
    }

    function sort() {
        let sortableui = document.querySelector(".osu-layout__row.ui-sortable");
        for(let orderItemIndex = 0; orderItemIndex < order.split("\n").length; orderItemIndex++) {
            let orderItem = order.split("\n")[orderItemIndex].trim();
            for(let suiChildIndex = 0; suiChildIndex < sortableui.children.length; suiChildIndex++) {
                let suiChildId = sortableui.children[suiChildIndex].getAttribute("data-page-id");
                if(orderItem == suiChildId) {
                    sortableui.appendChild(sortableui.children[suiChildIndex]);
                }
            }
        }
    }
    checkUrl();
})();
