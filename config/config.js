const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connected successfully')
    } catch(error){
        console.error(error);
        throw new Error ('error starting database')
    }
};

module.exports = {dbConnection};