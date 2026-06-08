import express from "express";

const app = express();

app.get("/hello-world", (request, response) => {
	response.send("Hello world!");
});

app.get("/hello-world-json", (request, response) => {
	response.json({
		message: "Hello world!",
		serverTime: new Date().toISOString(),
	});
});

app.listen(3000);
