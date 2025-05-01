document.addEventListener('DOMContentLoaded', function() {
    const SETTINGS_KEY = 'stickynotes_settings';
    
    // Check if we should bypass index
    function shouldBypassIndex() {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            return settings.bypassIndex || false;
        }
        return false;
    }

    // Redirect to app if bypass is enabled
    if (shouldBypassIndex()) {
        // Check if we're on the index page
        if (window.location.pathname.endsWith('index.html') || 
            window.location.pathname.endsWith('/')) {
            window.location.href = './app.html';
        }
    }
});