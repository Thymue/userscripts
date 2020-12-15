// ==UserScript==
// @name         osu!combined score-ranks
// @namespace    http://thymo.ga/
// @version      2020.1215.0
// @description  Adds up s's and ss's
// @author       Thymue
// @include      https://osu.ppy.sh/*
// @updateURL    https://github.com/Thymue/userscripts/raw/master/sscombined.user.js
// @downloadURL  https://github.com/Thymue/userscripts/raw/master/sscombined.user.js
// @supportURL   https://osu.ppy.sh/users/7820468
// ==/UserScript==

(() => {
  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  doShitWithShit = async () => {
    if(document.location.href.startsWith("https://osu.ppy.sh/users/")) {
      if($(".profile-rank-count")[0] == undefined) await sleep(1000);
      ssh = parseInt($(".profile-rank-count")[1].children[0].innerText.replaceAll(",", ""));
      ss = parseInt($(".profile-rank-count")[1].children[1].innerText.replaceAll(",", ""));
      sh = parseInt($(".profile-rank-count")[1].children[2].innerText.replaceAll(",", ""));
      s = parseInt($(".profile-rank-count")[1].children[3].innerText.replaceAll(",", ""));
      
      if($("#sshit-sscombined")[0] != undefined) $("#sshit-sscombined")[0].remove();
      if($("#sshit-scombined")[0] != undefined) $("#sshit-scombined")[0].remove();
      
      sscombined = $(`<div class="profile-rank-count__item" id="sshit-sscombined"><div>SSC</div>${(ss + ssh).toLocaleString()}</div>`);
      scombined = $(`<div class="profile-rank-count__item" id="sshit-scombined"><div>SC</div>${(s + sh).toLocaleString()}</div>`);
      //scombined = $(`<div class="profile-rank-count__item" id="sshit-scombined"><div class="score-rank score-rank--S score-rank--profile-page"></div>${(s + sh).toLocaleString()}</div>`);
      
      $(".profile-rank-count")[1].appendChild(sscombined[0]);
      $(".profile-rank-count")[1].appendChild(scombined[0]);
    }
  }
  
  shitObserveShit = (e) => {
    shitObserver.disconnect();
    shitObserver.observe(document.body, {childList: true});
    doShitWithShit();
  }
  
  shitObserver = new MutationObserver(shitObserveShit)
  shitObserver.observe(document.body, {childList: true});
})();
