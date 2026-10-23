
const express = require('express');
const path = require('path');

// Create the Express application
const app = express();
const PORT = 3000;

// Allow Express to read JSON request bodies
app.use(express.json());

// Serve the HTML, CSS, and JavaScript frontend
app.use(express.static(path.join(__dirname, 'public')));

// Temporary in-memory storage for notes
let notes = [];
let nextId = 1;

// GET: Retrieve all notes
app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
});

// POST: Create a new note
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    // Validate the required fields
    if (
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        !title.trim() ||
        !content.trim()
    ) {
        return res.status(400).json({
            message: 'Title and content are required.'
        });
    }

    // Create a new note with a unique ID
    const newNote = {
        id: nextId++,
        title: title.trim(),
        content: content.trim()
    };

    // Save the note in memory
    notes.push(newNote);

    // Return the created note
    res.status(201).json(newNote);
});

/*
 * PUT: Update an existing note using its ID
 */
app.put('/api/notes/:id', (req, res) => {
    // Convert the ID from the URL into a number
    const id = Number(req.params.id);

    // Find the note we want to update
    const note = notes.find((item) => item.id === id);

    // Return 404 if the note does not exist
    if (!note) {
        return res.status(404).json({
            message: 'Note not found.'
        });
    }

    const { title, content } = req.body;

    // Require both fields to contain non-empty strings
    if (
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        !title.trim() ||
        !content.trim()
    ) {
        return res.status(400).json({
            message: 'Title and content are required.'
        });
    }

    // Update the existing note
    note.title = title.trim();
    note.content = content.trim();

    // Return the updated note
    res.status(200).json(note);
});

/*
 * DELETE: Remove an existing note using its ID
 */
app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);

    // Find the index of the note to delete
    const noteIndex = notes.findIndex((item) => item.id === id);

    // Return 404 if the note does not exist
    if (noteIndex === -1) {
        return res.status(404).json({
            message: 'Note not found.'
        });
    }

    // Remove one note from the array
    const deletedNote = notes.splice(noteIndex, 1)[0];

    // Return the deleted note as confirmation
    res.status(200).json({
        message: 'Note deleted successfully.',
        note: deletedNote
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
