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
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
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
    store.add(note);

    transaction.oncomplete = function() {
        console.log("Note added:", note);
        displayNote(note);
    };

    transaction.onerror = function(event) {
        console.error("Transaction error:", event.target.error);
    };
}

// Display a note in the DOM
function displayNote(note) {
    const container = document.getElementById("stickynotes_container");
    const section = document.createElement("section");
    section.contentEditable = true;
    section.className = note.color;
    section.textContent = note.note;
    container.appendChild(section);

    section.addEventListener("input", function() {
        saveNote(note.id, section.textContent);
    });
}

// Save a note after editing
function saveNote(id, content) {
    const transaction = db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");
    const request = store.get(id);

    request.onsuccess = function(event) {
        const note = event.target.result;
        note.note = content;
        store.put(note);
        console.log("Note saved:", note);
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


