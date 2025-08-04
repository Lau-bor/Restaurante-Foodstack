import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
 
    let token = null;

    
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }
    
    if(!token && req.cookies?.token){
        token = req.cookies.token
    }  

    if(!token) return res.status(401).json({message: "No token provided"})
    
    
    jwt.verify(token, process.env.JWT_SECRET, (err, userDecoded) => {
        if(err) return res.status(403).json({message: "Invalid token"})
        req.user = userDecoded;
        next()
    })
 
  
}