import RequestError from './errors.js';
import {updateFile, getDataFromFile} from "./file-data-handler.js";
import config from './config.js';

const filePath = config['toysFilePath'];
let toys = null;

const getAllToys = () => {
    if (!toys) {
        try{
            toys = getDataFromFile(filePath);
        }
        catch (e) {
            throw new RequestError(404, 'Toys not found.');
        }
    }
    return toys;
};

const getToy = (toyID) => {
    let toys = getAllToys();
    let toy = toys[toyID];
    if (toy) {
        return JSON.stringify(toy);
    } else {
        throw new RequestError(404, `Toy with id ${toyID} does not found.`);
    }
};

export const updateToy = (toyID, toyNewProperties) => {
    let toys = getAllToys();
    let toy = toys[toyID];
    if (!toy) throw new RequestError(404, `Toy with id ${toyID} does not found.`);

    //TODO what the best way to avoid id changing???
    if(toyNewProperties.id){
        toyNewProperties.id = toyID;
        // delete toyNewProperties.id;
    }

    const newToy = {
        ...toy,
        ...toyNewProperties
    };

    toys[toyID] = newToy;

    updateToysFile();

    return JSON.stringify(toy);
};

export const deleteToy = (toyID) => {
    let toys = getAllToys();
    let toy = toys[toyID];

    if (!toy) throw new RequestError(404, `Toy with id ${toyID} does not found.`);

    delete toys[toyID];

    updateToysFile();

    return JSON.stringify(toys);
};

export const addToy = (newToy) => {
    if (!newToy.id) throw new RequestError(400, `Toy you add should have an ID.`);

    let toys = getAllToys();
    let toy = toys[newToy.id];
    if (toy) throw new RequestError(400, `Toy with id ${newToy.id} already exists.`);

    toys[newToy.id] = newToy;

    updateToysFile();

    return JSON.stringify(toys);
};

const updateToysFile = () => {
    try {
        updateFile(filePath, toys);
    } catch (e) {
        throw new RequestError(500, 'Data updating error.');
    }
};

export default {
    getAll: getAllToys,
    getById: getToy,
    updateById: updateToy,
    deleteById: deleteToy,
    add: addToy
}