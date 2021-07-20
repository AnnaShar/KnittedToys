import RequestError from './error.js';

const url = '/api/toys';

const handleRequest = async (handler) => {
    const response = await handler();

    if (response.status !== 200) {
        throw new RequestError(response.status, 'Toys not found');
    }

    return await response.json();
};

const getAllToys = async () => {
    return handleRequest(async () => {
        return await fetch(url);
    });
};

const getToy = async (toyID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/${toyID}`);
    });
};

const deleteToy = async (toyID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/${toyID}`, {
            method: 'DELETE'
        });
    });
};

const updateToy = async (toyID, updatedToy) => {
    return await fetch(`${url}/${toyID}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedToy)
    });
};

const addToy = async (newToy) => {
    return handleRequest(async () => {
        return await fetch(url, {
            method: 'POST',
            body: newToy
        });
    });
};

export default {
    getAllToys,
    getToy,
    updateToy,
    deleteToy,
    addToy
}