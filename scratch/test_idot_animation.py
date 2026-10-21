html = """<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Kristi&display=swap" rel="stylesheet">
<style>
  body { background: #faf8f5; padding: 40px; font-family: sans-serif; }
  svg { width: 520px; height: 95px; background: white; border-radius: 12px; }
  .sig-solid-alina { font-family: 'Kristi', cursive; font-size: 64px; fill: #1b3d68; }
</style>
</head>
<body>
  <h3>Test: i-dot appearing at the end of Alina</h3>
  <svg viewBox="0 0 520 95">
    <defs>
      <mask id="testMaskAlina">
        <rect x="0" y="0" width="520" height="95" fill="black" />
        <!-- Body path: keeps y >= 56 through 'i' so dot remains hidden -->
        <path id="bodyStroke" d="M 116 65 C 122 45 127 28 129 28 C 131 28 135 48 138 68 C 132 54 125 52 136 54 C 142 36 144 28 145 28 C 146 28 145 55 146 72 C 148 64 150 63 151 63 C 155 58 158 56 160 62 C 163 58 165 58 166 58 C 169 48 171 45 173 62 C 177 48 181 45 183 62 C 187 54 192 43 197 45 C 190 53 192 62 197 62 C 202 55 203 44 204 62 C 208 62 214 61 218 59" fill="none" stroke="white" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Dot circle: initially hidden, taps on at the end -->
        <circle id="iDot" cx="165" cy="35.5" r="18" fill="white" style="opacity: 0;" />
      </mask>
    </defs>

    <g mask="url(#testMaskAlina)">
      <text x="165" y="65" text-anchor="middle" class="sig-solid-alina" transform="rotate(-2.2, 165, 65)">Alina</text>
    </g>
  </svg>

  <br><br>
  <button onclick="run()">Play Animation</button>

  <script>
    function run() {
      const body = document.getElementById('bodyStroke');
      const dot = document.getElementById('iDot');
      const len = body.getTotalLength();
      body.style.strokeDasharray = len;
      body.style.strokeDashoffset = len;
      dot.style.opacity = '0';

      const dur = 1000;
      const start = performance.now();

      function step(now) {
        const el = now - start;
        if (el < dur) {
          body.style.strokeDashoffset = len * (1 - (el / dur));
        } else if (el < dur + 80) {
          // Pen lifts from 'a'
          body.style.strokeDashoffset = '0';
        } else {
          // Tap the i-dot!
          body.style.strokeDashoffset = '0';
          dot.style.opacity = '1';
          return;
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    setTimeout(run, 300);
  </script>
</body>
</html>
"""

with open('scratch/test_idot_animation.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Created scratch/test_idot_animation.html successfully!")
