const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const {
	addNote,
	getNotes,
	removeNote,
	editNote,
} = require("./notes.controller");
const { addUser } = require("./users.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/register", async (req, res) => {
	res.render("register", {
		title: "Express app",
		error: undefined,
	});
});

app.post("/register", async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password);
		res.redirect("/login");
	} catch (e) {
		console.log(e);
		res.render("register", {
			title: "Express app",
			error: e.message,
		});
	}
});

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express app",
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

app.post("/", async (req, res) => {
	try {
		await addNote(req.body.title);
		res.render("index", {
			title: "Express app",
			notes: await getNotes(),
			created: true,
			error: false,
		});
	} catch (e) {
		console.error("Creation error", e);
		res.render("index", {
			title: "Express app",
			notes: await getNotes(),
			created: false,
			error: true,
		});
	}
});

app.delete("/:id", async (req, res) => {
	await removeNote(req.params.id);
	res.render("index", {
		title: "Express app",
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

app.put("/:id", async (req, res) => {
	await editNote(req.params.id, req.body.title);
	res.render("index", {
		title: "Express app",
		notes: await getNotes(),
		created: false,
		error: false,
	});
});

mongoose
	.connect(
		"mongodb+srv://mcf:result_school2023@result.sgeroau.mongodb.net/notes?retryWrites=true&w=majority"
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server has been started on port: ${port}`);
		});
	});

//урок 5 минута 8:16
