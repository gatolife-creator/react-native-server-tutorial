const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: any, res: any) => {
    res.json({ id: Date.now() })
});

app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});