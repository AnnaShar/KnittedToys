const DotJSON = require('dot-json');
let jsonFile = new DotJSON('toys.json');
jsonFile.set('[1].id','333').save();
//console.log(jsonFile);