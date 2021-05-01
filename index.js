const express = require('express');
const bodyParser = require('body-parser').json();
const port = 8080;

const fs = require('fs');
let toysJSON = require('./toys');
const utils = require('./utils');

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Knitted Toys Store!");
    res.sendStatus(200);
});

app.get("/api/toys", (req, res) => {
    res.status(200).json(toysJSON.toys);
});

app.get("/api/toys/:uid", (req, res) => {
    let id = req.params.uid;
    //let toyArray = JSON.parse(toysJSON.toys);
    let toyArray = utils.JSONToArray(toysJSON.toys);
    let toy = utils.findElement(toyArray, id);
    res.status(200).send(JSON.stringify(toy));
});

app.delete("/api/toys/:uid", (req, res) => {
    let id = req.params.uid;
    let toyArray = utils.JSONToArray(toysJSON.toys);

    let toy = utils.findElement(toyArray, id);

    if (!toy) return res.sendStatus(404);

    toyArray = toyArray.filter(item => item !== toy);
    toysJSON.toys = toyArray;

    fs.writeFile('./toys.json', JSON.stringify(toysJSON), err => {
        if (err) {
            res.send("Something went wrong");
            res.sendStatus(400);
        } else {
            res.redirect(200, '/api/toys');
        }
    });

});

app.post('/api/toys', bodyParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let toyArray = utils.JSONToArray(toysJSON.toys);
    let newToy = req.body;

    if(!newToy.id) return res.sendStatus(400);
    if (utils.findElement(toyArray, newToy.id)) return res.sendStatus(409);

    toyArray.push(newToy);

    toysJSON.toys = toyArray;

    fs.writeFile('./toys.json', JSON.stringify(toysJSON), err => {
        if (err) {
            res.send("Something went wrong");
            res.sendStatus(400);
        } else {
            res.redirect(200, '/api/toys');
        }
    });
});

app.patch('/api/toys/:uid', bodyParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    let toyArray = utils.JSONToArray(toysJSON.toys);

    let toyIndex = utils.findElementIndex(toyArray, id);
    let toy = toyArray[toyIndex];

    if (toyIndex === -1) return res.sendStatus(404);

    let newToyProperties = Object.keys(req.body);
    for (let i=0; i<newToyProperties.length; i++){
        if(newToyProperties[i]!=='id') {
            toy[newToyProperties[i]] = req.body[newToyProperties[i]];
        }
    }

    toyArray[toyIndex] = toy;
    toysJSON.toys = toyArray;

    fs.writeFile('./toys.json', JSON.stringify(toysJSON), err => {
        if (err) {
            res.send("Something went wrong");
            res.sendStatus(400);
        } else {
            res.redirect(200, '/api/toys');
        }
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

