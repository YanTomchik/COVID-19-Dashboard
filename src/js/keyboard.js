import { ru } from './ru-keyboard.js';
import { en } from './en-keyboard.js';

const rowsOrder = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowLeft', 'ArrowRight'],
  ['SwitchLang', 'VoiceInput', 'Space', 'Sound', 'Check'],
];

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.list_search_item');
const keyboardWrapper = document.getElementById('keyboard-wrapper');
const keyboardShowKey = document.querySelector('.keyboard_icon');

let keyboardShowState = false;
let switcher = false;
let shiftSwitcher = false;
let langSwitcher = 'ru';
let soundSwitcher = false;
let voiceSwitcher = false;

// keyboardWrapper.style.bottom === '-100%'

function keyboardGen(lang = ru) {
  for (let i = 0; i < rowsOrder.length; i++) {
    let key;
    for (let j = 0; j < rowsOrder[i].length; j++) {
      for (let k = 0; k < lang.length; k++) {
        if (lang[k].code === rowsOrder[i][j]) {
          key = lang[k];
        }
      }
      if (key.code === 'Delete' || key.code === 'Backspace' || key.code === 'Enter') {
        keyboard.innerHTML
          += `<div class="keyboard-key spcl-key"><div class="letter letter-sollo">${key.small}</div></div><br>`;
      } else if (key.shift === null) {
        if (key.code === 'ShiftLeft' || key.code === 'CapsLock' || key.code === 'Sound' || key.code === 'VoiceInput') {
          if (key.code === 'CapsLock') {
            keyboard.innerHTML
              += `<br><div class="keyboard-key key-switchable spcl-key" id="${key.code.toLowerCase()}"><div class="letter letter-sollo">${key.small}</div></div >`;
          } else {
            keyboard.innerHTML
              += `<div class="keyboard-key key-switchable spcl-key" id="${key.code.toLowerCase()}"><div class="letter letter-sollo">${key.small}</div></div >`;
          }
        } else if (key.code === 'Space') {
          keyboard.innerHTML
            += `<div class="keyboard-key key-extra-long spcl-key"><div class="letter letter-sollo">${key.small}</div></div >`;
        } else if (key.code === 'ArrowLeft' || key.code === 'ArrowRight') {
          if (key.code === 'ArrowRight') {
            keyboard.innerHTML
              += `<div class="keyboard-key spcl-key"><div class="letter letter-sollo">${key.small}</div></div><br>`;
          } else {
            keyboard.innerHTML
              += `<div class="keyboard-key spcl-key"><div class="letter letter-sollo">${key.small}</div></div >`;
          }
        } else if (key.code === 'Tab' || key.code === 'SwitchLang' || key.code === 'Check') {
          keyboard.innerHTML = `${keyboard.innerHTML
          }<div class="keyboard-key spcl-key"><div class="letter letter-sollo">${key.small}</div></div >`;
        }
      } else if (key.small === key.shift.toLowerCase()) {
        keyboard.innerHTML
          += `<div class="keyboard-key"><div class="letter letter-sollo">${key.small}</div></div >`;
      } else {
        keyboard.innerHTML
          += `<div class="keyboard-key"><div class="index index-inactive">${key.shift}</div><div class="letter ">${key.small}</div></div>`;
        // }
      }
    }
  }
  const keysTemp = document.querySelectorAll('.keyboard-key');
  if (window.innerWidth < 540) {
    for (let i = 0; i < keysTemp.length; i++) {
      if (keysTemp[i].innerText === 'Backspace') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'CapsLock') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'Enter') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'Shift') {
        keysTemp[i].style.width = '65px';
      }
    }
  }
}

function addKeyKode(keys) {
  const rowsOrderTemp = rowsOrder.flat();
  for (let i = 0; i < keys.length; i++) {
    keys[i].keyCode = rowsOrderTemp[i];
  }
}

function keysNormalize(keys) {
  if (window.innerWidth > 540 || window.innerWidth === 540) {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].innerText === 'Backspace') {
        keys[i].style.width = '100px';
      }
      if (keys[i].innerText === 'CapsLock') {
        keys[i].style.width = '100px';
      }
      if (keys[i].innerText === 'Enter') {
        keys[i].style.width = '100px';
      }
      if (keys[i].innerText === 'Shift') {
        keys[i].style.width = '100px';
      }
    }
  }
  addKeyKode(keys);
}

