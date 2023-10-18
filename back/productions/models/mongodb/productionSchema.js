const mongoose = require("mongoose");
const Role = require("./roleSchema");
const Person = require("../../../users/models/mongodb/personSchema");
const terminalColors = require("../../../chalk/terminalColors");
const ProductionType = require("./producionTypeSchema");

// console.log(Role);
const refAtach = (ref, roles) => {
  try {
    const dataBaseValue = {
      type: mongoose.Schema.Types.ObjectId,
      ref: ref,
    };

    // console.log(terminalColors.danger(dataBaseValue));

    return dataBaseValue;
  } catch (error) {
    console.log(terminalColors.danger(error));
  }

  /*   if (roles && roles.length > 0) {
    // Find the relevant role in the roles array
    const role = roles.find((r) => r.role === ref);

    if (role) {
      // Set the role and paymentRate fields
      dataBaseValue.role = role.role;
      dataBaseValue.paymentRate = role.paymentRate;
    }
  }
  //be aware : I didnt use roleSchema at the moment */
};

const productionSchema = new mongoose.Schema({
  date: Date,
  productionType: refAtach("productionType"),
  location: refAtach("Location"),
  controlRoomCrew: {
    audioEngineer: refAtach("audioEngineer"),
    director: refAtach("director"),
    editor: refAtach("editor"),
    visionMixerOperator: refAtach("visionMixerOperator"),
    vtr: [refAtach("vtr")],
    cg: refAtach("cg"),
  },
  fieldCrew: {
    producer: [refAtach("Role")],
    technician: [refAtach("Role")],
    cameraOperators: [refAtach("Role")],
  },

  talents: [refAtach("Role")],
  weather: String,
});

const Production = mongoose.model("Production", productionSchema);

module.exports = Production;
