// ==UserScript==
// @name         osu!combined score-ranks
// @namespace    http://thymo.ga/
// @version      2021.702.0
// @description  Adds up s's and ss's
// @author       thymue
// @include      https://osu.ppy.sh/*
// @updateURL    https://github.com/Thymue/userscripts/raw/master/sscombined.user.js
// @downloadURL  https://github.com/Thymue/userscripts/raw/master/sscombined.user.js
// @supportURL   https://osu.ppy.sh/users/7820468
// ==/UserScript==

(() => {
  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  addIcons = async () => {
    if(document.location.href.startsWith("https://osu.ppy.sh/users/")) {
      if($(".profile-rank-count")[0] == undefined) await sleep(1000);
      ssh = parseInt($(".profile-rank-count")[1].children[0].innerText.replaceAll(",", ""));
      ss = parseInt($(".profile-rank-count")[1].children[1].innerText.replaceAll(",", ""));
      sh = parseInt($(".profile-rank-count")[1].children[2].innerText.replaceAll(",", ""));
      s = parseInt($(".profile-rank-count")[1].children[3].innerText.replaceAll(",", ""));
      
      if($("#scorerank-sscombined")[0] != undefined) $("#scorerank-sscombined")[0].remove();
      if($("#scorerank-scombined")[0] != undefined) $("#scorerank-scombined")[0].remove();
      
      sscombined = $(`<div class="profile-rank-count__item" id="scorerank-sscombined"><div class="score-rank score-rank--X score-rank--profile-page" style="filter: grayscale(1);"></div>${(ss + ssh).toLocaleString()}</div>`);
      scombined = $(`<div class="profile-rank-count__item" id="scorerank-scombined"><div class="score-rank score-rank--S score-rank--profile-page" style="filter: grayscale(1);"></div>${(s + sh).toLocaleString()}</div>`);
      //scombined = $(`<div class="profile-rank-count__item" id="scorerank-scombined"><div class="score-rank score-rank--S score-rank--profile-page"></div>${(s + sh).toLocaleString()}</div>`);
      
      $(".profile-rank-count")[1].appendChild(sscombined[0]);
      $(".profile-rank-count")[1].appendChild(scombined[0]);
    }
  }
  
  observeMutations = (e) => {
    mutationObserver.disconnect();
    mutationObserver.observe(document.body, {childList: true});
    addIcons();
  }
  
  const mutationObserver = new MutationObserver(observeMutations)
  mutationObserver.observe(document.body, {childList: true});
})();
