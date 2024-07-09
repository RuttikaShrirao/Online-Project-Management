const mongoose = require("mongoose");
// authSchema
const authSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const auth = mongoose.model("auth", authSchema);

module.exports = { auth };
