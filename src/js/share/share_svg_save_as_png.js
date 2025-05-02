document.getElementById('save_SVG_as_PNG_button').addEventListener('click', function() {
    const svgElement = document.querySelector('.share_note_svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Get device pixel ratio and SVG dimensions
    const pixelRatio = window.devicePixelRatio || 1;
    const svgWidth = svgElement.width.baseVal.value;
    const svgHeight = svgElement.height.baseVal.value;

    // Set canvas dimensions accounting for device pixel ratio
    canvas.width = svgWidth * pixelRatio;
    canvas.height = svgHeight * pixelRatio;
    canvas.style.width = svgWidth + 'px';
    canvas.style.height = svgHeight + 'px';

    // Scale canvas context for retina displays
    ctx.scale(pixelRatio, pixelRatio);

    // Create a Blob from the SVG data
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        // Draw the SVG onto the canvas
        ctx.drawImage(img, 0, 0, svgWidth, svgHeight);

        // Convert the canvas to a PNG data URL with maximum quality
        const pngDataUrl = canvas.toDataURL('image/png', 1.0);

        // Handle download based on platform
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // For mobile: Open image in new tab
            window.open(pngDataUrl);
        } else {
            // For desktop: Traditional download
            const downloadLink = document.createElement('a');
            downloadLink.href = pngDataUrl;
            downloadLink.download = 'stickynote.png';
            downloadLink.click();
        }

        // Clean up
        URL.revokeObjectURL(url);
    };

    img.src = url;
});