import RequestError from './error.js';
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

const getAllToysInArray = () =>{
  const toys = getAllToys();
  return Object.values(toys);
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

    const newToy = {
        ...toy,
        ...toyNewProperties,
        id: toyID
    };
    toys[toyID] = newToy;
    updateToysFile();

    return JSON.stringify(newToy);
};

export const deleteToy = (toyID) => {
    let toys = getAllToys();
    let toy = toys[toyID];

    if (!toy) throw new RequestError(404, `Toy with id ${toyID} does not found.`);

    delete toys[toyID];

    updateToysFile();

    return getAllToysInArray();
};

export const addToy = (newToy) => {
    if (!newToy.id) throw new RequestError(400, `Toy you add should have an ID.`);

    let toys = getAllToys();
    let toy = toys[newToy.id];
    if (toy) throw new RequestError(400, `Toy with id ${newToy.id} already exists.`);

    toys[newToy.id] = newToy;

    updateToysFile();

    return getAllToysInArray();
};

const updateToysFile = () => {
    try {
        updateFile(filePath, toys);
    } catch (e) {
        throw new RequestError(500, 'Data updating error.');
    }
};

export default {
    getAll: getAllToysInArray,
    getById: getToy,
    updateById: updateToy,
    deleteById: deleteToy,
    add: addToy
}