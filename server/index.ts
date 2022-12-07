const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import { Database } from "./database";
const database = new Database(8);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get("/", (req: any, res: any) => {
    res.json({ id: Date.now() })
});

app.post("/", (req: any, res: any) => {
    const userID = req.body["userID"];
    database.resister(userID);
    database.collectStamp(userID, "test1");
    database.collectStamp(userID, "test2");
    console.log(database.getStampCount(userID));
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});