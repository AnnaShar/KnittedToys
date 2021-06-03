import fs from 'fs';

export const updateFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), error => {
        if(error) throw new Error(error.message);
    });
};

export const getDataFromFile = (fileName) =>{
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};


// export const getDataFromFile = (fileName) =>{
//   fs.readFile(fileName, (error, data)=>{
//      if(error){
//          throw new Error(error.message);
//      }
//      return data;
//   });
// };
