const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //this is for latest version 5
    //local mongodb server -> 127.0.0.1:27017/mydb
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //this is for version 4
    // const conn = await mongoose.connect(process.env.MONGO_URI,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
