// Function to update text length CSS variable
function updateTextLength() {
    const textElement = document.querySelector('.svg_note_text');
    if (textElement) {
        const textLength = textElement.textContent.trim().length;
        textElement.style.setProperty('--text-length', textLength);
    }
}

// Initial update
document.addEventListener('DOMContentLoaded', updateTextLength);

// Update when text changes
const textElement = document.querySelector('.svg_note_text');
if (textElement) {
    const observer = new MutationObserver(updateTextLength);
    observer.observe(textElement, { 
        characterData: true, 
        childList: true, 
        subtree: true 
    });
}