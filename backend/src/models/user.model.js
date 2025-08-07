import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    },
    isActive: {
    type: Boolean,
    default: true,
    },
    profileImage: {
        type: String,
        default:"https://img.freepik.com/vector-premium/arte-vectorial-icono-interfaz-perfil_1015832-3774.jpg?semt=ais_hybrid&w=740",
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
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
}
}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("User", userSchema)