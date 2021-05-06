//import express from 'express';
import {ToysController} from './data-controller';

const express = require('express');
const bodyParser = require('body-parser').json();
const port = 8080;

const fs = require('fs');
let toysJSON = require('./toys');
const utils = require('./utils');

const app = express();

const handleErrors = (error, res) => {
    res.status(error.status).send(error.message);
};

const handle = ()

app.get("/", (req, res) => {
    res.status(200)
        .send("Welcome to Knitted Toys Store!");
});

app.get("/api/toys", (req, res) => {
    res.status(200).json(toysJSON.toys);
});

app.get("/api/toys/:uid", (req, res) => {
    let id = req.params.uid;
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

    if (!newToy.id) return res.sendStatus(400);
    if (utils.findElement(toyArray, newToy.id)) return res.sendStatus(409);

    toyArray.push(newToy);

    toysJSON.toys = toyArray;

    fs.writeFile('./toys.json', JSON.stringify(toysJSON), err => {
        if (err) {
            res.send("Something went wrong");
            res.sendStatus(400);
        } else {
            res.redirect(200, `/api/toys/${newToy.id}`);
        }
    });
});

app.patch('/api/toys/:uid', bodyParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    let toyArray = utils.JSONToArray(toysJSON.toys);

    let toyIndex = utils.findElementIndex(toyArray, id);

    if (toyIndex === -1) return res.sendStatus(404);

    let toy = toyArray[toyIndex];
    let newToyProperties = Object.keys(req.body);
    for (let i = 0; i < newToyProperties.length; i++) {
        if (newToyProperties[i] !== 'id') {
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

