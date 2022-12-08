const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import { Database } from "./database";
const database = new Database(8);

const port = process.env.PORT || 3000;

// NOTE 下の二つがないと正常に動作しないので注意。
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/", (req: any, res: any) => {
    const userID = req.body["userID"];
    database.resister(userID);
    res.sendStatus(200);
});

app.post("/stamp", (req: any, res: any) => {
    const userID = req.body["userID"];
    const projectHash = req.body["projectHash"];
    database.collectStamp(userID, projectHash);
    res.sendStatus(200);
});

app.post("/judge", (req: any, res: any) => {
    const userID = req.body["userID"];
    const result = database.isCompleted(userID);
    res.send({ result });
});

app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});