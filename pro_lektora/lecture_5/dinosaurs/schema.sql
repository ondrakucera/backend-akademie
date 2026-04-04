-- Dinosaur table
CREATE TABLE dinosaur (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	description VARCHAR(4096) NOT NULL,
	period VARCHAR(32) NOT NULL,
	wikipedia_address VARCHAR(4096) NOT NULL
);

-- Insert sample data into dinosaur table
INSERT INTO dinosaur (name, description, period, wikipedia_address)
VALUES (
	'Tyrannosaurus',
	'Tyrannosaurus („tyranský ještěr" – odvozeno ze starořeckého τύραννος – tyrannos = vládce, resp. krutovládce; v případě druhu T. rex pak latinského rex = král) byl jeden z největších masožravých dinosaurů (teropodů) a zároveň jedním z největších suchozemských predátorů všech dob.',
	'křída',
	'https://cs.wikipedia.org/wiki/Tyrannosaurus'
);
INSERT INTO dinosaur (name, description, period, wikipedia_address)
VALUES (
	'Stegosaurus',
	'Stegosaurus („zastřešený ještěr") byl rod ptakopánvého dinosaura, který žil v období pozdní jury (asi před 150 miliony let) na území Severní Ameriky. Jeho pojmenování znamená „střechovitý či zastřešený ještěr", toto označení dostal podle plochých desek, menší měl na krku a větší na hřbetě a přední části ocasu.',
	'jura',
	'https://cs.wikipedia.org/wiki/Stegosaurus'
);
INSERT INTO dinosaur (name, description, period, wikipedia_address)
VALUES (
	'Iguanodon',
	'Iguanodon (z latiny: „leguání zub", český název je také iguanodon) je rod ornitopodního dinosaura, který se vývojově nacházel někde mezi prvními hbitými dvounohými hypsilofodonty a kachnozobými dinosaury, jimiž věk ornitopodů vrcholil.',
	'křída',
	'https://cs.wikipedia.org/wiki/Iguanodon'
);
INSERT INTO dinosaur (name, description, period, wikipedia_address)
VALUES (
	'Velociraptor',
	'Velociraptor byl rod poměrně malého teropodního dinosaura, patřícího mezi dravé dromeosauridy. Byl zástupcem skupiny velociraptorinů, menších „srpodrápých" teropodů, obývajících severní kontinenty v období pozdní křídy.',
	'křída',
	'https://cs.wikipedia.org/wiki/Velociraptor'
);
INSERT INTO dinosaur (name, description, period, wikipedia_address)
VALUES (
	'Brontosaurus',
	'Brontosaurus (z řec. βροντή, brontē = hrom + σαυρος, sauros = ještěr: „hřmotný ještěr" či „hromový ještěr") byl rod velkého sauropodního dinosaura z čeledi Diplodocidae. Žil v období svrchní jury, asi před 155 až 152 miliony let na území západu Severní Ameriky.',
	'jura',
	'https://cs.wikipedia.org/wiki/Brontosaurus_(dinosaurus)'
);
