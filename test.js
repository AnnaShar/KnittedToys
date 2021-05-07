import {getAllToys,  getToy, editToy, deleteToy} from "./toys-controller.js";

import express from 'express';
const port = 8080;

const app = express();

const responseHandler = (res, req, func) => {
    try{
        let data = func;
        console.log(`data - ${data}`);
        res.status(200).send(data);
    }
    catch (e) {
        console.log(`I'm not here`);
        res.status(e.status).send(e.message);
    }
};

app.get("/api/toys", (req, res) => {
    responseHandler(res,req, getAllToys());
});

app.get("/api/toys/:uid", (req, res) => {
    let id = req.params.uid;
    try{
        let data = getToy(id);
        console.log(`data - ${data}`);
        res.status(200).send(data);
    }
    catch (e) {
        console.log(`I'm not here`);
        res.status(e.status).send(e.message);
    }
    //responseHandler(res,req, getToy(id));
});

app.delete('/api/toys/:uid', (req, res) => {
    let id = req.params.uid;
    console.log(`id - ${id}`);
    responseHandler(res,req, deleteToy(id));
});

app.patch('/api/toys/:uid', (req, res) => {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    let newToyProperties = Object.keys(req.body);

    responseHandler(res,req, editToy(id, newToyProperties));
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});