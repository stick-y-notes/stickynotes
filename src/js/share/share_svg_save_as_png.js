// Function to check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show mobile warning message if on mobile device
if (isMobile()) {
    document.querySelector('.mobile_message').style.display = 'block';
}

document.getElementById('save_SVG_as_PNG_button').addEventListener('click', async function() {
    const svgElement = document.querySelector('.share_note_svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size based on SVG dimensions
    const pixelRatio = window.devicePixelRatio || 1;
    const svgWidth = svgElement.width.baseVal.value;
    const svgHeight = svgElement.height.baseVal.value;
    canvas.width = svgWidth * pixelRatio;
    canvas.height = svgHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    // Create and load image
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(svgBlob);

    await new Promise((resolve) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
            URL.revokeObjectURL(img.src);
            resolve();
        };
    });

    // Convert to PNG and create download link
    const pngBlob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 1.0);
    });

    const downloadUrl = URL.createObjectURL(pngBlob);
    
    if (isMobile()) {
        // On mobile, open in new tab
        window.open(downloadUrl, '_blank');
        // Clean up after a delay
        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
        }, 1000);
    } else {
        // On desktop, use download link
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'stickynote.png';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Clean up
        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(downloadLink);
        }, 100);
    }
});