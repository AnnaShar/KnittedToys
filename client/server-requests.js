import url from './config-files/links.js';
import RequestError from './error.js';

const handleRequest = async (handler) => {
    try {
        const response = await handler();
        return await response.json();
    } catch (e) {
        throw new RequestError(e.status, e.message);
    }
};
const getAllToys = async () => {
    return handleRequest(async () => {
        return await fetch(url.toysServer);
    });
};

const getToy = async (toyID) => {
    return handleRequest(async () => {
        return await fetch(`${url.toysServer}/${toyID}`);
    });
};

const deleteToy = async (toyID) => {
    return handleRequest(async () => {
        return await fetch(`${url.toysServer}/${toyID}`, {
            method: 'DELETE'
        });
    });
};

const updateToy = async (toyID, updatedToy) => {
    return await fetch(`${url.toysServer}/${toyID}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedToy)
    });
};

const addToy = async (newToy) => {
    return handleRequest(async () => {
        return await fetch(url.toysServer, {
            method: 'POST',
            body: newToy
        });
    });
};

export default {
    getAllToys: getAllToys,
    getToy: getToy,
    updateToy: updateToy,
    deleteToy: deleteToy,
    addToy: addToy
}