function findElement(array, id) {
    return array.find(el => el.id==id);
}

function findElementIndex(array, id) {
    return array.findIndex(el => el.id==id);
}

function JSONToArray(jsonFile){
    let array = [];

    for (let i=0; i<jsonFile.length; i++){
        array.push(jsonFile[i]);
    }
    return array;
}

module.exports = {
    findElement: findElement,
    JSONToArray: JSONToArray,
    findElementIndex: findElementIndex
};