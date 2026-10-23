# Notes REST API

A simple Notes REST API built using Node.js and Express.js, with a frontend that allows users to create, view, edit, and delete notes.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **HTML5** – Frontend structure
- **CSS3** – Frontend styling
- **JavaScript** – Frontend interactions and API requests
- **REST API** – CRUD operations using HTTP methods
- **Git & GitHub** – Version control and code hosting

## Features

- Create new notes
- View all notes
- Update existing notes
- Delete notes
- Validate note title and content
- Handle invalid requests and missing notes

## Setup Instructions

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### 1. Clone the repository

```bash
git clone https://github.com/mohamud007/CodeOrbit_notes-rest-api.git
```

### 2. Open the project directory

```bash
cd CodeOrbit_notes-rest-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open the application

Open your browser and visit:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Retrieve all notes |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Important Note

Notes are currently stored in memory, so they reset when the server restarts.

## GitHub Repository

https://github.com/mohamud007/CodeOrbit_notes-rest-api
