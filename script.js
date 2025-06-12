import { data } from './data.js';

window.getLine = getLine;

const closingVerse = document.getElementById('closingVerse');
closingVerse.innerHTML = `<p>Closing Verse: ${data.closingVerse.verse}</p><p>Meaning: ${data.closingVerse.meaning}</p>`;

const speakBtn = document.getElementById('speakBtn');
let currentText = '';

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
        const utterance = new SpeechSynthesisUtterance(currentText);
        utterance.lang = 'en-IN'; // Indian English, or try 'hi-IN' for Hindi
        speechSynthesis.speak(utterance);
    }
});
