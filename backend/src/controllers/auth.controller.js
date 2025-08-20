import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createAccessToken } from "../helpers/jwt.js";
import transport from "../helpers/mailer.js";
import  jwt  from "jsonwebtoken";
import { success } from "zod/v4";


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; 

    const userFound = await User.findOne({ email }); 

    if (userFound)
      return res.status(400).json({ message: "User already exist" }); 

    const passwordHash = await bcrypt.hash(password, 12); 

   

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      verificationToken: verificationToken,
    });

    const savedUser = await newUser.save();

    

    const verificationLink = `${process.env.FRONTEND_URL}/VerifyEmail?token=${verificationToken}`;

    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: savedUser.email,
      subject: "Verifica tu email - Foodstack",
      template: "verifyEmail",
      context: {
        username: savedUser.username,
        verificationLink,
      },
    });

   

    const token = await createAccessToken({
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
    role: savedUser.role
  });

    
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      nameSite: "none",
    });

  

    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isVerified: savedUser.isVerified,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    if (!userFound.isActive) 
      return res.status(403).json({ message: "Usuario inactivo. Contacta al administrador." });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({
      id: userFound._id,
      role: userFound.role,
    });

    res.json({
      token,
      user: {
        id: userFound._id,
        email: userFound.email,
        username: userFound.username,
        role: userFound.role,
        profileImage: userFound.profileImage || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    
    res.cookie("token", "", { expires: new Date(0) }); 

    res.status(200).json({ message: "Logout success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      role: userFound.role,
      profileImage: userFound.profileImage ? `/uploads/${userFound.profileImage}` : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en profile", error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {

    const authHeaders = req.headers.authorization;

    let token;

    if(authHeaders && authHeaders.startsWith("Bearer ")){
      token = authHeaders.split(" ")[1];
    } else {
      return res.status(401).json({message: "No token provided"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userFound = await User.findById(decoded.id);

    if (!userFound) return res.status(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      isVerified: userFound.isVerified,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
    try {
        
    const { token } = req.query;

    const user = await User.findOne({verificationToken:token})

    if(!user) {
        return res.status(400).json({message: "Invalid or expired token"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Verify email success!",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified
        }  
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})       
    }
}