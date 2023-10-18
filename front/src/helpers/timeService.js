export function setTimeFormat(date) {
  const dateObject = new Date(date);
  const addLeadingZero = (dateObject) => dateObject.toString().padStart(2, "0");

  const year = dateObject.getFullYear();
  const month = addLeadingZero(dateObject.getMonth() + 1);
  const day = addLeadingZero(dateObject.getDate());
  const hours = addLeadingZero(dateObject.getHours());
  const minutes = addLeadingZero(dateObject.getMinutes());
  const seconds = addLeadingZero(dateObject.getSeconds());
  return { year, month, day, hours, minutes, seconds };
}

export function parseDate(dateString) {
  const parts = dateString.split("/");

  if (parts.length === 3) {
    const [day, month, year] = parts.map((part) => parseInt(part, 10));
    const dateObject = new Date(year, month - 1, day);
    if (!isNaN(dateObject.getTime())) {
      return dateObject;
    }
  }
  return null; // Return null for invalid date format or invalid date
}
