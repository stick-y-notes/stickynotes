document.getElementById('save_SVG_as_PNG_button').addEventListener('click', function() {
    const svgElement = document.querySelector('.share_note_svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set canvas dimensions to match SVG
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;

    // Create a Blob from the SVG data
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function() {
        // Draw the SVG onto the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a PNG data URL
        const pngDataUrl = canvas.toDataURL('image/png');

        // Create a link to download the PNG
        const downloadLink = document.createElement('a');
        downloadLink.href = pngDataUrl;
        downloadLink.download = 'stickynote.png';
        downloadLink.click();

        // Clean up
        URL.revokeObjectURL(url);
    };

    img.src = url;
});