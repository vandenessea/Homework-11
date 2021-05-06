// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const express = require('express');
const path = require('path');
const fs = require('fs');

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

//This reads data from the db.json file
let notes = fs.readFileSync('./db/db.json');
notes = JSON.parse(notes);
//console.log(notes)


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));//This loads my CSS page


//These are the ROUTES instructions for the server to do something(like an address)
app.get('/', (request, response) => response.sendFile(path.join(__dirname, '/public/index.html'))); 
//Route for notes
app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, '/public/notes.html')));
//This is going to read the data itself from db.json
app.get('/api/notes', (request, response) => response.json(notes));



//POST Data to database (db.json for this application)
app.post('/api/notes', (request, response) => {
  //add object to notes array
  const newNote = request.body
  //log data in console
  console.log("Adding Note: ", newNote);
  //add data to notes array
  notes.push(newNote);
  response.end();
});







// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });





  