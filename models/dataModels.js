const mongoose = require("mongoose");

const dataModels = new mongoose.Schema({
    distance: {
        type: String,
        requried: true,
    },
    velocity: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    heart_rate: {
        type: String,
        required: true,
    },
    calories: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Data of smart bib", dataModels);