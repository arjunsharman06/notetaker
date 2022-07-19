const express = require('express');
const uuid = require('uuid');
const notes = require('./db/db.json');
const {
	createNotes,
	validateContent,
	getByID,
    getAll
} = require('./lib/notes.js');

// Creating an instance of express
const app = express();

// Assigning the PORT 
const PORT = process.env.PORT || 3000;

// Handle the url encoded data
app.use(express.urlencoded({
	extended: true
}));

// Handle the raw json
app.use(express.json());

// Include the static folder using the middleware (i.e public folder)
app.use(express.static(`public`));

// Get All
app.get('/api/notes', (req, res) => {
	let allNotes  = getAll("",notes);
    
    if(Object.keys(allNotes).length <= 0){
        return res.status(400).send([`No Data found!!`]);
    }
    res.send(allNotes);
});

// Get By ID
app.get('/api/notes/:id', (req, res) => {

    console.log(req.params.id);
	const note = getByID(req.params.id, notes);
	if (Object.keys(note).length <= 0) {
		return res.status(404).send(['No data found']);
	}
	res.json(note);
});

// Post Request
app.post('/api/notes', (req, res) => {
	req.body.id = uuid.v4();
	console.log(req.body);

	if (!validateContent(req.body)) {
		return res.status(400).send(['Title of the notes cannot be blank']);
	}
	const note = createNotes(req.body, notes);
	res.json(note);
});

// Delete Request
app.delete('/api/notes/:id', (req, res) => {

    console.log("hello")
	const note = getAll(req.params.id, notes);
   
	if (Object.keys(note).length <= 0) {
		return res.status(404).send(['No data found']);
	}
	res.json(note);
});

// Listening 
app.listen(PORT, (req, res) => console.log(`Listening on the Port ${PORT}`));