import mongoose, { ConnectOptions } from "mongoose";

type ConnectParams = {
  options?: ConnectOptions;
};

export async function connect({ options }: ConnectParams = {}) {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    // Connect to the database
    await mongoose.connect(uri, options);

    // Connection event listeners
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    // Log successful connection
    console.log("Connected to the database");
  } catch (error) {
    console.error(
      "Something went wrong while connecting to the database:",
      error
    );
  }
}

export async function disconnect() {
  try {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
  }
}
