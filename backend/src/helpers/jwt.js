import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function createAccessToken(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
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