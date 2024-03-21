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
        enum: ["Alava", "Almeria", "Avila", "Asturias", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cantabria", "Castellon", "Ciudad Real", "Cuenca", "Caceres", "Cadiz","Cordoba","Girona","Granada","Guadalajara","Guipuzcoa","Huelva","Huesca","Jaen","La Coruña","La Rioja","Las Palmas","Leon","Lugo","Lerida","Madrid","Murcia","Malaga","Navarra","Orense","Palencia","Pontevedra","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"]
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        default: "https://www.lugaresdeaventura.com/sites/default/files/2018-07/suiza-paraiso-ciclista-portada.jpg"
    },
    coordinatesStart: [Number], //preguntar si hacer un array de arrays con cada punto de la ruta
    coordinatesEnd: [Number]
})

const Ruta = model("Ruta", rutaSchema);

module.exports = Ruta;