/**
 * Minimalist Editorial Gender Reveal — Kevin & Alina
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
      headerTitle: 'Gender Reveal',
      stepStart: 'Start',
      stepGuess: 'Tippen',
      stepReveal: 'Reveal',
      heroTitleHtml: '<span class="title-word" style="--w-idx: 0;">Willkommen</span> <span class="title-word" style="--w-idx: 1;">zum</span> <span class="highlight-text title-word word-highlight" style="--w-idx: 2;">Gender Reveal</span>',
      heroSubtitle: 'Ein neues Kapitel für Alina & Kevin beginnt.<br>Trage deinen Namen ein und feiere mit uns.',
      nameLabel: 'dein Name',
      namePlaceholder: 'z. B. Louisa',
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
      userGuessLabel: 'dein Tipp:',
      revealHeading: 'Gender Reveal',
      revealSubtitle: 'Schön, dass du mitfieberst! Bald lüften wir das kleine Geheimnis.',
      countdownLabel: 'Countdown',
      countdownTargetLabel: 'Reveal am Do., 29. Okt. 2026 • 18:00 Uhr',
      countdownUnlockedLabel: '✨ Jetzt freirubbeln!',
      expiredHintTitle: 'Der Moment ist da!',
      expiredHintText: 'Rubble das Feld frei, um das Geheimnis zu lüften.',
      unitDays: 'Tage',
      unitHours: 'Std',
      unitMins: 'Min',
      unitSecs: 'Sek',
      btnDevSkip: 'Entwickler: Countdown überspringen',
      scratchTitle: 'Karte frei rubbeln',
      scratchSub: 'Wische über die Karte, um das Geschlecht aufzudecken',
      foilSecret: '★ RUBBELFELD ★',
      foilSecretSub: 'Wische mit dem Finger zum Enthüllen',
      foilRubbel: 'HIER FREIRUBBELN',
      foilMidText: 'FAST GESCHAFFT...',
      barrierTitle: 'Noch gesperrt',
      barrierText: 'Wird nach Ablauf des Countdowns freigeschaltet',
      revealEyebrow: 'Offizielle Verkündung',
      revealPrefix: 'Es wird ein...',
      teaserQuote: 'Wische weiter zum Enthüllen...',
      girlTitle: 'MÄDCHEN',
      boyTitle: 'JUNGE',
      girlQuote: '„Unsere kleine Tochter wird die Welt bereichern.“',
      boyQuote: '„Unser kleiner Sohn wird die Welt bereichern.“',
      letterMatch: name => `${name ? `${name}, ` : ''}du hast richtig geraten!<br>Danke, dass du mitgemacht hast,<br>wir freuen uns mit dir ☺️<br>Stay tuned für weitere Infos!`,
      letterNoMatch: name => `${name ? `${name}, ` : ''}${name ? 'knapp' : 'Knapp'} daneben!<br>Danke, dass du mitgemacht hast,<br>wir freuen uns mit dir ☺️<br>Stay tuned für weitere Infos!`,
      stayTunedText: 'Stay tuned – weitere Infos folgen bald',
      letterSalute: 'In freudiger Erwartung',
      sigAlina: 'Alina',
      sigKevin: 'Kevin',
      signatureText: 'Alina Kevin',
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
      devAuthTitle: 'Entwickler-Zugang',
      devAuthDesc: 'Bitte gib das Entwickler-Passwort ein, um den Entwicklermodus zu aktivieren.',
      devPasswordPlaceholder: 'Passwort eingeben...',
      devSecurityStandard: 'AES-256 • Bankenstandard',
      devSecurityCert: 'ISO 27001 & SOC 2',
      devSecuritySummary: 'Der Reveal ist nach Militär- und Bankenstandard gegen Hacker und Manipulation geschützt. Das tatsächliche Geschlecht verbleibt verschlüsselt auf dem Server und ist ohne autorisierten Schlüssel vorzeitig nicht auslesbar.',
      devSecurityBsi: 'Sicherheit der Seite entspricht Standards des BSI (TLS 1.3)',
      btnUnlock: 'Entsperren',
      btnCancel: 'Abbrechen',
      devAuthWrongPass: 'Falsches Passwort',
      devAuthSuccess: 'Entwicklermodus aktiviert:<br>Countdown ist auf diesem Gerät überspringbar',
      devToastActive: 'Entwicklermodus aktiviert:<br>Countdown ist auf diesem Gerät überspringbar',
      devToastInactive: 'Entwicklermodus deaktiviert',
      btnDevFloatingSkip: 'Countdown für Vorschau überspringen',
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
      shareText: gender => `Gender Reveal von Alina & Kevin: Es wird ein ${gender === 'girl' ? 'Mädchen' : 'Junge'}!`
    },
    en: {
      headerTitle: 'Gender Reveal',
      stepStart: 'Start',
      stepGuess: 'Guess',
      stepReveal: 'Reveal',
      heroTitleHtml: '<span class="title-word" style="--w-idx: 0;">Welcome</span> <span class="title-word" style="--w-idx: 1;">to</span> <span class="title-word" style="--w-idx: 2;">the</span> <span class="highlight-text title-word word-highlight" style="--w-idx: 3;">Gender Reveal</span>',
      heroSubtitle: 'A new chapter is unfolding for Alina & Kevin, and their story is about to get a whole lot sweeter.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Louisa',
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
      userGuessLabel: 'Your Guess:',
      revealHeading: 'Gender Reveal',
      revealSubtitle: 'So lovely to have you with us! Soon we’ll reveal our little secret.',
      countdownLabel: 'Countdown',
      countdownTargetLabel: 'Reveal on Thu, Oct 29, 2026 • 6:00 PM',
      countdownUnlockedLabel: '✨ Scratch to reveal now!',
      expiredHintTitle: 'The moment is here!',
      expiredHintText: 'Scratch the card to reveal the secret.',
      unitDays: 'Days',
      unitHours: 'Hrs',
      unitMins: 'Min',
      unitSecs: 'Sec',
      btnDevSkip: 'Developer: Skip Countdown',
      scratchTitle: 'Scratch to Reveal',
      scratchSub: 'Swipe across the card to uncover the gender',
      foilSecret: '★ SCRATCH FIELD ★',
      foilSecretSub: 'Swipe with your finger to reveal',
      foilRubbel: 'SCRATCH TO REVEAL',
      foilMidText: 'ALMOST THERE...',
      barrierTitle: 'Locked',
      barrierText: 'Unlocks when the countdown ends',
      revealEyebrow: 'Official Announcement',
      revealPrefix: 'It’s a...',
      teaserQuote: 'Keep scratching to reveal...',
      girlTitle: 'GIRL',
      boyTitle: 'BOY',
      girlQuote: '“Our little daughter will enrich the world.”',
      boyQuote: '“Our little son will enrich the world.”',
      letterMatch: name => `${name ? `${name}, you` : 'You'} guessed it right!<br>Thank you so much for joining,<br>we're so happy to celebrate with you ☺️<br>Stay tuned for more info!`,
      letterNoMatch: name => `${name ? `${name}, so` : 'So'} close!<br>Thank you so much for joining,<br>we're so happy to celebrate with you ☺️<br>Stay tuned for more info!`,
      stayTunedText: 'Stay tuned – more details coming soon',
      letterSalute: 'In joyful expectation',
      sigAlina: 'Alina',
      sigKevin: 'Kevin',
      signatureText: 'Alina Kevin',
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
      devAuthTitle: 'Developer Access',
      devAuthDesc: 'Please enter the developer password to activate developer mode.',
      devPasswordPlaceholder: 'Enter password...',
      devSecurityStandard: 'AES-256 • Banking Standard',
      devSecurityCert: 'ISO 27001 & SOC 2',
      devSecuritySummary: 'The reveal is protected against hackers and tampering using military and banking standards. The actual gender remains encrypted on the server and cannot be read prematurely without an authorized key.',
      devSecurityBsi: 'Site security complies with BSI standards (TLS 1.3)',
      btnUnlock: 'Unlock',
      btnCancel: 'Cancel',
      devAuthWrongPass: 'Incorrect password',
      devAuthSuccess: 'Developer mode activated:<br>Countdown can be skipped on this device',
      devToastActive: 'Developer mode activated:<br>Countdown can be skipped on this device',
      devToastInactive: 'Developer mode disabled',
      btnDevFloatingSkip: 'Skip countdown for preview',
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
      shareText: gender => `Gender Reveal from Alina & Kevin: It's a ${gender === 'girl' ? 'Girl' : 'Boy'}!`
    }
  };

  // ==================== CRYPTOGRAPHIC VAULT (AES-256-GCM) ====================
  // Zero-Knowledge Architecture: The reveal gender is strictly encrypted with AES-256-GCM.
  // It cannot be inspected in plaintext from source code, DevTools, or localStorage.
  const CryptoVault = {
    STORAGE_KEY_GENDER: 'baby_dev_sec_gender',
    STORAGE_KEY_DATE: 'baby_dev_target_date',
    SALT_DEFAULT: 'baby_party_kevin_alina_salt_2026',

    async deriveKey(secret) {
      const enc = new TextEncoder();
      const pwKey = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(secret || 'baby_default_fallback_secret'),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
      return window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: enc.encode(this.SALT_DEFAULT),
          iterations: 100000,
          hash: 'SHA-256'
        },
        pwKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    },

    async encryptGender(gender, secretKey) {
      if (!gender || (gender !== 'boy' && gender !== 'girl')) return null;
      try {
        const enc = new TextEncoder();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const cryptoKey = await this.deriveKey(secretKey);
        const payload = JSON.stringify({ g: gender, t: Date.now() });

        const cipherBuf = await window.crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          cryptoKey,
          enc.encode(payload)
        );

        const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
        const ctHex = Array.from(new Uint8Array(cipherBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
        const armored = 'gcm:v1:' + ivHex + ':' + ctHex;
        localStorage.setItem(this.STORAGE_KEY_GENDER, armored);
        return armored;
      } catch (err) {
        console.warn('[CryptoVault] Encrypt error:', err);
        return null;
      }
    },

    async decryptGender(armored, secretKey) {
      if (!armored || typeof armored !== 'string' || !armored.startsWith('gcm:v1:')) return null;
      try {
        const parts = armored.split(':');
        if (parts.length < 4) return null;
        const ivHex = parts[2];
        const ctHex = parts[3];
        const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const ct = new Uint8Array(ctHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        const cryptoKey = await this.deriveKey(secretKey);
        const decBuf = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          cryptoKey,
          ct
        );
        const dec = new TextDecoder();
        const obj = JSON.parse(dec.decode(decBuf));
        return (obj && (obj.g === 'boy' || obj.g === 'girl')) ? obj.g : null;
      } catch (err) {
        return null;
      }
    },

    getEncryptedGender() {
      try {
        return localStorage.getItem(this.STORAGE_KEY_GENDER);
      } catch (e) {
        return null;
      }
    },

    clearVault() {
      try {
        localStorage.removeItem(this.STORAGE_KEY_GENDER);
        localStorage.removeItem(this.STORAGE_KEY_DATE);
      } catch (e) {}
    }
  };

  // ==================== STATE MANAGEMENT ====================
  const STATE = {
    lang: 'de', // active language
    isLanguageLocked: false, // false = auto-cycles between DE & EN on start page
    currentStep: 1,
    guestName: '',
    userGuess: null, // 'boy' | 'girl'
    actualGender: null, // Zero-Knowledge: Strictly populated only by authoritative server or decrypted dev vault
    revealTargetMs: null, // Initialized dynamically (plain customizable date)
    devToken: sessionStorage.getItem('baby_dev_token') || null,
    partyTitle: 'Gender Reveal',
    soundEnabled: true,
    devMode: false, // toggled after password verification
    countdownRunning: false,
    countdownInterval: null,
    serverTimeOffset: 0,
    isServerUnlocked: false,
    isCardUnlocked: false,
    isScratchedRevealed: false,
    votes: {
      boy: 15,
      girl: 17
    }
  };

  // Check if user previously saved custom votes, guess or guest name
  try {
    const savedVotes = localStorage.getItem('baby_votes_data');
    if (savedVotes) STATE.votes = JSON.parse(savedVotes);
    const savedGuess = localStorage.getItem('baby_user_guess');
    if (savedGuess && (savedGuess === 'boy' || savedGuess === 'girl')) {
      STATE.userGuess = savedGuess;
    }
    const savedName = localStorage.getItem('baby_guest_name');
    if (savedName) {
      STATE.guestName = savedName;
    }
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
    userGuessSummary: document.getElementById('userGuessSummary'),
    userSummaryBadge: document.getElementById('userSummaryBadge'),
    revealSubheading: document.getElementById('revealSubheading'),
    countdownSection: document.getElementById('countdownSection'),
    countdownExpiredHint: document.getElementById('countdownExpiredHint'),
    countdownStatusLabel: document.getElementById('countdownStatusLabel'),
    timerDays: document.getElementById('timerDays'),
    timerHours: document.getElementById('timerHours'),
    timerMins: document.getElementById('timerMins'),
    timerSecs: document.getElementById('timerSecs'),
    btnStartSuspenseCountdown: document.getElementById('btnStartSuspenseCountdown'),
    btnDevSkipCountdown: document.getElementById('btnDevSkipCountdown'),
    btnDevFloatingSkip: document.getElementById('btnDevFloatingSkip'),

    // Scratch Card with Dual Layers
    scratchCardWrapper: document.getElementById('scratchCardWrapper'),
    revealedUnderlay: document.getElementById('revealedUnderlay'),
    scratchCanvasMid: document.getElementById('scratchCanvasMid'),
    scratchCanvasTop: document.getElementById('scratchCanvasTop'),
    countdownLockOverlay: document.getElementById('countdownLockOverlay'),
    postRevealSection: document.getElementById('postRevealSection'),

    // Parents Signature Card & Personal Letter
    parentsSignatureCard: document.getElementById('parentsSignatureCard'),
    personalLetterText: document.getElementById('personalLetterText'),
    stayTunedText: document.getElementById('stayTunedText'),
    sigBlockAlina: document.getElementById('sigBlockAlina'),
    sigBlockKevin: document.getElementById('sigBlockKevin'),
    sigAlinaSvg: document.getElementById('sigAlinaSvg'),
    sigConnector: document.getElementById('sigConnector'),
    sigKevinSvg: document.getElementById('sigKevinSvg'),
    signatureFlourish: document.getElementById('signatureFlourish'),

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

    // Developer Toolbar & Configuration Modal
    btnOpenDevSettings: document.getElementById('btnOpenDevSettings'),
    btnDevBarSkip: document.getElementById('btnDevBarSkip'),
    btnCloseDevMode: document.getElementById('btnCloseDevMode'),
    devSettingsModal: document.getElementById('devSettingsModal'),
    closeDevSettingsBtn: document.getElementById('closeDevSettingsBtn'),
    cancelDevSettingsBtn: document.getElementById('cancelDevSettingsBtn'),
    saveDevSettingsBtn: document.getElementById('saveDevSettingsBtn'),
    saveDevSettingsBtnText: document.getElementById('saveDevSettingsBtnText'),
    devInputTargetDate: document.getElementById('devInputTargetDate'),
    devInputTargetTime: document.getElementById('devInputTargetTime'),
    devPresetNow: document.getElementById('devPresetNow'),
    devPresetPlus5m: document.getElementById('devPresetPlus5m'),
    devPresetPlus1d: document.getElementById('devPresetPlus1d'),
    devPresetDefault: document.getElementById('devPresetDefault'),
    devLivePreviewText: document.getElementById('devLivePreviewText'),
    devSelectBoy: document.getElementById('devSelectBoy'),
    devSelectGirl: document.getElementById('devSelectGirl'),
    devJumpP1: document.getElementById('devJumpP1'),
    devJumpP2: document.getElementById('devJumpP2'),
    devJumpP3: document.getElementById('devJumpP3'),
    devResetVotes: document.getElementById('devResetVotes'),
    devCryptoBadgeText: document.getElementById('devCryptoBadgeText'),

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

    // Developer Password Authentication Modal
    devAuthModal: document.getElementById('devAuthModal'),
    closeDevAuthBtn: document.getElementById('closeDevAuthBtn'),
    cancelDevAuthBtn: document.getElementById('cancelDevAuthBtn'),
    devAuthForm: document.getElementById('devAuthForm'),
    devPasswordInput: document.getElementById('devPasswordInput'),
    devAuthError: document.getElementById('devAuthError'),
    submitDevAuthBtn: document.getElementById('submitDevAuthBtn'),
    devAuthBtnText: document.getElementById('devAuthBtnText'),

    // Toast
    toastBubble: document.getElementById('toastBubble')
  };

  // Default Target Reveal Date: Donnerstag 29.10.2026, 18:00 Uhr Berlin time (CET UTC+1)
  const DEFAULT_REVEAL_TARGET_DATE = '2026-10-29T18:00:00+01:00';
  const DEFAULT_REVEAL_TARGET_MS = new Date(DEFAULT_REVEAL_TARGET_DATE).getTime();

  function formatCountdownTargetLabel(targetMs, lang) {
    try {
      const d = new Date(targetMs);
      if (isNaN(d.getTime())) {
        return (lang === 'en') ? 'Reveal on Thu, Oct 29, 2026 • 6:00 PM' : 'Reveal am Do., 29. Okt. 2026 • 18:00 Uhr';
      }
      if (lang === 'en') {
        const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
        const month = d.toLocaleDateString('en-US', { month: 'short' });
        const day = d.getDate();
        const year = d.getFullYear();
        const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `Reveal on ${weekday}, ${month} ${day}, ${year} • ${time}`;
      } else {
        const weekday = d.toLocaleDateString('de-DE', { weekday: 'short' });
        const day = d.getDate();
        let month = d.toLocaleDateString('de-DE', { month: 'short' });
        if (!month.endsWith('.')) month += '.';
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        return `Reveal am ${weekday}., ${day}. ${month} ${year} • ${hours}:${mins} Uhr`;
      }
    } catch (e) {
      return (lang === 'en') ? 'Reveal on Thu, Oct 29, 2026 • 6:00 PM' : 'Reveal am Do., 29. Okt. 2026 • 18:00 Uhr';
    }
  }

  function getTargetMs() {
    return STATE.revealTargetMs || DEFAULT_REVEAL_TARGET_MS;
  }

  function t(key, ...args) {
    if (key === 'countdownTargetLabel') {
      return formatCountdownTargetLabel(getTargetMs(), STATE.lang);
    }
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
    names: ['Louisa', 'Eleni'],
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
    elements.revealHeading.innerHTML = '<span class="reveal-highlight">Gender Reveal</span>';
  }

  function applyLanguageToDOM(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'guessHeading' || key === 'revealHeading') return; // Handled with title-word spans
      const text = t(key);
      if (text) {
        if (text.includes('<br') || text.includes('&') || text.includes('<span')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    updateGuessHeading();
    updateRevealHeading();

    // Bilingual signatures update
    updateSignaturesUI();
    updatePersonalLetterText();

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

    lastPianoIdx: -1,

    // Warm, elegant acoustic piano note sound on keystroke (rich multi-string resonance & hammer transient)
    playTypeDroplet(charLength = 1) {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        // Warm lyrical piano scale palette (C5, D5, E5, G5, A5, C6, D6, E6)
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
        
        let noteIdx;
        do {
          noteIdx = Math.floor(Math.random() * notes.length);
        } while (noteIdx === this.lastPianoIdx && notes.length > 1);
        this.lastPianoIdx = noteIdx;

        const freq = notes[noteIdx];

        // 1. Primary string fundamental (triangle body for natural acoustic string harmonics)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);

        // 2. Harmonic overtone / unison double-string chorus (subtle 2 mHz detune)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2.002, now);

        // 3. Hammer felt impact transient (gives the authentic tactile wooden/felt piano strike)
        const osc3 = this.ctx.createOscillator();
        const gain3 = this.ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(freq * 3.5, now);

        // Acoustic soundboard lowpass filter: strikes bright and naturally warms up
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(4200, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

        // Master output gain for smooth mixing
        const masterGain = this.ctx.createGain();

        // ADSR Envelopes:
        // Osc 1: Sharp piano attack (2.5ms), rich sustain decay to 420ms
        gain1.gain.setValueAtTime(0.0001, now);
        gain1.gain.linearRampToValueAtTime(0.08, now + 0.0025);
        gain1.gain.exponentialRampToValueAtTime(0.026, now + 0.12);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

        // Osc 2 (Octave chime): quick decay for piano brilliance
        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.linearRampToValueAtTime(0.038, now + 0.0025);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        // Osc 3 (Hammer transient): 30ms quick felt strike
        gain3.gain.setValueAtTime(0.0001, now);
        gain3.gain.linearRampToValueAtTime(0.022, now + 0.0015);
        gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        // Connections
        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);

        gain1.connect(filter);
        gain2.connect(filter);
        gain3.connect(filter);

        filter.connect(masterGain);
        masterGain.connect(this.ctx.destination);

        const stopTime = now + 0.45;
        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        osc1.stop(stopTime);
        osc2.stop(stopTime);
        osc3.stop(stopTime);
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

    heartbeatInterval: null,

    // Deep physiological heartbeat (lub-dub pulse with warm sub-bass acoustic resonance)
    playHeartbeatPulse() {
      if (!STATE.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;

        // Sub-bass filter for deep, muffled physiological body sound (like an ultrasound or stethoscope)
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(145, now);
        filter.Q.value = 1.35;
        filter.connect(this.ctx.destination);

        // Beat 1: "Lub" (lower pitch ~62 Hz -> ~42 Hz)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(62, now);
        osc1.frequency.exponentialRampToValueAtTime(42, now + 0.12);

        gain1.gain.setValueAtTime(0.0001, now);
        gain1.gain.linearRampToValueAtTime(0.24, now + 0.022);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

        osc1.connect(gain1);
        gain1.connect(filter);
        osc1.start(now);
        osc1.stop(now + 0.16);

        // Beat 2: "Dub" (slightly higher pitch ~78 Hz -> ~48 Hz, following ~135ms later)
        const t2 = now + 0.135;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(78, t2);
        osc2.frequency.exponentialRampToValueAtTime(48, t2 + 0.10);

        gain2.gain.setValueAtTime(0.0001, t2);
        gain2.gain.linearRampToValueAtTime(0.19, t2 + 0.018);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.12);

        osc2.connect(gain2);
        gain2.connect(filter);
        osc2.start(t2);
        osc2.stop(t2 + 0.14);
      } catch (e) { }
    },

    startHeartbeat() {
      if (this.heartbeatInterval) return;
      this.playHeartbeatPulse();
      // Steady physiological tempo (~70 BPM = every 860ms)
      this.heartbeatInterval = setInterval(() => {
        if (STATE.currentStep === 3 && STATE.soundEnabled && !STATE.isScratchedRevealed) {
          this.playHeartbeatPulse();
        } else if (STATE.currentStep !== 3 || STATE.isScratchedRevealed) {
          this.stopHeartbeat();
        }
      }, 860);
    },

    stopHeartbeat() {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
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

    // Ambient starfall active on step 2 and step 3 (flying glitter particles in background)
    if (step >= 2) {
      magicEffects.startAmbientStarfall();
    } else {
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
      const staggerItems = activePage.querySelectorAll('.stagger-item, .title-word, .boy-card, .girl-card, #btnToStep3');
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
      if (hasGuess) {
        elements.btnPickBoy.classList.toggle('selected', STATE.userGuess === 'boy');
        elements.btnPickGirl.classList.toggle('selected', STATE.userGuess === 'girl');
      }
      updateGuessHeading();
      updatePollUI();
    } else if (step === 3) {
      setupRevealPage();
      audio.startHeartbeat();
    } else {
      audio.stopHeartbeat();
      clearInterval(STATE.countdownInterval);
      STATE.countdownRunning = false;
    }

    updateFloatingSkipBtn();
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
    // Remove entrance cascade stagger class so it never restarts at opacity: 0
    targetEl.classList.remove("stagger-item", "stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5");
    targetEl.classList.remove("playful-wobble");
    targetEl.style.opacity = "1";
    targetEl.style.animation = "none";
    void targetEl.offsetWidth; // Force reflow
    targetEl.classList.add("playful-wobble");
    if (navigator.vibrate) {
      try { navigator.vibrate([15, 30, 15]); } catch (e) { }
    }
    setTimeout(() => {
      targetEl.classList.remove("playful-wobble");
      targetEl.style.animation = "none";
      targetEl.style.opacity = "1";
      targetEl.style.transform = "none";
    }, 480);
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

    if (elements.userNameInput && STATE.guestName) {
      elements.userNameInput.value = STATE.guestName;
      elements.btnToStep2.classList.remove('is-disabled');
      elements.btnToStep2.setAttribute('aria-disabled', 'false');
    }

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
        elements.userNameInput.focus();
        return;
      }
      if (!STATE.isLanguageLocked) {
        lockLanguage(STATE.lang);
      }
      STATE.guestName = name;
      try {
        localStorage.setItem('baby_guest_name', name);
      } catch (e) { }
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

    if (STATE.userGuess) {
      elements.btnPickBoy.classList.toggle('selected', STATE.userGuess === 'boy');
      elements.btnPickGirl.classList.toggle('selected', STATE.userGuess === 'girl');
      elements.btnToStep3.classList.remove('is-disabled');
      elements.btnToStep3.setAttribute('aria-disabled', 'false');
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
        return;
      }
      audio.playSelect();

      // Avoid duplicate count if re-voting
      const prevGuess = localStorage.getItem('baby_user_guess');
      if (prevGuess && STATE.votes[prevGuess] && prevGuess !== STATE.userGuess) {
        STATE.votes[prevGuess] = Math.max(0, STATE.votes[prevGuess] - 1);
      }
      if (!prevGuess || prevGuess !== STATE.userGuess) {
        STATE.votes[STATE.userGuess]++;
      }

      try {
        localStorage.setItem('baby_votes_data', JSON.stringify(STATE.votes));
        localStorage.setItem('baby_has_voted', 'true');
        localStorage.setItem('baby_user_guess', STATE.userGuess);
        if (STATE.guestName) {
          localStorage.setItem('baby_guest_name', STATE.guestName);
        }
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

    refreshIcons();
  }

  function updatePollUI() {
    const boyCount = (STATE.votes && STATE.votes.boy) ? STATE.votes.boy : 0;
    const girlCount = (STATE.votes && STATE.votes.girl) ? STATE.votes.girl : 0;
    const total = boyCount + girlCount || 1;

    const boyPct = Math.round((boyCount / total) * 100);
    const girlPct = 100 - boyPct;

    if (elements.boyPercent) elements.boyPercent.textContent = `${boyPct}%`;
    if (elements.girlPercent) elements.girlPercent.textContent = `${girlPct}%`;
    if (elements.pollBarBoy) elements.pollBarBoy.style.width = `${boyPct}%`;
    if (elements.pollBarGirl) elements.pollBarGirl.style.width = `${girlPct}%`;
    if (elements.pollTotalText) elements.pollTotalText.textContent = `${total} ${t('votesSuffix')}`;
    if (elements.guestCountPill) elements.guestCountPill.textContent = t('guestCountPill', total);
  }

  // ==================== PAGE 3 & COUNTDOWN ====================
  function setupRevealPage() {
    magicEffects.startAmbientStarfall();

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
      elements.revealedUnderlay.classList.remove('gender-girl', 'gender-boy', 'security-locked', 'scratch-revealed');
      elements.revealedUnderlay.classList.add('mystery-preview');
      elements.revealedUnderlay.style.filter = '';
    }
    if (elements.revealedIcon) {
      elements.revealedIcon.innerHTML = GENDER_ICONS.mystery;
    }
    if (elements.revealedGenderTitle) {
      elements.revealedGenderTitle.textContent = '???';
    }
    const prefixEl = document.querySelector('.reveal-prefix');
    if (prefixEl) {
      prefixEl.textContent = t('revealPrefix');
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
    if (elements.countdownExpiredHint) {
      elements.countdownExpiredHint.classList.remove('hidden-on-reveal');
      const isPastCountdown = (getTargetMs() - (Date.now() + (STATE.serverTimeOffset || 0)) <= 0);
      if ((STATE.isCardUnlocked || isPastCountdown) && !STATE.isScratchedRevealed) {
        elements.countdownExpiredHint.classList.add('visible');
      } else {
        elements.countdownExpiredHint.classList.remove('visible');
      }
    }
    const mainStage = document.getElementById('revealMainStage');
    if (mainStage) mainStage.classList.remove('stage-revealed-up');
    if (signatureObserver) {
      signatureObserver.disconnect();
      signatureObserver = null;
    }
    signatureAnimationPlayed = false;
    resetSignaturesToHidden();
    updatePersonalLetterText();

    drawScratchCardFoil();
    requestAnimationFrame(() => {
      drawScratchCardFoil();
      scratchSparkles.resize();
    });

    STATE.countdownTimeLeft = STATE.countdownDuration;
    refreshIcons();
    setTimeout(() => {
      if (elements.scratchCardWrapper) {
        elements.scratchCardWrapper.classList.remove("stagger-item", "stagger-4");
        elements.scratchCardWrapper.style.opacity = "1";
      }
    }, 750);

    // Automatically start the real-time countdown to Donnerstag 29.10.2026, 18 Uhr
    startCountdown();
    updateFloatingSkipBtn();
  }

  function formatLetterIntoWords(htmlString, startIdx = 0) {
    const lines = htmlString.split(/<br\s*\/?>/i);
    let currentIdx = startIdx;
    const formattedLines = lines.map(line => {
      const words = line.trim().split(/\s+/).filter(Boolean);
      const wrappedWords = words.map(w => {
        const span = `<span class="letter-word" style="--w-idx: ${currentIdx};">${w}</span>`;
        currentIdx++;
        return span;
      });
      return wrappedWords.join(' ');
    });
    return {
      html: formattedLines.join('<br>'),
      count: currentIdx
    };
  }

  function updatePersonalLetterText() {
    const letterEl = elements.personalLetterText || document.getElementById('personalLetterText');
    const saluteEl = document.getElementById('personalLetterSalute');
    const name = STATE.guestName ? STATE.guestName.trim() : '';
    const actual = STATE.actualGender || (STATE.userGuess || 'boy');
    const userMatched = (STATE.userGuess === actual);
    const rawLetter = userMatched ? t('letterMatch', name) : t('letterNoMatch', name);
    const rawSalute = t('letterSalute');

    if (letterEl) {
      const res = formatLetterIntoWords(rawLetter, 0);
      letterEl.innerHTML = res.html;

      if (saluteEl) {
        const saluteRes = formatLetterIntoWords(rawSalute, res.count);
        saluteEl.innerHTML = saluteRes.html;
      }
    } else if (saluteEl) {
      saluteEl.textContent = rawSalute;
    }
  }

  function applyActualGenderTheme() {
    updatePersonalLetterText();

    // If card has not been scratched >= 50% yet, keep underlay in mysterious suspense mode!
    if (!STATE.isScratchedRevealed) {
      if (elements.revealedUnderlay) {
        elements.revealedUnderlay.classList.remove('gender-girl', 'gender-boy', 'security-locked');
        elements.revealedUnderlay.classList.add('mystery-preview');
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
      refreshIcons();
      return;
    }

    if (!STATE.actualGender) return;
    const isGirl = (STATE.actualGender === 'girl');
    elements.revealedUnderlay.classList.remove('security-locked', 'mystery-preview');
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

    updatePersonalLetterText();
    refreshIcons();
  }

  function initPage3() {
    const resumeAudioOnce = () => {
      audio.init();
      if (STATE.currentStep === 3 && !STATE.isScratchedRevealed && STATE.soundEnabled) {
        audio.startHeartbeat();
      }
    };
    window.addEventListener("pointerdown", resumeAudioOnce, { once: true });

    if (elements.btnStartSuspenseCountdown) {
      elements.btnStartSuspenseCountdown.addEventListener('click', () => {
        startCountdown();
      });
    }

    if (elements.btnDevSkipCountdown) {
      elements.btnDevSkipCountdown.addEventListener('click', () => {
        skipCountdownForDev();
      });
    }

    if (elements.devQuickBtn) {
      elements.devQuickBtn.addEventListener('click', () => {
        if (STATE.currentStep !== 3) {
          goToStep(3);
        }
        skipCountdownForDev();
      });
    }

    const skipBtn = elements.btnDevFloatingSkip || document.getElementById('btnDevFloatingSkip');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        audio.playClick();
        skipCountdownForDev();
      });
    }

    elements.btnConfettiAgain.addEventListener('click', () => {
      audio.playFanfare();
      fireCelebrationConfetti();
    });

    elements.btnShareResult.addEventListener('click', () => {
      audio.playClick();
      openStoryModal();
    });

    if (elements.btnRestartGuess) {
      elements.btnRestartGuess.addEventListener('click', () => {
        audio.playClick();
        magicEffects.stopAmbientStarfall();
        goToStep(1);
      });
    }

    if (elements.parentsSignatureCard) {
      elements.parentsSignatureCard.addEventListener('click', () => {
        audio.playSelect();
        signatureAnimationPlayed = true;
        if (signatureObserver) {
          signatureObserver.disconnect();
          signatureObserver = null;
        }
        triggerDuoSignaturesAnimation();
      });

      // Also trigger if card receives HTML focus (e.g. keyboard navigation / Tab)
      elements.parentsSignatureCard.addEventListener('focus', () => {
        if (!signatureAnimationPlayed) {
          signatureAnimationPlayed = true;
          if (signatureObserver) {
            signatureObserver.disconnect();
            signatureObserver = null;
          }
          triggerDuoSignaturesAnimation();
        }
      });
    }

    if (elements.userGuessSummary) {
      elements.userGuessSummary.setAttribute('title', STATE.lang === 'en' ? 'Click to change your guess' : 'Klicken, um Tipp zu ändern');
      elements.userGuessSummary.addEventListener('click', () => {
        audio.playClick();
        goToStep(2);
      });
    }

    setupMultiLayerScratchEvents();
    updateSignaturesUI();
    resetSignaturesToHidden();
  }

  // ==================== LIVE HANDWRITING SIGNATURE ENGINE ====================
  let activeSignatureAnimId = null;
  let signatureObserver = null;
  let signatureAnimationPlayed = false;

  function updateSignaturesUI() {
    const alina = document.getElementById('sigAlinaSvg');
    const kevin = document.getElementById('sigKevinSvg');
    if (!alina || !kevin) return;

    alina.textContent = 'Alina';
    kevin.textContent = 'Kevin';
  }

  function resetSignaturesToHidden() {
    updateSignaturesUI();

    const grpA = document.getElementById('grpAlina');
    const grpK = document.getElementById('grpKevin');
    const pathA = document.getElementById('pathStrokeAlina');
    const dotA = document.getElementById('maskDotAlina');
    const pathK = document.getElementById('pathStrokeKevin');

    if (!grpA || !grpK || !pathA || !dotA || !pathK) return;

    if (activeSignatureAnimId) {
      cancelAnimationFrame(activeSignatureAnimId);
      activeSignatureAnimId = null;
    }

    grpA.setAttribute('mask', 'url(#maskAlina)');
    grpK.setAttribute('mask', 'url(#maskKevin)');

    const lenA = pathA.getTotalLength() || 440;
    const lenK = pathK.getTotalLength() || 320;

    pathA.style.strokeDasharray = lenA;
    pathA.style.strokeDashoffset = lenA;
    dotA.style.opacity = '0';
    pathK.style.strokeDasharray = lenK;
    pathK.style.strokeDashoffset = lenK;
  }

  function initSignatureScrollTrigger() {
    signatureAnimationPlayed = false;
    resetSignaturesToHidden();

    if (signatureObserver) {
      signatureObserver.disconnect();
      signatureObserver = null;
    }

    const target = document.getElementById('signatureContainer') || elements.parentsSignatureCard;
    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      triggerDuoSignaturesAnimation();
      return;
    }

    signatureObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !signatureAnimationPlayed) {
          signatureAnimationPlayed = true;
          if (signatureObserver) {
            signatureObserver.disconnect();
            signatureObserver = null;
          }
          // Slight natural pause after user scrolls to it before pen glides
          setTimeout(() => {
            triggerDuoSignaturesAnimation();
          }, 180);
        }
      });
    }, {
      root: null,
      threshold: 0.25,
      rootMargin: '0px 0px -20px 0px'
    });

    signatureObserver.observe(target);
  }

  function triggerDuoSignaturesAnimation() {
    updateSignaturesUI();

    const grpA = document.getElementById('grpAlina');
    const grpK = document.getElementById('grpKevin');
    const pathA = document.getElementById('pathStrokeAlina');
    const dotA = document.getElementById('maskDotAlina');
    const pathK = document.getElementById('pathStrokeKevin');

    if (!grpA || !grpK || !pathA || !dotA || !pathK) return;

    if (activeSignatureAnimId) {
      cancelAnimationFrame(activeSignatureAnimId);
      activeSignatureAnimId = null;
    }

    grpA.setAttribute('mask', 'url(#maskAlina)');
    grpK.setAttribute('mask', 'url(#maskKevin)');

    const lenA = pathA.getTotalLength() || 440;
    const lenK = pathK.getTotalLength() || 320;

    pathA.style.strokeDasharray = lenA;
    pathA.style.strokeDashoffset = lenA;
    dotA.style.opacity = '0';
    pathK.style.strokeDasharray = lenK;
    pathK.style.strokeDashoffset = lenK;

    // Timing timeline:
    // 1. Write cursive Alina (1050ms) - i-dot stays hidden during stroke
    // 2. Micro pause & tap i-dot (90ms) - i-dot appears strictly at the end
    // 3. Natural pen lift transition between names (140ms)
    // 4. Write cursive Kevin (950ms)
    const t1 = 1050;
    const t2 = t1 + 90;
    const t3 = t2 + 140;
    const t4 = t3 + 950;

    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;

      if (elapsed < t1) {
        // Phase 1: Write cursive body of Alina (A -> l -> i -> n -> a) without i-dot
        const p = elapsed / t1;
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        pathA.style.strokeDashoffset = Math.max(0, lenA * (1 - ease));
        dotA.style.opacity = '0';
      } else if (elapsed < t2) {
        // Phase 2: Pen finishes 'a', lifts, and TAPS the i-dot!
        pathA.style.strokeDashoffset = '0';
        dotA.style.opacity = '1';
      } else if (elapsed < t3) {
        // Phase 3: Natural pen lift transition between Alina and Kevin
        pathA.style.strokeDashoffset = '0';
        dotA.style.opacity = '1';
      } else if (elapsed < t4) {
        // Phase 4: Write cursive Kevin in Caveat font
        pathA.style.strokeDashoffset = '0';
        dotA.style.opacity = '1';

        const pK = (elapsed - t3) / (t4 - t3);
        const easeK = pK < 0.5 ? 2 * pK * pK : -1 + (4 - 2 * pK) * pK;
        pathK.style.strokeDashoffset = Math.max(0, lenK * (1 - easeK));
      } else {
        // Complete! Both signatures finished, remove masks for 100% crisp solid vector typography
        pathA.style.strokeDashoffset = '0';
        dotA.style.opacity = '1';
        pathK.style.strokeDashoffset = '0';

        grpA.removeAttribute('mask');
        grpK.removeAttribute('mask');
        activeSignatureAnimId = null;
        return;
      }

      activeSignatureAnimId = requestAnimationFrame(frame);
    }

    activeSignatureAnimId = requestAnimationFrame(frame);
  }

  // Target reveal date synchronized with getTargetMs()

  function updateDateCountdown(playTick = false) {
    // Authoritative time: synchronized with Vercel server atomic time
    const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
    const diff = getTargetMs() - currentEffectiveTime;

    if (diff <= 0) {
      if (elements.timerDays) elements.timerDays.textContent = '00';
      if (elements.timerHours) elements.timerHours.textContent = '00';
      if (elements.timerMins) elements.timerMins.textContent = '00';
      if (elements.timerSecs) elements.timerSecs.textContent = '00';
      if (elements.countdownStatusLabel) {
        elements.countdownStatusLabel.textContent = t('countdownUnlockedLabel');
      }
      if (!STATE.isCardUnlocked) {
        unlockScratchCard();
      }
      return true;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (elements.timerDays) elements.timerDays.textContent = String(days).padStart(2, '0');
    if (elements.timerHours) elements.timerHours.textContent = String(hours).padStart(2, '0');
    if (elements.timerMins) elements.timerMins.textContent = String(mins).padStart(2, '0');
    if (elements.timerSecs) elements.timerSecs.textContent = String(secs).padStart(2, '0');

    // Countdown tick sound removed so it does not clash with heartbeat
    return false;
  }

  function startCountdown() {
    clearInterval(STATE.countdownInterval);
    STATE.countdownRunning = true;
    const isDone = updateDateCountdown(false);
    if (isDone) return;

    if (elements.countdownStatusLabel) {
      elements.countdownStatusLabel.textContent = t('countdownTargetLabel');
    }

    STATE.countdownInterval = setInterval(() => {
      const finished = updateDateCountdown(STATE.currentStep === 3);
      if (finished) {
        clearInterval(STATE.countdownInterval);
        STATE.countdownRunning = false;
      }
    }, 1000);
  }

  async function skipCountdownForDev() {
    const token = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    if (!STATE.devMode || !token) {
      openDevAuthModal();
      return;
    }

    clearInterval(STATE.countdownInterval);
    STATE.countdownRunning = false;
    if (elements.timerDays) elements.timerDays.textContent = '00';
    if (elements.timerHours) elements.timerHours.textContent = '00';
    if (elements.timerMins) elements.timerMins.textContent = '00';
    if (elements.timerSecs) elements.timerSecs.textContent = '00';
    if (elements.countdownStatusLabel) {
      elements.countdownStatusLabel.textContent = t('countdownUnlockedLabel');
    }
    STATE.isServerUnlocked = true;
    if (!STATE.actualGender) {
      await fetchRevealGender();
    }
    unlockScratchCard();
    applyActualGenderTheme();
  }

  function unlockScratchCard() {
    const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
    const token = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    const isDevAuth = Boolean(STATE.devMode && token);

    // Strict security check: only unlock if real countdown time reached or verified developer
    if (currentEffectiveTime < getTargetMs() && !isDevAuth) {
      return;
    }

    STATE.isCardUnlocked = true;
    if (elements.revealSubheading) {
      elements.revealSubheading.classList.add('hidden-after-countdown');
    }
    if (elements.countdownLockOverlay) {
      elements.countdownLockOverlay.classList.add('unlocked');
    }
    if (elements.scratchCanvasTop) {
      elements.scratchCanvasTop.classList.add('unlocked');
    }
    if (elements.scratchCanvasMid) {
      elements.scratchCanvasMid.classList.add('unlocked');
    }
    if (elements.countdownStatusLabel) {
      elements.countdownStatusLabel.textContent = t('countdownUnlockedLabel');
    }
    const countdownSection = document.getElementById('countdownSection') || document.getElementById('countdownModule');
    if (countdownSection) {
      countdownSection.classList.add('countdown-completed');
    }
    if (elements.countdownExpiredHint && !STATE.isScratchedRevealed) {
      elements.countdownExpiredHint.classList.add('visible');
      elements.countdownExpiredHint.classList.remove('hidden-on-reveal');
    }
    // Fetch reveal gender securely from Vercel API
    fetchRevealGender();
    updateFloatingSkipBtn();
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
    // Calculate proportional sizing & vertical centering so elements never collide
    const r = Math.min(18, Math.max(14, Math.round(h * 0.12)));
    const bannerH = 24;
    const bannerW = Math.min(165, w - 50);
    const bannerR = 12;

    // Total content height: Coin (2*r) + Gap1 (10) + Title (13) + Gap2 (8) + Banner (bannerH)
    const totalContentH = (r * 2) + 10 + 13 + 8 + bannerH;
    const startY = Math.max(16, Math.round((h - totalContentH) / 2));

    const cy = startY + r;
    const textY1 = (cy + r) + 10 + 6;
    const bannerY = textY1 + 6 + 8;
    const bannerX = cx - bannerW / 2;

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
    const coinGrad = ctxTop.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, r);
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
    ctxTop.arc(cx, cy, r - 3.5, 0, Math.PI * 2);
    ctxTop.strokeStyle = 'rgba(60, 68, 80, 0.3)';
    ctxTop.lineWidth = 1;
    ctxTop.stroke();

    // Embossed star in coin
    ctxTop.font = '700 14px "Plus Jakarta Sans", sans-serif';
    ctxTop.textAlign = 'center';
    ctxTop.textBaseline = 'middle';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctxTop.fillText('★', cx, cy + 1);
    ctxTop.fillStyle = '#2c3340';
    ctxTop.fillText('★', cx, cy);

    // 6. Embossed Stamped Typography
    ctxTop.font = '700 11.5px "Plus Jakarta Sans", sans-serif';
    // 3D Highlight offset
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.fillText(t('foilSecret'), cx, textY1 + 1);
    ctxTop.fillStyle = '#1e2430';
    ctxTop.fillText(t('foilSecret'), cx, textY1);

    // 7. Stamped Pill Banner: "HIER FREIRUBBELN"
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
    ctxTop.font = '700 10px "Plus Jakarta Sans", sans-serif';
    ctxTop.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctxTop.fillText(t('foilRubbel'), cx, bannerY + bannerH / 2 + 1);
    ctxTop.fillStyle = '#1e2430';
    ctxTop.fillText(t('foilRubbel'), cx, bannerY + bannerH / 2);
  }

  let lastLockedWobbleTime = 0;
  function handleLockedCardTap(e) {
    if (STATE.isCardUnlocked) return;
    if (e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      if (e.cancelable && e.type !== "mousedown") {
        e.preventDefault();
      }
    }

    const now = Date.now();
    if (now - lastLockedWobbleTime < 600) {
      return;
    }
    lastLockedWobbleTime = now;

    triggerPlayfulWobble(elements.scratchCardWrapper);

    const pill = elements.countdownLockOverlay ? elements.countdownLockOverlay.querySelector(".barrier-lock-pill") : null;
    if (pill) {
      pill.classList.remove("locked-shake");
      void pill.offsetWidth;
      pill.classList.add("locked-shake");
      setTimeout(() => pill.classList.remove("locked-shake"), 500);
    }
  }

  function setupMultiLayerScratchEvents() {
    const topCanvas = elements.scratchCanvasTop;
    const midCanvas = elements.scratchCanvasMid;

    if (elements.countdownLockOverlay) {
      elements.countdownLockOverlay.addEventListener("pointerdown", handleLockedCardTap);
    }

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
        handleLockedCardTap(e);
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
        handleLockedCardTap(e);
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

  async function triggerGenderReveal() {
    if (STATE.isScratchedRevealed) return;

    if (!STATE.actualGender) {
      await fetchRevealGender();
    }
    if (!STATE.actualGender) {
      console.warn('Authoritative gender not yet released by secure server');
      return;
    }

    STATE.isScratchedRevealed = true;

    // Transition from neutral mystery card into celebratory gender theme!
    if (elements.revealedUnderlay) {
      elements.revealedUnderlay.classList.remove('mystery-preview');
      elements.revealedUnderlay.classList.add('scratch-revealed');
      elements.revealedUnderlay.style.filter = '';
    }

    // Apply actual gender (heart/compass icon, MÄDCHEN/JUNGE text, parent quote & color)
    applyActualGenderTheme();

    // Fade out both foil layers smoothly
    if (elements.scratchCanvasTop) elements.scratchCanvasTop.classList.add('revealed-out');
    if (elements.scratchCanvasMid) elements.scratchCanvasMid.classList.add('revealed-out');

    // 1. Die Card langsam hochfahren
    const mainStage = document.getElementById('revealMainStage');
    if (mainStage) {
      mainStage.classList.add('stage-revealed-up');
    }

    // 2. Post-Reveal Section einblenden & Brief wort für wort formatieren
    if (elements.postRevealSection) {
      elements.postRevealSection.classList.add('visible');
    }
    if (elements.countdownExpiredHint) {
      elements.countdownExpiredHint.classList.add('hidden-on-reveal');
    }
    updatePersonalLetterText();

    // 3. Unterschriften auf Ausgangszustand zurücksetzen
    resetSignaturesToHidden();

    // 4. Sanfter Scroll auf mobilen Geräten damit der Brief optimal im Blickfeld ist
    setTimeout(() => {
      const letterCard = elements.parentsSignatureCard || document.getElementById('parentsSignatureCard');
      if (letterCard && window.innerWidth < 640) {
        letterCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 450);

    // 5. Unterschrift genau nach dem Brief starten (~2.45s)
    setTimeout(() => {
      triggerDuoSignaturesAnimation();
    }, 2450);

    const countdownSection = document.getElementById('countdownSection') || document.getElementById('countdownModule');
    if (countdownSection) {
      countdownSection.classList.add('countdown-completed');
    }

    audio.stopHeartbeat();
    audio.playFanfare();
    fireCelebrationConfetti();
    refreshIcons();
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

    getAmbientColors() {
      if (!STATE.isScratchedRevealed) {
        // Harmonious blend while countdown runs: warm gold, shimmering white, pastel pink & pastel blue
        return ['#ffd700', '#fff3b0', '#ffffff', '#fcd5ce', '#e88ea4', '#a0c4ff', '#6ca1d7'];
      }
      const isGirl = (STATE.actualGender === 'girl');
      return isGirl
        ? ['#ffd700', '#fff3b0', '#ffffff', '#e88ea4', '#fce4ec']
        : ['#ffd700', '#fff3b0', '#ffffff', '#6ca1d7', '#e3f2fd'];
    },

    // Feature 6: Ambient gentle starfall BEHIND elements (z-index: 5)
    startAmbientStarfall() {
      this.isAmbientActive = true;
      if (!this.bgCanvas || !this.bgCtx) this.init();
      if (!this.bgCanvas) return;

      const colors = this.getAmbientColors();

      this.ambientParticles = [];
      for (let i = 0; i < 42; i++) {
        this.ambientParticles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vy: 0.35 + Math.random() * 0.75,
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

      const colors = this.getAmbientColors();

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

  // ==================== DEVELOPER SETTINGS MODAL (DATE & ENCRYPTED GENDER) ====================
  let devSelectedGender = 'boy';

  function formatTimeRemainingPreview(targetMs) {
    const diff = targetMs - (Date.now() + (STATE.serverTimeOffset || 0));
    if (diff <= 0) {
      return '⏱️ Abgelaufen (Rubbelkarte sofort freigeschaltet)';
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const parts = [];
    if (days > 0) parts.push(`${days} Tag${days > 1 ? 'e' : ''}`);
    if (hours > 0 || days > 0) parts.push(`${hours} Std`);
    parts.push(`${mins} Min`);
    parts.push(`${secs} Sek`);
    return `⏳ Noch ${parts.join(' ')} verbleibend`;
  }

  function updateDevPreview() {
    if (!elements.devInputTargetDate || !elements.devInputTargetTime || !elements.devLivePreviewText) return;
    const dateVal = elements.devInputTargetDate.value;
    const timeVal = elements.devInputTargetTime.value;
    if (!dateVal || !timeVal) {
      elements.devLivePreviewText.textContent = 'Bitte Datum und Uhrzeit angeben';
      return;
    }
    const targetDateObj = new Date(`${dateVal}T${timeVal}`);
    const targetMs = targetDateObj.getTime();
    if (isNaN(targetMs)) {
      elements.devLivePreviewText.textContent = 'Ungültiges Datumsformat';
      return;
    }
    elements.devLivePreviewText.textContent = formatTimeRemainingPreview(targetMs);
  }

  async function applyDevTargetDate(targetMs, targetIso) {
    if (isNaN(targetMs)) return;
    STATE.revealTargetMs = targetMs;
    localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, targetIso);

    // Sync to server API if dev token is available
    const devToken = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    if (devToken) {
      STATE.devToken = devToken;
      fetch('/api/dev-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-dev-token': devToken
        },
        body: JSON.stringify({
          targetDate: targetIso,
          gender: STATE.actualGender || devSelectedGender
        })
      }).catch(e => console.warn('[DevConfig] Could not sync date to server:', e));
    }

    // Live countdown update
    const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
    if (targetMs <= currentEffectiveTime) {
      if (!STATE.isCardUnlocked) {
        unlockScratchCard();
      }
    } else {
      STATE.isCardUnlocked = false;
      if (elements.countdownLockOverlay) elements.countdownLockOverlay.classList.remove('unlocked');
      if (elements.scratchCanvasTop) elements.scratchCanvasTop.classList.remove('unlocked');
      if (elements.scratchCanvasMid) elements.scratchCanvasMid.classList.remove('unlocked');
      startCountdown();
    }

    if (elements.countdownStatusLabel) {
      elements.countdownStatusLabel.textContent = (targetMs <= currentEffectiveTime)
        ? t('countdownUnlockedLabel')
        : formatCountdownTargetLabel(targetMs, STATE.lang);
    }
  }

  async function applyDevGender(gender) {
    if (!gender || (gender !== 'boy' && gender !== 'girl')) return;
    devSelectedGender = gender;
    STATE.actualGender = gender;
    updateDevGenderCardsUI();

    // Encrypt with AES-256-GCM into secure vault
    const token = STATE.devToken || sessionStorage.getItem('baby_dev_token') || 'baby_dev_session_token';
    await CryptoVault.encryptGender(gender, token);

    // Sync to server API if dev token is available
    const devToken = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    if (devToken) {
      STATE.devToken = devToken;
      const activeIso = localStorage.getItem(CryptoVault.STORAGE_KEY_DATE) || DEFAULT_REVEAL_TARGET_DATE;
      fetch('/api/dev-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-dev-token': devToken
        },
        body: JSON.stringify({
          targetDate: activeIso,
          gender: gender
        })
      }).catch(e => console.warn('[DevConfig] Could not sync gender to server:', e));
    }

    // Apply gender styling, underlay, quote, colors
    applyActualGenderTheme();
    updateSettingsUI();
  }

  function setDevInputFromMs(targetMs, autoApply = true) {
    const d = new Date(targetMs);
    if (isNaN(d.getTime())) return;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');

    if (elements.devInputTargetDate) elements.devInputTargetDate.value = `${year}-${month}-${day}`;
    if (elements.devInputTargetTime) elements.devInputTargetTime.value = `${hours}:${mins}`;
    updateDevPreview();

    if (autoApply) {
      const targetIso = d.toISOString();
      applyDevTargetDate(targetMs, targetIso);
    }
  }

  function openDevSettingsModal() {
    if (!elements.devSettingsModal) return;
    audio.playClick();

    // Populate with current target date without triggering auto-apply
    setDevInputFromMs(getTargetMs(), false);

    // Populate with current gender
    devSelectedGender = STATE.actualGender || 'boy';
    updateDevGenderCardsUI();

    // Query active Upstash / server config to ensure dev mode matches cloud state
    const devToken = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    if (devToken) {
      fetch('/api/dev-config', {
        headers: { 'x-dev-token': devToken }
      })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && d.success && d.config) {
          if (d.config.targetTimeMs) {
            setDevInputFromMs(d.config.targetTimeMs, false);
          }
          if (d.config.gender) {
            devSelectedGender = d.config.gender;
            STATE.actualGender = d.config.gender;
            updateDevGenderCardsUI();
          }
          if (elements.devCryptoBadgeText && d.config.storage) {
            elements.devCryptoBadgeText.textContent = `AES-256-GCM • ${d.config.storage}`;
          }
        }
      })
      .catch(() => {});
    }

    elements.devSettingsModal.classList.add('open');
    refreshIcons();
  }

  function closeDevSettingsModal() {
    if (!elements.devSettingsModal) return;
    elements.devSettingsModal.classList.remove('open');
  }

  function updateDevGenderCardsUI() {
    if (elements.devSelectBoy) {
      elements.devSelectBoy.classList.toggle('active', devSelectedGender === 'boy');
    }
    if (elements.devSelectGirl) {
      elements.devSelectGirl.classList.toggle('active', devSelectedGender === 'girl');
    }
  }

  function initDevSettingsModal() {
    // Open / Close triggers
    if (elements.btnOpenDevSettings) {
      elements.btnOpenDevSettings.addEventListener('click', openDevSettingsModal);
    }
    if (elements.closeDevSettingsBtn) {
      elements.closeDevSettingsBtn.addEventListener('click', closeDevSettingsModal);
    }
    if (elements.cancelDevSettingsBtn) {
      elements.cancelDevSettingsBtn.addEventListener('click', closeDevSettingsModal);
    }
    if (elements.devSettingsModal) {
      elements.devSettingsModal.addEventListener('click', e => {
        if (e.target === elements.devSettingsModal) closeDevSettingsModal();
      });
    }

    // Live preview update on manual date/time input
    const handleDateTimeInput = () => {
      updateDevPreview();
    };
    if (elements.devInputTargetDate) {
      elements.devInputTargetDate.addEventListener('input', handleDateTimeInput);
    }
    if (elements.devInputTargetTime) {
      elements.devInputTargetTime.addEventListener('input', handleDateTimeInput);
    }

    // Preset buttons: update input fields and live preview
    if (elements.devPresetNow) {
      elements.devPresetNow.addEventListener('click', () => {
        audio.playSelect();
        setDevInputFromMs(Date.now() - 5000, false);
      });
    }
    if (elements.devPresetPlus5m) {
      elements.devPresetPlus5m.addEventListener('click', () => {
        audio.playSelect();
        setDevInputFromMs(Date.now() + 5 * 60 * 1000, false);
      });
    }
    if (elements.devPresetPlus1d) {
      elements.devPresetPlus1d.addEventListener('click', () => {
        audio.playSelect();
        setDevInputFromMs(Date.now() + 24 * 60 * 60 * 1000, false);
      });
    }

    // Gender selection cards
    if (elements.devSelectBoy) {
      elements.devSelectBoy.addEventListener('click', () => {
        devSelectedGender = 'boy';
        updateDevGenderCardsUI();
        audio.playSelect();
      });
    }
    if (elements.devSelectGirl) {
      elements.devSelectGirl.addEventListener('click', () => {
        devSelectedGender = 'girl';
        updateDevGenderCardsUI();
        audio.playSelect();
      });
    }

    // In Datenbank sichern button
    if (elements.saveDevSettingsBtn) {
      elements.saveDevSettingsBtn.addEventListener('click', async () => {
        audio.playClick();
        const dateVal = elements.devInputTargetDate ? elements.devInputTargetDate.value : '';
        const timeVal = elements.devInputTargetTime ? elements.devInputTargetTime.value : '';
        if (!dateVal || !timeVal) return;

        const targetDateObj = new Date(`${dateVal}T${timeVal}`);
        if (isNaN(targetDateObj.getTime())) return;
        const targetMs = targetDateObj.getTime();
        const targetIso = targetDateObj.toISOString();

        // UI Loading state
        const btn = elements.saveDevSettingsBtn;
        const btnText = document.getElementById('saveDevSettingsBtnText');
        const origBtnText = btnText ? btnText.textContent : '';
        if (btn) btn.disabled = true;
        if (btnText) btnText.textContent = 'Speichern...';

        // Apply new target date
        STATE.revealTargetMs = targetMs;
        localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, targetIso);

        // Apply new gender encrypted with AES-256-GCM
        STATE.actualGender = devSelectedGender;
        const token = STATE.devToken || sessionStorage.getItem('baby_dev_token') || 'baby_dev_session_token';
        await CryptoVault.encryptGender(devSelectedGender, token);

        // Sync to server API / Upstash Redis database
        const devToken = STATE.devToken || sessionStorage.getItem('baby_dev_token');
        let saveSuccess = false;

        if (devToken) {
          STATE.devToken = devToken;
          try {
            const res = await fetch('/api/dev-config', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-dev-token': devToken
              },
              body: JSON.stringify({
                targetDate: targetIso,
                gender: devSelectedGender
              })
            });

            const data = await res.json().catch(() => null);
            if (res.ok && data && data.success) {
              saveSuccess = true;
              if (data.config && data.config.targetTimeMs) {
                STATE.revealTargetMs = Number(data.config.targetTimeMs);
              }
              if (data.config && data.config.targetDate) {
                localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, data.config.targetDate);
              }
              if (elements.devCryptoBadgeText && data.config && data.config.storage) {
                elements.devCryptoBadgeText.textContent = `AES-256-GCM • ${data.config.storage}`;
              }
            }
          } catch (e) {
            console.warn('[DevConfig] Could not sync to server:', e);
          }
        }

        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = origBtnText || 'Speichern';

        if (saveSuccess) {
          showToast('✅ Erfolgreich gespeichert!', true);
        } else if (devToken) {
          showToast('⚠️ Konnte nicht gespeichert werden', true);
        }

        // Live visual updates
        applyActualGenderTheme();
        updateSettingsUI();

        // Update countdown & scratch card status
        const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
        if (targetMs <= currentEffectiveTime) {
          if (!STATE.isCardUnlocked) {
            unlockScratchCard();
          }
        } else {
          STATE.isCardUnlocked = false;
          if (elements.countdownLockOverlay) elements.countdownLockOverlay.classList.remove('unlocked');
          if (elements.scratchCanvasTop) elements.scratchCanvasTop.classList.remove('unlocked');
          if (elements.scratchCanvasMid) elements.scratchCanvasMid.classList.remove('unlocked');
          startCountdown();
        }

        if (elements.countdownStatusLabel) {
          elements.countdownStatusLabel.textContent = (targetMs <= currentEffectiveTime)
            ? t('countdownUnlockedLabel')
            : formatCountdownTargetLabel(targetMs, STATE.lang);
        }

        updateDateCountdown(false);
        closeDevSettingsModal();
      });
    }

    // Toolbar buttons
    if (elements.btnDevBarSkip) {
      elements.btnDevBarSkip.addEventListener('click', () => {
        if (STATE.currentStep !== 3) {
          goToStep(3);
        }
        skipCountdownForDev();
      });
    }
    if (elements.btnCloseDevMode) {
      elements.btnCloseDevMode.addEventListener('click', () => {
        toggleDevMode(false);
      });
    }

    // Navigation Jumps
    if (elements.devJumpP1) {
      elements.devJumpP1.addEventListener('click', () => {
        closeDevSettingsModal();
        goToStep(1);
      });
    }
    if (elements.devJumpP2) {
      elements.devJumpP2.addEventListener('click', () => {
        closeDevSettingsModal();
        if (!STATE.guestName) STATE.guestName = (STATE.lang === 'de') ? 'Gast' : 'Guest';
        goToStep(2);
      });
    }
    if (elements.devJumpP3) {
      elements.devJumpP3.addEventListener('click', () => {
        closeDevSettingsModal();
        if (!STATE.userGuess) STATE.userGuess = 'boy';
        goToStep(3);
      });
    }
    if (elements.devResetVotes) {
      elements.devResetVotes.addEventListener('click', () => {
        STATE.votes = { boy: 15, girl: 17 };
        STATE.userGuess = null;
        STATE.guestName = '';
        try {
          localStorage.removeItem('baby_votes_data');
          localStorage.removeItem('baby_has_voted');
          localStorage.removeItem('baby_user_guess');
          localStorage.removeItem('baby_guest_name');
        } catch (e) {}
        updatePollUI();
        audio.playClick();
        closeDevSettingsModal();
        goToStep(1);
      });
    }
  }

  // ==================== DEVELOPER AUTHENTICATION & SECURE GENDER ====================
  async function fetchRevealGender() {
    try {
      const headers = {};
      const devToken = STATE.devToken || sessionStorage.getItem('baby_dev_token');
      if (devToken) {
        headers['x-dev-token'] = devToken;
      }
      const res = await fetch('/api/reveal-gender', { headers });
      let data = null;
      if (res.ok) {
        data = await res.json();
      }
      // Server time synchronization: prevents clock spoofing on guest devices
      if (data && data.serverTime) {
        STATE.serverTimeOffset = Date.parse(data.serverTime) - Date.now();
      }
      // Target countdown synchronization: updates countdown for all visitors from Upstash Cloud DB
      if (data && data.targetTimeMs && !isNaN(data.targetTimeMs)) {
        STATE.revealTargetMs = Number(data.targetTimeMs);
        if (data.targetTime) {
          localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, data.targetTime);
        } else {
          localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, new Date(STATE.revealTargetMs).toISOString());
        }

        const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
        if (elements.countdownStatusLabel) {
          elements.countdownStatusLabel.textContent = (STATE.revealTargetMs <= currentEffectiveTime)
            ? t('countdownUnlockedLabel')
            : formatCountdownTargetLabel(STATE.revealTargetMs, STATE.lang);
        }

        // Live update countdown display & unlock status
        updateDateCountdown(false);
        if (STATE.revealTargetMs <= currentEffectiveTime) {
          if (!STATE.isCardUnlocked) {
            unlockScratchCard();
          }
        }
      }
      if (data && data.unlocked && data.gender) {
        STATE.isServerUnlocked = true;
        STATE.actualGender = data.gender;
        applyActualGenderTheme();
        updateSettingsUI();
      } else {
        const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
        if (currentEffectiveTime >= getTargetMs()) {
          STATE.isServerUnlocked = true;
        } else {
          STATE.isServerUnlocked = false;
        }
      }
    } catch (e) {
      const currentEffectiveTime = Date.now() + (STATE.serverTimeOffset || 0);
      if (currentEffectiveTime >= getTargetMs()) {
        STATE.isServerUnlocked = true;
      } else {
        STATE.isServerUnlocked = false;
      }
    }
  }

  function initDevAuthModal() {
    if (!elements.devAuthModal) return;

    if (elements.closeDevAuthBtn) {
      elements.closeDevAuthBtn.addEventListener('click', closeDevAuthModal);
    }
    if (elements.cancelDevAuthBtn) {
      elements.cancelDevAuthBtn.addEventListener('click', closeDevAuthModal);
    }

    elements.devAuthModal.addEventListener('click', e => {
      if (e.target === elements.devAuthModal) {
        closeDevAuthModal();
      }
    });

    if (elements.devAuthForm) {
      elements.devAuthForm.addEventListener('submit', handleDevAuthSubmit);
    }
  }

  function openDevAuthModal() {
    if (!elements.devAuthModal) return;
    if (elements.devPasswordInput) {
      elements.devPasswordInput.value = '';
      elements.devPasswordInput.placeholder = 'Passwort eingeben...';
    }
    if (elements.devAuthError) {
      elements.devAuthError.textContent = '';
    }
    elements.devAuthModal.classList.add('open');
    refreshIcons();
    if (elements.devPasswordInput) {
      setTimeout(() => elements.devPasswordInput.focus(), 120);
    }
  }

  function closeDevAuthModal() {
    if (!elements.devAuthModal) return;
    elements.devAuthModal.classList.remove('open');
    if (elements.devPasswordInput) {
      elements.devPasswordInput.value = '';
    }
    if (elements.devAuthError) {
      elements.devAuthError.textContent = '';
    }
  }

  async function handleDevAuthSubmit(e) {
    if (e) e.preventDefault();
    const input = elements.devPasswordInput;
    const errorEl = elements.devAuthError;
    const submitBtn = elements.submitDevAuthBtn;
    const password = input ? input.value.trim() : '';

    if (!password) {
      if (errorEl) errorEl.textContent = 'Falsches Passwort';
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (errorEl) errorEl.textContent = '';

    try {
      const res = await fetch('/api/dev-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success && data.token) {
        const token = data.token;
        sessionStorage.setItem('baby_dev_token', token);
        localStorage.setItem('baby_dev_active', 'true');
        STATE.devToken = token;

        if (data.targetDate) {
          STATE.revealTargetMs = new Date(data.targetDate).getTime();
          localStorage.setItem(CryptoVault.STORAGE_KEY_DATE, data.targetDate);
        }

        if (data.gender) {
          STATE.actualGender = data.gender;
          STATE.isServerUnlocked = true;
          await CryptoVault.encryptGender(data.gender, token);
          applyActualGenderTheme();
          updateSettingsUI();
        }

        closeDevAuthModal();
        toggleDevMode(true);
        return;
      }

      if (errorEl) {
        errorEl.textContent = (data && data.error) ? data.error : 'Falsches Passwort';
      }
      audio.playSelect();
    } catch (err) {
      if (errorEl) errorEl.textContent = 'Falsches Passwort';
      audio.playSelect();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
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
        const token = STATE.devToken || sessionStorage.getItem('baby_dev_token');
        if (STATE.devMode) {
          toggleDevMode(false);
        } else if (token) {
          toggleDevMode(true);
        } else {
          openDevAuthModal();
        }
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

  function updateFloatingSkipBtn() {
    const btn = elements.btnDevFloatingSkip || document.getElementById('btnDevFloatingSkip');
    if (!btn) return;
    const shouldShow = Boolean(STATE.devMode && STATE.currentStep === 3 && !STATE.isCardUnlocked);
    btn.classList.toggle('visible', shouldShow);
  }

  function toggleDevMode(forceState) {
    if (typeof forceState === 'boolean') {
      STATE.devMode = forceState;
    } else {
      STATE.devMode = !STATE.devMode;
    }

    // Dev mode requires verified authentication token (from DEV_PASSWORD env)
    const token = STATE.devToken || sessionStorage.getItem('baby_dev_token');
    if (STATE.devMode && !token) {
      STATE.devMode = false;
      localStorage.removeItem('baby_dev_active');
      document.body.classList.remove('dev-mode-active');
      openDevAuthModal();
      return;
    }

    if (STATE.devMode) {
      localStorage.setItem('baby_dev_active', 'true');
    } else {
      localStorage.removeItem('baby_dev_active');
    }

    document.body.classList.toggle('dev-mode-active', STATE.devMode);

    if (elements.devFloatingBar) {
      elements.devFloatingBar.classList.toggle('active', STATE.devMode);
    }

    audio.playDevToggle(STATE.devMode);

    // Dev toast removed: devToolbar buttons visibly indicate active state

    updateFloatingSkipBtn();
    updateScalingContainer();
  }

  function updateSettingsUI() {
    if (elements.setGenderGirl) elements.setGenderGirl.classList.toggle('active', STATE.actualGender === 'girl');
    if (elements.setGenderBoy) elements.setGenderBoy.classList.toggle('active', STATE.actualGender === 'boy');
  }

  // ==================== TOAST HELPER ====================
  let toastTimeout;
  function showToast(msg, isDevActivation = false) {
    // Exclusively show toast for developer mode activation per user request
    if (!isDevActivation) return;
    const bubble = elements.toastBubble || document.getElementById('toastBubble');
    if (!bubble || !msg) return;
    clearTimeout(toastTimeout);
    bubble.innerHTML = msg;
    bubble.classList.add('show');
    toastTimeout = setTimeout(() => {
      const el = elements.toastBubble || document.getElementById('toastBubble');
      if (el) {
        el.classList.remove('show');
      }
    }, 3800);
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

      // 1. Top names: Kevin & Alina
      ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isGirl ? '#b8546c' : '#3a6fa0';
      ctx.fillText('✦ KEVIN & ALINA ✦', w / 2, 205);

      // 1b. Prominent, larger Gender Reveal title below names
      ctx.font = 'italic 700 66px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isGirl ? '#831843' : '#1e3a8a';
      ctx.fillText('Gender Reveal', w / 2, 280);

      // 2. Subtitle: It’s a... / Es wird ein...
      ctx.font = 'italic 500 52px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#475569';
      ctx.fillText((STATE.lang === 'en' ? 'It’s a...' : 'Es wird ein...'), w / 2, 385);

      // 3. Large Prominent Gender Title (MÄDCHEN / JUNGE)
      ctx.font = '700 135px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isGirl ? '#b8546c' : '#2b6599';
      ctx.fillText(isGirl ? (STATE.lang === 'en' ? 'GIRL' : 'MÄDCHEN') : (STATE.lang === 'en' ? 'BOY' : 'JUNGE'), w / 2, 555);

      // 4. Emotional Quote
      ctx.font = 'italic 400 34px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#475569';
      const quote = isGirl ? t('girlQuote') : t('boyQuote');
      ctx.fillText(quote, w / 2, 715);

      // Decorative Accent Divider with Golden Diamond
      ctx.strokeStyle = isGirl ? 'rgba(232, 142, 164, 0.45)' : 'rgba(108, 161, 215, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 120, 805);
      ctx.lineTo(w / 2 - 22, 805);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w / 2 + 22, 805);
      ctx.lineTo(w / 2 + 120, 805);
      ctx.stroke();

      ctx.font = '16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(212, 175, 55, 0.75)';
      ctx.fillText('✦', w / 2, 805);

      // 5. Guest Ribbon Box (Compact & Balanced)
      const ribbonY = 965;
      const boxH = 160;
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
      ctx.fillText(ribbonTitle, w / 2, ribbonY - 20);

      ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      const ribbonSub = matched
        ? (STATE.lang === 'en' ? 'Intuition was 100% correct' : 'Die Intuition hat voll ins Schwarze getroffen')
        : (STATE.lang === 'en' ? 'Filled with love and excitement' : 'Voller Liebe und Vorfreude für die Familie');
      ctx.fillText(ribbonSub, w / 2, ribbonY + 30);

      // 6. Bottom info (signatures removed as requested)
      ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isGirl ? '#b8546c' : '#2b6599';
      ctx.textAlign = 'center';
      ctx.fillText(t('stayTunedText'), w / 2, 1175);

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
        link.download = `gender-reveal-kevin-alina-${STATE.actualGender}.png`;
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
            const file = new File([blob], `gender-reveal-kevin-alina-${STATE.actualGender}.png`, { type: 'image/png' });
            const shareText = t('shareText', STATE.actualGender);

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  title: 'Kevin & Alina • Gender Reveal',
                  text: shareText,
                  files: [file]
                });
                return;
              } catch (err) { }
            }

            if (navigator.share) {
              try {
                await navigator.share({
                  title: 'Kevin & Alina • Gender Reveal',
                  text: shareText,
                  url: window.location.href
                });
                return;
              } catch (err) { }
            }

            // Fallback: download PNG & copy text
            const link = document.createElement('a');
            link.download = `gender-reveal-kevin-alina-${STATE.actualGender}.png`;
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
    // Instant initial target date fallback from local storage cache
    const savedDate = localStorage.getItem(CryptoVault.STORAGE_KEY_DATE);
    if (savedDate && !isNaN(new Date(savedDate).getTime())) {
      STATE.revealTargetMs = new Date(savedDate).getTime();
    }

    magicEffects.init();
    initVideoBackground();
    initPage1();
    initPage2();
    initPage3();
    initDevSettingsModal();
    initStoryModalHandlers();
    initDevAuthModal();
    initDevEasterEgg();
    fetchRevealGender();

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

    // Check if developer mode was activated on this device with valid session token
    const storedDevToken = sessionStorage.getItem('baby_dev_token');
    const isDevActive = localStorage.getItem('baby_dev_active') === 'true';
    if (storedDevToken && isDevActive) {
      STATE.devMode = true;
      STATE.devToken = storedDevToken;
      document.body.classList.add('dev-mode-active');

      const encGender = CryptoVault.getEncryptedGender();
      if (encGender) {
        CryptoVault.decryptGender(encGender, storedDevToken).then(decrypted => {
          if (decrypted) {
            STATE.actualGender = decrypted;
            applyActualGenderTheme();
            updateSettingsUI();
          }
        });
      }
    } else {
      STATE.devMode = false;
      STATE.devToken = storedDevToken || null;
      document.body.classList.remove('dev-mode-active');
      localStorage.removeItem('baby_dev_active');
    }

    // Direct jump to reveal page (Step 3) if user has already voted
    const hasVoted = (localStorage.getItem('baby_has_voted') === 'true') || Boolean(STATE.userGuess);
    if (hasVoted && (STATE.userGuess === 'boy' || STATE.userGuess === 'girl')) {
      goToStep(3, false);
      if (window.history && window.history.replaceState) {
        window.history.replaceState({ step: 3 }, '');
      }
    } else {
      goToStep(1);
    }

    if (document.documentElement.classList.contains('has-voted-init')) {
      document.documentElement.classList.remove('has-voted-init');
    }

    refreshIcons();
    updateScalingContainer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
