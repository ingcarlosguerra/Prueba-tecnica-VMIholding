import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;


if (!MONGO_URI) {
  throw new Error(
    "Por favor, define la variable de entorno MONGO_URI en .env.local"
  );
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Books", 
    });
    console.log(" Conectado a MongoDB ");
  } catch (error) {
    console.error(" Error conectando a MongoDB:", error);
    // process.exit(1); // Forzar cierre en caso de error
  }
};
