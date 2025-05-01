// notes 
// create 
// edit
// list

// Initialize IndexedDB
const dbName = "StickyNotesDB";
const dbVersion = 1;
let db;

function initDB() {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("notes")) {
            db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
            console.log("Object store 'notes' created.");
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully.");
        loadNotes();
    };

    request.onerror = function(event) {
        console.error("Database error:", event.target.error);
    };
}

// Create a new note
function createNote() {
    const note = {
        color: "yellow",
        note: "Hello World!"
    };

    const transaction = db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.add(note);

    request.onsuccess = function(event) {
        note.id = event.target.result; // Assign the generated ID to the note
        console.log("Note added successfully:", note);
        displayNote(note);
    };

    transaction.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}

// Display a note in the DOM
const colors = ['red', 'green', 'purple', 'yellow', 'blue', 'orange'];

function displayNote(note) {
    const container = document.getElementById("stickynotes_container");
    const section = document.createElement("section");
    section.contentEditable = true;
    section.className = note.color;
    section.textContent = note.note;
    section.dataset.id = note.id;
    container.appendChild(section);

    console.log("Note displayed:", note);

    section.addEventListener("input", function() {
        saveNote(note.id, section.textContent);
    });

    // Save color changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const color = Array.from(section.classList).find(cls => colors.includes(cls));
                if (color) saveNote(note.id, section.textContent, color);
            }
        });
    });
    
    observer.observe(section, { attributes: true });
}

// Save a note after editing
function saveNote(id, content, color) {
    const transaction = db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.get(id);

    request.onsuccess = function(event) {
        const note = event.target.result;
        note.note = content;
        if (color) note.color = color;
        store.put(note);
        console.log("Note saved successfully:", note);
    };

    request.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}

// Load notes on page load
function loadNotes() {
    const transaction = db.transaction(["notes"], "readonly");
    const store = transaction.objectStore("notes");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const notes = event.target.result;
        console.log("Notes loaded successfully:", notes);
        notes.forEach(displayNote);
    };

    request.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}

// Event listener for the create button
document.getElementById("CREATE_BUTTON").addEventListener("click", createNote);

// Initialize the database
initDB();


function deleteNote(id) {
    const transaction = db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.delete(id);

    request.onsuccess = function(event) {
        console.log("Note deleted successfully from database.");
    };

    request.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}


