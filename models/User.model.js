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
      default: "https://i.pinimg.com/564x/67/2c/d6/672cd616936e481ef2632306731a87cd.jpg"
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
