const uuid = require('uuid');
const notes = require('../../db/db.json');
const router = require('express').Router();
const {
	createNotes,
	validateContent,
	getByID,
    getAll
} = require('../../lib/notes');

// Get Request : All
router.get('/notes', (req, res) => {
	let allNotes  = getAll("",notes);    
    res.send(allNotes);
});

// Get Request : By ID
router.get('/notes/:id', (req, res) => {

    console.log(req.params.id);
	const note = getByID(req.params.id, notes);
	if (Object.keys(note).length <= 0) {
		return res.status(404).send(['No data found']);
	}
	res.json(note);
});

// Post Request
router.post('/notes', (req, res) => {
	req.body.id = uuid.v4();
	console.log(req.body);

	if (!validateContent(req.body)) {
		return res.status(400).send(['Title of the notes cannot be blank']);
	}
	const note = createNotes(req.body, notes);
	res.json(note);
});

// Delete Request
router.delete('/notes/:id', (req, res) => {

	const note = getAll(req.params.id, notes);
   
	if (Object.keys(note).length <= 0) {
		return res.status(404).send(['No data found']);
	}
	res.json(note);
});

module.exports = router;