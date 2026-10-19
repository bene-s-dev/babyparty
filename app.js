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
      heroTitleHtml: '<span class="title-word" style="--w-idx: 0;">Willkommen</span> <span class="title-word" style="--w-idx: 1;">zur</span><span class="highlight-text title-word word-highlight" style="--w-idx: 2;">Babyshower</span>',
      heroSubtitle: 'Ein neues Kapitel beginnt. Trage deinen Namen ein und feier mit uns.',
      nameLabel: 'Dein Name',
      namePlaceholder: 'z. B. Louisa B.',
      langLabel: 'Sprache:',
      btnToStep2: 'Weiter',
      guestCountPill: n => `${n} Gäste nehmen bereits teil`,
      btnBack: 'Zurück',
      greetingPrefix: 'Hallo, ',
      guessHeading: 'Was ist dein Tipp?',
      guessSubtitle: 'Wähle deine Intuition:',
      boyLabel: 'Junge',
      girlLabel: 'Mädchen',
      votesSuffix: 'Stimmen',
      btnToStep3: 'Weiter',
      userGuessLabel: 'Dein Team:',
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
      foilSecret: '★ RUBBELFELD ★',
      foilSecretSub: 'Wische mit dem Finger zum Enthüllen',
      foilRubbel: 'HIER FREIRUBBELN',
      foilMidText: 'FAST GESCHAFFT...',
      barrierTitle: 'Countdown läuft...',
      barrierText: '',
      revealEyebrow: 'Offizielle Verkündung',
      revealPrefix: 'Es wird ein...',
      teaserQuote: 'Wische weiter zum Enthüllen...',
      girlTitle: 'MÄDCHEN',
      boyTitle: 'JUNGE',
      girlQuote: '„Unsere kleine Tochter wird die Welt bereichern.“',
      boyQuote: '„Unser kleiner Sohn wird die Welt entdecken.“',
      matchTitle: 'Richtig getippt!',
      matchSub: name => `Glückwunsch ${name}, dein Bauchgefühl lag genau richtig.`,
      noMatchTitle: 'Voller Überraschung',
      noMatchSub: name => `Hauptsache gesund und voller Liebe. Wir freuen uns mit dir, ${name}.`,
      btnConfetti: 'Mehr Konfetti',
      btnShare: 'Story-Karte teilen',
      btnRestart: 'Neu starten',
      storyModalTitle: 'Story-Karte teilen',
      btnDownloadStory: 'Bild speichern',
      btnShareDirect: 'Teilen (WhatsApp / Story)',
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
      heroTitleHtml: '<span class="title-word" style="--w-idx: 0;">Welcome</span> <span class="title-word" style="--w-idx: 1;">to</span> <span class="title-word" style="--w-idx: 2;">the</span><span class="highlight-text title-word word-highlight" style="--w-idx: 3;">Baby Shower</span>',
      heroSubtitle: 'A new chapter begins. Enter your name and celebrate with us.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Louisa B.',
      langLabel: 'Language:',
      btnToStep2: 'Continue',
      guestCountPill: n => `${n} guests already participating`,
      btnBack: 'Back',
      greetingPrefix: 'Hello, ',
      guessHeading: 'What is your guess?',
      guessSubtitle: 'Choose your intuition:',
      boyLabel: 'Boy',
      girlLabel: 'Girl',
      votesSuffix: 'votes',
      btnToStep3: 'Continue',
      userGuessLabel: 'Your Team:',
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
      foilSecret: '★ SCRATCH FIELD ★',
      foilSecretSub: 'Swipe with your finger to reveal',
      foilRubbel: 'SCRATCH TO REVEAL',
      foilMidText: 'ALMOST THERE...',
      barrierTitle: 'Countdown in progress...',
      barrierText: '',
      revealEyebrow: 'Official Announcement',
      revealPrefix: 'It’s a...',
      teaserQuote: 'Keep scratching to reveal...',
      girlTitle: 'GIRL',
      boyTitle: 'BOY',
      girlQuote: '“Our little daughter will bring so much joy into our lives.”',
      boyQuote: '“Our little boy will bring so much adventure into our lives.”',
      matchTitle: 'Spot on!',
      matchSub: name => `Congratulations ${name}, your intuition was completely right.`,
      noMatchTitle: 'A sweet surprise',
      noMatchSub: name => `Healthy and filled with love. We celebrate with you, ${name}.`,
      btnConfetti: 'More Confetti',
      btnShare: 'Share Story Card',
      btnRestart: 'Start Over',
      storyModalTitle: 'Share Story Card',
      btnDownloadStory: 'Save Image',
      btnShareDirect: 'Share (WhatsApp / Story)',
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

  // ==================== GENDER ICON SVGS (Toilet / Gender Symbols) ====================
  const GENDER_ICONS = {
    boy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="14" r="5"></circle><line x1="13.6" y1="10.4" x2="19.5" y2="4.5"></line><polyline points="14.5 4.5 19.5 4.5 19.5 9.5"></polyline></svg>`,
    girl: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"></circle><line x1="12" y1="14" x2="12" y2="21"></line><line x1="9" y1="17.5" x2="15" y2="17.5"></line></svg>`,
    mystery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`
  };

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
    guessHeading: document.getElementById('guessHeading'),
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
    revealHeading: document.getElementById('revealHeading'),
    userSummaryBadge: document.getElementById('userSummaryBadge'),
    revealSubheading: document.getElementById('revealSubheading'),
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

    // Scratch Sparkles Canvas
    scratchSparklesCanvas: document.getElementById('scratchSparklesCanvas'),

    // Particles & Confetti Canvases
    bgStarsCanvas: document.getElementById('bgStarsCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),

    // Story Modal
    storyModal: document.getElementById('storyModal'),
    closeStoryModalBtn: document.getElementById('closeStoryModalBtn'),
    storyCardCanvas: document.getElementById('storyCardCanvas'),
    btnDownloadStoryImage: document.getElementById('btnDownloadStoryImage'),
    btnShareStoryNative: document.getElementById('btnShareStoryNative'),

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
  let isLanguageTransitioning = false;

  function smoothCrossfadeLanguage(newLang, onSwap) {
    if (isLanguageTransitioning) return;
    isLanguageTransitioning = true;

    // Phase 1: Soft blur, slight lift, and smooth fade out
    document.body.classList.add('lang-swapping');

    setTimeout(() => {
      // Phase 2: Under the veil of transparency, update text & state
      STATE.lang = newLang;
      applyLanguageToDOM(newLang);

      if (onSwap) onSwap();

      // Phase 3: Float back down and dissolve in smoothly
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.body.classList.remove('lang-swapping');
          setTimeout(() => {
            isLanguageTransitioning = false;
          }, 240);
        }, 30);
      });
    }, 220);
  }

  function startBilingualAutoCycle() {
    if (STATE.isLanguageLocked) return;
    clearInterval(autoCycleInterval);

    // Initial button state: auto indicator
    elements.langBtnDe.classList.remove('active');
    elements.langBtnEn.classList.remove('active');
    elements.langBtnDe.classList.toggle('auto-cycling', STATE.lang === 'de');
    elements.langBtnEn.classList.toggle('auto-cycling', STATE.lang === 'en');

    autoCycleInterval = setInterval(() => {
      if (STATE.isLanguageLocked || STATE.currentStep !== 1) {
        clearInterval(autoCycleInterval);
        return;
      }

      const nextLang = (STATE.lang === 'de') ? 'en' : 'de';

      // Update button cycling indicator
      elements.langBtnDe.classList.toggle('auto-cycling', nextLang === 'de');
      elements.langBtnEn.classList.toggle('auto-cycling', nextLang === 'en');

      smoothCrossfadeLanguage(nextLang);
    }, 4200);
  }

  function lockLanguage(lang) {
    if (STATE.lang === lang && STATE.isLanguageLocked) return;

    STATE.isLanguageLocked = true;
    clearInterval(autoCycleInterval);

    try {
      localStorage.setItem('baby_lang_locked', lang);
    } catch (e) { }

    // Solid active pill styling with animation re-trigger
    elements.langBtnDe.classList.remove('auto-cycling');
    elements.langBtnEn.classList.remove('auto-cycling');
    elements.langBtnDe.classList.remove('active');
    elements.langBtnEn.classList.remove('active');
    const targetLangBtn = (lang === 'de') ? elements.langBtnDe : elements.langBtnEn;
    if (targetLangBtn) {
      void targetLangBtn.offsetWidth; // Force reflow to re-trigger langPillPop
      targetLangBtn.classList.add('active');
    }

    audio.playClick();

    if (STATE.lang === lang) {
      // Already matching language, just locked state
      return;
    }

    smoothCrossfadeLanguage(lang);
  }

  // ==================== ANIMATED PLACEHOLDER (TYPEWRITER EFFECT) ====================
  const placeholderAnimator = {
    timer: null,
    names: ['Louisa B.', 'Eleni O.'],
    nameIndex: 0,
    charIndex: 0,
    isDeleting: false,
    isActive: true,

    getPrefix() {
      return (STATE.lang === 'en') ? 'e.g. ' : 'z. B. ';
    },

    getCurrentName() {
      return this.names[this.nameIndex % this.names.length];
    },

    start() {
      if (!elements.userNameInput) return;
      this.clear();
      this.nameIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.isActive = true;
      elements.userNameInput.placeholder = this.getPrefix();
      this.tick();
    },

    clear() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },

    stop() {
      this.clear();
      this.isActive = false;
    },

    resume() {
      if (!elements.userNameInput) return;
      if (elements.userNameInput.value.trim().length === 0) {
        this.isActive = true;
        this.clear();
        this.tick();
      }
    },

    onLanguageChange() {
      this.clear();
      if (elements.userNameInput && elements.userNameInput.value.trim().length === 0) {
        this.isActive = true;
        // Keep current typed characters with updated language prefix (z. B. / e.g.)
        const currentName = this.getCurrentName();
        elements.userNameInput.placeholder = this.getPrefix() + currentName.slice(0, this.charIndex);
        this.tick();
      }
    },

    tick() {
      if (!this.isActive || !elements.userNameInput) return;

      // Never animate placeholder while user has typed text
      if (elements.userNameInput.value.length > 0) {
        return;
      }

      const prefix = this.getPrefix();
      const currentName = this.getCurrentName();
      let delay = 120;

      if (!this.isDeleting) {
        this.charIndex++;
        elements.userNameInput.placeholder = prefix + currentName.slice(0, this.charIndex);

        if (this.charIndex >= currentName.length) {
          // Finished typing name: pause so user can comfortably read it
          this.isDeleting = true;
          delay = 2000;
        } else {
          // Natural typing cadence (90ms - 130ms)
          delay = 90 + Math.random() * 40;
        }
      } else {
        this.charIndex--;
        elements.userNameInput.placeholder = prefix + currentName.slice(0, this.charIndex);

        if (this.charIndex <= 0) {
          // Finished deleting down to prefix: pause on prefix, switch to next name
          this.charIndex = 0;
          this.isDeleting = false;
          this.nameIndex = (this.nameIndex + 1) % this.names.length;
          delay = 600;
        } else {
          // Deleting is rhythmic and swift (42ms)
          delay = 42;
        }
      }

      this.timer = setTimeout(() => this.tick(), delay);
    }
  };

  function updateGuessHeading() {
    if (!elements.guessHeading) return;
    const name = STATE.guestName ? STATE.guestName.trim() : '';
    let text = '';
    if (name) {
      text = (STATE.lang === 'de')
        ? `${name}, was ist dein Tipp?`
        : `${name}, what is your guess?`;
    } else {
      text = (STATE.lang === 'de')
        ? 'Was ist dein Tipp?'
        : 'What is your guess?';
    }
    const words = text.split(' ').filter(Boolean);
    elements.guessHeading.innerHTML = words
      .map((word, i) => {
        const isHighlight = word.toLowerCase().includes('tipp') || word.toLowerCase().includes('guess');
        const highlightClass = isHighlight ? ' highlight-word' : '';
        return `<span class="title-word${highlightClass}" style="--w-idx: ${i};">${word}</span>`;
      })
      .join(' ');
  }

  function updateRevealHeading() {
    if (!elements.revealHeading) return;
    const isDe = (STATE.lang === 'de');
    if (isDe) {
      elements.revealHeading.innerHTML = 'Das <span class="reveal-highlight">Gender Reveal</span>';
    } else {
      elements.revealHeading.innerHTML = 'The <span class="reveal-highlight">Gender Reveal</span>';
    }
  }

  function applyLanguageToDOM(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'guessHeading' || key === 'revealHeading') return; // Handled with title-word spans
      const text = t(key);
      if (text) el.textContent = text;
    });

    updateGuessHeading();
    updateRevealHeading();

    if (elements.heroTitle) {
      elements.heroTitle.innerHTML = t('heroTitleHtml');
    }

    if (elements.userNameInput) {
      placeholderAnimator.onLanguageChange();
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
        this.ctx.resume().catch(() => { });
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
      } catch (e) { }
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

    lastDropletIdx: -1,

    // Soft warm marimba droplet sound on keystroke (shuffled/random notes for playful organic feedback)
    playTypeDroplet(charLength = 1) {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        // Pentatonic scale palette (harmonious in any random order: C5, D5, E5, G5, A5, C6, D6, E6)
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
        
        // Pick a note randomly ("durcheinander"), avoiding immediate repeats
        let noteIdx;
        do {
          noteIdx = Math.floor(Math.random() * notes.length);
        } while (noteIdx === this.lastDropletIdx && notes.length > 1);
        this.lastDropletIdx = noteIdx;

        const freq = notes[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        // Organic droplet pitch scoop
        osc.frequency.setValueAtTime(freq * 1.05, now);
        osc.frequency.exponentialRampToValueAtTime(freq, now + 0.02);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.065, now + 0.010);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
      } catch (e) { }
    },

    // Idea 4: Soft playful wooden wobble feedback when tapping incomplete action
    playWobble() {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      if (p) p.catch(() => { });
    }

    function monitorLoop() {
      if (activeVid && !isCrossfading) {
        if (activeVid.currentTime >= 6.8) {
          isCrossfading = true;

          inactiveVid.currentTime = 0;
          inactiveVid.playbackRate = 0.5;
          const p = inactiveVid.play();
          if (p) p.catch(() => { });

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
  function goToStep(step, updateHistory = true) {
    STATE.currentStep = step;

    // Synchronize browser history so device back button returns to previous step
    if (updateHistory && window.history) {
      if (step === 1) {
        window.history.replaceState({ step: 1 }, '');
      } else {
        window.history.pushState({ step }, '');
      }
    }

    // Video background only for step 1, clean white background thereafter
    const isStep1 = (step === 1);
    document.body.classList.toggle('clean-bg', !isStep1);

    if (activeVid) {
      if (isStep1) {
        activeVid.play().catch(() => { });
      } else {
        activeVid.pause();
        if (inactiveVid) inactiveVid.pause();
      }
    }

    // View toggles
    elements.page1.classList.toggle('active', step === 1);
    elements.page2.classList.toggle('active', step === 2);
    elements.page3.classList.toggle('active', step === 3);

    // Stop ambient starfall if leaving step 3
    if (step !== 3) {
      magicEffects.stopAmbientStarfall();
    }

    // Refresh heading title-word spans for active page before animation re-trigger
    if (step === 2) {
      updateGuessHeading();
    } else if (step === 3) {
      updateRevealHeading();
    }

    // Re-trigger staggered animations on active page
    const activePage = document.getElementById(`page${step}`);
    if (activePage) {
      const staggerItems = activePage.querySelectorAll('.stagger-item, .title-word');
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

    if (step === 1) {
      if (elements.userNameInput) {
        const hasVal = elements.userNameInput.value.trim().length > 0;
        elements.btnToStep2.classList.toggle('is-disabled', !hasVal);
        elements.btnToStep2.setAttribute('aria-disabled', !hasVal ? 'true' : 'false');
        if (!hasVal) {
          placeholderAnimator.resume();
        }
      }
      if (!STATE.isLanguageLocked) {
        startBilingualAutoCycle();
      }
    } else {
      clearInterval(autoCycleInterval);
    }

    if (step === 2) {
      clearInterval(STATE.countdownInterval);
      STATE.countdownRunning = false;
      const hasGuess = Boolean(STATE.userGuess);
      elements.btnToStep3.classList.toggle('is-disabled', !hasGuess);
      elements.btnToStep3.setAttribute('aria-disabled', !hasGuess ? 'true' : 'false');
      updateGuessHeading();
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

  // Item 6: Subtle diagonal shimmer sweep on "Weiter →" button when transitioning to ready
  function triggerButtonShimmer(btn) {
    if (!btn) return;
    btn.classList.remove('shimmer-ready');
    void btn.offsetWidth; // Force reflow to retrigger animation
    btn.classList.add('shimmer-ready');
    setTimeout(() => {
      btn.classList.remove('shimmer-ready');
    }, 1350);
  }

  // Idea 4: Playful iOS-style wobble animation for empty input or cards
  function triggerPlayfulWobble(targetEl) {
    if (!targetEl) return;
    targetEl.classList.remove('playful-wobble');
    void targetEl.offsetWidth; // Force reflow
    targetEl.classList.add('playful-wobble');
    if (navigator.vibrate) {
      try { navigator.vibrate([15, 30, 15]); } catch (e) { }
    }
    setTimeout(() => {
      targetEl.classList.remove('playful-wobble');
    }, 500);
  }

  // ==================== PAGE 1 LOGIC ====================
  function initPage1() {
    placeholderAnimator.start();

    // Ensure initial disabled state is active
    if (elements.btnToStep2) {
      elements.btnToStep2.classList.add('is-disabled');
      elements.btnToStep2.setAttribute('aria-disabled', 'true');
    }

    // Explicit language clicks (Item 4: Sparkle pop in flag colors)
    elements.langBtnDe.addEventListener('click', () => {
      const rect = elements.langBtnDe.getBoundingClientRect();
      magicEffects.emitLanguageSparkle('de', rect.left + rect.width / 2, rect.top + rect.height / 2);
      lockLanguage('de');
    });

    elements.langBtnEn.addEventListener('click', () => {
      const rect = elements.langBtnEn.getBoundingClientRect();
      magicEffects.emitLanguageSparkle('en', rect.left + rect.width / 2, rect.top + rect.height / 2);
      lockLanguage('en');
    });

    // Lock language on user input interaction
    elements.userNameInput.addEventListener('focus', () => {
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
    });

    elements.userNameInput.addEventListener('input', (e) => {
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
      const wasDisabled = elements.btnToStep2.classList.contains('is-disabled');
      const val = elements.userNameInput.value.trim();
      const nowDisabled = (val.length === 0);

      elements.btnToStep2.classList.toggle('is-disabled', nowDisabled);
      elements.btnToStep2.setAttribute('aria-disabled', nowDisabled ? 'true' : 'false');

      if (wasDisabled && !nowDisabled) {
        triggerButtonShimmer(elements.btnToStep2);
      }
      if (val.length > 0) {
        placeholderAnimator.clear();
        // Idea 6: Melodisches Marimba-Droplet Feedback beim Tippen
        if (e && e.inputType !== 'deleteContentBackward' && e.inputType !== 'deleteContentForward') {
          audio.playTypeDroplet(val.length);
        }
      }

      // Feature 3: Funkelnde Buchstaben bei der Namenseingabe (präzise Caret-Position)
      const input = elements.userNameInput;
      const rect = input.getBoundingClientRect();
      const style = window.getComputedStyle(input);
      const paddingLeft = parseFloat(style.paddingLeft) || 44;

      let textWidth = 0;
      if (input.value.length > 0) {
        if (!input._measureCtx) {
          input._measureCtx = document.createElement('canvas').getContext('2d');
        }
        input._measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        textWidth = input._measureCtx.measureText(input.value).width;
      }

      const caretX = Math.min(rect.left + paddingLeft + textWidth, rect.right - 18);
      const caretY = rect.top + rect.height * 0.50;
      magicEffects.emitTypingSparkle(caretX, caretY);
    });

    elements.userNameInput.addEventListener('blur', () => {
      if (elements.userNameInput.value.trim().length === 0) {
        placeholderAnimator.resume();
      }
    });

    elements.btnToStep2.addEventListener('click', () => {
      const name = elements.userNameInput.value.trim();
      if (!name || elements.btnToStep2.classList.contains('is-disabled')) {
        // Idea 4: Spielerischer Wobble-Hinweis bei leerem Feld
        const inputWrap = elements.userNameInput.closest('.input-wrapper');
        triggerPlayfulWobble(inputWrap || elements.userNameInput);
        audio.playWobble();
        showToast(t('toastNameReq'));
        elements.userNameInput.focus();
        return;
      }
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
      STATE.guestName = name;
      updateGuessHeading();
      if (elements.displayGuestName) {
        elements.displayGuestName.textContent = name;
      }
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
    if (elements.btnBackToStep1) {
      elements.btnBackToStep1.addEventListener('click', () => {
        audio.playClick();
        goToStep(1);
      });
    }

    elements.btnPickBoy.addEventListener('click', () => {
      selectGuess('boy');
    });

    elements.btnPickGirl.addEventListener('click', () => {
      selectGuess('girl');
    });

    elements.btnToStep3.addEventListener('click', () => {
      if (!STATE.userGuess || elements.btnToStep3.classList.contains('is-disabled')) {
        // Idea 4: Spielerischer Wobble-Hinweis auf die beiden Geschlechterkarten
        const grid = document.querySelector('.dual-choice-grid');
        triggerPlayfulWobble(grid);
        audio.playWobble();
        showToast(t('toastGuessReq'));
        return;
      }
      audio.playSelect();

      STATE.votes[STATE.userGuess]++;
      try {
        localStorage.setItem('baby_votes_data', JSON.stringify(STATE.votes));
      } catch (e) { }

      goToStep(3);
    });
  }

  function selectGuess(choice) {
    STATE.userGuess = choice;
    audio.playSelect();

    // Item 3: Re-trigger bouncy springy pop checkmark indicator cleanly
    elements.btnPickBoy.classList.remove('selected');
    elements.btnPickGirl.classList.remove('selected');
    const targetBtn = (choice === 'boy') ? elements.btnPickBoy : elements.btnPickGirl;
    if (targetBtn) {
      void targetBtn.offsetWidth; // Force reflow so checkIndicatorPop fires every time
    }

    elements.btnPickBoy.classList.toggle('selected', choice === 'boy');
    elements.btnPickGirl.classList.toggle('selected', choice === 'girl');

    // Item 6: Shimmer sweep when Weiter button becomes ready
    const wasDisabled = elements.btnToStep3.classList.contains('is-disabled');
    elements.btnToStep3.classList.remove('is-disabled');
    elements.btnToStep3.setAttribute('aria-disabled', 'false');
    if (wasDisabled) {
      triggerButtonShimmer(elements.btnToStep3);
    }

    // Feature 2: Kreise & Ringe Burst beim Auswählen von Junge / Mädchen (nicht beim Weiter-Button)
    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.45;
      magicEffects.burstCard(choice, cx, cy);
    }

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
    magicEffects.stopAmbientStarfall();

    if (STATE.userGuess === 'boy') {
      elements.userSummaryBadge.textContent = t('boyLabel');
      elements.userSummaryBadge.style.color = 'var(--pastel-blue-ink)';
    } else {
      elements.userSummaryBadge.textContent = t('girlLabel');
      elements.userSummaryBadge.style.color = 'var(--pastel-pink-ink)';
    }

    STATE.isCardUnlocked = false;
    STATE.isScratchedRevealed = false;
    if (elements.revealedUnderlay) {
      elements.revealedUnderlay.classList.remove('gender-girl', 'gender-boy', 'scratch-revealed');
      elements.revealedUnderlay.classList.add('mystery-preview');
      elements.revealedUnderlay.style.filter = '';
    }
    if (elements.revealedIcon) {
      elements.revealedIcon.innerHTML = GENDER_ICONS.mystery;
    }
    if (elements.revealedGenderTitle) {
      elements.revealedGenderTitle.textContent = '???';
    }
    if (elements.revealedQuote) {
      elements.revealedQuote.textContent = t('teaserQuote');
    }
    if (elements.revealSubheading) {
      elements.revealSubheading.classList.remove('hidden-after-countdown');
      elements.revealSubheading.textContent = t('revealSubtitle');
    }
    elements.countdownLockOverlay.classList.remove('unlocked');
    elements.scratchCanvasTop.classList.remove('revealed-out', 'unlocked');
    elements.scratchCanvasMid.classList.remove('revealed-out', 'unlocked');
    if (elements.postRevealSection) elements.postRevealSection.classList.remove('visible');

    drawScratchCardFoil();
    requestAnimationFrame(() => {
      drawScratchCardFoil();
      scratchSparkles.resize();
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

    if (elements.revealedIcon) {
      elements.revealedIcon.innerHTML = isGirl ? GENDER_ICONS.girl : GENDER_ICONS.boy;
    }

    if (isGirl) {
      elements.revealedGenderTitle.textContent = t('girlTitle');
      elements.revealedQuote.textContent = t('girlQuote');
    } else {
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
        startCountdown(10, true);
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
      magicEffects.stopAmbientStarfall();
      fireCelebrationConfetti();
    });

    elements.btnShareResult.addEventListener('click', () => {
      audio.playClick();
      openStoryModal();
    });

    elements.btnRestartGuess.addEventListener('click', () => {
      audio.playClick();
      magicEffects.stopAmbientStarfall();
      goToStep(1);
    });

    setupMultiLayerScratchEvents();
  }

  function startCountdown(seconds, playSound = false) {
    if (STATE.countdownRunning) return;
    STATE.countdownRunning = true;
    STATE.countdownTimeLeft = seconds;
    if (elements.btnStartSuspenseCountdown) elements.btnStartSuspenseCountdown.disabled = true;

    if (playSound) {
      audio.playClick();
    }
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
    if (elements.revealSubheading) {
      elements.revealSubheading.classList.add('hidden-after-countdown');
    }
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
    scratchSparkles.resize();

    // ========================================================
    // --- LAYER 1: MIDDLE TRANSLUCENT SAFETY FOIL (Under-layer) ---
    // ========================================================
    const ctxMid = midCanvas.getContext('2d');
    ctxMid.globalCompositeOperation = 'source-over';

    const pearlGrad = ctxMid.createLinearGradient(0, 0, w, h);
    pearlGrad.addColorStop(0, '#e2e8f0');
    pearlGrad.addColorStop(0.35, '#f8fafc');
    pearlGrad.addColorStop(0.7, '#cbd5e1');
    pearlGrad.addColorStop(1, '#94a3b8');
    ctxMid.fillStyle = pearlGrad;
    ctxMid.fillRect(0, 0, w, h);

    // Fine security guilloche lattice on middle foil
    ctxMid.strokeStyle = 'rgba(100, 116, 139, 0.20)';
    ctxMid.lineWidth = 1;
    for (let x = -h; x < w + h; x += 32) {
      ctxMid.beginPath();
      ctxMid.moveTo(x, 0);
      ctxMid.lineTo(x + h, h);
      ctxMid.stroke();

      ctxMid.beginPath();
      ctxMid.moveTo(x, h);
      ctxMid.lineTo(x + h, 0);
      ctxMid.stroke();
    }

    // Safety stamp in center
    ctxMid.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctxMid.fillStyle = '#64748b';
    ctxMid.textAlign = 'center';
    ctxMid.textBaseline = 'middle';
    ctxMid.fillText(t('foilMidText'), w / 2, h / 2);

    // ========================================================
    // --- LAYER 2: TOP METALLIC SILVER SCRATCH LATEX (Outer Layer) ---
    // ========================================================
    const ctxTop = topCanvas.getContext('2d');
    ctxTop.globalCompositeOperation = 'source-over';

    // 1. Multi-stop brushed metallic silver gradient
    const silverGrad = ctxTop.createLinearGradient(0, 0, w, h);
    silverGrad.addColorStop(0.00, '#989ea8');
    silverGrad.addColorStop(0.18, '#c8ced6');
    silverGrad.addColorStop(0.34, '#f2f5f9'); // high specular chrome sheen
    silverGrad.addColorStop(0.48, '#b3b9c4');
    silverGrad.addColorStop(0.66, '#eef2f7'); // secondary metallic highlight
    silverGrad.addColorStop(0.82, '#a8afbb');
    silverGrad.addColorStop(1.00, '#888e99');
    ctxTop.fillStyle = silverGrad;
    ctxTop.fillRect(0, 0, w, h);

    // 2. Brushed metallic micro-texture (authentic scratched latex grain)
    ctxTop.save();
    ctxTop.lineWidth = 1;
    for (let i = -h; i < w + h; i += 7) {
      ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctxTop.beginPath();
      ctxTop.moveTo(i, 0);
      ctxTop.lineTo(i + 35, h);
      ctxTop.stroke();

      ctxTop.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctxTop.beginPath();
      ctxTop.moveTo(i + 3.5, 0);
      ctxTop.lineTo(i + 38.5, h);
      ctxTop.stroke();
    }
    ctxTop.restore();

    // 3. Security micro-stipple pattern (anti-counterfeit grid dots)
    ctxTop.save();
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.26)';
    const stepGrid = 22;
    for (let gx = 16; gx < w - 16; gx += stepGrid) {
      for (let gy = 16; gy < h - 16; gy += stepGrid) {
        ctxTop.fillRect(gx, gy, 1.5, 1.5);
      }
    }
    ctxTop.restore();

    // 4. Physical scratch card borders & security frame
    ctxTop.save();
    ctxTop.strokeStyle = 'rgba(70, 78, 92, 0.35)';
    ctxTop.lineWidth = 1.5;
    ctxTop.strokeRect(10, 10, w - 20, h - 20);

    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctxTop.lineWidth = 1;
    ctxTop.strokeRect(11, 11, w - 22, h - 22);

    // Inner dashed security border
    ctxTop.strokeStyle = 'rgba(60, 68, 80, 0.28)';
    ctxTop.lineWidth = 1;
    ctxTop.setLineDash([4, 4]);
    ctxTop.strokeRect(16, 16, w - 32, h - 32);
    ctxTop.setLineDash([]);
    ctxTop.restore();

    const cx = w / 2;
    const cy = Math.max(46, Math.round(h * 0.30));
    const r = 24;

    // 5. Authentic Embossed Silver Coin Seal
    ctxTop.save();
    ctxTop.strokeStyle = 'rgba(50, 58, 70, 0.26)';
    ctxTop.lineWidth = 1.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
      const x1 = cx + Math.cos(a) * (r - 2.5);
      const y1 = cy + Math.sin(a) * (r - 2.5);
      const x2 = cx + Math.cos(a) * (r + 1.5);
      const y2 = cy + Math.sin(a) * (r + 1.5);
      ctxTop.beginPath();
      ctxTop.moveTo(x1, y1);
      ctxTop.lineTo(x2, y2);
      ctxTop.stroke();
    }
    ctxTop.restore();

    // Coin disc fill
    const coinGrad = ctxTop.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, r);
    coinGrad.addColorStop(0, '#ffffff');
    coinGrad.addColorStop(0.35, '#e4e7ee');
    coinGrad.addColorStop(0.70, '#c1c7d2');
    coinGrad.addColorStop(1.00, '#989fae');
    ctxTop.fillStyle = coinGrad;
    ctxTop.beginPath();
    ctxTop.arc(cx, cy, r, 0, Math.PI * 2);
    ctxTop.fill();

    // Beveled rim
    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctxTop.lineWidth = 1.5;
    ctxTop.stroke();

    ctxTop.beginPath();
    ctxTop.arc(cx, cy, r - 4, 0, Math.PI * 2);
    ctxTop.strokeStyle = 'rgba(60, 68, 80, 0.3)';
    ctxTop.lineWidth = 1;
    ctxTop.stroke();

    // Embossed star in coin
    ctxTop.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctxTop.textAlign = 'center';
    ctxTop.textBaseline = 'middle';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctxTop.fillText('★', cx, cy + 1.5);
    ctxTop.fillStyle = '#2c3340';
    ctxTop.fillText('★', cx, cy + 0.5);

    // 6. Embossed Stamped Typography
    const textY1 = cy + 38;
    ctxTop.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
    // 3D Highlight offset
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.fillText(t('foilSecret'), cx, textY1 + 1);
    ctxTop.fillStyle = '#1e2430';
    ctxTop.fillText(t('foilSecret'), cx, textY1);

    // Subtitle
    const textY2 = textY1 + 18;
    ctxTop.font = '500 11px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.fillText(t('foilSecretSub'), cx, textY2 + 1);
    ctxTop.fillStyle = '#424a57';
    ctxTop.fillText(t('foilSecretSub'), cx, textY2);

    // 7. Stamped Pill Banner: "HIER FREIRUBBELN"
    const bannerW = Math.min(190, w - 60);
    const bannerH = 26;
    const bannerX = cx - bannerW / 2;
    const bannerY = Math.min(h - 36, textY2 + 14);
    const bannerR = 13;

    // Pill background
    ctxTop.beginPath();
    if (ctxTop.roundRect) {
      ctxTop.roundRect(bannerX, bannerY, bannerW, bannerH, bannerR);
    } else {
      ctxTop.rect(bannerX, bannerY, bannerW, bannerH);
    }
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.38)';
    ctxTop.fill();
    ctxTop.strokeStyle = 'rgba(50, 58, 70, 0.28)';
    ctxTop.lineWidth = 1;
    ctxTop.stroke();

    // Inner highlight
    ctxTop.beginPath();
    if (ctxTop.roundRect) {
      ctxTop.roundRect(bannerX + 1, bannerY + 1, bannerW - 2, bannerH - 2, bannerR);
    } else {
      ctxTop.rect(bannerX + 1, bannerY + 1, bannerW - 2, bannerH - 2);
    }
    ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctxTop.lineWidth = 1;
    ctxTop.stroke();

    // Banner Text
    ctxTop.font = '700 10.5px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.fillText(t('foilRubbel'), cx, bannerY + bannerH / 2 + 1);
    ctxTop.fillStyle = '#1e2430';
    ctxTop.fillText(t('foilRubbel'), cx, bannerY + bannerH / 2);
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

      // Feature 1: Magical Gold & Pastel Scratch Sparkles
      scratchSparkles.emit(coords.x, coords.y, 5);

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
    if (!midCanvas) return;
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

      // Once >= 50% of the foil is scratched away, trigger the spectacular gender reveal!
      if (percent >= 50) {
        triggerGenderReveal();
      }
    } catch (e) {
      console.warn('Scratch calculation error:', e);
    }
  }

  function triggerGenderReveal() {
    if (STATE.isScratchedRevealed) return;
    STATE.isScratchedRevealed = true;

    // Transition from neutral mystery card into celebratory gender theme!
    if (elements.revealedUnderlay) {
      elements.revealedUnderlay.classList.remove('mystery-preview');
      elements.revealedUnderlay.classList.add('scratch-revealed');
      elements.revealedUnderlay.style.filter = '';
    }

    // Now apply actual gender (heart/compass icon, MÄDCHEN/JUNGE text, parent quote & color)
    applyActualGenderTheme();

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

  // ==================== MAGIC PARTICLES ENGINE ====================
  const magicEffects = {
    // Foreground canvas (z-index: 100) for bursts & typing sparkles
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    burstParticles: [],
    burstAnimId: null,

    // Background canvas (z-index: 5) for ambient starfall behind elements
    bgCanvas: null,
    bgCtx: null,
    ambientParticles: [],
    isAmbientActive: false,
    ambientAnimId: null,

    init() {
      this.canvas = elements.confettiCanvas || document.getElementById('confettiCanvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }
      this.bgCanvas = elements.bgStarsCanvas || document.getElementById('bgStarsCanvas');
      if (this.bgCanvas) {
        this.bgCtx = this.bgCanvas.getContext('2d');
      }
      this.resize();
      window.addEventListener('resize', () => this.resize());
    },

    resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.width = w;
      this.height = h;
      if (this.canvas) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
      if (this.bgCanvas) {
        this.bgCanvas.width = w;
        this.bgCanvas.height = h;
      }
    },

    // Feature 2: Card selection bubble & circle burst (Kreise & Bubbles statt Sterne)
    burstCard(choice, x, y) {
      if (!this.canvas || !this.ctx) this.init();
      if (!this.canvas) return;

      const isGirl = (choice === 'girl');
      const colors = isGirl
        ? ['#ffd700', '#ffe885', '#ffffff', '#e88ea4', '#f7b2c4', '#ffccd5']
        : ['#ffd700', '#ffe885', '#ffffff', '#6ca1d7', '#96c2ec', '#c5e1f9'];

      const count = 42;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * (i / count)) + (Math.random() - 0.5) * 0.45;
        const speed = 2.4 + Math.random() * 7.4;
        this.burstParticles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.6,
          gravity: 0.16,
          drag: 0.962,
          size: 2.4 + Math.random() * 4.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: 0.018 + Math.random() * 0.022,
          isRing: (Math.random() < 0.30) // Mix of glowing filled dots and delicate rings
        });
      }

      if (navigator.vibrate) {
        try { navigator.vibrate(15); } catch (e) { }
      }

      this.ensureBurstLoop();
    },

    // Feature 3: Sparkles while typing name
    emitTypingSparkle(x, y) {
      if (!this.canvas || !this.ctx) this.init();
      if (!this.canvas) return;

      const colors = ['#ffd700', '#ffe885', '#ffffff', '#f4a6b8', '#8ec3eb', '#d8b4e2'];
      const count = 4;
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const speed = 1.4 + Math.random() * 3.0;
        this.burstParticles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.07,
          drag: 0.965,
          size: 1.8 + Math.random() * 2.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: 0.035 + Math.random() * 0.025,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.3,
          isStar: (Math.random() > 0.35)
        });
      }

      this.ensureBurstLoop();
    },

    // Item 4: Sparkle pop in language flag colors (DE: Schwarz, Rot, Gold | EN: Rot, Weiß, Blau)
    emitLanguageSparkle(lang, x, y) {
      if (typeof lang === 'number') {
        // Fallback if called as (x, y)
        y = x;
        x = lang;
        lang = STATE.lang || 'de';
      }
      if (!this.canvas || !this.ctx) this.init();
      if (!this.canvas) return;

      // DE: Schwarz, Rot, Gold | EN: Rot, Weiß, Blau
      const colors = (lang === 'de')
        ? ['#1f242d', '#dc2626', '#ffd700', '#2d3748', '#ef4444', '#ffc107']
        : ['#dc2626', '#ffffff', '#2563eb', '#ef4444', '#f1f5f9', '#3b82f6'];

      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * (i / count)) + (Math.random() - 0.5) * 0.45;
        const speed = 1.8 + Math.random() * 3.6;
        this.burstParticles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          gravity: 0.12,
          drag: 0.952,
          size: 2.0 + Math.random() * 2.4,
          color: colors[i % colors.length], // Balanced distribution across flag colors
          alpha: 1.0,
          decay: 0.030 + Math.random() * 0.016,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.35,
          isStar: (Math.random() > 0.35)
        });
      }

      this.ensureBurstLoop();
    },

    ensureBurstLoop() {
      if (!this.burstAnimId) {
        this.burstLoop = this.burstLoop.bind(this);
        this.burstAnimId = requestAnimationFrame(this.burstLoop);
      }
    },

    burstLoop() {
      if (!this.ctx || this.burstParticles.length === 0) {
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.width, this.height);
        }
        this.burstAnimId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.burstParticles.length - 1; i >= 0; i--) {
        const p = this.burstParticles[i];
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > this.height + 40) {
          this.burstParticles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isStar) {
          p.rotation += (p.vRot || 0.1);
          this.ctx.fillStyle = p.color;
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.drawStar(this.ctx, 0, 0, 4, p.size * 1.9, p.size * 0.44);
        } else if (p.isRing) {
          this.ctx.strokeStyle = p.color;
          this.ctx.lineWidth = 1.6;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 1.25, 0, Math.PI * 2);
          this.ctx.stroke();
        } else {
          this.ctx.fillStyle = p.color;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }

      this.burstAnimId = requestAnimationFrame(this.burstLoop);
    },

    // Feature 6: Ambient gentle starfall BEHIND elements (z-index: 5)
    startAmbientStarfall() {
      this.isAmbientActive = true;
      if (!this.bgCanvas || !this.bgCtx) this.init();
      if (!this.bgCanvas) return;

      const isGirl = (STATE.actualGender === 'girl');
      const colors = isGirl
        ? ['#ffd700', '#fff3b0', '#ffffff', '#e88ea4', '#fce4ec']
        : ['#ffd700', '#fff3b0', '#ffffff', '#6ca1d7', '#e3f2fd'];

      this.ambientParticles = [];
      for (let i = 0; i < 38; i++) {
        this.ambientParticles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vy: 0.38 + Math.random() * 0.78,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.015 + Math.random() * 0.02,
          size: 1.8 + Math.random() * 2.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: 0.38 + Math.random() * 0.50,
          alpha: 0.5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.025,
          isFlake: (Math.random() < 0.35) // Mix of 4-point stars and soft gold flakes
        });
      }

      this.ensureAmbientLoop();
    },

    stopAmbientStarfall() {
      this.isAmbientActive = false;
      this.ambientParticles = [];
      if (this.bgCtx && this.bgCanvas) {
        this.bgCtx.clearRect(0, 0, this.width, this.height);
      }
      if (this.ambientAnimId) {
        cancelAnimationFrame(this.ambientAnimId);
        this.ambientAnimId = null;
      }
    },

    ensureAmbientLoop() {
      if (!this.ambientAnimId) {
        this.ambientLoop = this.ambientLoop.bind(this);
        this.ambientAnimId = requestAnimationFrame(this.ambientLoop);
      }
    },

    ambientLoop() {
      if (!this.bgCtx || !this.isAmbientActive) {
        if (this.bgCtx && this.bgCanvas) {
          this.bgCtx.clearRect(0, 0, this.width, this.height);
        }
        this.ambientAnimId = null;
        return;
      }

      this.bgCtx.clearRect(0, 0, this.width, this.height);

      const isGirl = (STATE.actualGender === 'girl');
      const colors = isGirl
        ? ['#ffd700', '#fff3b0', '#ffffff', '#e88ea4', '#fce4ec']
        : ['#ffd700', '#fff3b0', '#ffffff', '#6ca1d7', '#e3f2fd'];

      this.ambientParticles.forEach(p => {
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.65;
        p.rotation += p.vRot;
        p.alpha = p.baseAlpha * (0.65 + Math.sin(p.wobble * 2) * 0.35);

        if (p.y > this.height + 25) {
          p.y = -20;
          p.x = Math.random() * this.width;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }

        this.bgCtx.save();
        this.bgCtx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        this.bgCtx.fillStyle = p.color;
        this.bgCtx.translate(p.x, p.y);
        this.bgCtx.rotate(p.rotation);

        if (p.isFlake) {
          this.bgCtx.beginPath();
          this.bgCtx.arc(0, 0, p.size * 0.85, 0, Math.PI * 2);
          this.bgCtx.fill();
        } else {
          this.drawStar(this.bgCtx, 0, 0, 4, p.size * 1.6, p.size * 0.40);
        }
        this.bgCtx.restore();
      });

      this.ambientAnimId = requestAnimationFrame(this.ambientLoop);
    },

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    }
  };

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

      if (alive && elapsed < 5200) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrame);
        // Feature 6: Transition into continuous ambient starfall on Step 3
        if (STATE.currentStep === 3 && STATE.isScratchedRevealed) {
          magicEffects.startAmbientStarfall();
        }
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
        if (elements.displayGuestName) {
          elements.displayGuestName.textContent = STATE.guestName;
        }
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

  // ==================== FEATURE 1: SCRATCH SPARKLES (GOLD DUST ENGINE) ====================
  const scratchSparkles = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,

    init() {
      this.canvas = elements.scratchSparklesCanvas || document.getElementById('scratchSparklesCanvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
      }
    },

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width || 400;
      this.canvas.height = rect.height || 225;
    },

    emit(x, y, count = 5) {
      if (!this.canvas || !this.ctx) this.init();
      if (!this.canvas) return;

      const isGirl = (STATE.actualGender === 'girl');
      const colors = isGirl
        ? ['#ffd700', '#fff3b0', '#ffffff', '#f4a6b8', '#ffccd5']
        : ['#ffd700', '#fff3b0', '#ffffff', '#8ec3eb', '#cce6ff'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 4.2;
        this.particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.7,
          gravity: 0.12,
          size: 1.8 + Math.random() * 2.8,
          alpha: 1.0,
          decay: 0.024 + Math.random() * 0.028,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.25,
          isStar: (Math.random() > 0.45)
        });
      }

      if (!this.animId) {
        this.loop();
      }
    },

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    },

    loop() {
      if (!this.ctx || this.particles.length === 0) {
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.animId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.96;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > this.canvas.height + 25) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);

        if (p.isStar) {
          this.drawStar(this.ctx, 0, 0, 4, p.size * 1.6, p.size * 0.48);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      this.animId = requestAnimationFrame(() => this.loop());
    }
  };

  // ==================== FEATURE 5: STORY CARD GENERATOR & MODAL ====================
  const storyCardGenerator = {
    render() {
      const canvas = elements.storyCardCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width = 1080;
      const h = canvas.height = 1350;

      const isGirl = (STATE.actualGender === 'girl');
      const guest = STATE.guestName || (STATE.lang === 'en' ? 'Guest' : 'Gast');
      const matched = (STATE.userGuess === STATE.actualGender);

      // Background radial lighting
      const bgGrad = ctx.createRadialGradient(w / 2, h * 0.36, 100, w / 2, h / 2, 850);
      if (isGirl) {
        bgGrad.addColorStop(0, '#fff5f7');
        bgGrad.addColorStop(0.55, '#fef0f3');
        bgGrad.addColorStop(1, '#fde6ec');
      } else {
        bgGrad.addColorStop(0, '#f2f8fd');
        bgGrad.addColorStop(0.55, '#e9f3fb');
        bgGrad.addColorStop(1, '#dcecf8');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Background confetti stardust
      const sparkColors = isGirl
        ? ['#f7d2db', '#ffd700', '#ffffff', '#e598a8', '#fce4ec']
        : ['#c7def3', '#ffd700', '#ffffff', '#7ba7d7', '#e1f5fe'];

      for (let i = 0; i < 48; i++) {
        const sx = (Math.sin(i * 123.45) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 67.89) * 0.5 + 0.5) * h;
        const r = 2.5 + (i % 5) * 1.5;
        ctx.fillStyle = sparkColors[i % sparkColors.length];
        ctx.globalAlpha = 0.45 + (i % 3) * 0.2;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Polaroid Card Frame
      const padX = 64;
      const padY = 64;
      const cardW = w - padX * 2;
      const cardH = h - padY * 2;
      const cardR = 36;

      ctx.save();
      ctx.shadowColor = 'rgba(24, 32, 47, 0.16)';
      ctx.shadowBlur = 48;
      ctx.shadowOffsetY = 24;

      // Warm luxury card surface gradient (eliminates harsh empty white look)
      const cardGrad = ctx.createRadialGradient(w / 2, h * 0.42, 60, w / 2, h * 0.45, 650);
      cardGrad.addColorStop(0, '#ffffff');
      cardGrad.addColorStop(0.65, isGirl ? '#fffcfd' : '#fafdff');
      cardGrad.addColorStop(1, isGirl ? '#fff2f5' : '#eef6fc');
      ctx.fillStyle = cardGrad;
      roundRect(ctx, padX, padY, cardW, cardH, cardR);
      ctx.fill();
      ctx.restore();

      // Hairline borders
      ctx.strokeStyle = isGirl ? 'rgba(232, 142, 164, 0.45)' : 'rgba(108, 161, 215, 0.45)';
      ctx.lineWidth = 3;
      roundRect(ctx, padX + 16, padY + 16, cardW - 32, cardH - 32, cardR - 8);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.38)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, padX + 24, padY + 24, cardW - 48, cardH - 48, cardR - 12);
      ctx.stroke();

      // Corner golden sparkles
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.fillText('✦', padX + 48, padY + 52);
      ctx.fillText('✦', w - padX - 48, padY + 52);
      ctx.fillText('✦', padX + 48, h - padY - 44);
      ctx.fillText('✦', w - padX - 48, h - padY - 44);

      // 1. Eyebrow
      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isGirl ? '#b8546c' : '#3a6fa0';
      ctx.fillText((STATE.lang === 'en' ? '✦ OFFICIAL GENDER REVEAL ✦' : '✦ OFFIZIELLE ENTHÜLLUNG ✦'), w / 2, 260);

      // 2. Subtitle
      ctx.font = 'italic 500 58px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#18202f';
      ctx.fillText((STATE.lang === 'en' ? 'It’s a...' : 'Es wird ein...'), w / 2, 360);

      // 3. Large Prominent Gender Title (MÄDCHEN / JUNGE)
      ctx.font = '700 135px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isGirl ? '#b8546c' : '#2b6599';
      ctx.fillText(isGirl ? (STATE.lang === 'en' ? 'GIRL' : 'MÄDCHEN') : (STATE.lang === 'en' ? 'BOY' : 'JUNGE'), w / 2, 545);

      // 4. Emotional Quote
      ctx.font = 'italic 400 34px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#475569';
      const quote = isGirl ? t('girlQuote') : t('boyQuote');
      ctx.fillText(quote, w / 2, 705);

      // Decorative Accent Divider with Golden Diamond
      ctx.strokeStyle = isGirl ? 'rgba(232, 142, 164, 0.45)' : 'rgba(108, 161, 215, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 120, 795);
      ctx.lineTo(w / 2 - 22, 795);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w / 2 + 22, 795);
      ctx.lineTo(w / 2 + 120, 795);
      ctx.stroke();

      ctx.font = '16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.fillText('✦', w / 2, 795);

      // 5. Guest Ribbon Box (Compact & Balanced)
      const ribbonY = 975;
      const boxH = 170;
      ctx.fillStyle = isGirl ? '#fdf2f4' : '#f0f6fc';
      roundRect(ctx, padX + 50, ribbonY - boxH / 2, cardW - 100, boxH, 24);
      ctx.fill();
      ctx.strokeStyle = isGirl ? '#f4c5d0' : '#c3daf0';
      ctx.lineWidth = 2;
      roundRect(ctx, padX + 50, ribbonY - boxH / 2, cardW - 100, boxH, 24);
      ctx.stroke();

      ctx.font = '700 38px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#18202f';
      const ribbonTitle = matched
        ? (STATE.lang === 'en' ? `🏆 ${guest} guessed right!` : `🏆 ${guest} hat richtig getippt!`)
        : (STATE.lang === 'en' ? `💕 ${guest} cheered along!` : `💕 ${guest} hat mitgefiebert!`);
      ctx.fillText(ribbonTitle, w / 2, ribbonY - 22);

      ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      const ribbonSub = matched
        ? (STATE.lang === 'en' ? 'Intuition was 100% correct' : 'Die Intuition hat voll ins Schwarze getroffen')
        : (STATE.lang === 'en' ? 'Filled with love and excitement' : 'Voller Liebe und Vorfreude für die Familie');
      ctx.fillText(ribbonSub, w / 2, ribbonY + 30);

      function roundRect(c, rx, ry, rw, rh, r) {
        c.beginPath();
        c.moveTo(rx + r, ry);
        c.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
        c.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
        c.arcTo(rx, ry + rh, rx, ry, r);
        c.arcTo(rx, ry, rx + rw, ry, r);
        c.closePath();
      }
    }
  };

  function openStoryModal() {
    if (!elements.storyModal) return;
    storyCardGenerator.render();
    elements.storyModal.classList.add('open');
    refreshIcons();
  }

  function closeStoryModal() {
    if (!elements.storyModal) return;
    elements.storyModal.classList.remove('open');
  }

  function initStoryModalHandlers() {
    if (elements.closeStoryModalBtn) {
      elements.closeStoryModalBtn.addEventListener('click', () => {
        audio.playClick();
        closeStoryModal();
      });
    }

    if (elements.storyModal) {
      elements.storyModal.addEventListener('click', e => {
        if (e.target === elements.storyModal) {
          closeStoryModal();
        }
      });
    }

    if (elements.btnDownloadStoryImage) {
      elements.btnDownloadStoryImage.addEventListener('click', () => {
        audio.playClick();
        const canvas = elements.storyCardCanvas;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `babyparty-reveal-${STATE.actualGender}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }

    if (elements.btnShareStoryNative) {
      elements.btnShareStoryNative.addEventListener('click', async () => {
        audio.playClick();
        const canvas = elements.storyCardCanvas;
        if (!canvas) return;

        try {
          canvas.toBlob(async blob => {
            if (!blob) return;
            const file = new File([blob], `babyparty-reveal-${STATE.actualGender}.png`, { type: 'image/png' });
            const shareText = t('shareText', STATE.actualGender);

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  title: 'Baby Shower Gender Reveal',
                  text: shareText,
                  files: [file]
                });
                return;
              } catch (err) { }
            }

            if (navigator.share) {
              try {
                await navigator.share({
                  title: 'Baby Shower Gender Reveal',
                  text: shareText,
                  url: window.location.href
                });
                return;
              } catch (err) { }
            }

            // Fallback: download PNG & copy text
            const link = document.createElement('a');
            link.download = `babyparty-reveal-${STATE.actualGender}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            if (navigator.clipboard) {
              navigator.clipboard.writeText(shareText);
            }
          }, 'image/png');
        } catch (e) {
          console.warn('Share error:', e);
        }
      });
    }
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
    magicEffects.init();
    initVideoBackground();
    initPage1();
    initPage2();
    initPage3();
    initSettingsModal();
    initStoryModalHandlers();
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

    // Device / Browser Native Back Button Support
    window.addEventListener('popstate', e => {
      if (e.state && typeof e.state.step === 'number') {
        goToStep(e.state.step, false);
      } else {
        goToStep(1, false);
      }
    });

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
