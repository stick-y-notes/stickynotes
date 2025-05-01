// Export notes functionality
document.addEventListener('DOMContentLoaded', function() {
    const exportButton = document.getElementById('export_notes');

    function exportNotes() {
        const transaction = db.transaction(["notes"], "readonly");
        const store = transaction.objectStore("notes");
        const request = store.getAll();

        request.onsuccess = function(event) {
            const notes = event.target.result;
            const exportData = JSON.stringify(notes, null, 2);
            
            // Create blob and download link
            const blob = new Blob([exportData], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `stickynotes_backup_${new Date().toISOString().split('T')[0]}.json`;
            
            // Trigger download
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Show confirmation
            const alert = document.querySelector('.note_options_alert');
            alert.textContent = 'Notes exported successfully!';
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 2000);
        };

        request.onerror = function(event) {
            console.error("Export error:", event.target.error);
            const alert = document.querySelector('.note_options_alert');
            alert.textContent = 'Export failed!';
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 2000);
        };
    }

    exportButton.addEventListener('click', exportNotes);
});