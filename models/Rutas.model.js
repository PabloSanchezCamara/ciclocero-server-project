const { Schema, model, default: mongoose } = require("mongoose");

const rutaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["fácil", "media", "difícil", "profesional"]
    },
    distanciaEnKm: {
        type: Number, 
        required: true
    },
    desnivelEnM: {
        type: Number, 
        required: true
    }, 
    duracionEnHoras: {
        type: Number, 
        required: true
    },
    modalidad: {
        type: String,
        required: true,
        enum: ["montaña", "urbano", "carretera", "gravel"]
    }, 
    provincia: {
        type: String,
        required: true,
        enum: ["alava", "almeria", "avila", "asturias", "badajoz", "baleares", "barcelona", "burgos", "cantabria", "castellon", "ciudad real", "cuenca", "caceres", "cadiz","cordoba","girona","granada","guadalajara","guipuzcoa","huelva","huesca","jaen","la coruña","la rioja","las palmas","leon","lugo","lerida","madrid","murcia","malaga","navarra","orense","palencia","pontevedra","salamanca","tenerife","segovia","sevilla","soria","tarragona","teruel","toledo","valencia","valladolid","vizcaya","zamora","zaragoza"]
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        default: "https://www.lugaresdeaventura.com/sites/default/files/2018-07/suiza-paraiso-ciclista-portada.jpg"
    },
    coordinatesStart: [Number], 
    coordinatesEnd: [Number]
})

const Ruta = model("Ruta", rutaSchema);

module.exports = Ruta;