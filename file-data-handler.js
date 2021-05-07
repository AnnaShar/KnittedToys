import fs from 'fs';

export const updateFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), error => {
        if(error) throw new Error(error.message);
    });
};