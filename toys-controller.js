import toysObj from './data/toys.json';
import RequestError from './errors.js';
import {updateFile} from "./file-data-handler.js";

const filePath = './data/toys.json';

export const getAllToys = () => {
    if (toysObj) {
        return toysObj;
    } else {
        throw new RequestError(404, 'Toys array does not found.');
    }
};

export const getToy = (toyID) => {
    let toy = toysObj.find(toy => toy.id.toString() === toyID);
    if (toy) return toy;
    else throw new RequestError(404, `Toy with id ${toyID} does not found.`);
};

export const editToy = (toyID, toyNewProperties) => {
    let toy = toysObj.find(toy => toy.id.toString() === toyID);
    if(!toy) throw new RequestError(404, `Toy with id ${toyID} does not found.`);

    //{toy.name, toy.description } = toyParameters;
    // const newToy = {
    //     ...toy,
    //     ...toyParameters
    // };
    //console.log(newToy);

    Object.keys(toy).forEach(property => {
        if (toyNewProperties[property] !== 'id') {
            toy[property] = toyNewProperties[property];
        }
    });

    updateToysFile();

    return toy;
};

export const deleteToy = (toyID) => {
    let toyIndex = toysObj.findIndex(toy => toy.id.toString() === toyID);
    console.log(`toyIndex - ${toyIndex}`);
    if(toyIndex===-1) throw new RequestError(404, `Toy with id ${toyID} does not found.`);
    console.log(`I'm still here`);
    toysObj.splice(toyIndex,1);

    updateToysFile();

    return toysObj;
};

export const addToy = (newToy) => {
    if(!newToy.id) throw new RequestError(400, `Toy you add should have an ID.`);

    let toyIndex = toysObj.findIndex(toy => toy.id.toString() === newToy.id);
    if(toyIndex) throw new RequestError(400, `Toy with id ${newToy.id} already exists.`);

    toysObj.push(newToy);

    updateToysFile();

    return toysObj;
};

const updateToysFile = ()=> {
    try {
        updateFile(filePath, toysObj);
    }
    catch (e) {
        throw new RequestError(500, 'Data updating error.');
    }
};