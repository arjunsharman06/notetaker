const fs = require('fs');
const path = require('path');

// Created entry in .DB
const createNotes = (body, notesArray) => {

	const note = body;
	notesArray.push(note);

	writeInDB(notesArray);
	return note;
}

// Writing in DB
const writeInDB = (notesArray) => {

	fs.writeFileSync(
		path.join(__dirname, '../db/db.json'),
		JSON.stringify(notesArray, null, 2)
	);
};

// Validation
const validateContent = (body) => {
	if (body.title === "") {
		return false
	}
	return true
}

// Get By ID
const getByID = (id, notesArray) => {

	return notesArray.filter(note => note.id === id);
};

// Get All
const getAll = (id = "", notesArray) => {

	let notes = notesArray;
	if (!!id) {
		notes = notesArray.filter(note => note.id !== id);
		writeInDB(notes);
	}

	return notes;
}

module.exports = {
	createNotes,
	validateContent,
	getByID,
	getAll
};