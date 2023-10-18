import formatNameToCamelCase from "../../../forms/helpers/formatNameToCamelCase ";

const normalizeUser = (user) => {
  let { roles } = user;
  roles.map((obj) => {
    console.log(obj.role);
    if (obj.role != "CG") {
      console.log(obj.role);
      obj.role = formatNameToCamelCase(obj.role);
    }
  });

  return {
    name: {
      firstName: user.first,
      lastName: user.last,
    },

    contact: {
      phoneNumber: user.phone,
      email: user.email,
      address: {
        // country: user.country,
        city: user.city,
        street: user.street,
        streetNumber: user.streetNumber,
      },
    },
    // image: {
    //   url: user.url,
    //   alt: user.alt,
    // },
    roles: user.roles,
    password: user.password,
    // isAdmin: user.isAdmin,
  };
};

export default normalizeUser;
