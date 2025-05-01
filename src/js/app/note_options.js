document.addEventListener('DOMContentLoaded', function() {
    const noteOptions = document.querySelector('.note_options');
    const notesContainer = document.getElementById('stickynotes_container');

    noteOptions.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.className);
    });

    notesContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    notesContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const className = event.dataTransfer.getData('text/plain');
        const targetNote = event.target.closest('section');

        if (targetNote) {
            if (className.includes('note_copy')) {
                navigator.clipboard.writeText(targetNote.innerText).then(() => {
                    console.log('Note content copied to clipboard');
                });
            } else if (className.includes('note_color')) {
                const colors = ['red', 'green', 'purple', 'yellow', 'blue', 'orange'];
                const currentColor = colors.find(color => targetNote.classList.contains(color));
                const newColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
                targetNote.classList.remove(currentColor);
                targetNote.classList.add(newColor);
            } else if (className.includes('note_delete')) {
                const noteId = parseInt(targetNote.dataset.id);
                if (noteId) {
                    deleteNote(noteId);
                    targetNote.remove();
                    console.log('Note deleted');
                }
            }
        }
    });
});