/**
 * Minimalist Editorial Baby Shower & Gender Reveal
 * - Pure Lucide icons (no emojis)
 * - Two base colors (Deep Charcoal & Luxe Cream) with Pastel Blue & Pastel Pink accents
 * - Alternating bilingual text (DE/EN) on start page until active user selection
 * - Staggered entrance animations on every page transition
 * - Multi-layer scratch card (Charcoal Top Foil + Pearlescent Mid Foil)
 * - Authentic ASMR paper/foil scratch sound
 * - 7s crossfade video loop in slow-mo
 * - Clean binary gender guess & live poll bar
 * - Suspense countdown with instant Developer Skip
 * - Responsive confetti cannon
 */

(function () {
  'use strict';

  // ==================== BILINGUAL TRANSLATION DICTIONARY ====================
  const I18N = {
    de: {
      headerTitle: 'Baby Shower Celebration',
      stepStart: 'Start',
      stepGuess: 'Tippen',
      stepReveal: 'Reveal',
      heroTitleHtml: 'Willkommen zur <span class="highlight-text">Babyshower</span>',
      heroSubtitle: 'Ein neues Kapitel beginnt. Trage deinen Namen ein und teile deine Vorahnung mit uns.',
      nameLabel: 'Dein Name',
      namePlaceholder: 'Vor- oder Nachname...',
      langLabel: 'Sprache:',
      btnToStep2: 'Weiter zur Abstimmung',
      guestCountPill: n => `${n} Gäste nehmen bereits teil`,
      btnBack: 'Zurück',
      greetingPrefix: 'Hallo, ',
      guessHeading: 'Was ist dein Tipp?',
      guessSubtitle: 'Wähle deine Intuition:',
      boyLabel: 'Junge',
      girlLabel: 'Mädchen',
      votesSuffix: 'Stimmen',
      btnToStep3: 'Tipp bestätigen & zum Reveal',
      userGuessLabel: 'Dein Tipp:',
      revealHeading: 'Das Gender Reveal',
      revealSubtitle: 'Die Enthüllung beginnt in Kürze.',
      countdownLabel: 'Countdown',
      unitDays: 'Tage',
      unitHours: 'Std',
      unitMins: 'Min',
      unitSecs: 'Sek',
      btnStartCountdown: '10s Countdown starten',
      btnDevSkip: 'Entwickler: Countdown überspringen',
      scratchTitle: 'Karte frei rubbeln',
      scratchSub: 'Wische über die Karte, um das Geschlecht aufzudecken',
      foilSecret: 'STRENG GEHEIM',
      foilSecretSub: 'Das Geschlecht ist hier verborgen',
      foilRubbel: 'KARTE FREI RUBBELN',
      foilMidText: 'FAST ENTHÜLLT...',
      barrierTitle: 'Countdown läuft...',
      barrierText: 'In wenigen Sekunden wird die Rubbelkarte freigeschaltet!',
      revealEyebrow: 'Offizielle Verkündung',
      revealPrefix: 'Es wird ein...',
      girlTitle: 'MÄDCHEN',
      boyTitle: 'JUNGE',
      girlQuote: '„Unsere kleine Tochter wird die Welt bereichern.“',
      boyQuote: '„Unser kleiner Sohn wird die Welt entdecken.“',
      matchTitle: 'Richtig getippt!',
      matchSub: name => `Glückwunsch ${name}, dein Bauchgefühl lag genau richtig.`,
      noMatchTitle: 'Voller Überraschung',
      noMatchSub: name => `Hauptsache gesund und voller Liebe. Wir freuen uns mit dir, ${name}.`,
      btnConfetti: 'Mehr Konfetti',
      btnShare: 'Teilen',
      btnRestart: 'Neu starten',
      settingsTitle: 'Einstellungen',
      settingGenderLabel: 'Tatsächliches Geschlecht für den Reveal',
      settingJumpLabel: 'Entwickler-Direktsprung',
      page: 'Seite',
      btnReset: 'Stimmen & Fortschritt zurücksetzen',
      btnDone: 'Fertig',
      toastNameReq: 'Bitte trage deinen Namen ein',
      toastGuessReq: 'Bitte wähle Junge oder Mädchen aus',
      toastTeamBoy: 'Tipp: Junge',
      toastTeamGirl: 'Tipp: Mädchen',
      toastDevSkip: 'Entwickler: Countdown überspringen',
      toastCopied: 'Ergebnis in die Zwischenablage kopiert',
      toastSoundOn: 'Ton aktiviert',
      toastSoundOff: 'Ton stummgeschaltet',
      toastLangDe: 'Sprache auf Deutsch festgelegt',
      toastLangEn: 'Language locked to English',
      shareText: gender => `Gender Reveal: Es wird ein ${gender === 'girl' ? 'Mädchen' : 'Junge'}!`
    },
    en: {
      headerTitle: 'Baby Shower Celebration',
      stepStart: 'Start',
      stepGuess: 'Guess',
      stepReveal: 'Reveal',
      heroTitleHtml: 'Welcome to the <span class="highlight-text">Baby Shower</span>',
      heroSubtitle: 'A new chapter begins. Enter your name and share your intuition with us.',
      nameLabel: 'Your Name',
      namePlaceholder: 'First or last name...',
      langLabel: 'Language:',
      btnToStep2: 'Continue to Voting',
      guestCountPill: n => `${n} guests already participating`,
      btnBack: 'Back',
      greetingPrefix: 'Hello, ',
      guessHeading: 'What is your guess?',
      guessSubtitle: 'Choose your intuition:',
      boyLabel: 'Boy',
      girlLabel: 'Girl',
      votesSuffix: 'votes',
      btnToStep3: 'Confirm guess & reveal',
      userGuessLabel: 'Your guess:',
      revealHeading: 'The Gender Reveal',
      revealSubtitle: 'The big reveal begins shortly.',
      countdownLabel: 'Countdown',
      unitDays: 'Days',
      unitHours: 'Hrs',
      unitMins: 'Min',
      unitSecs: 'Sec',
      btnStartCountdown: 'Start 10s Countdown',
      btnDevSkip: 'Developer: Skip Countdown',
      scratchTitle: 'Scratch to Reveal',
      scratchSub: 'Swipe across the card to uncover the gender',
      foilSecret: 'TOP SECRET',
      foilSecretSub: 'The baby’s gender is hidden here',
      foilRubbel: 'SCRATCH TO REVEAL',
      foilMidText: 'ALMOST REVEALED...',
      barrierTitle: 'Countdown in progress...',
      barrierText: 'The scratch card will be unlocked in just a few seconds!',
      revealEyebrow: 'Official Announcement',
      revealPrefix: 'It’s a...',
      girlTitle: 'GIRL',
      boyTitle: 'BOY',
      girlQuote: '“Our little daughter will bring so much joy into our lives.”',
      boyQuote: '“Our little boy will bring so much adventure into our lives.”',
      matchTitle: 'Spot on!',
      matchSub: name => `Congratulations ${name}, your intuition was completely right.`,
      noMatchTitle: 'A sweet surprise',
      noMatchSub: name => `Healthy and filled with love. We celebrate with you, ${name}.`,
      btnConfetti: 'More Confetti',
      btnShare: 'Share',
      btnRestart: 'Start Over',
      settingsTitle: 'Settings',
      settingGenderLabel: 'Actual Gender for the Reveal',
      settingJumpLabel: 'Developer Quick Jump',
      page: 'Page',
      btnReset: 'Reset Votes & Progress',
      btnDone: 'Done',
      toastNameReq: 'Please enter your name',
      toastGuessReq: 'Please select Boy or Girl',
      toastTeamBoy: 'Guess: Boy',
      toastTeamGirl: 'Guess: Girl',
      toastDevSkip: 'Developer: Countdown skipped',
      toastCopied: 'Result copied to clipboard',
      toastSoundOn: 'Sound enabled',
      toastSoundOff: 'Sound muted',
      toastLangDe: 'Sprache auf Deutsch festgelegt',
      toastLangEn: 'Language locked to English',
      shareText: gender => `Gender Reveal: It's a ${gender === 'girl' ? 'Girl' : 'Boy'}!`
    }
  };

  // ==================== STATE MANAGEMENT ====================
  const STATE = {
    lang: 'de', // active language
    isLanguageLocked: false, // false = auto-cycles between DE & EN on start page
    currentStep: 1,
    guestName: '',
    userGuess: null, // 'boy' | 'girl'
    actualGender: 'girl', // default: 'girl' (customizable in settings)
    partyTitle: 'Baby Shower Celebration',
    soundEnabled: true,
    devMode: false, // toggled by clicking 'Willkommen' 5 times
    countdownRunning: false,
    countdownTimeLeft: 10,
    countdownDuration: 10,
    countdownInterval: null,
    isCardUnlocked: false,
    isScratchedRevealed: false,
    votes: {
      boy: 15,
      girl: 17
    }
  };

  // Check if user previously locked a language choice
  try {
    const savedGender = localStorage.getItem('baby_actual_gender');
    if (savedGender) STATE.actualGender = savedGender;

    const savedVotes = localStorage.getItem('baby_votes_data');
    if (savedVotes) STATE.votes = JSON.parse(savedVotes);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  // ==================== DOM ELEMENTS ====================
  const elements = {
    // Background Videos
    videoContainer: document.getElementById('videoContainer'),
    bgVideoA: document.getElementById('bgVideoA'),
    bgVideoB: document.getElementById('bgVideoB'),
    
    // Developer Bar & Navigation
    devFloatingBar: document.getElementById('devFloatingBar'),
    openSettingsBtn: document.getElementById('openSettingsBtn'),
    devQuickBtn: document.getElementById('devQuickBtn'),
    stepperIndicator: document.getElementById('stepperIndicator'),

    // Page Views
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),

    // Page 1 Elements
    heroTitle: document.getElementById('heroTitle'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    nameLabel: document.getElementById('nameLabel'),
    langLabel: document.getElementById('langLabel'),
    userNameInput: document.getElementById('userNameInput'),
    langBtnDe: document.getElementById('langBtnDe'),
    langBtnEn: document.getElementById('langBtnEn'),
    btnToStep2: document.getElementById('btnToStep2'),
    btnToStep2Text: document.getElementById('btnToStep2Text'),
    guestCountPill: document.getElementById('guestCountPill'),

    // Page 2 Elements
    btnBackToStep1: document.getElementById('btnBackToStep1'),
    greetingPrefix: document.getElementById('greetingPrefix'),
    displayGuestName: document.getElementById('displayGuestName'),
    btnPickBoy: document.getElementById('btnPickBoy'),
    btnPickGirl: document.getElementById('btnPickGirl'),
    btnToStep3: document.getElementById('btnToStep3'),
    boyPercent: document.getElementById('boyPercent'),
    girlPercent: document.getElementById('girlPercent'),
    pollBarBoy: document.getElementById('pollBarBoy'),
    pollBarGirl: document.getElementById('pollBarGirl'),
    pollTotalText: document.getElementById('pollTotalText'),

    // Page 3 Elements
    userSummaryBadge: document.getElementById('userSummaryBadge'),
    countdownSection: document.getElementById('countdownSection'),
    countdownStatusLabel: document.getElementById('countdownStatusLabel'),
    timerSecs: document.getElementById('timerSecs'),
    btnStartSuspenseCountdown: document.getElementById('btnStartSuspenseCountdown'),
    btnDevSkipCountdown: document.getElementById('btnDevSkipCountdown'),
    
    // Scratch Card with Dual Layers
    scratchCardWrapper: document.getElementById('scratchCardWrapper'),
    revealedUnderlay: document.getElementById('revealedUnderlay'),
    scratchCanvasMid: document.getElementById('scratchCanvasMid'),
    scratchCanvasTop: document.getElementById('scratchCanvasTop'),
    countdownLockOverlay: document.getElementById('countdownLockOverlay'),
    postRevealSection: document.getElementById('postRevealSection'),
    
    // Revealed Details
    revealedGenderBadge: document.getElementById('revealedGenderBadge'),
    revealedIcon: document.getElementById('revealedIcon'),
    revealedGenderTitle: document.getElementById('revealedGenderTitle'),
    revealedQuote: document.getElementById('revealedQuote'),
    userMatchResult: document.getElementById('userMatchResult'),
    matchIcon: document.getElementById('matchIcon'),
    matchTitle: document.getElementById('matchTitle'),
    matchSubtitle: document.getElementById('matchSubtitle'),
    btnConfettiAgain: document.getElementById('btnConfettiAgain'),
    btnShareResult: document.getElementById('btnShareResult'),
    btnRestartGuess: document.getElementById('btnRestartGuess'),

    // Confetti
    confettiCanvas: document.getElementById('confettiCanvas'),

    // Settings Modal
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    setGenderGirl: document.getElementById('setGenderGirl'),
    setGenderBoy: document.getElementById('setGenderBoy'),
    devJumpPage1: document.getElementById('devJumpPage1'),
    devJumpPage2: document.getElementById('devJumpPage2'),
    devJumpPage3: document.getElementById('devJumpPage3'),
    btnResetAllVotes: document.getElementById('btnResetAllVotes'),

    // Toast
    toastBubble: document.getElementById('toastBubble')
  };

  function t(key, ...args) {
    const dict = I18N[STATE.lang] || I18N.de;
    const val = dict[key];
    if (typeof val === 'function') {
      return val(...args);
    }
    return val || key;
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ==================== BILINGUAL AUTO-CYCLE & LOCKING ====================
  let autoCycleInterval = null;

  function startBilingualAutoCycle() {
    if (STATE.isLanguageLocked) return;
    clearInterval(autoCycleInterval);

    // Initial button state: neither is locked active, indicate auto mode
    elements.langBtnDe.classList.remove('active');
    elements.langBtnEn.classList.remove('active');
    elements.langBtnDe.classList.add('auto-cycling');

    autoCycleInterval = setInterval(() => {
      if (STATE.isLanguageLocked || STATE.currentStep !== 1) {
        clearInterval(autoCycleInterval);
        return;
      }

      // Smooth swap transition: fade out elements
      const cyclingNodes = [
        elements.heroTitle,
        elements.heroSubtitle,
        elements.nameLabel,
        elements.btnToStep2Text,
        elements.langLabel
      ];

      cyclingNodes.forEach(node => {
        if (node) node.classList.add('text-cycling-fade', 'swapping');
      });

      setTimeout(() => {
        // Toggle language
        const nextLang = (STATE.lang === 'de') ? 'en' : 'de';
        STATE.lang = nextLang;

        // Update active cycling pill
        elements.langBtnDe.classList.toggle('auto-cycling', nextLang === 'de');
        elements.langBtnEn.classList.toggle('auto-cycling', nextLang === 'en');

        // Apply text without locking
        applyLanguageToDOM(nextLang);

        // Fade elements back in
        setTimeout(() => {
          cyclingNodes.forEach(node => {
            if (node) node.classList.remove('swapping');
          });
        }, 40);
      }, 320);

    }, 3600);
  }

  function lockLanguage(lang) {
    STATE.isLanguageLocked = true;
    STATE.lang = lang;
    clearInterval(autoCycleInterval);

    try {
      localStorage.setItem('baby_lang_locked', lang);
    } catch (e) {}

    // Solid active state on selected button
    elements.langBtnDe.classList.remove('auto-cycling');
    elements.langBtnEn.classList.remove('auto-cycling');
    elements.langBtnDe.classList.toggle('active', lang === 'de');
    elements.langBtnEn.classList.toggle('active', lang === 'en');

    applyLanguageToDOM(lang);
    showToast(t(lang === 'de' ? 'toastLangDe' : 'toastLangEn'));
    audio.playClick();
  }

  function applyLanguageToDOM(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) el.textContent = text;
    });

    if (elements.heroTitle) {
      elements.heroTitle.innerHTML = t('heroTitleHtml');
    }

    if (elements.userNameInput) {
      elements.userNameInput.placeholder = t('namePlaceholder');
    }

    if (elements.greetingPrefix) {
      elements.greetingPrefix.textContent = t('greetingPrefix');
    }

    updatePollUI();

    if (STATE.currentStep === 3 && !STATE.isScratchedRevealed) {
      drawScratchCardFoil();
      applyActualGenderTheme();
    }

    refreshIcons();
  }

  // ==================== WARM ACOUSTIC CHIME & ASMR SYNTHESIZER ====================
  const audio = {
    ctx: null,
    scratchBuffer: null,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    },

    // Warm acoustic chime/bell with soft attack envelope, harmonic overtones, and smooth decay
    playAcousticBell(freq, duration = 0.55, volume = 0.14) {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;

        // Master gain for this note with soft attack (18ms) to avoid clicks/harsh transients
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(volume, now + 0.018);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        // Gentle lowpass filter to produce a silky, warm acoustic timbre
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, now);
        filter.Q.value = 0.65;

        masterGain.connect(filter);
        filter.connect(this.ctx.destination);

        // Fundamental tone (pure sine)
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc1.connect(masterGain);
        osc1.start(now);
        osc1.stop(now + duration + 0.06);

        // Subtle harmonic overtone (octave chime harmonic) for depth and warmth
        const harmGain = this.ctx.createGain();
        harmGain.gain.setValueAtTime(0.0001, now);
        harmGain.gain.linearRampToValueAtTime(volume * 0.22, now + 0.014);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(duration * 0.45, 0.28));

        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2.0, now);
        osc2.connect(harmGain);
        harmGain.connect(filter);
        osc2.start(now);
        osc2.stop(now + duration + 0.06);
      } catch (e) {}
    },

    // Soft warm marimba tap for button clicks
    playClick() {
      this.playAcousticBell(440, 0.25, 0.10);
    },

    // Lush 2-tone melodic chime interval for choices & transitions
    playSelect() {
      this.playAcousticBell(587.33, 0.45, 0.12); // D5
      setTimeout(() => {
        this.playAcousticBell(880.00, 0.60, 0.14); // A5
      }, 70);
    },

    // Warm, muted wooden clock tick for countdown (never a harsh beep)
    playTick() {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        // Gentle downward pitch drop mimics acoustic woodblock/droplet
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.07);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.010);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.085);
      } catch (e) {}
    },

    // Ascending celestial bell arpeggio for gender reveal celebration
    playFanfare() {
      if (!STATE.soundEnabled) return;
      // Warm pentatonic celestial chime arpeggio
      const notes = [
        { f: 523.25, d: 0.85, delay: 0 },    // C5
        { f: 659.25, d: 0.95, delay: 140 },  // E5
        { f: 783.99, d: 1.10, delay: 280 },  // G5
        { f: 1046.50, d: 1.30, delay: 420 }, // C6
        { f: 1318.51, d: 1.60, delay: 580 }  // E6
      ];

      notes.forEach(({ f, d, delay }) => {
        setTimeout(() => {
          this.playAcousticBell(f, d, 0.16);
        }, delay);
      });
    },

    // Subtle 2-note chime when Dev Mode is toggled
    playDevToggle(isActive) {
      if (isActive) {
        this.playAcousticBell(523.25, 0.3, 0.10);
        setTimeout(() => this.playAcousticBell(783.99, 0.45, 0.12), 90);
      } else {
        this.playAcousticBell(783.99, 0.25, 0.10);
        setTimeout(() => this.playAcousticBell(523.25, 0.35, 0.09), 90);
      }
    },

    // Authentic tactile paper/foil scratch sound
    getScratchBuffer() {
      if (!this.scratchBuffer && this.ctx) {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99765 * b0 + white * 0.05;
          b1 = 0.96300 * b1 + white * 0.11;
          b2 = 0.57000 * b2 + white * 0.55;
          data[i] = (b0 + b1 + b2 + white * 0.18) * 0.24;
        }
        this.scratchBuffer = buffer;
      }
      return this.scratchBuffer;
    },

    playScratchSound() {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const buffer = this.getScratchBuffer();
        if (!buffer) return;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.playbackRate.value = 0.92 + Math.random() * 0.28;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1250 + (Math.random() - 0.5) * 350, this.ctx.currentTime);
        filter.Q.value = 1.3;

        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.048, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        src.start();
      } catch (e) {}
    }
  };

  // ==================== 7-SECOND CROSSFADE VIDEO LOOP ====================
  let activeVid = elements.bgVideoA;
  let inactiveVid = elements.bgVideoB;
  let isCrossfading = false;

  function initVideoBackground() {
    const vids = [elements.bgVideoA, elements.bgVideoB];
    vids.forEach(v => {
      if (!v) return;
      v.playbackRate = 0.5; // Slow-motion
      v.muted = true;
      v.playsInline = true;
    });

    if (activeVid) {
      const p = activeVid.play();
      if (p) p.catch(() => {});
    }

    function monitorLoop() {
      if (activeVid && !isCrossfading) {
        if (activeVid.currentTime >= 6.8) {
          isCrossfading = true;
          
          inactiveVid.currentTime = 0;
          inactiveVid.playbackRate = 0.5;
          const p = inactiveVid.play();
          if (p) p.catch(() => {});

          inactiveVid.classList.add('active-vid');
          activeVid.classList.remove('active-vid');

          setTimeout(() => {
            const temp = activeVid;
            activeVid = inactiveVid;
            inactiveVid = temp;
            inactiveVid.pause();
            inactiveVid.currentTime = 0;
            isCrossfading = false;
          }, 850);
        }
      }
      requestAnimationFrame(monitorLoop);
    }

    requestAnimationFrame(monitorLoop);
  }

  // ==================== STEP NAVIGATION WITH STAGGERED ENTRANCE ====================
  function goToStep(step) {
    STATE.currentStep = step;

    // Video background only for step 1, clean white background thereafter
    const isStep1 = (step === 1);
    document.body.classList.toggle('clean-bg', !isStep1);

    if (activeVid) {
      if (isStep1) {
        activeVid.play().catch(() => {});
      } else {
        activeVid.pause();
        if (inactiveVid) inactiveVid.pause();
      }
    }

    // View toggles
    elements.page1.classList.toggle('active', step === 1);
    elements.page2.classList.toggle('active', step === 2);
    elements.page3.classList.toggle('active', step === 3);

    // Re-trigger staggered animations on active page
    const activePage = document.getElementById(`page${step}`);
    if (activePage) {
      const staggerItems = activePage.querySelectorAll('.stagger-item');
      staggerItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; // trigger reflow
        item.style.animation = '';
      });
    }

    // Stepper dots
    document.querySelectorAll('.step-item').forEach(item => {
      const itemStep = parseInt(item.getAttribute('data-step'), 10);
      item.classList.toggle('active', itemStep <= step);
    });

    const stepLine1 = document.getElementById('stepLine1');
    const stepLine2 = document.getElementById('stepLine2');
    if (stepLine1) stepLine1.classList.toggle('passed', step >= 2);
    if (stepLine2) stepLine2.classList.toggle('passed', step >= 3);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (step === 1 && !STATE.isLanguageLocked) {
      startBilingualAutoCycle();
    } else {
      clearInterval(autoCycleInterval);
    }

    if (step === 2) {
      clearInterval(STATE.countdownInterval);
      STATE.countdownRunning = false;
      updatePollUI();
    } else if (step === 3) {
      setupRevealPage();
    } else {
      clearInterval(STATE.countdownInterval);
      STATE.countdownRunning = false;
    }

    refreshIcons();
    updateScalingContainer();
  }

  // ==================== PAGE 1 LOGIC ====================
  function initPage1() {
    // Explicit language clicks
    elements.langBtnDe.addEventListener('click', () => {
      lockLanguage('de');
    });

    elements.langBtnEn.addEventListener('click', () => {
      lockLanguage('en');
    });

    // Lock language on user input interaction
    elements.userNameInput.addEventListener('focus', () => {
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
    });

    elements.userNameInput.addEventListener('input', () => {
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
      const val = elements.userNameInput.value.trim();
      elements.btnToStep2.disabled = (val.length === 0);
    });

    elements.btnToStep2.addEventListener('click', () => {
      const name = elements.userNameInput.value.trim();
      if (!name) {
        showToast(t('toastNameReq'));
        elements.userNameInput.focus();
        return;
      }
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
      STATE.guestName = name;
      elements.displayGuestName.textContent = name;
      audio.playSelect();
      goToStep(2);
    });

    elements.userNameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        elements.btnToStep2.click();
      }
    });
  }

  // ==================== PAGE 2 LOGIC ====================
  function initPage2() {
    elements.btnBackToStep1.addEventListener('click', () => {
      audio.playClick();
      goToStep(1);
    });

    elements.btnPickBoy.addEventListener('click', () => {
      selectGuess('boy');
    });

    elements.btnPickGirl.addEventListener('click', () => {
      selectGuess('girl');
    });

    elements.btnToStep3.addEventListener('click', () => {
      if (!STATE.userGuess) {
        showToast(t('toastGuessReq'));
        return;
      }
      audio.playSelect();

      STATE.votes[STATE.userGuess]++;
      try {
        localStorage.setItem('baby_votes_data', JSON.stringify(STATE.votes));
      } catch (e) {}

      goToStep(3);
    });
  }

  function selectGuess(choice) {
    STATE.userGuess = choice;
    audio.playSelect();

    elements.btnPickBoy.classList.toggle('selected', choice === 'boy');
    elements.btnPickGirl.classList.toggle('selected', choice === 'girl');
    elements.btnToStep3.disabled = false;

    if (choice === 'boy') {
      showToast(t('toastTeamBoy'));
    } else {
      showToast(t('toastTeamGirl'));
    }

    refreshIcons();
  }

  function updatePollUI() {
    const boyCount = STATE.votes.boy;
    const girlCount = STATE.votes.girl;
    const total = boyCount + girlCount;

    const boyPct = Math.round((boyCount / total) * 100);
    const girlPct = 100 - boyPct;

    elements.boyPercent.textContent = `${boyPct}%`;
    elements.girlPercent.textContent = `${girlPct}%`;
    elements.pollBarBoy.style.width = `${boyPct}%`;
    elements.pollBarGirl.style.width = `${girlPct}%`;
    elements.pollTotalText.textContent = `${total} ${t('votesSuffix')}`;
    elements.guestCountPill.textContent = t('guestCountPill', total);
  }

  // ==================== PAGE 3 & COUNTDOWN ====================
  function setupRevealPage() {
    if (STATE.userGuess === 'boy') {
      elements.userSummaryBadge.textContent = t('boyLabel');
      elements.userSummaryBadge.style.color = 'var(--pastel-blue-ink)';
    } else {
      elements.userSummaryBadge.textContent = t('girlLabel');
      elements.userSummaryBadge.style.color = 'var(--pastel-pink-ink)';
    }

    applyActualGenderTheme();

    STATE.isCardUnlocked = false;
    STATE.isScratchedRevealed = false;
    elements.countdownLockOverlay.classList.remove('unlocked');
    elements.scratchCanvasTop.classList.remove('revealed-out', 'unlocked');
    elements.scratchCanvasMid.classList.remove('revealed-out', 'unlocked');
    if (elements.postRevealSection) elements.postRevealSection.classList.remove('visible');

    drawScratchCardFoil();
    requestAnimationFrame(() => {
      drawScratchCardFoil();
    });

    STATE.countdownTimeLeft = STATE.countdownDuration;
    refreshIcons();

    // Automatically start the 10s suspense countdown immediately upon arrival
    startCountdown(10);
  }

  function applyActualGenderTheme() {
    const isGirl = (STATE.actualGender === 'girl');
    elements.revealedUnderlay.classList.toggle('gender-girl', isGirl);
    elements.revealedUnderlay.classList.toggle('gender-boy', !isGirl);

    if (isGirl) {
      elements.revealedIcon.setAttribute('data-lucide', 'heart');
      elements.revealedGenderTitle.textContent = t('girlTitle');
      elements.revealedQuote.textContent = t('girlQuote');
    } else {
      elements.revealedIcon.setAttribute('data-lucide', 'compass');
      elements.revealedGenderTitle.textContent = t('boyTitle');
      elements.revealedQuote.textContent = t('boyQuote');
    }

    const userMatched = (STATE.userGuess === STATE.actualGender);
    if (userMatched) {
      elements.matchIcon.setAttribute('data-lucide', 'award');
      elements.matchTitle.textContent = t('matchTitle');
      elements.matchSubtitle.textContent = t('matchSub', STATE.guestName || 'Gast');
    } else {
      elements.matchIcon.setAttribute('data-lucide', 'sparkles');
      elements.matchTitle.textContent = t('noMatchTitle');
      elements.matchSubtitle.textContent = t('noMatchSub', STATE.guestName || 'Gast');
    }

    refreshIcons();
  }

  function initPage3() {
    if (elements.btnStartSuspenseCountdown) {
      elements.btnStartSuspenseCountdown.addEventListener('click', () => {
        startCountdown(10);
      });
    }

    elements.btnDevSkipCountdown.addEventListener('click', () => {
      skipCountdownForDev();
    });

    elements.devQuickBtn.addEventListener('click', () => {
      if (STATE.currentStep !== 3) {
        goToStep(3);
      }
      skipCountdownForDev();
    });

    elements.btnConfettiAgain.addEventListener('click', () => {
      audio.playFanfare();
      fireCelebrationConfetti();
    });

    elements.btnShareResult.addEventListener('click', () => {
      const text = t('shareText', STATE.actualGender);
      if (navigator.share) {
        navigator.share({
          title: 'Baby Shower Gender Reveal',
          text: text,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(text);
        showToast(t('toastCopied'));
      }
    });

    elements.btnRestartGuess.addEventListener('click', () => {
      audio.playClick();
      goToStep(1);
    });

    setupMultiLayerScratchEvents();
  }

  function startCountdown(seconds) {
    if (STATE.countdownRunning) return;
    STATE.countdownRunning = true;
    STATE.countdownTimeLeft = seconds;
    if (elements.btnStartSuspenseCountdown) elements.btnStartSuspenseCountdown.disabled = true;

    audio.playClick();
    elements.countdownStatusLabel.textContent = (STATE.lang === 'de') ? 'Spannung steigt' : 'Suspense builds';

    clearInterval(STATE.countdownInterval);
    STATE.countdownInterval = setInterval(() => {
      STATE.countdownTimeLeft--;
      elements.timerSecs.textContent = String(STATE.countdownTimeLeft).padStart(2, '0');
      audio.playTick();

      if (STATE.countdownTimeLeft <= 0) {
        clearInterval(STATE.countdownInterval);
        STATE.countdownRunning = false;
        if (elements.btnStartSuspenseCountdown) elements.btnStartSuspenseCountdown.disabled = false;
        unlockScratchCard();
      }
    }, 1000);
  }

  function skipCountdownForDev() {
    clearInterval(STATE.countdownInterval);
    STATE.countdownRunning = false;
    STATE.countdownTimeLeft = 0;
    elements.timerSecs.textContent = '00';
    if (elements.btnStartSuspenseCountdown) elements.btnStartSuspenseCountdown.disabled = false;
    if (STATE.isCardUnlocked) {
      triggerGenderReveal();
    } else {
      unlockScratchCard();
    }
  }

  function unlockScratchCard() {
    STATE.isCardUnlocked = true;
    elements.countdownLockOverlay.classList.add('unlocked');
    elements.scratchCanvasTop.classList.add('unlocked');
    elements.scratchCanvasMid.classList.add('unlocked');
    elements.countdownStatusLabel.textContent = (STATE.lang === 'de') ? 'Freigeschaltet' : 'Unlocked';
    audio.playSelect();
    refreshIcons();
  }

  // ==================== MULTI-LAYER SCRATCH FOIL SYSTEM ====================
  let isScratching = false;
  let scratchThrottle = 0;

  function drawScratchCardFoil() {
    const topCanvas = elements.scratchCanvasTop;
    const midCanvas = elements.scratchCanvasMid;
    if (!topCanvas || !midCanvas) return;

    const wrapper = elements.scratchCardWrapper;
    const w = topCanvas.width = midCanvas.width = (topCanvas.offsetWidth || (wrapper ? wrapper.offsetWidth : 0) || 400);
    const h = topCanvas.height = midCanvas.height = (topCanvas.offsetHeight || (wrapper ? wrapper.offsetHeight : 0) || 225);

    // --- LAYER 1: MIDDLE PEARLESCENT FOIL (Beneath Top Layer) ---
    const ctxMid = midCanvas.getContext('2d');
    ctxMid.globalCompositeOperation = 'source-over';

    const pearlGrad = ctxMid.createLinearGradient(0, 0, w, h);
    pearlGrad.addColorStop(0, '#f1f5f9');
    pearlGrad.addColorStop(0.35, '#e2e8f0');
    pearlGrad.addColorStop(0.7, '#f8fafc');
    pearlGrad.addColorStop(1, '#cbd5e1');
    ctxMid.fillStyle = pearlGrad;
    ctxMid.fillRect(0, 0, w, h);

    // Diamond grid texture on middle foil
    ctxMid.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctxMid.lineWidth = 1;
    for (let x = -h; x < w + h; x += 36) {
      ctxMid.beginPath();
      ctxMid.moveTo(x, 0);
      ctxMid.lineTo(x + h, h);
      ctxMid.stroke();

      ctxMid.beginPath();
      ctxMid.moveTo(x, h);
      ctxMid.lineTo(x + h, 0);
      ctxMid.stroke();
    }

    ctxMid.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctxMid.fillStyle = '#64748b';
    ctxMid.textAlign = 'center';
    ctxMid.textBaseline = 'middle';
    ctxMid.fillText(t('foilMidText'), w / 2, h / 2);

    // --- LAYER 2: TOP MATTE CHARCOAL FOIL (Outer Layer) ---
    const ctxTop = topCanvas.getContext('2d');
    ctxTop.globalCompositeOperation = 'source-over';

    const charGrad = ctxTop.createLinearGradient(0, 0, w, h);
    charGrad.addColorStop(0, '#262d3d');
    charGrad.addColorStop(0.5, '#1b222d');
    charGrad.addColorStop(1, '#141a24');
    ctxTop.fillStyle = charGrad;
    ctxTop.fillRect(0, 0, w, h);

    // Golden hairline borders
    ctxTop.lineWidth = 1.5;
    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctxTop.strokeRect(14, 14, w - 28, h - 28);

    ctxTop.lineWidth = 0.5;
    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctxTop.strokeRect(20, 20, w - 40, h - 40);

    const cx = w / 2;
    const cy = Math.max(46, Math.round(h * 0.32));

    // Wax seal emblem
    ctxTop.beginPath();
    ctxTop.arc(cx, cy, 28, 0, Math.PI * 2);
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctxTop.fill();
    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctxTop.lineWidth = 1;
    ctxTop.stroke();

    ctxTop.fillStyle = '#ffffff';
    ctxTop.beginPath();
    ctxTop.arc(cx, cy, 3, 0, Math.PI * 2);
    ctxTop.fill();

    // Top foil typography
    ctxTop.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.textAlign = 'center';
    ctxTop.textBaseline = 'middle';
    ctxTop.fillText(t('foilSecret'), cx, cy + 42);

    ctxTop.font = '400 11px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctxTop.fillText(t('foilSecretSub'), cx, cy + 60);

    ctxTop.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.90)';
    ctxTop.fillText(t('foilRubbel'), cx, cy + 88);
  }

  function setupMultiLayerScratchEvents() {
    const topCanvas = elements.scratchCanvasTop;
    const midCanvas = elements.scratchCanvasMid;

    function getCoords(e) {
      const rect = topCanvas.getBoundingClientRect();
      const scaleX = topCanvas.width / rect.width;
      const scaleY = topCanvas.height / rect.height;

      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function handleScratchSwipe(e) {
      if (!isScratching || !STATE.isCardUnlocked || STATE.isScratchedRevealed) return;
      e.preventDefault();

      const coords = getCoords(e);
      const ctxTop = topCanvas.getContext('2d');
      const ctxMid = midCanvas.getContext('2d');

      // 1. Scrape outer layer (Top Canvas) with wide brush (radius ~30px)
      ctxTop.globalCompositeOperation = 'destination-out';
      ctxTop.beginPath();
      ctxTop.arc(coords.x, coords.y, 30, 0, Math.PI * 2);
      ctxTop.fill();

      // 2. Multi-layer resistance: Middle canvas only scrapes with slightly tighter radius (~20px)
      // requiring extra, repeated swiping to scrape through to the baby card!
      ctxMid.globalCompositeOperation = 'destination-out';
      ctxMid.beginPath();
      ctxMid.arc(coords.x, coords.y, 21, 0, Math.PI * 2);
      ctxMid.fill();

      // Pleasant tactile ASMR scratch sound
      scratchThrottle++;
      if (scratchThrottle % 2 === 0) {
        audio.playScratchSound();
      }

      // Check middle layer transparency every 6 moves
      if (scratchThrottle % 6 === 0) {
        checkMiddleLayerScratched();
      }
    }

    topCanvas.addEventListener('mousedown', e => {
      if (!STATE.isCardUnlocked) {
        showToast((STATE.lang === 'de') ? 'Bitte starte zuerst den Countdown' : 'Please start countdown first');
        return;
      }
      isScratching = true;
      handleScratchSwipe(e);
    });

    window.addEventListener('mousemove', e => {
      if (isScratching) handleScratchSwipe(e);
    });

    window.addEventListener('mouseup', () => {
      if (isScratching) {
        isScratching = false;
        checkMiddleLayerScratched();
      }
    });

    topCanvas.addEventListener('touchstart', e => {
      if (!STATE.isCardUnlocked) {
        showToast((STATE.lang === 'de') ? 'Bitte starte zuerst den Countdown' : 'Please start countdown first');
        return;
      }
      isScratching = true;
      handleScratchSwipe(e);
    }, { passive: false });

    topCanvas.addEventListener('touchmove', handleScratchSwipe, { passive: false });

    topCanvas.addEventListener('touchend', () => {
      if (isScratching) {
        isScratching = false;
        checkMiddleLayerScratched();
      }
    });
  }

  function checkMiddleLayerScratched() {
    if (STATE.isScratchedRevealed) return;
    const midCanvas = elements.scratchCanvasMid;
    const ctxMid = midCanvas.getContext('2d');
    const w = midCanvas.width;
    const h = midCanvas.height;

    try {
      const imgData = ctxMid.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;
      const step = 32;
      let totalSampled = 0;

      for (let i = 3; i < pixels.length; i += step * 4) {
        totalSampled++;
        if (pixels[i] < 128) {
          transparentCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));

      // Threshold: Once ~28% of the middle layer is scraped away, the gender is clearly visible!
      if (percent >= 28) {
        triggerGenderReveal();
      }
    } catch (e) {
      console.warn('Scratch calculation error:', e);
    }
  }

  function triggerGenderReveal() {
    if (STATE.isScratchedRevealed) return;
    STATE.isScratchedRevealed = true;

    // Fade out both foil layers smoothly
    elements.scratchCanvasTop.classList.add('revealed-out');
    elements.scratchCanvasMid.classList.add('revealed-out');

    if (elements.postRevealSection) {
      elements.postRevealSection.classList.add('visible');
    }

    audio.playFanfare();
    fireCelebrationConfetti();
    refreshIcons();

    const genderName = (STATE.actualGender === 'girl') ? t('girlTitle') : t('boyTitle');
    showToast(`${t('revealEyebrow')}: ${genderName}!`);
  }

  // ==================== PASTEL CONFETTI ENGINE ====================
  function fireCelebrationConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = (STATE.actualGender === 'girl')
      ? ['#e598a8', '#f7d2db', '#ffffff', '#e2d5c3', '#fcf0f3', '#18202f']
      : ['#7ba7d7', '#c7def3', '#ffffff', '#e2d5c3', '#ebf3fb', '#18202f'];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 100,
        y: height * 0.42 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 20,
        vy: -Math.random() * 15 - 7,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35 + Math.random() * 0.12,
        drag: 0.985,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.1 + 0.05
      });
    }

    let animationFrame;
    const startTime = performance.now();

    function renderConfetti(time) {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);

      let alive = false;
      particles.forEach(p => {
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.wobble) * 1.4;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (p.y < height + 40) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (alive && elapsed < 5500) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrame);
      }
    }

    animationFrame = requestAnimationFrame(renderConfetti);
  }

  // ==================== SETTINGS MODAL ====================
  function initSettingsModal() {
    elements.openSettingsBtn.addEventListener('click', () => {
      audio.playClick();
      elements.settingsModal.classList.add('open');
      updateSettingsUI();
      refreshIcons();
    });

    elements.closeSettingsBtn.addEventListener('click', () => {
      audio.playClick();
      elements.settingsModal.classList.remove('open');
    });

    elements.saveSettingsBtn.addEventListener('click', () => {
      audio.playClick();
      elements.settingsModal.classList.remove('open');
    });

    elements.settingsModal.addEventListener('click', e => {
      if (e.target === elements.settingsModal) {
        elements.settingsModal.classList.remove('open');
      }
    });

    elements.setGenderGirl.addEventListener('click', () => {
      STATE.actualGender = 'girl';
      localStorage.setItem('baby_actual_gender', 'girl');
      updateSettingsUI();
      applyActualGenderTheme();
      audio.playSelect();
      showToast(`${t('settingGenderLabel')}: ${t('girlLabel')}`);
    });

    elements.setGenderBoy.addEventListener('click', () => {
      STATE.actualGender = 'boy';
      localStorage.setItem('baby_actual_gender', 'boy');
      updateSettingsUI();
      applyActualGenderTheme();
      audio.playSelect();
      showToast(`${t('settingGenderLabel')}: ${t('boyLabel')}`);
    });

    elements.devJumpPage1.addEventListener('click', () => {
      elements.settingsModal.classList.remove('open');
      goToStep(1);
    });

    elements.devJumpPage2.addEventListener('click', () => {
      elements.settingsModal.classList.remove('open');
      if (!STATE.guestName) {
        STATE.guestName = (STATE.lang === 'de') ? 'Gast' : 'Guest';
        elements.displayGuestName.textContent = STATE.guestName;
      }
      goToStep(2);
    });

    elements.devJumpPage3.addEventListener('click', () => {
      elements.settingsModal.classList.remove('open');
      if (!STATE.userGuess) STATE.userGuess = 'boy';
      goToStep(3);
    });

    elements.btnResetAllVotes.addEventListener('click', () => {
      STATE.votes = { boy: 12, girl: 14 };
      localStorage.removeItem('baby_votes_data');
      updatePollUI();
      showToast(t('btnReset'));
      audio.playClick();
    });
  }

  // ==================== 5-CLICK EASTER EGG FOR DEV MODE ====================
  let devClickCount = 0;
  let devClickTimer = null;

  function initDevEasterEgg() {
    function handleEasterEggClick(e) {
      audio.init();

      devClickCount++;
      clearTimeout(devClickTimer);

      // Reset count if not clicked 5 times within 2.8 seconds
      devClickTimer = setTimeout(() => {
        devClickCount = 0;
      }, 2800);

      if (devClickCount >= 5) {
        devClickCount = 0;
        clearTimeout(devClickTimer);
        toggleDevMode();
      }
    }

    // Primary target: 'Willkommen' header on page 1
    if (elements.heroTitle) {
      elements.heroTitle.addEventListener('click', handleEasterEggClick);
    }

    // Also allow on page 2 & 3 editorial headings so developer options can be toggled anywhere
    document.querySelectorAll('.editorial-heading').forEach(el => {
      el.addEventListener('click', handleEasterEggClick);
    });
  }

  function toggleDevMode(forceState) {
    if (typeof forceState === 'boolean') {
      STATE.devMode = forceState;
    } else {
      STATE.devMode = !STATE.devMode;
    }

    document.body.classList.toggle('dev-mode-active', STATE.devMode);
    
    if (elements.devFloatingBar) {
      elements.devFloatingBar.classList.toggle('active', STATE.devMode);
    }

    audio.playDevToggle(STATE.devMode);

    if (STATE.devMode) {
      showToast(STATE.lang === 'de' ? 'Entwickler-Optionen aktiviert' : 'Developer options enabled');
    } else {
      showToast(STATE.lang === 'de' ? 'Entwickler-Optionen ausgeblendet' : 'Developer options hidden');
    }

    updateScalingContainer();
  }

  function updateSettingsUI() {
    elements.setGenderGirl.classList.toggle('active', STATE.actualGender === 'girl');
    elements.setGenderBoy.classList.toggle('active', STATE.actualGender === 'boy');
  }

  // ==================== TOAST HELPER (DISABLED PER USER REQUEST) ====================
  function showToast(msg) {
    // Toast messages disabled per user request
    return;
  }

  // ==================== RESPONSIVE LAYOUT & SCRATCH RESIZE ====================
  function updateScalingContainer() {
    const container = document.getElementById('scalingContainer');
    if (!container) return;
    container.style.transform = 'none';
  }

  window.addEventListener('resize', () => {
    if (STATE.currentStep === 3 && !STATE.isScratchedRevealed) {
      drawScratchCardFoil();
    }
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (STATE.currentStep === 3 && !STATE.isScratchedRevealed) {
        drawScratchCardFoil();
      }
    }, 150);
  });

  // ==================== INITIALIZATION ====================
  function init() {
    initVideoBackground();
    initPage1();
    initPage2();
    initPage3();
    initSettingsModal();
    initDevEasterEgg();

    // Check if user locked language in previous session
    const savedLockedLang = localStorage.getItem('baby_lang_locked');
    if (savedLockedLang && (savedLockedLang === 'de' || savedLockedLang === 'en')) {
      lockLanguage(savedLockedLang);
    } else {
      // Start auto-alternating cycle between DE and EN smoothly
      STATE.lang = 'de';
      applyLanguageToDOM('de');
      startBilingualAutoCycle();
    }

    goToStep(1);
    refreshIcons();
    updateScalingContainer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
