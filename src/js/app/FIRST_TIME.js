// First time visit handler
document.addEventListener('DOMContentLoaded', function() {
    const FIRST_TIME_KEY = 'stickynotes_visited';
    const firstTimeElement = document.getElementById('FIRST_TIME');
    const gotItButton = firstTimeElement.querySelector('.got-it-btn');

    // Check if this is the first visit
    function isFirstTimeVisit() {
        return !localStorage.getItem(FIRST_TIME_KEY);
    }

    // Mark as visited
    function markAsVisited() {
        localStorage.setItem(FIRST_TIME_KEY, 'true');
        firstTimeElement.style.display = 'none';
    }

    // Show first time guide if needed
    if (isFirstTimeVisit()) {
        firstTimeElement.style.display = 'block';
    }

    // Handle "Got it" button click
    gotItButton.addEventListener('click', markAsVisited);
});