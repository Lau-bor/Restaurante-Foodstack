import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function createAccessToken(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '60m' 
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token)
            }
        )
    })
}