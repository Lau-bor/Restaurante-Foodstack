import app from "./app.js";
import connectToMongoDB from "./db.js";
import express from "express";
import authRoutes from "./src/routes/auth.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 4000;

connectToMongoDB()

app.use(express.json());

// Usar las rutas de auth
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

export default app;


const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running on port: http://localhost:" + PORT); //iniciar el servidor en el puerto 4000
    });
  } catch (error) {
    console.log("Error al iniciar el servidor: ", error);
    process.exit(1); 
  }
};

server();

console.log("Server on port: " + PORT);
