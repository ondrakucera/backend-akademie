import express from "express";
const app = express();

app.get("/hello-world", (req, res) => {
	res.send("Hello world!");
});

app.get("/hello-world-json", (req, res) => {
	res.json({ message: "Hello world!", serverTime: new Date().toISOString() });
});

app.listen(3000);
