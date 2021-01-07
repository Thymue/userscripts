// ==UserScript==
// @name        osu!beatmap mirrors
// @namespace   http://thymo.ga/
// @match       https://osu.ppy.sh/beatmapsets/*
// @grant       none
// @version     2021.107.0
// @author      Thymue
// @description adds beatmap mirror buttons to beatmap pages (very shit version i have to update this)
// @updateURL   https://github.com/Thymue/userscripts/raw/master/beatmapmirrors.user.js
// @downloadURL https://github.com/Thymue/userscripts/raw/master/beatmapmirrors.user.js
// @supportURL  https://osu.ppy.sh/users/7820468
// ==/UserScript==

/*let bloodcatButton = $(`<a href="${"https://bloodcat.com/osu/s/" + document.location.href.split("/")[4].split("#")[0]}" class="btn-osu-big btn-osu-big--beatmapset-header">
  <span class="btn-osu-big__content ">
    <span class="btn-osu-big__left">
      <span class="btn-osu-big__text-top">Bloodcat Mirror</span>
    </span>
    <span class="btn-osu-big__icon">
      <div style="background: url(https://bloodcat.com/_data/BloodCat.svg);height: 30px;width: 20px;background-size: cover;">
      </div>
    </span>
  </span>
</a>`);*/

let newBloodcatButton = $(`<a href="${"https://chimu.moe/d/" + document.location.href.split("/")[4].split("#")[0]}" class="btn-osu-big btn-osu-big--beatmapset-header">
  <span class="btn-osu-big__content ">
    <span class="btn-osu-big__left">
      <span class="btn-osu-big__text-top">Bloodcat Mirror</span>
    </span>
    <span class="btn-osu-big__icon">
      <div style="background: url(https://svgur.com/i/Sp6.svg);height: 30px;width: 20px;background-size: cover;">
      </div>
    </span>
  </span>
</a>`);

let beatconnectButton = $(`<a href="${"https://beatconnect.io/b/" + document.location.href.split("/")[4].split("#")[0]}" class="btn-osu-big btn-osu-big--beatmapset-header">
  <span class="btn-osu-big__content ">
    <span class="btn-osu-big__left">
      <span class="btn-osu-big__text-top">Beatconnect Mirror</span>
    </span>
    <span class="btn-osu-big__icon">
      <div style="background: url(https://beatconnect.io/static/img/logo.png);height: 30px;width: 27px;background-size: cover;">
      </div>
    </span>
  </span>
</a>`);

let hentaiNinjaButton = $(`<a href="${"https://hentai.ninja/d/" + document.location.href.split("/")[4].split("#")[0]}" class="btn-osu-big btn-osu-big--beatmapset-header">
  <span class="btn-osu-big__content ">
    <span class="btn-osu-big__left">
      <span class="btn-osu-big__text-top">Hentai ninja Mirror</span>
    </span>
    <span class="btn-osu-big__icon">
      <div style="background: url(https://hentai.ninja/favicon.ico);height: 30px;width: 27px;background-size: cover;">
      </div>
    </span>
  </span>
</a>`);

document.onreadystatechange = () => {
  if(document.readyState == "complete") {
    $(".beatmapset-header__buttons").append(newBloodcatButton);
    $(".beatmapset-header__buttons").append(beatconnectButton);
    $(".beatmapset-header__buttons").append(hentaiNinjaButton);
  }
}
