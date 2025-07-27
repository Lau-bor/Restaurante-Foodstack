import express, { urlencoded } from "express";
import dotenv from "dotenv"; 
import fs from "node:fs"; 
import cors from "cors"; 
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";



dotenv.config(); 

const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(
  urlencoded({
    extended: true, 
  })
);

app.use(morgan("dev"));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));


const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
 
  import(`./src/routes/${file}`)
    .then((route) => {
      
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.error(`Error al cargar la ruta ${file}:`, err);
    });
});

export default app;