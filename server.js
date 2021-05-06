//Instantiate Server
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

//Data Source
const { notes } = require('./db/db');

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
  const notes = fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8')
  res.json(JSON.parse(notes));
});

app.post('/api/notes', (req, res) => {
  const note = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), 'utf8'));
  note.push(req.body)
  console.log(note)
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(note))
  res.send('File Received')
})

//Listen 
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});