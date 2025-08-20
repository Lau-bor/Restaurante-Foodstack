import express, { urlencoded } from "express";
import dotenv from "dotenv"; 
dotenv.config(); 
import fs from "node:fs"; 
import cors from "cors"; 
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import adminRoutes from "./src/routes/admin.routes.js";

const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: [
    "https://restaurante-foodstack-69hxph5o9-lautaros-projects-e920168a.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
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
app.use('/uploads', express.static('public/uploads'));

app.use(express.static(path.join(__dirname, "public")));



const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
  console.log("Cargando archivo de ruta:", file)
 
  import(`./src/routes/${file}`)
    .then((route) => {
      
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.error(`Error al cargar la ruta ${file}:`, err);
    });
});



export default app;