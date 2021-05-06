import {getDataFromFile} from "./data-controller";

const express = require('express');
const bodyParser = require('body-parser').json();
const port = 8080;

const app = express();

app.get("/api/toys", (req, res) => {
    try{
        let data = getDataFromFile('toys');
        res.status(200).json(data);
    }
    catch (e) {
        res.status(e.status).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});