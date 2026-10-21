import re

path = '/Users/benedikt/Desktop/online Babyparty/app.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Marker before
start_marker = "    setupMultiLayerScratchEvents();\n    updateSignaturesUI();\n  }"
# Marker after
end_marker = "  // Target reveal date: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)"

idx1 = content.find(start_marker)
idx2 = content.find(end_marker)

if idx1 == -1 or idx2 == -1:
    print(f"Error: markers not found (idx1={idx1}, idx2={idx2})")
    exit(1)

new_code = """    setupMultiLayerScratchEvents();
    updateSignaturesUI();
  }

  // ==================== LIVE HANDWRITING SIGNATURE ENGINE ====================
  let activeSignatureAnimId = null;

  function updateSignaturesUI() {
    const alina = document.getElementById('sigAlinaSvg');
    const kevin = document.getElementById('sigKevinSvg');
    const connector = document.getElementById('sigConnector');
    if (!alina || !kevin || !connector) return;

    const isDe = (STATE.lang === 'de');
    alina.textContent = isDe ? 'Eure Alina' : 'Alina';
    connector.textContent = isDe ? 'und' : '&';
    kevin.textContent = isDe ? 'Euer Kevin' : 'Kevin';
  }

  function triggerDuoSignaturesAnimation() {
    updateSignaturesUI();

    const container = document.getElementById('signatureContainer');
    const rectA = document.getElementById('clipRectAlina');
    const rectK = document.getElementById('clipRectKevin');
    const connector = document.getElementById('sigConnector');
    const pen = document.getElementById('penNibIndicator');

    if (!container || !rectA || !rectK || !connector) return;

    if (activeSignatureAnimId) {
      cancelAnimationFrame(activeSignatureAnimId);
      activeSignatureAnimId = null;
    }

    // Reset initial states for live drawing
    rectA.setAttribute('width', '0');
    rectK.setAttribute('width', '0');
    connector.style.opacity = '0';
    connector.style.transition = 'opacity 0.28s ease';
    container.classList.add('pen-drawing');

    const startX_A = 8;
    const endX_A = 236;
    const totalWidth_A = endX_A - startX_A;

    const startX_K = 282;
    const endX_K = 512;
    const totalWidth_K = endX_K - startX_K;

    const durationA = 1450;      // ms writing Alina
    const pauseDuration = 260;  // ms transition & pause for 'und' / '&'
    const durationK = 1400;      // ms writing Kevin
    const totalDuration = durationA + pauseDuration + durationK;

    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const svgRect = container.getBoundingClientRect();
      const scaleX = svgRect.width ? (svgRect.width / 520) : 1;
      const scaleY = svgRect.height ? (svgRect.height / 95) : 1;

      if (elapsed < durationA) {
        // Phase 1: Live writing Alina in Kristi font
        const p = Math.max(0, Math.min(1, elapsed / durationA));
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        const currentW = Math.max(0, Math.min(totalWidth_A, totalWidth_A * ease));
        rectA.setAttribute('width', currentW);

        if (pen) {
          const currentX = startX_A + currentW;
          const wobbleY = Math.sin(p * Math.PI * 10) * 3;
          const penX = currentX * scaleX;
          const penY = (58 + wobbleY) * scaleY;
          pen.style.transform = `translate(${penX - 4}px, ${penY - 24}px) rotate(${-8 + Math.sin(p * Math.PI * 8) * 7}deg)`;
          pen.style.opacity = '1';
        }
      } else if (elapsed < durationA + pauseDuration) {
        // Phase 2: Fade in connector & lift pen between words
        rectA.setAttribute('width', totalWidth_A);
        connector.style.opacity = '1';

        if (pen) {
          const pPause = (elapsed - durationA) / pauseDuration;
          const jumpX = endX_A + (startX_K - endX_A) * pPause;
          const jumpY = 56 - Math.sin(pPause * Math.PI) * 14;
          const penX = jumpX * scaleX;
          const penY = jumpY * scaleY;
          pen.style.transform = `translate(${penX - 4}px, ${penY - 24}px) rotate(-18deg)`;
          pen.style.opacity = '0.85';
        }
      } else if (elapsed < totalDuration) {
        // Phase 3: Live writing Kevin in Caveat font
        rectA.setAttribute('width', totalWidth_A);
        connector.style.opacity = '1';

        const elapsedK = elapsed - durationA - pauseDuration;
        const p = Math.max(0, Math.min(1, elapsedK / durationK));
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        const currentW = Math.max(0, Math.min(totalWidth_K, totalWidth_K * ease));
        rectK.setAttribute('width', currentW);

        if (pen) {
          const currentX = startX_K + currentW;
          const wobbleY = Math.sin(p * Math.PI * 11) * 2.5;
          const penX = currentX * scaleX;
          const penY = (54 + wobbleY) * scaleY;
          pen.style.transform = `translate(${penX - 4}px, ${penY - 24}px) rotate(${-10 + Math.sin(p * Math.PI * 10) * 6}deg)`;
          pen.style.opacity = '1';
        }
      } else {
        // Phase 4: Finished! Both signatures 100% visible
        rectA.setAttribute('width', '240');
        rectK.setAttribute('width', '240');
        connector.style.opacity = '1';

        if (pen) {
          const penX = (endX_K + 12) * scaleX;
          const penY = 32 * scaleY;
          pen.style.transform = `translate(${penX}px, ${penY - 24}px) rotate(-28deg)`;
          pen.style.opacity = '0';
          setTimeout(() => {
            container.classList.remove('pen-drawing');
          }, 350);
        }
        activeSignatureAnimId = null;
        return;
      }

      activeSignatureAnimId = requestAnimationFrame(frame);
    }

    activeSignatureAnimId = requestAnimationFrame(frame);
  }

"""

new_content = content[:idx1] + new_code + content[idx2:]
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement successful!")