function keysEventListener() {
  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('mousedown', keysActions);
    keys[i].addEventListener('mousedown', keysSound);
  }
}

keyboardWrapper.addEventListener('mousedown', () => { event.preventDefault(); });
keyboardGen(en);

keyboardWrapper.style.bottom === '-100%';

let keys = document.querySelectorAll('.keyboard-key');

keysNormalize(keys);
keysEventListener();

function keysActions() {
  // console.log(event.target.closest('.keyboard-key').lastElementChild.innerText)
  const element = event.target.closest('.keyboard-key');
  event.preventDefault();
  if (element.lastElementChild.innerText.toLowerCase() === 'capslock' || event.target.closest('.keyboard-key').lastElementChild.innerText.toLowerCase() === 'shift') {
    event.target.closest('.key-switchable').classList.toggle('key-switchable-active');
    if (switcher === false) {
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i].classList.contains('spcl-key')) {
          keys[i].lastElementChild.innerText = keys[i].lastElementChild.innerText.toUpperCase();
        }
      }
      switcher = true;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i].classList.contains('spcl-key')) {
          keys[i].lastElementChild.innerText = keys[i].lastElementChild.innerText.toLowerCase();
        }
      }
      switcher = false;
    }
  } else if (element.lastElementChild.innerText === '✔') {
    keyboardShowState = false;
    keyboardWrapper.style.bottom = '-100%';
    textarea.blur();
  } else if (element.lastElementChild.innerText === 'ru' || element.lastElementChild.innerText === 'en') {
    switcher = false;
    shiftSwitcher = false;
    keyboard.innerHTML = '';
    soundSwitcher = false;
    if (event.target.closest('.letter').innerText === 'ru') {
      keyboardGen(en);
      langSwitcher = 'en';
    } else {
      keyboardGen(ru);
      langSwitcher = 'ru';
    }
    keys = document.querySelectorAll('.keyboard-key');
    keysNormalize(keys);
    keysEventListener();
  } else if (!element.classList.contains('spcl-key') && document.activeElement === textarea) {
    if (shiftSwitcher === false) {
      textarea.setRangeText(element.lastElementChild.innerText);
      textarea.selectionStart++;
    } else {
      textarea.setRangeText(element.firstElementChild.innerText);
      textarea.selectionStart++;
    }
  } else if (element.lastElementChild.innerText === 'Backspace' && textarea.selectionEnd !== 0) {
    textarea.selectionStart--;
    textarea.setRangeText('');
  } else if (element.lastElementChild.innerText === 'Tab') {
    textarea.setRangeText('\t');
    textarea.selectionStart++;
  } else if (element.lastElementChild.innerText === 'Enter') {
    textarea.setRangeText('\n');
    textarea.selectionStart++;
  } else if (element.lastElementChild.innerText === '') {
    textarea.setRangeText(' ');
    textarea.selectionStart++;
  } else if (element.lastElementChild.innerText === '←' || element.lastElementChild.innerText === '→') {
    if (element.lastElementChild.innerText === '←' && textarea.selectionEnd !== 0) {
      textarea.selectionEnd--;
    } else if (element.lastElementChild.innerText === '→') {
      textarea.selectionStart++;
    }
  } else if (element.lastElementChild.innerText === '🎤' || element.lastElementChild.innerText === '🔔') {
    if (element.lastElementChild.innerText === '🎤') {
      if (voiceSwitcher === false) {
        voiceSwitcher = true;
        element.classList.add('key-switchable-active');
        voiceInputFunc();
      } else {
        voiceSwitcher = false;
        element.classList.remove('key-switchable-active');
      }
    } else if (soundSwitcher === false) {
      soundSwitcher = true;
      element.classList.add('key-switchable-active');
    } else {
      soundSwitcher = false;
      element.classList.remove('key-switchable-active');
    }
  }

  if (element.lastElementChild.innerText.toLowerCase() === 'shift') {
    if (shiftSwitcher === false) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].firstElementChild.classList.contains('index')) {
          keys[i].firstElementChild.classList.toggle('index-inactive');
          keys[i].lastElementChild.classList.toggle('letter-inactive');
        }
      }
      shiftSwitcher = true;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].firstElementChild.classList.contains('index')) {
          keys[i].firstElementChild.classList.toggle('index-inactive');
          keys[i].lastElementChild.classList.toggle('letter-inactive');
        }
      }
      shiftSwitcher = false;
    }
  }
}

