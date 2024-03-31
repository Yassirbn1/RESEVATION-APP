import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"



const app = express();

// Chargement de la configuration dotenv
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Arrête l'application en cas d'erreur de connexion
  }
};

mongoose.connection.on("disconnected", ()=>{
  console.log("mongoDB disconnected")
})

app.get("/users", (req,res)=>{
  res.send("hello first request!")
})



//middlewares

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);



// Écoute du serveur sur le port 8800
app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800.");
});
