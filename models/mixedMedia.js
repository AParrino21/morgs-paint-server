const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mixedMediaSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    src: {
        type: String,
        required:true
    },

    size: {
        type: String,
        required: true
    },

    bio: {
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

const MixedMedia = mongoose.model("mixedMedia", mixedMediaSchema);

module.exports = MixedMedia;