const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: true,
      unique: true
    }, 
    image: {
      type: String,
      default: "https://www.flaticon.es/icono-gratis/usuario_545736?related_id=545837&origin=search"
    },
    rutasFav: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ruta"
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
