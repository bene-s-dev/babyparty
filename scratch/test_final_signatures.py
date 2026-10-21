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
      margin-bottom: 12px;
      text-align: center;
      line-height: 1.58;
    }
    .personal-letter-salute {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.02rem;
      font-weight: 500;
      color: #475569;
      margin: 0 0 4px;
      text-align: center;
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
      font-size: 28px;
      font-weight: 600;
      fill: #64748b;
      opacity: 0;
      transition: opacity 0.28s ease;
    }
    .sig-solid-kevin {
      font-family: 'Caveat', cursive;
      font-size: 44px;
      font-weight: 700;
      fill: #1b3d68;
    }
    button {
      margin-top: 15px;
      padding: 10px 22px;
      border-radius: 99px;
      border: none;
      background: #1b3d68;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="test-card">
    <p class="personal-letter-text">
      Du hast richtig geraten!<br>
      Danke dass du mitgemacht hast, wir freuen uns mit dir ☺️<br>
      Stay tuned für weitere Infos!
    </p>

    <p class="personal-letter-salute" id="salute">In freudiger Erwartung</p>

    <div class="sig-container" id="sigContainer">
      <svg class="sig-svg" id="duoSvg" viewBox="0 0 520 95">
        <defs>
          <mask id="maskAlina">
            <rect x="0" y="0" width="260" height="95" fill="black" />
            <path id="pathStrokeAlina" d="M 116 65 C 122 45 127 28 129 28 C 131 28 135 48 138 68 C 132 54 125 52 136 54 C 142 36 144 28 145 28 C 146 28 145 55 146 72 C 148 64 150 63 151 63 C 154 59 157 58 159 62 C 162 58 164 58 165 58 C 168 48 170 45 172 62 C 176 48 180 45 182 62 C 186 54 191 43 196 45 C 189 53 191 62 196 62 C 201 55 202 44 203 62 C 207 62 213 61 217 59" fill="none" stroke="white" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
            <circle id="maskDotAlina" cx="160" cy="37" r="18" fill="white" style="opacity: 0;" />
          </mask>
          <mask id="maskKevin">
            <rect x="250" y="0" width="270" height="95" fill="black" />
            <path id="pathStrokeKevin" d="M 314 31 L 315 58 M 333 32 L 318 46 L 334 58 C 336 44 339 42 334 57 C 338 57 342 57 344 57 C 348 45 352 57 354 57 C 356 52 358 44 359 44 C 361 45 363 57 365 57 C 368 45 370 43 372 57 C 376 45 380 43 382 57 C 385 56 388 54 390 54" fill="none" stroke="white" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" />
          </mask>
        </defs>

        <g id="grpAlina" mask="url(#maskAlina)">
          <text x="160" y="65" text-anchor="middle" class="sig-solid-alina" id="sigAlinaSvg" transform="rotate(-2.2, 160, 65)">Alina</text>
        </g>

        <text x="256" y="58" text-anchor="middle" class="sig-solid-connector" id="sigConnector">und</text>

        <g id="grpKevin" mask="url(#maskKevin)">
          <text x="350" y="58" text-anchor="middle" class="sig-solid-kevin" id="sigKevinSvg" transform="rotate(2.0, 350, 58)">Kevin</text>
        </g>
      </svg>
    </div>

    <button onclick="play()">Play Animation</button>
  </div>

  <script>
    function play() {
      const grpA = document.getElementById('grpAlina');
      const grpK = document.getElementById('grpKevin');
      const pathA = document.getElementById('pathStrokeAlina');
      const dotA = document.getElementById('maskDotAlina');
      const conn = document.getElementById('sigConnector');
      const pathK = document.getElementById('pathStrokeKevin');

      grpA.setAttribute('mask', 'url(#maskAlina)');
      grpK.setAttribute('mask', 'url(#maskKevin)');

      const lenA = pathA.getTotalLength();
      const lenK = pathK.getTotalLength();

      pathA.style.strokeDasharray = lenA;
      pathA.style.strokeDashoffset = lenA;
      dotA.style.opacity = '0';
      conn.style.opacity = '0';
      pathK.style.strokeDasharray = lenK;
      pathK.style.strokeDashoffset = lenK;

      const t1 = 1100;     // write Alina body
      const t2 = t1 + 80;  // i-dot tap!
      const t3 = t2 + 200; // reveal "und"
      const t4 = t3 + 1000;// write Kevin

      const start = performance.now();

      function step(now) {
        const el = now - start;

        if (el < t1) {
          // Write Alina body without dot
          const p = el / t1;
          const ease = p < 0.5 ? 2*p*p : -1 + (4 - 2*p)*p;
          pathA.style.strokeDashoffset = lenA * (1 - ease);
        } else if (el < t2) {
          // Tap the i-dot!
          pathA.style.strokeDashoffset = '0';
          dotA.style.opacity = '1';
        } else if (el < t3) {
          // Reveal "und"
          pathA.style.strokeDashoffset = '0';
          dotA.style.opacity = '1';
          conn.style.opacity = '1';
        } else if (el < t4) {
          // Write Kevin
          conn.style.opacity = '1';
          const pK = (el - t3) / (t4 - t3);
          const easeK = pK < 0.5 ? 2*pK*pK : -1 + (4 - 2*pK)*pK;
          pathK.style.strokeDashoffset = lenK * (1 - easeK);
        } else {
          // Finished!
          pathA.style.strokeDashoffset = '0';
          dotA.style.opacity = '1';
          conn.style.opacity = '1';
          pathK.style.strokeDashoffset = '0';
          grpA.removeAttribute('mask');
          grpK.removeAttribute('mask');
          return;
        }

        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    setTimeout(play, 300);
  </script>
</body>
</html>
"""

with open('scratch/test_final_signatures.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Created scratch/test_final_signatures.html successfully!")
