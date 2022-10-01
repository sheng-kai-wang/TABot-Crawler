// import { createServer, IncomingMessage, ServerResponse } from 'http';

// const port = 5000;

// const server = createServer((request: IncomingMessage, response: ServerResponse) => {
//   response.on('error', (err) => {
//     console.error(err);
//   });
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end('Hello world!');
// });

// server.listen(port);
// console.log(`server is running on http://localhost:5000`);

// ================================================

// require("dotenv").config();
// import express from "express";
// import cors from "cors";
// import { MongoOperator } from "./src/MongoOperator";
// import { getCalendarTable } from "./src/Crawler";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(express.static(__dirname + "/public"));

// app.get("/calendar", async (req, res) => {
//   const { account } = req.query;
//   if (!account) {
//     res.sendStatus(400);
//     return;
//   }
//   res.json(await MongoOperator.Instance.getRecordByAccount(account as string));
// });

// app.post("/fetchCalendar", async (req, res) => {
//   const { account, password } = req.body;
//   let record = await MongoOperator.Instance.getRecordByAccount(account);
//   if (!record) record = { account, calendar: "" };

//   const calendar = await getCalendarTable(account, password);
//   record.calendar = calendar;
//   res.json(await MongoOperator.Instance.saveRecord(record));
// });

// app.listen(process.env.PORT ?? 3000, () => {
//   console.log(`Express server running on port: ${process.env.PORT ?? 3000}`);
// });

// ==========================================================

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
	// res.end(await getGithubCommits(req.body));
	res.end(await getGithubCommits(req.body));
});

app.listen(process.env.PORT ?? PORT, () => {
	console.log(`Express server running on port: ${process.env.PORT ?? PORT}`);
});

// ==============================================================================

// req.body {
// 	groupName: 'GROUP 1',
// 	repositoryList: [
// 	  { username: 'sheng-kai-wang', repository: 'TABot' },
// 	  { username: 'sheng-kai-wang', repository: 'TABot2' }
// 	]
//   }

// [
// 	{
// 		"groupName": "GROUP 1",
// 		"repositoryList":
// 			[
// 				{
// 					"username": "sheng-kai-wang",
// 					"repository": "TABot"
// 				},
// 				{
// 					...
// 		    }
// 			]
// 	},
// 	{
// 		...
// 	}
// ]