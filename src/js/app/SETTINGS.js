// Settings handler
document.addEventListener('DOMContentLoaded', function() {
    const SETTINGS_KEY = 'stickynotes_settings';
    const settingsButton = document.getElementById('OPEN_SETTINGS_BUTTON');
    const settingsPanel = document.getElementById('SETTINGS');
    const settingsForm = settingsPanel.querySelector('form');
    const bypassIndexCheckbox = document.getElementById('bypass_index');

    // Load saved settings
    function loadSettings() {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            bypassIndexCheckbox.checked = settings.bypassIndex || false;
        }
    }

    // Save settings
    function saveSettings(e) {
        e.preventDefault();
        const settings = {
            bypassIndex: bypassIndexCheckbox.checked
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        settingsPanel.style.display = 'none';
        
        // Show confirmation
        const alert = document.querySelector('.note_options_alert');
        alert.textContent = 'Settings saved!';
        alert.style.display = 'block';
        setTimeout(() => alert.style.display = 'none', 2000);
    }

    // Toggle settings panel
    settingsButton.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
    });

    // Handle form submission
    settingsForm.addEventListener('submit', saveSettings);

    // Initial load
    loadSettings();
});