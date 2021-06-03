import toysController from "./toys-controller.js";

import express from 'express';
import bodyParser from 'body-parser';
const port = 8080;

const app = express();
app.use(express.static('client'));
// app.use(express.static('client', { maxAge: '1y' }));
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

const handleResponse = (req, res, handler) => {
    try {
        let data = handler();
        res.status(200).send(data);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
};

// app.get("/", (req, res)=>{
//     res.sendFile
// });

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

    handleResponse(req, res, () => {
        return toysController.deleteById(id);
    });
});

app.patch('/api/toys/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return toysController.updateById(id, req.body);
    });
});

app.post('/api/toys', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    handleResponse(req, res, () => {
        return toysController.add(req.body);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});