const addRolesToMembers = (dataArray) => {
  if (Array.isArray(dataArray)) {
    const isIdInArray = dataArray.some((obj) => {
      if (obj._id) return obj._id === _value._id;
    });
    console.log(isIdInArray);
    console.log([...dataArray, _value]);
    const updatedArray = isIdInArray
      ? dataArray.filter((obj) => obj._id !== _value._id)
      : [...dataArray, _value];
    console.log(updatedArray);
    setData((prevData) => ({
      ...prevData,
      [_name]: updatedArray,
    }));
  }
};
