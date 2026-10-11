/* SAKSHAM FX — drop-in polish layer. Needs saksham-fx.css. No dependencies. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var COLORS = ['#FFC93C', '#F2796B', '#6EC1F5', '#FFFFFF'];

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ---------------- Splash screen ---------------- */
  function splash() {
    if (reduce) return;
    var word = 'SAKSHAM';
    var letters = word.split('').map(function (c, i) {
      return '<span class="sk-l" style="--i:' + i + '">' + c + '</span>';
    }).join('');

    var cloud = function (cls, y) {
      return '<g transform="translate(0,' + y + ')"><g class="sk-cloud ' + cls + '" fill="#fff" opacity=".85">' +
        '<ellipse cx="0" cy="0" rx="48" ry="17"/><ellipse cx="-26" cy="6" rx="30" ry="14"/>' +
        '<ellipse cx="28" cy="7" rx="34" ry="14"/></g></g>';
    };

    var scene =
      '<svg class="sk-scene" viewBox="0 0 800 450" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
        '<g class="sk-sun">' +
          '<circle class="sk-rays" cx="400" cy="250" r="108" fill="none" stroke="#FFE08A" stroke-width="22" stroke-dasharray="8 24" stroke-linecap="round"/>' +
          '<circle cx="400" cy="250" r="72" fill="#FFC93C"/>' +
        '</g>' +
        cloud('c1', 70) + cloud('c2', 140) + cloud('c3', 205) +
        '<path class="sk-hill" d="M0 330 Q150 280 300 325 T600 320 T800 310 V450 H0Z" fill="#8FD694"/>' +
        /* School */
        '<g class="sk-b" style="--d:.7s">' +
          '<rect x="80" y="270" width="130" height="100" fill="#F2796B"/>' +
          '<polygon points="70,272 145,220 220,272" fill="#C9503F"/>' +
          '<rect x="130" y="325" width="30" height="45" rx="4" fill="#FFF6DC"/>' +
          '<rect x="92" y="290" width="24" height="24" rx="3" fill="#FFF6DC"/>' +
          '<rect x="174" y="290" width="24" height="24" rx="3" fill="#FFF6DC"/>' +
          '<line x1="145" y1="220" x2="145" y2="194" stroke="#23324A" stroke-width="3"/>' +
          '<polygon points="145,194 172,203 145,212" fill="#FFC93C"/>' +
        '</g>' +
        /* Dhaba */
        '<g class="sk-b" style="--d:.9s">' +
          '<rect x="250" y="305" width="120" height="65" fill="#FFC93C"/>' +
          '<rect x="250" y="282" width="24" height="23" fill="#F2796B"/><rect x="274" y="282" width="24" height="23" fill="#FFF6DC"/>' +
          '<rect x="298" y="282" width="24" height="23" fill="#F2796B"/><rect x="322" y="282" width="24" height="23" fill="#FFF6DC"/>' +
          '<rect x="346" y="282" width="24" height="23" fill="#F2796B"/>' +
          '<rect x="300" y="330" width="22" height="40" rx="3" fill="#C9503F"/>' +
        '</g>' +
        /* Safe house */
        '<g class="sk-b" style="--d:1.1s">' +
          '<rect x="410" y="290" width="120" height="80" fill="#FFF6DC"/>' +
          '<polygon points="400,292 470,236 540,292" fill="#2F86D0"/>' +
          '<path d="M470 350 C440 326 452 306 470 320 C488 306 500 326 470 350Z" fill="#F2796B"/>' +
        '</g>' +
        /* Panchayat */
        '<g class="sk-b" style="--d:1.3s">' +
          '<rect x="565" y="362" width="160" height="8" fill="#E9D9A8"/>' +
          '<rect x="575" y="275" width="140" height="87" fill="#FFF6DC"/>' +
          '<rect x="592" y="292" width="10" height="70" fill="#E9D9A8"/><rect x="633" y="292" width="10" height="70" fill="#E9D9A8"/>' +
          '<rect x="674" y="292" width="10" height="70" fill="#E9D9A8"/>' +
          '<path d="M610 275 A35 35 0 0 1 680 275Z" fill="#F2796B"/>' +
          '<line x1="645" y1="240" x2="645" y2="222" stroke="#23324A" stroke-width="3"/>' +
        '</g>' +
        '<path class="sk-hill" d="M0 372 Q200 350 400 372 T800 366 V450 H0Z" fill="#6CC17A"/>' +
      '</svg>';

    var el = document.createElement('div');
    el.id = 'sk-splash';
    el.setAttribute('role', 'presentation');
    el.innerHTML =
      scene +
      '<div class="sk-copy"><h1 class="sk-title" aria-label="SAKSHAM">' + letters + '</h1>' +
      '<p class="sk-tag">Every Child, Every Right</p></div>' +
      '<div class="sk-bar"><i></i></div>' +
      '<button class="sk-skip" type="button">Skip</button>';

    document.documentElement.classList.add('sk-lock');
    document.body.appendChild(el);

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      el.classList.add('sk-out');
      setTimeout(function () {
        el.remove();
        document.documentElement.classList.remove('sk-lock');
        document.dispatchEvent(new CustomEvent('saksham:splash-done'));
      }, 950);
    }
    el.querySelector('.sk-skip').addEventListener('click', finish);
    el.addEventListener('click', finish);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    });
    setTimeout(finish, 3600);
  }

  /* ---------------- Curtain wipe on navigation-style clicks ---------------- */
  var WIPE_SELECTOR = [
    '[data-sk-wipe]', '[class*="building"]', '[id*="building"]',
    '[class*="enter"]', '[id*="enter"]', '[class*="start"]', '[id*="start"]',
    '[class*="play"]', '[class*="continue"]', '[class*="next"]',
    '[class*="back"]', '[id*="back"]', '[class*="home"]', '[id*="home"]', '[class*="map"]'
  ].join(',');
  var NO_WIPE = '[data-sk-nowipe], #sk-splash, select, [class*="lang"], [id*="lang"], [class*="help"], [id*="help"], [class*="sound"], [id*="sound"], [class*="mute"], a[href^="tel:"]';

  function wipe() {
    if (reduce) return;
    var wrap = document.createElement('div');
    wrap.id = 'sk-wipe';
    wrap.innerHTML = '<div></div><div></div><div></div>';
    document.body.appendChild(wrap);
    var bands = wrap.children, busy = false;

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('button, a[href], [role="button"], [class*="building"], [data-sk-wipe]');
      if (!t || busy) return;
      if (t.closest(NO_WIPE)) return;
      if (!t.matches(WIPE_SELECTOR) && !t.closest(WIPE_SELECTOR)) return;
      busy = true;
      var last;
      for (var i = 0; i < bands.length; i++) {
        last = bands[i].animate([
          { transform: 'translateX(-101%)' },
          { transform: 'translateX(0)', offset: 0.36 },
          { transform: 'translateX(0)', offset: 0.52 },
          { transform: 'translateX(101%)' }
        ], { duration: 780, delay: i * 70, easing: 'cubic-bezier(.65,0,.35,1)' });
      }
      last.onfinish = function () { busy = false; };
    }, true);
  }

  /* ---------------- Sparkle trail + click bursts ---------------- */
  function dot(x, y, dx, dy, size, dur) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:' + size +
      'px;margin:-' + size / 2 + 'px 0 0 -' + size / 2 + 'px;border-radius:50%;pointer-events:none;z-index:2147481000;background:' +
      COLORS[Math.floor(Math.random() * COLORS.length)];
    document.body.appendChild(d);
    d.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0)', opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = function () { d.remove(); };
  }

  function sparkles() {
    if (reduce) return;
    var last = 0;
    if (finePointer) {
      document.addEventListener('pointermove', function (e) {
        var now = performance.now();
        if (now - last < 55) return;
        last = now;
        dot(e.clientX, e.clientY, (Math.random() - .5) * 30, 18 + Math.random() * 22, 6 + Math.random() * 6, 650);
      }, { passive: true });
    }
    document.addEventListener('pointerdown', function (e) {
      for (var i = 0; i < 12; i++) {
        var a = (Math.PI * 2 * i) / 12, r = 38 + Math.random() * 34;
        dot(e.clientX, e.clientY, Math.cos(a) * r, Math.sin(a) * r, 7 + Math.random() * 6, 750);
      }
    }, { passive: true });
  }

  ready(function () { splash(); wipe(); sparkles(); });
})();
