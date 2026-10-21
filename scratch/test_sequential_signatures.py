import os

html = """<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kristi&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: #faf8f5;
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    .test-card {
      background: #ffffff;
      padding: 36px 30px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      width: 580px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .personal-letter-text {
      font-size: 1.05rem;
      font-weight: 500;
      color: #334155;
      margin-bottom: 24px;
      text-align: center;
      line-height: 1.58;
    }
    .sig-container {
      width: 520px;
      height: 95px;
      position: relative;
    }
    svg.sig-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      display: block;
    }
    .sig-solid-alina {
      font-family: 'Kristi', cursive;
      font-size: 64px;
      font-weight: 400;
      fill: #1b3d68;
    }
    .sig-solid-connector {
      font-family: 'Caveat', cursive;
      font-size: 26px;
      font-weight: 600;
      fill: #64748b;
      opacity: 0;
      transition: opacity 0.28s ease;
    }
    .sig-solid-kevin {
      font-family: 'Caveat', cursive;
      font-size: 42px;
      font-weight: 700;
      fill: #1b3d68;
    }
    .sig-solid-yours {
      font-family: 'Caveat', cursive;
      font-size: 42px;
      font-weight: 700;
      fill: #1b3d68;
    }

    .btn-row {
      display: flex;
      gap: 12px;
      margin-top: 15px;
    }
    button {
      padding: 10px 22px;
      border-radius: 99px;
      border: none;
      background: #1b3d68;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }
    button.secondary {
      background: #e2e8f0;
      color: #1e293b;
    }
  </style>
</head>
<body>
  <div class="test-card">
    <p class="personal-letter-text" id="letterText">
      Du hast richtig geraten!<br>
      Danke dass du mitgemacht hast, wir freuen uns mit dir ☺️<br>
      Stay tuned für weitere Infos!
    </p>

    <div class="sig-container" id="sigContainer">
      <svg class="sig-svg" id="duoSvg" viewBox="0 0 520 95">
        <defs>
          <!-- German Masks: Separate paths for each word to guarantee strictly sequential writing -->
          <mask id="maskWordEure">
            <rect x="0" y="0" width="260" height="95" fill="black" />
            <path id="pathStrokeEure" d="M 42 34 C 30 28 26 38 34 46 C 42 54 28 62 46 62 C 52 46 54 42 56 62 C 64 42 66 62 70 62 C 74 41 80 40 85 62 C 92 48 98 40 93 56 C 90 62 105 60 108 59" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
          <mask id="maskWordAlinaDE">
            <rect x="0" y="0" width="260" height="95" fill="black" />
            <path id="pathStrokeAlinaDE" d="M 116 65 C 122 45 127 28 129 28 C 131 28 135 48 138 68 C 132 54 125 52 136 54 C 142 36 144 28 145 28 C 146 28 145 55 146 72 C 148 64 150 63 151 63 C 155 45 157 42 159 62 C 162 58 164 58 165 58 C 168 45 170 42 172 62 C 176 45 180 42 182 62 C 186 54 192 43 197 45 C 190 53 192 62 197 62 C 202 55 203 44 204 62 C 208 62 214 61 218 59" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
          <mask id="maskWordEuer">
            <rect x="260" y="0" width="260" height="95" fill="black" />
            <path id="pathStrokeEuer" d="M 338 31 C 324 31 324 43 333 44 C 324 45 324 57 342 57 C 346 45 350 43 351 57 C 356 45 359 43 361 57 C 365 43 368 42 364 57 C 368 57 372 57 374 57 C 378 45 382 42 388 43 C 389 50 390 57 392 57" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
          <mask id="maskWordKevinDE">
            <rect x="260" y="0" width="260" height="95" fill="black" />
            <path id="pathStrokeKevinDE" d="M 404 31 L 405 58 M 423 32 L 408 46 L 424 58 C 426 44 429 42 424 57 C 428 57 432 57 434 57 C 438 45 442 57 444 57 C 446 52 448 44 449 44 C 451 45 453 57 455 57 C 458 45 460 43 462 57 C 466 45 470 43 472 57 C 475 56 478 54 480 54" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>

          <!-- English Masks: First "Yours,", then "Alina", then "&", then "Kevin" -->
          <mask id="maskWordYours">
            <rect x="0" y="0" width="520" height="95" fill="black" />
            <path id="pathStrokeYours" d="M 52 30 L 60 52 C 62 58 64 68 57 74 M 70 30 L 52 50 C 50 54 58 56 68 56 C 74 46 78 43 79 56 C 84 45 87 43 89 56 C 93 43 96 42 94 56 C 98 56 102 56 104 56 C 107 48 111 44 112 56 C 114 62 113 67 111 69" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
          <mask id="maskWordAlinaEN">
            <rect x="0" y="0" width="520" height="95" fill="black" />
            <path id="pathStrokeAlinaEN" d="M 156 65 C 162 45 167 28 169 28 C 171 28 175 48 178 68 C 172 54 165 52 176 54 C 182 36 184 28 185 28 C 186 28 185 55 186 72 C 188 64 190 63 191 63 C 195 45 197 42 199 62 C 202 58 204 58 205 58 C 208 45 210 42 212 62 C 216 45 220 42 222 62 C 226 54 232 43 237 45 C 230 53 232 62 237 62 C 242 55 243 44 244 62 C 248 62 254 61 258 59" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
          <mask id="maskWordKevinEN">
            <rect x="0" y="0" width="520" height="95" fill="black" />
            <path id="pathStrokeKevinEN" d="M 346 31 L 347 58 M 365 32 L 350 46 L 366 58 C 368 44 371 42 366 57 C 370 57 374 57 376 57 C 380 45 384 57 386 57 C 388 52 390 44 391 44 C 393 45 395 57 397 57 C 400 45 402 43 404 57 C 408 45 412 43 414 57 C 417 56 420 54 422 54" fill="none" stroke="white" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
        </defs>

        <!-- English Greeting: "Yours," -->
        <g id="grpYours" mask="url(#maskWordYours)" style="display: none;">
          <text x="82" y="58" text-anchor="middle" class="sig-solid-yours" id="sigYours">Yours,</text>
        </g>

        <!-- German "Eure" and "Alina" rendered with separate word masks -->
        <g id="grpAlinaWrap">
          <g id="grpWordEure" mask="url(#maskWordEure)">
            <text x="65" y="65" text-anchor="middle" class="sig-solid-alina" id="sigWordEure" transform="rotate(-2.2, 65, 65)">Eure</text>
          </g>
          <g id="grpWordAlina" mask="url(#maskWordAlinaDE)">
            <text x="165" y="65" text-anchor="middle" class="sig-solid-alina" id="sigWordAlina" transform="rotate(-2.2, 165, 65)">Alina</text>
          </g>
        </g>

        <!-- Connector: "und" in German, "&" in English -->
        <text x="256" y="58" text-anchor="middle" class="sig-solid-connector" id="sigConnector">und</text>

        <!-- German "Euer" and "Kevin" rendered with separate word masks -->
        <g id="grpKevinWrap">
          <g id="grpWordEuer" mask="url(#maskWordEuer)">
            <text x="355" y="58" text-anchor="middle" class="sig-solid-kevin" id="sigWordEuer" transform="rotate(2.0, 355, 58)">Euer</text>
          </g>
          <g id="grpWordKevin" mask="url(#maskWordKevinDE)">
            <text x="440" y="58" text-anchor="middle" class="sig-solid-kevin" id="sigWordKevin" transform="rotate(2.0, 440, 58)">Kevin</text>
          </g>
        </g>
      </svg>
    </div>

    <div class="btn-row">
      <button onclick="playAnim('de')">Play Deutsch: erst Eure Alina, dann und Euer Kevin</button>
      <button class="secondary" onclick="playAnim('en')">Play English: erst Yours, dann Alina & Kevin</button>
    </div>
  </div>

  <script>
    let activeAnimId = null;

    function playAnim(lang = 'de') {
      if (activeAnimId) cancelAnimationFrame(activeAnimId);

      const isDe = (lang === 'de');

      const grpYours = document.getElementById('grpYours');
      const grpWordEure = document.getElementById('grpWordEure');
      const grpWordAlina = document.getElementById('grpWordAlina');
      const grpWordEuer = document.getElementById('grpWordEuer');
      const grpWordKevin = document.getElementById('grpWordKevin');
      const conn = document.getElementById('sigConnector');

      const pathEure = document.getElementById('pathStrokeEure');
      const pathAlinaDE = document.getElementById('pathStrokeAlinaDE');
      const pathEuer = document.getElementById('pathStrokeEuer');
      const pathKevinDE = document.getElementById('pathStrokeKevinDE');

      const pathYours = document.getElementById('pathStrokeYours');
      const pathAlinaEN = document.getElementById('pathStrokeAlinaEN');
      const pathKevinEN = document.getElementById('pathStrokeKevinEN');

      const textAlina = document.getElementById('sigWordAlina');
      const textKevin = document.getElementById('sigWordKevin');

      conn.style.opacity = '0';

      if (isDe) {
        grpYours.style.display = 'none';
        grpWordEure.style.display = 'inline';
        grpWordEuer.style.display = 'inline';

        textAlina.setAttribute('x', '165');
        textAlina.setAttribute('transform', 'rotate(-2.2, 165, 65)');
        conn.setAttribute('x', '256');
        conn.textContent = 'und';
        textKevin.setAttribute('x', '440');
        textKevin.setAttribute('transform', 'rotate(2.0, 440, 58)');

        grpWordEure.setAttribute('mask', 'url(#maskWordEure)');
        grpWordAlina.setAttribute('mask', 'url(#maskWordAlinaDE)');
        grpWordEuer.setAttribute('mask', 'url(#maskWordEuer)');
        grpWordKevin.setAttribute('mask', 'url(#maskWordKevinDE)');

        const lenEure = pathEure.getTotalLength();
        const lenAlina = pathAlinaDE.getTotalLength();
        const lenEuer = pathEuer.getTotalLength();
        const lenKevin = pathKevinDE.getTotalLength();

        pathEure.style.strokeDasharray = lenEure;
        pathEure.style.strokeDashoffset = lenEure;
        pathAlinaDE.style.strokeDasharray = lenAlina;
        pathAlinaDE.style.strokeDashoffset = lenAlina;
        pathEuer.style.strokeDasharray = lenEuer;
        pathEuer.style.strokeDashoffset = lenEuer;
        pathKevinDE.style.strokeDasharray = lenKevin;
        pathKevinDE.style.strokeDashoffset = lenKevin;

        // Sequence:
        // 1. Eure (650ms)
        // 2. pen lift (120ms)
        // 3. Alina (900ms)
        // 4. connector "und" (200ms)
        // 5. Euer (620ms)
        // 6. pen lift (120ms)
        // 7. Kevin (800ms)
        const t1 = 650;
        const t2 = t1 + 120;
        const t3 = t2 + 900;
        const t4 = t3 + 220;
        const t5 = t4 + 620;
        const t6 = t5 + 120;
        const t7 = t6 + 820;

        const start = performance.now();

        function stepDE(now) {
          const el = now - start;

          if (el < t1) {
            // Write Eure
            const p = el / t1;
            pathEure.style.strokeDashoffset = lenEure * (1 - p);
          } else if (el < t2) {
            // Pen lift between Eure and Alina
            pathEure.style.strokeDashoffset = '0';
          } else if (el < t3) {
            // Write Alina
            pathEure.style.strokeDashoffset = '0';
            const p = (el - t2) / (t3 - t2);
            pathAlinaDE.style.strokeDashoffset = lenAlina * (1 - p);
          } else if (el < t4) {
            // Complete Eure Alina, reveal "und"
            pathEure.style.strokeDashoffset = '0';
            pathAlinaDE.style.strokeDashoffset = '0';
            conn.style.opacity = '1';
          } else if (el < t5) {
            // Write Euer
            conn.style.opacity = '1';
            const p = (el - t4) / (t5 - t4);
            pathEuer.style.strokeDashoffset = lenEuer * (1 - p);
          } else if (el < t6) {
            // Pen lift between Euer and Kevin
            pathEuer.style.strokeDashoffset = '0';
          } else if (el < t7) {
            // Write Kevin
            pathEuer.style.strokeDashoffset = '0';
            const p = (el - t6) / (t7 - t6);
            pathKevinDE.style.strokeDashoffset = lenKevin * (1 - p);
          } else {
            // Finished!
            pathEure.style.strokeDashoffset = '0';
            pathAlinaDE.style.strokeDashoffset = '0';
            pathEuer.style.strokeDashoffset = '0';
            pathKevinDE.style.strokeDashoffset = '0';
            conn.style.opacity = '1';

            grpWordEure.removeAttribute('mask');
            grpWordAlina.removeAttribute('mask');
            grpWordEuer.removeAttribute('mask');
            grpWordKevin.removeAttribute('mask');
            activeAnimId = null;
            return;
          }

          activeAnimId = requestAnimationFrame(stepDE);
        }

        activeAnimId = requestAnimationFrame(stepDE);

      } else {
        // ENGLISH: "erst yours und dann die namen"
        grpYours.style.display = 'inline';
        grpWordEure.style.display = 'none';
        grpWordEuer.style.display = 'none';

        textAlina.setAttribute('x', '200');
        textAlina.setAttribute('transform', 'rotate(-2.2, 200, 65)');
        conn.setAttribute('x', '292');
        conn.textContent = '&';
        textKevin.setAttribute('x', '384');
        textKevin.setAttribute('transform', 'rotate(2.0, 384, 58)');

        grpYours.setAttribute('mask', 'url(#maskWordYours)');
        grpWordAlina.setAttribute('mask', 'url(#maskWordAlinaEN)');
        grpWordKevin.setAttribute('mask', 'url(#maskWordKevinEN)');

        const lenYours = pathYours.getTotalLength();
        const lenAlinaEN = pathAlinaEN.getTotalLength();
        const lenKevinEN = pathKevinEN.getTotalLength();

        pathYours.style.strokeDasharray = lenYours;
        pathYours.style.strokeDashoffset = lenYours;
        pathAlinaEN.style.strokeDasharray = lenAlinaEN;
        pathAlinaEN.style.strokeDashoffset = lenAlinaEN;
        pathKevinEN.style.strokeDasharray = lenKevinEN;
        pathKevinEN.style.strokeDashoffset = lenKevinEN;

        // Sequence English:
        // 1. Yours, (750ms)
        // 2. pen lift (150ms)
        // 3. Alina (900ms)
        // 4. connector "&" (200ms)
        // 5. Kevin (800ms)
        const t1 = 750;
        const t2 = t1 + 150;
        const t3 = t2 + 900;
        const t4 = t3 + 220;
        const t5 = t4 + 820;

        const start = performance.now();

        function stepEN(now) {
          const el = now - start;

          if (el < t1) {
            // Write Yours,
            const p = el / t1;
            pathYours.style.strokeDashoffset = lenYours * (1 - p);
          } else if (el < t2) {
            // Pen lift between Yours and Alina
            pathYours.style.strokeDashoffset = '0';
          } else if (el < t3) {
            // Write Alina
            pathYours.style.strokeDashoffset = '0';
            const p = (el - t2) / (t3 - t2);
            pathAlinaEN.style.strokeDashoffset = lenAlinaEN * (1 - p);
          } else if (el < t4) {
            // Reveal "&"
            pathYours.style.strokeDashoffset = '0';
            pathAlinaEN.style.strokeDashoffset = '0';
            conn.style.opacity = '1';
          } else if (el < t5) {
            // Write Kevin
            conn.style.opacity = '1';
            const p = (el - t4) / (t5 - t4);
            pathKevinEN.style.strokeDashoffset = lenKevinEN * (1 - p);
          } else {
            // Finished!
            pathYours.style.strokeDashoffset = '0';
            pathAlinaEN.style.strokeDashoffset = '0';
            pathKevinEN.style.strokeDashoffset = '0';
            conn.style.opacity = '1';

            grpYours.removeAttribute('mask');
            grpWordAlina.removeAttribute('mask');
            grpWordKevin.removeAttribute('mask');
            activeAnimId = null;
            return;
          }

          activeAnimId = requestAnimationFrame(stepEN);
        }

        activeAnimId = requestAnimationFrame(stepEN);
      }
    }

    setTimeout(() => playAnim('de'), 300);
  </script>
</body>
</html>
"""

with open('scratch/test_sequential_signatures.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Created scratch/test_sequential_signatures.html successfully!")
