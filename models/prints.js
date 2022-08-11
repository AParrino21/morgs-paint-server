const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const printsSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    src: [
        {
            image_id: Number,
            image: String,
            inventory: Number,
            price_id: String
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
    
    cat: {
        type: String
    }

});

const Prints = mongoose.model("prints", printsSchema);

module.exports = Prints;