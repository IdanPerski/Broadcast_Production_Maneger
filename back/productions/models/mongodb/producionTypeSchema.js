const mongoose = require("mongoose");

const productionTypeSchema = new mongoose.Schema({
  name: String,
});

const ProductionType = mongoose.model("ProductionType", productionTypeSchema);

module.exports = ProductionType;
