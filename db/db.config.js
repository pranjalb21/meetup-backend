const mongoose = require("mongoose");
require("dotenv").config()

const URI = process.env.MONGODB;
const initializeDB = async () => {
    await mongoose
        .connect(URI)
        .then(() => console.log("Connected to Database"))
        .catch((err) => console.log("Unable to connect to Database", err));
};
module.exports = {initializeDB}