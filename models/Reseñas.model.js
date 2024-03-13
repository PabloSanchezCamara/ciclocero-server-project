const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");


const reseñaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desciption: {
        type: String,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    image: {
        type: String,
        default: ""
    }

})

const Reseña = model("Reseña", reseñaSchema);

module.exports = Reseña;