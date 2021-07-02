// ==UserScript==
// @name         osu!mp accuracy
// @namespace    http://thymo.ga/userscripts/
// @version      2020.831.1
// @description  Switches to accuracy metric instead of score on multiplayer history pages if winning condition is set to accuracy
// @author       thymue
// @include      https://osu.ppy.sh/community/matches/*
// @include      http://osu.ppy.sh/community/matches/*
// @updateURL    https://github.com/Thymue/userscripts/raw/master/mpaccuracy.user.js
// @downloadURL  https://github.com/Thymue/userscripts/raw/master/mpaccuracy.user.js
// @supportURL   https://osu.ppy.sh/users/7820468
// @grant        none
// ==/UserScript==

/* globals jQuery, $ */

/*
2020.831.0 - first working release
2020.831.1 - now checks if winning condition is set to accuracy
*/

setInterval(update, 1000); // updates everything every second. if your pc isn't from 1997 and the match you opened doesn't have 31501 maps played it shouldn't cause any problem.

function update() {
    for(let gameEvent of $(".mp-history-events__game")) {
        let skip = true;
        for(let stat of $(gameEvent).find(".mp-history-game__stat")) {
            if(stat.innerText == "Highest Accuracy") skip = false;
        }
        if(skip) continue;

        let blueAccuracy = 0, redAccuracy = 0;
        for(let playerScore of $(gameEvent).find(".mp-history-game__player-score.mp-history-player-score")) {
            if($(playerScore).find(".mp-history-player-score__shapes").attr("style").indexOf("blue") >= 0)
                blueAccuracy = ((blueAccuracy * 100) + (parseFloat($(playerScore).find(".mp-history-player-score__stat.mp-history-player-score__stat--accuracy>.mp-history-player-score__stat-number.mp-history-player-score__stat-number--medium").text()) * 100)) / 100;
            else
                redAccuracy = ((redAccuracy * 100) + (parseFloat($(playerScore).find(".mp-history-player-score__stat.mp-history-player-score__stat--accuracy>.mp-history-player-score__stat-number.mp-history-player-score__stat-number--medium").text()) * 100)) / 100;
        }

        if($(gameEvent).find(".mp-history-game__team-score-text.mp-history-game__team-score-text--score").length <= 0) continue;

        $(gameEvent).find(".mp-history-game__team-score-text.mp-history-game__team-score-text--score")[1].innerText = `${blueAccuracy}%`;
        $(gameEvent).find(".mp-history-game__team-score-text.mp-history-game__team-score-text--score")[0].innerText = `${redAccuracy}%`;

        if(blueAccuracy > redAccuracy) {
            $(gameEvent).find(".mp-history-game__results-text")[0].innerText = "Blue Team wins";
            $(gameEvent).find(".mp-history-game__results-text.mp-history-game__results-text--score")[0].innerText = `by ${((blueAccuracy * 100) - (redAccuracy * 100)) / 100}%`;
        } else {
            $(gameEvent).find(".mp-history-game__results-text")[0].innerText = "Red Team wins";
            $(gameEvent).find(".mp-history-game__results-text.mp-history-game__results-text--score")[0].innerText = `by ${((redAccuracy * 100) - (blueAccuracy * 100)) / 100}%`;
        }
    }
}
