const currentTime = (date = new Date()) => {
  const currentDate = date;
  const addLeadingZero = (dateObject) => dateObject.toString().padStart(2, "0");

  const year = currentDate.getFullYear();
  const month = addLeadingZero(currentDate.getMonth() + 1);
  const day = addLeadingZero(currentDate.getDate());
  const hours = addLeadingZero(currentDate.getHours());
  const minutes = addLeadingZero(currentDate.getMinutes());
  const seconds = addLeadingZero(currentDate.getSeconds());
  return { year, month, day, hours, minutes, seconds };
};

module.exports = currentTime;
