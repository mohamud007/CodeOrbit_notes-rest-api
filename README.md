
# Notes REST API

A simple Notes Management web application built using Node.js, Express.js, HTML, CSS, and JavaScript.

## Features

- Create new notes
- View all notes
- Update existing notes
- Delete notes
- Validate required fields
- Handle invalid note IDs
- Responsive frontend design
- REST API testing with Postman

## Technologies Used

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- Postman

## Project Structure

notes-rest-api/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md

## Installation

1. Install Node.js.
2. Clone or download this repository.
3. Open a terminal in the project folder.
4. Install dependencies:

   npm install

5. Start the server:

   node server.js

6. Open http://localhost:3000 in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create a note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |

## Example Request

POST /api/notes

Content-Type: application/json

{
  "title": "Learn Express",
  "content": "Build my first REST API"
}

## Storage

This project uses an in-memory array to store notes. Data is temporary and resets when the server restarts.

## Future Improvements

- Add persistent storage using a JSON file or database
- Add user authentication
- Add automated API tests


