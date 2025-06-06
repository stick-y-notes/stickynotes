document.addEventListener('DOMContentLoaded', function() {
    const noteOptions = document.querySelector('.note_options');
    const notesContainer = document.getElementById('stickynotes_container');
    const alertElement = document.querySelector('.note_options_alert');
    let touchSource = null;

    noteOptions.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.className);
    });

    noteOptions.addEventListener('touchstart', function(event) {
        touchSource = event.target;
        event.preventDefault();
    }, { passive: false });

    notesContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    notesContainer.addEventListener('touchmove', function(event) {
        if (touchSource) {
            event.preventDefault();
        }
    }, { passive: false });

    function showAlert(message, duration = 2000) {
        alertElement.textContent = message;
        alertElement.style.display = 'block';
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, duration);
    }

    function handleDrop(event, className, targetNote) {
        if (targetNote) {
            if (className.includes('note_copy')) {
                navigator.clipboard.writeText(targetNote.innerText).then(() => {
                    showAlert('note content copied to clipboard');
                });
            } else if (className.includes('note_color')) {
                const colors = ['red', 'green', 'purple', 'yellow', 'blue', 'orange'];
                const currentColor = colors.find(color => targetNote.classList.contains(color));
                const newColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
                targetNote.classList.remove(currentColor);
                targetNote.classList.add(newColor);
                showAlert('note color changed');
            } else if (className.includes('note_delete')) {
                const noteId = parseInt(targetNote.dataset.id);
                if (noteId) {
                    deleteNote(noteId);
                    targetNote.remove();
                    showAlert('note deleted');
                }
            }
        }
    }

    notesContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const className = event.dataTransfer.getData('text/plain');
        const targetNote = event.target.closest('section');
        handleDrop(event, className, targetNote);
    });

    notesContainer.addEventListener('touchend', function(event) {
        if (touchSource) {
            const touch = event.changedTouches[0];
            const targetNote = document.elementFromPoint(touch.clientX, touch.clientY).closest('section');
            if (targetNote) {
                handleDrop(event, touchSource.className, targetNote);
            }
            touchSource = null;
            event.preventDefault();
        }
    }, { passive: false });
});