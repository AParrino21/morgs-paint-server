const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weddingPortraitSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    price_id: {
        type: String
    }

});

const WeddingPortrait = mongoose.model("weddingportrait", weddingPortraitSchema);

module.exports = WeddingPortrait;