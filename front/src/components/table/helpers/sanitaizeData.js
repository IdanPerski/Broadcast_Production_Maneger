export function sanitizeData(objectData) {
  const roleMapping = {
    audioEngineer: "Audio Engineer",
    director: "Director",
    editor: "Editor",
    visionMixerOperator: "Vision Mixer Operator",
    vtr: "VTR",
    cg: "CG",
    cameraOperators: "Camera Operator",
    technician: "Technician",
    producer: "Producer",
  };

  const sanitizedData = {};

  const roles = Object.keys(objectData);

  roles.forEach((role) => {
    const friendlyRoleName = roleMapping[role] || role;

    if (Array.isArray(objectData[role])) {
      const personsArray = objectData[role].flatMap((person) => person);
      sanitizedData[role] = { role: friendlyRoleName, persons: personsArray };
    } else if (objectData[role]) {
      sanitizedData[role] = {
        role: friendlyRoleName,
        ...objectData[role],
      };
    }
  });

  return sanitizedData;
}
