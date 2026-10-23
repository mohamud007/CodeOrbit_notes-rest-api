
/*
 * Notes Manager frontend
 * Communicates with the Express REST API using fetch().
 */

// API endpoint for all notes
const API_URL = '/api/notes';

// Get HTML elements
const noteForm = document.getElementById('noteForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const notesList = document.getElementById('notesList');
const message = document.getElementById('message');
const saveButton = document.getElementById('saveButton');

// Track the ID of the note currently being edited
let editingId = null;

// Display feedback messages
function showMessage(text) {
    message.textContent = text;
}

// Load notes from the backend and display them
async function loadNotes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to load notes.');
        }

        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        showMessage(error.message);
    }
}

// Render notes as cards on the webpage
function displayNotes(notes) {
    notesList.replaceChildren();

    if (notes.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'Your notes will appear here.';
        notesList.appendChild(emptyMessage);
        return;
    }

    notes.forEach((note) => {
        const card = document.createElement('article');
        card.className = 'note-card';

        const heading = document.createElement('h3');
        heading.textContent = note.title;

        const content = document.createElement('p');
        content.textContent = note.content;

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';

        // Fill the form with the selected note
        editButton.addEventListener('click', () => {
            titleInput.value = note.title;
            contentInput.value = note.content;
            editingId = note.id;
            saveButton.textContent = 'Update Note';
            showMessage('Editing note...');
            titleInput.focus();
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = '#dc2626';

        // Delete the note through the backend API
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_URL}/${note.id}`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to delete note.');
                }

                showMessage('Note deleted successfully.');
                await loadNotes();
            } catch (error) {
                showMessage(error.message);
            }
        });

        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '10px';
        actions.style.marginTop = '15px';

        actions.append(editButton, deleteButton);
        card.append(heading, content, actions);
        notesList.appendChild(card);
    });
}

// Create a note or update an existing note
noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        showMessage('Please enter both a title and content.');
        return;
    }

    // Choose POST for a new note and PUT for an existing note
    const isEditing = editingId !== null;
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to save note.');
        }

        showMessage(isEditing ? 'Note updated.' : 'Note added.');

        // Reset the form after a successful save
        noteForm.reset();
        editingId = null;
        saveButton.textContent = 'Add Note';

        // Refresh the list using data from the backend
        await loadNotes();
    } catch (error) {
        showMessage(error.message);
    }
});

// Load saved notes when the page opens
loadNotes();
