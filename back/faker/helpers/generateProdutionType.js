const { faker } = require("@faker-js/faker");
const textColor = require("../../chalk/terminalColors");
const ProductionType = require("../../productions/models/mongodb/producionTypeSchema");

const generateProdutionType = (sporType) => {
  ProdType = new ProductionType({
    name: sporType,
  });

  return ProdType;
};

module.exports = generateProdutionType;
