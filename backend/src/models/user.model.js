import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
    },
    profileImage: {
        type: String,
        default:"https://img.freepik.com/vector-premium/arte-vectorial-icono-interfaz-perfil_1015832-3774.jpg?semt=ais_hybrid&w=740",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    passwordResetToken: {
        type: String,
        default: null,
    },
    passwordResetExpires: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("User", userSchema)