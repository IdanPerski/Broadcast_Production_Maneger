const terminalColors = require("../../chalk/terminalColors");
const _ = require("lodash");

const normalizeUser = async (user) => {
  let { roles } = user;
  const name = { ...user.name };
  const contact = { ...user.contact };
  roles = roles.map((role) => {
    role.rate = 0;
    return role;
  });

  // const image = {
  //   ...user.image,
  //   alt: (user.image.alt = user.image.alt || "user image"),
  //   url:
  //     user.image.url ||
  //     "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
  // };

  return {
    ...user,
    name,
    // image,
    // address,
    contact,
    roles,
  };
};

module.exports = normalizeUser;
