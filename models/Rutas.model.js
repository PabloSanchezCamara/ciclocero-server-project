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
    circular: {
        type: Boolean,
        required: true
    }, 
    comunidad: {
        type: String,
        required: true,
        enum: ["Andalucía", "Aragón", "Islas Baleares", "Canarias", "Cantabria", "Castilla-La Mancha", "Castilla y León", "Cataluña", "Comunidad de Madrid", "Comunidad Foral de Navarra", "Comunidad Valenciana", "Extremadura", "Galicia", "País Vasco", "Principado de Asturias", "Región de Murcia", "La Rioja", "Ceuta", "Melilla"]
    },
    provincia: {
        type: String,
        required: true,
        enum: ["Álava", "Almería", "Ávila", "Asturias", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cantabria", "Castellón", "Ciudad Real", "Cuenca", "Cáceres", "Cádiz","Córdoba","Girona","Granada","Guadalajara","Guipúzcoa","Huelva","Huesca","Jaén","La Coruña","La,Rioja","Las,Palmas","León","Lugo","Lérida","Madrid","Murcia","Málaga","Navarra","Orense","Palencia","Pontevedra","Salamanca","Santa,Cruz,de,Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"]
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        default: "https://www.freepik.es/vector-premium/icono-ruta-bicicleta-simbolo-ilustracion-mapa-viaje-signo-vector-puntero-navegacion_36816907.htm"
    },
    coordinates: [{Number}] //preguntar si hacer un array de arrays con cada punto de la ruta
})

const Ruta = model("Ruta", rutaSchema);

module.exports = Ruta;