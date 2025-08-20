import app from "./app.js";
import connectToMongoDB from "./db.js";


const PORT = process.env.PORT || 4000;

connectToMongoDB()


const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running on port: http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("Error al iniciar el servidor: ", error);
    process.exit(1); 
  }
};

server();

console.log("Server on port: " + PORT);