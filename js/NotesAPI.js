export default class NotesAPI {
    // Method to get all notes from localStorage
    static getAllNotes() {
        // Retrieve the notes from localStorage, defaulting to an empty array if not found
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        // Sort the notes by the updated date in descending order (most recent first)
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    // Method to save a new note or update an existing one
    static saveNote(noteToSave) {
        // Retrieve the current list of notes
        const notes = NotesAPI.getAllNotes();

        // Find if there is an existing note with the same ID
        const existing = notes.find(note => note.id == noteToSave.id);

        // If the note exists, update its title, body, and updated timestamp
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            // If the note doesn't exist, assign a new ID and updated timestamp, and add it to the list
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        // Save the updated list of notes back to localStorage
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    // Method to delete a note by its ID
    static deleteNote(id) {
        // Retrieve the current list of notes
        const notes = NotesAPI.getAllNotes();

        // Filter out the note with the given ID
        const newNotes = notes.filter(note => note.id != id);

        // Save the filtered list of notes back to localStorage
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}