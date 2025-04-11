const mongose = require('mongoose');

async function connectMongoDB(url){
     return mongose.connect(url);
}

module.exports = {
    connectMongoDB,
}