import { data } from './data.js';

window.getLine = getLine;

const closingVerse = document.getElementById('closingVerse'); 
closingVerse.innerHTML = `<p>Closing Verse: ${data.closingVerse.verse}</p><p>Meaning: ${data.closingVerse.meaning}</p>`;

function getLine() {
    const lineNum = document.getElementById('line').value;
    const resultSection = document.querySelector('.result'); 
    const result = data.verses.find(verse => verse.id == lineNum); // Find the verse with the matching id
    
    if (result) {
        resultSection.classList.add('verse');
        resultSection.innerHTML = `<p>Verse: ${result.verse}</p><p>Meaning: ${result.meaning}</p>`;
    } else {
        resultSection.innerHTML = `<p>No verse found for this line number.</p>`;
    }
}
