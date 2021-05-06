import toysJSON from './toys';
import RequestError from './errors.js';

const files = {
  'toys': toysJSON
};

export const getDataFromFile = (fileName) => {
    let data = files[fileName];
    if (!data) {
        throw new RequestError(404, 'File with that name does not found.');
    } else {
        return data;
    }
};
