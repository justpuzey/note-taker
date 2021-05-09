//Instantiate Server
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

// import { v4 as idCreator } from 'uuid';
const idCreator = require('uuid');

//Data Source
let { notes } = require('./db/db');
notes = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

//Post new note
app.post('/api/notes', (req, res) => {


  const { title, text } = req.body
  const newID = idCreator.v4()

  notes.push({ title, text, id: newID })

  console.log(notes)
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes))
  res.send('File Received')
})

// Retrieves a note with specific id
app.get("/api/notes/:id", (req, res) => {
  res.json(notes[req.params.id]);
});

// Deletes a note with specific id
app.delete("/api/notes/:id", function (req, res) {
  notes.splice(notes.indexOf(req.params.id), 1);
  console.log(notes.indexOf(req.params.id))
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes))

  console.log("Deleted note with id " + req.params.id);
  location.reload()
});

//Listen 
app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});