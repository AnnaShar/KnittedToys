import toysController from "./toys-controller.js";

import express from 'express';
const port = 8080;

const app = express();

const handleResponse = (req, res, handler) => {
    try {
        let data = handler();
        res.status(200).send(data);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
};

app.get("/api/toys", (req, res) => {
    handleResponse(req, res, () => {
        return toysController.getAll();
    });
});

app.get("/api/toys/:uid", (req, res) => {
    const id = req.params.uid;
    handleResponse(req, res, () => {
        return toysController.getById(id);
    });
});

app.delete('/api/toys/:uid', (req, res) => {
    let id = req.params.uid;
    console.log(`id - ${id}`);
    handleResponse(req, res, () => {
        return toysController.deleteById(id);
    });
});

app.patch('/api/toys/:uid', (req, res) => {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    let newToyProperties = Object.keys(req.body);

    handleResponse(req, res, () => {
        return toysController.updateById(id, newToyProperties);
    });
});

app.post('/api/toys', (req, res) => {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);

    //TODO Check how to add properties
    let newToyProperties = Object.keys(req.body);

    handleResponse(req, res, () => {
        return toysController.add(newToyProperties);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});