function keysSound() {
  if (soundSwitcher === true) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/sounds/tink.wav';
    audio.play();
  }
}

document.addEventListener('keydown', (event) => {
  const capsLock = document.getElementById('capslock');
  const shift = document.getElementById('shiftleft');
  const { code } = event;
  const keys = document.querySelectorAll('.keyboard-key');
  if (event.code === 'Tab') {
    event.preventDefault();
    textarea.setRangeText('\t');
    textarea.selectionStart++;
  } else if (event.code === 'CapsLock' || event.code === 'ShiftLeft') {
    if (switcher === false) {
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i].classList.contains('spcl-key')) {
          keys[i].lastElementChild.innerText = keys[i].lastElementChild.innerText.toUpperCase();
        }
      }
      switcher = true;
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i].classList.contains('spcl-key')) {
          keys[i].lastElementChild.innerText = keys[i].lastElementChild.innerText.toLowerCase();
        }
      }
      switcher = false;
    }

    if (event.code === 'CapsLock') {
      capsLock.classList.toggle('key-switchable-active');
    } else {
      shift.classList.toggle('key-switchable-active');
    }
  }
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].keyCode === code) {
      keys[i].classList.add('keyboard-key-hover');
    }
  }
});
document.addEventListener('keyup', (event) => {
  const { code } = event;
  const keys = document.querySelectorAll('.keyboard-key');
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].keyCode === code) {
      keys[i].classList.remove('keyboard-key-hover');
    }
  }
});

function showKeyboard() {
  if (!keyboardShowState) {
    keyboardShowState = true;
    keyboardWrapper.style.bottom = '0';
    textarea.focus();
    keyboardWrapper.classList.add('keyboard-wrapper-active');
  } else {
    keyboardShowState = false;
    keyboardWrapper.style.bottom = '-100%';
    textarea.blur();
    keyboardWrapper.classList.remove('keyboard-wrapper-active');
  }
}

window.addEventListener('resize', () => {
  const keysTemp = document.querySelectorAll('.keyboard-key');
  if (window.innerWidth < 540) {
    for (let i = 0; i < keysTemp.length; i++) {
      if (keysTemp[i].innerText === 'Backspace') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'CapsLock') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'Enter') {
        keysTemp[i].style.width = '65px';
      }
      if (keysTemp[i].innerText === 'Shift') {
        keysTemp[i].style.width = '65px';
      }
    }
  } else {
    for (let i = 0; i < keysTemp.length; i++) {
      if (keysTemp[i].innerText === 'Backspace') {
        keysTemp[i].style.width = '100px';
      }
      if (keysTemp[i].innerText === 'CapsLock') {
        keysTemp[i].style.width = '100px';
      }
      if (keysTemp[i].innerText === 'Enter') {
        keysTemp[i].style.width = '100px';
      }
      if (keysTemp[i].innerText === 'Shift') {
        keysTemp[i].style.width = '100px';
      }
    }
  }
});

// Voice input
function voiceInputFunc() {
  if (langSwitcher === 'ru') {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';
    // console.log(event)

    recognition.addEventListener('result', (e) => {
      // console.log(e.results)
      const transcript = Array.from(e.results)

        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      if (voiceSwitcher === false) {
        return;
      }
      if (e.results[0].isFinal) {
        textarea.setRangeText(` ${transcript}`);
        textarea.selectionStart = textarea.selectionStart + transcript.length + 1;
      }
    });
    recognition.addEventListener('end', () => {
      if (voiceSwitcher === true) {
        recognition.start();
      }
    });
    recognition.start();
  } else if (langSwitcher === 'en') {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)

        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      if (voiceSwitcher === false) {
        return;
      }
      if (e.results[0].isFinal) {
        textarea.setRangeText(` ${transcript}`);
        textarea.selectionStart = textarea.selectionStart + transcript.length + 1;
      }
    });
    recognition.addEventListener('end', () => {
      if (voiceSwitcher === true) {
        recognition.start();
      }
    });
    recognition.start();
  }
}

keyboardShowKey.addEventListener('click', showKeyboard);

export { keyboardGen, keyboard };
