const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const printsSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    src: [
        {
            image: String,
            inventory: Number,
        }
    ],

    bio: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    priceData: {
        type: String
    }

});

const Prints = mongoose.model("prints", printsSchema);

module.exports = Prints;