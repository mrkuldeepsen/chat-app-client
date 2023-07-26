import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb Connections successfully!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
};
export default connect;
