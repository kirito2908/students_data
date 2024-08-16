const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: Number
    },
    hobby: {
        type: Array
    },
    gender: {
        type: String
    },
    division: {
        type: String
    },
    image: {
        type: String
    }
})

const StudentData = mongoose.model("allData", mySchema);

module.exports = StudentData;