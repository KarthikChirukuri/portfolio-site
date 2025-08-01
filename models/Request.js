const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;