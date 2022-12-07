const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.get("/", (req: any, res: any) => {
    res.json({ id: Date.now() })
});

app.post("/", (req: any, res: any) => {
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});