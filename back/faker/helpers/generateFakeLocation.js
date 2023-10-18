const { faker } = require("@faker-js/faker");
const Location = require("../../productions/models/mongodb/locationSchema");
const textColor = require("../../chalk/terminalColors");
const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const sportsArenaNames = [
  "Sports Arena",
  "Stadium One",
  "Arena Central",
  "Victory Stadium",
  "Grand Arena",
  "Champion Stadium",
  "Olympic Park",
  "Elite Arena",
  "Star Stadium",
  "Legacy Arena",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Miami",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Mexico City",
  "Rio de Janeiro",
  "Cairo",
  "Dubai",
  "Mumbai",
  "Bangkok",
  "Singapore",
  "Shanghai",
  "Seoul",
  "Moscow",
  "Berlin",
  "Rome",
  "Barcelona",
  "Cape Town",
  "Nairobi",
  "Lagos",
  "Buenos Aires",
  "Sao Paulo",
  "Lima",
  "Vancouver",
  "San Francisco",
  "Las Vegas",
  "Dublin",
  "Amsterdam",
  "Prague",
  "Vienna",
  "Athens",
  "Istanbul",
  "Hong Kong",
  "Beijing",
  "New Delhi",
  "Kolkata",
  "Marrakech",
  "Sydney",
  "Auckland",
  "Wellington",
  "Stockholm",
  "Oslo",
];

function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

const generateFakeLocation = () => {
  return {
    name: getRandomArrayElement(sportsArenaNames),
    address: {
      city: getRandomCity(),
      street: faker.location.streetAddress(),
    },
    contactPerson: {
      name: faker.person.firstName(),
      role: "stadium menager",
      contact: {
        phoneNumber: faker.phone.imei(),
        email: faker.internet.email(),
      },
    },
  };
};

module.exports = generateFakeLocation;
