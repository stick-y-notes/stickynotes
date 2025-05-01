document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save_SVG_button');
    const svgElement = document.querySelector('.share_note_svg');

    saveButton.addEventListener('click', function() {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'stickynote.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});