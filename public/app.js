document.addEventListener("click", (event) => {
	if (event.target.dataset.type === "remove") {
		const id = event.target.dataset.id;

		remove(id).then(() => {
			event.target.closest("li").remove();
		});
	} else if (event.target.dataset.type === "edit") {
		const id = event.target.dataset.id;

		let title = prompt("Введите новое название задачи", "");

		if (title) {
			edit(id, title).then(() => {
				window.location.reload();
			});
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: "DELETE",
	});
}

async function edit(id, title) {
	await fetch(`/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
		}),
	});
}
