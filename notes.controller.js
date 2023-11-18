const Note = require("./models/Note");

async function addNote(title) {
	await Note.create({ title });

	console.log("note has been created");
}

async function getNotes() {
	const notes = await Note.find();

	return notes;
}

async function removeNote(id) {
	await Note.deleteOne({ _id: id });
}

async function editNote(id, title) {
	await Note.updateOne({ _id: id, title });
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote,
};
