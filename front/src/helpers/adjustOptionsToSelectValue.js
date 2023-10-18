const adjustOptionsToSelectValue = (options) => {
  let optionName;
  options?.map((option) => {
    if (option.firstName && option.lastName) {
      option.fullName = `${option.firstName} ${option.lastName}`;
      optionName = option.fullName;
    }
  });
  // options.unshift({ _id: "", value: "" });
  return options;
};

export default adjustOptionsToSelectValue;
