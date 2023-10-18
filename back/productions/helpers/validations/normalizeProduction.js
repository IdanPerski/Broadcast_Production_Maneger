const { lte } = require("lodash");
const terminalColors = require("../../../chalk/terminalColors");
const Person = require("../../../users/models/mongodb/personSchema");
const Location = require("../../models/mongodb/locationSchema");
const ProductionType = require("../../models/mongodb/producionTypeSchema");

const normalizeProduction = async (production, userId) => {
  const { director, cg, visionMixerOperator, editor, audioEngineer, vtr } =
    production.controlRoomCrew;
  console.log(production);
  const wheather = "callApi"; //TODO- call to wheather api and add it to prodction object according to the date
  const normalizeProduction = {
    date: production.date,
    productionType: production.type,
    location: production.location,
    fieldCrew: production.fieldCrew,

    controlRoomCrew: {
      director: director,
      cg: cg,
      visionMixerOperator: visionMixerOperator,
      editor: editor,
      audioEngineer: audioEngineer,
      vtr: vtr,
    },
    talents: production.talents,
    wheather: wheather,
    createdBy: userId,
  };

  return normalizeProduction;
};
module.exports = normalizeProduction;
