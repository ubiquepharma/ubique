import mongoose from "mongoose";
// import "dotenv/config";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      isConnected = true;
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("Err connecting to Database: ", err));
}

export { connectDB };
