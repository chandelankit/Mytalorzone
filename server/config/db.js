const mongoose = require("mongoose");
require("dotenv").config();
try {
  mongoose.connect(process.env.DATABASE);
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
