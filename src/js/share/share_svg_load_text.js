// Define db as a global variable
let db;

// Function to initialize the database and load notes into the dropdown
function initAndLoadNotes() {
    const dbName = "StickyNotesDB";
    const dbVersion = 1;

    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function(event) {
        db = event.target.result;
        loadNotesIntoDropdown(db);
    };

    request.onerror = function(event) {
        console.error("Database error:", event.target.error);
    };
}

// Function to load notes into the dropdown menu
function loadNotesIntoDropdown(db) {
    const transaction = db.transaction(["notes"], "readonly");
    const store = transaction.objectStore("notes");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const notes = event.target.result;
        const dropdown = document.getElementById("note_select");
        notes.forEach(note => {
            const option = document.createElement("option");
            option.value = note.id;
            option.textContent = note.note;
            dropdown.appendChild(option);
        });
    };

    request.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}

// Function to load the selected note into the SVG text area
function loadSelectedNote() {
    const dropdown = document.getElementById("note_select");
    dropdown.addEventListener("change", function() {
        const noteId = dropdown.value;
        if (noteId !== "blank") {
            const transaction = db.transaction(["notes"], "readonly");
            const store = transaction.objectStore("notes");
            const request = store.get(Number(noteId));

            request.onsuccess = function(event) {
                const note = event.target.result;
                const textElement = document.querySelector('.svg_note_text');
                textElement.textContent = note.note;
            };

            request.onerror = function(event) {
                console.error("Transaction error:", event.target.error);
            };
        }
    });
}

// Initialize the database and set up event listeners
document.addEventListener('DOMContentLoaded', function() {
    initAndLoadNotes();
    loadSelectedNote();
});