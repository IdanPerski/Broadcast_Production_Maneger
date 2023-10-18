const { faker } = require("@faker-js/faker");
const textColor = require("../../chalk/terminalColors");

function generateRoundedNumber() {
  return Math.floor(Math.random() * 5) * 100 + 800;
}
// const getRandomArrayElement = (array) =>
//   array[Math.floor(Math.random() * array.length)];
const rolesArray = [
  "technician",
  "producer",
  "cameraOperators",
  "editor",
  "director",
  "visionMixerOperator",
  "audioEngineer",
  "vtr",
  "cg",
  "talent",
];

// Shuffle the rolesArray to ensure unique roles for each person
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const shuffledRolesArray = shuffleArray(rolesArray);

const generateFakePerson = () => {
  //TODO change the person scheme at the faker to same person schema at the users
  const fakePerson = {
    name: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    },
    roles: [],
    contact: {
      email: faker.internet.email(),
      phoneNumber: faker.phone.number("+97252#######"),
    },
  };

  // Generate a random number of roles between 1 and the length of rolesArray
  const numberOfRoles =
    Math.floor(Math.random() * shuffledRolesArray.length) + 1;

  // Populate the roles array with random roles and payment rates
  // Populate the roles array with random roles and payment rates
  for (let i = 0; i < numberOfRoles; i++) {
    fakePerson.roles.push({
      role: shuffledRolesArray[i], // Use shuffled roles
      paymentRate: generateRoundedNumber(),
    });
  }

  console.log(textColor.lemon(fakePerson), fakePerson);
  return fakePerson;
};

module.exports = generateFakePerson;
