const textColor = require("../../chalk/terminalColors");
const createFakeData = require("./createFakeData");

const createMultipleFakeData = async (count, generateFunction, newData) => {
  try {
    for (let i = 0; i < count; i++) {
      await createFakeData(
        generateFunction(),
        newData,
        `Fake  created successfully: `,
        "Error creating fake data",
      );
    }
  } catch (error) {
    console.log(textColor.danger("createMultipleFakeData failed", error));
  }
  console.log(
    textColor.safe(
      `createMultipleFakeData function successed- was running ${count} times`,
    ),
  );
};

module.exports = createMultipleFakeData;
