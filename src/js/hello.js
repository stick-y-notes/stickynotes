// 🟨 Sticky Note JS
const Sticky_Note_JS_message = "🟨 Welcome to Sticky Note! JavaScript is loaded.";
console.log(Sticky_Note_JS_message);




// ❌ 📲
// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add event listener to ENTER_BUTTON
document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('ENTER_BUTTON');
    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            if (isMobileDevice()) {
                e.preventDefault();
                alert('Sorry, this app is currently only available on desktop devices.');
            }
        });
    }
});