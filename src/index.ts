// require('dotenv').config();

import express from "express";
import { getGithubCommits } from "./service/GithubCrawler";
// import cors from "cors";

const PORT = 3000;

const app = express();
app.use(express.json());
// app.use(cors());

app.get("/testApi", async (req, res) => {
	res.end("launch successfully...");
})

app.post("/githubCommit/all", async (req, res) => {
	res.end(await getGithubCommits(req.body));
});

app.listen(process.env.PORT ?? PORT, () => {
	console.log(`Express server running on port: ${process.env.PORT ?? PORT}`);
});