import express from "express";

const DINOSAURS = [
	{
		id: 1,
		name: "Tyrannosaurus",
		description:
			"Tyrannosaurus („tyranský ještěr“ – odvozeno ze starořeckého τύραννος – tyrannos = vládce, resp. krutovládce; v případě druhu T. rex pak latinského rex = král) byl jeden z největších masožravých dinosaurů (teropodů) a zároveň jedním z největších suchozemských predátorů všech dob.",
		period: "křída",
		wikipediaAddress: "https://cs.wikipedia.org/wiki/Tyrannosaurus",
	},
	{
		id: 2,
		name: "Stegosaurus",
		description:
			"Stegosaurus („zastřešený ještěr“) byl rod ptakopánvého dinosaura, který žil v období pozdní jury (asi před 150 miliony let) na území Severní Ameriky. Jeho pojmenování znamená „střechovitý či zastřešený ještěr“, toto označení dostal podle plochých desek, menší měl na krku a větší na hřbetě a přední části ocasu.",
		period: "jura",
		wikipediaAddress: "https://cs.wikipedia.org/wiki/Stegosaurus",
	},
	{
		id: 3,
		name: "Iguanodon",
		description:
			"Iguanodon (z latiny: „leguání zub“, český název je také iguanodon) je rod ornitopodního dinosaura, který se vývojově nacházel někde mezi prvními hbitými dvounohými hypsilofodonty a kachnozobými dinosaury, jimiž věk ornitopodů vrcholil.",
		period: "křída",
		wikipediaAddress: "https://cs.wikipedia.org/wiki/Iguanodon",
	},
	{
		id: 4,
		name: "Velociraptor",
		description:
			"Velociraptor byl rod poměrně malého teropodního dinosaura, patřícího mezi dravé dromeosauridy. Byl zástupcem skupiny velociraptorinů, menších „srpodrápých“ teropodů, obývajících severní kontinenty v období pozdní křídy.",
		period: "křída",
		wikipediaAddress: "https://cs.wikipedia.org/wiki/Velociraptor",
	},
	{
		id: 5,
		name: "Brontosaurus",
		description:
			"Brontosaurus (z řec. βροντή, brontē = hrom + σαυρος, sauros = ještěr: „hřmotný ještěr“ či „hromový ještěr“) byl rod velkého sauropodního dinosaura z čeledi Diplodocidae. Žil v období svrchní jury, asi před 155 až 152 miliony let na území západu Severní Ameriky.",
		period: "jura",
		wikipediaAddress: "https://cs.wikipedia.org/wiki/Brontosaurus_(dinosaurus)",
	},
];

const app = express();
app.use(express.json());

// Obtains all dinosaurs.
app.get("/dinosaurs", (request, response) => {
	response.json(DINOSAURS);
});

// Obtains a dinosaur by its ID.
app.get("/dinosaurs/:id", (request, response) => {
	const dinosaur = DINOSAURS.find((dinosaur) => dinosaur.id === Number(request.params.id));
	response.json(dinosaur);
});

// Creates a new dinosaur.
app.post("/dinosaurs", (request, response) => {
	const newId = Math.max(...DINOSAURS.map((dinosaur) => dinosaur.id)) + 1;
	const newDinosaur = {
		...request.body,
		id: newId,
	};
	DINOSAURS.push(newDinosaur);
	response.status(201).json(newId);
});

// Updates a dinosaur.
app.put("/dinosaurs/:id", (request, response) => {
	const index = DINOSAURS.findIndex((dinosaur) => dinosaur.id === Number(request.params.id));
	DINOSAURS[index] = {
		...request.body,
		id: Number(request.params.id),
	};
	response.status(204).send();
});

// Deletes a dinosaur.
app.delete("/dinosaurs/:id", (request, response) => {
	const index = DINOSAURS.findIndex((dinosaur) => dinosaur.id === Number(request.params.id));
	DINOSAURS.splice(index, 1);
	response.status(204).send();
});

app.listen(3000);
