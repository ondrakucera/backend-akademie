import express from "express";
const app = express();

app.get("/hello-world", (req, res) => {
	res.send("Hello world!");
});

app.listen(3000);
