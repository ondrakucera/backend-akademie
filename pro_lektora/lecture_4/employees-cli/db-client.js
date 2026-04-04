import pkg from "pg";

const { Client } = pkg;

const client = new Client({
	host: "localhost",
	port: 5432,
	database: "reactgirls_backend_akademie",
	user: "ondra",
});

export default client;
