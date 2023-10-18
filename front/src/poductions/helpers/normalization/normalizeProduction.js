const normalizeProduction = (production) => {
  return {
    date: production.date,
    type: production.type,
    location: production.location,
    fieldCrew: {
      producer: production.producer,
      technician: production.technician,
      cameraOperators: production.cameraOperators,
    },
    controlRoomCrew: {
      director: production.director,
      visionMixerOperator: production.visionMixerOperator,
      editor: production.editor,
      audioEngineer: production.audioEngineer,
      vtr: production.vtr,
      cg: production.cg,
    },
    talents: production.talents,
  };
};

export default normalizeProduction;
