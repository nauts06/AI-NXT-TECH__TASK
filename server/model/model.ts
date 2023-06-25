const mongooseTs = require("mongoose");

const dataSchema = new mongooseTs.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  addImages1: {
    type: String,
  },
  addImages2: {
    type: String,
  },
  addImages3: {
    type: String,
  },
  addImages4: {
    type: String,
  },
});

module.exports = mongooseTs.model("User", dataSchema);
