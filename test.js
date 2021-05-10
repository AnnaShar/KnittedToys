import toysController from "./toys-controller.js";
let toys = toysController.add({
    "id": 7,
    "name": "Avocado",
    "description": "I'm small but I'm cute. And I live with Alexander",
    "creationDate": "31.12.2018"
});
//let toys = toysController.deleteById(3);
console.log(`toys - ${toys}`);