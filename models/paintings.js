const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paintingsSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required:true
    },

    size: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    inventory: {
        type: Number,
        required: true
    },

    price_id: {
        type: String
    },
    
    cat: {
        type: String
    }

});

const Paintings = mongoose.model("paintings", paintingsSchema);

module.exports = Paintings;