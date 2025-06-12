import { data } from './data.js';

window.getLine = getLine;

const closingVerse = document.getElementById('closingVerse');
closingVerse.innerHTML = `<p>Closing Verse: ${data.closingVerse.verse}</p><p>Meaning: ${data.closingVerse.meaning}</p>`;

const speakBtn = document.getElementById('speakBtn');
const playAllBtn = document.getElementById('playAllBtn');
const pauseBtn = document.getElementById('pauseBtn');

let currentText = '';
let currentPlayIndex = parseInt(localStorage.getItem("pausedIndex")) || 0;
let isPaused = false;
let utterance = null;

function getLine() {
    const lineNum = document.getElementById('line').value;
    const resultSection = document.querySelector('.result');
    const result = data.verses.find(verse => verse.id == lineNum);

    if (result) {
        resultSection.classList.add('verse');
        resultSection.innerHTML = `<p>Verse: ${result.verse}</p><p>Meaning: ${result.meaning}</p>`;
        currentText = `${result.verse}. Meaning: ${result.meaning}`;
        speakBtn.style.display = 'inline-block';
    } else {
        resultSection.innerHTML = `<p>No verse found for this line number.</p>`;
        currentText = '';
        speakBtn.style.display = 'none';
    }
}

speakBtn.addEventListener('click', () => {
    if (currentText) {
        speak(currentText);
    }
});

playAllBtn.addEventListener('click', () => {
    isPaused = false;
    playVersesFrom(currentPlayIndex);
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
    speechSynthesis.cancel(); // Stop current speech
    localStorage.setItem("pausedIndex", currentPlayIndex); // Save progress
});

function speak(text, onEndCallback) {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';

    utterance.onend = () => {
        if (onEndCallback) onEndCallback();
    };

    speechSynthesis.speak(utterance);
}

function playVersesFrom(index) {
    if (index >= data.verses.length || isPaused) return;

    const verse = data.verses[index];
    const textToSpeak = `${verse.verse}. Meaning: ${verse.meaning}`;
    const resultSection = document.querySelector('.result');
    resultSection.innerHTML = `<p>Verse: ${verse.verse}</p><p>Meaning: ${verse.meaning}</p>`;

    currentPlayIndex = index;
    localStorage.setItem("pausedIndex", currentPlayIndex); // Update on each play

    speak(textToSpeak, () => {
        if (!isPaused) {
            playVersesFrom(index + 1);
        }
    });
}
