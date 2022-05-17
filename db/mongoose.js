const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    process.env.DB_PRODUCTION_URL,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

module.exports = mongoose;