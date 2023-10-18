import { parseDate } from "./timeService";

export default function sortByDate(array, objKey = "date") {
  const sortedArray = array.sort((a, b) => {
    const dateA = parseDate(a[objKey]);
    const dateB = parseDate(b[objKey]);
    if (dateA > dateB) {
      return 1;
    }
    if (dateA < dateB) {
      return -1;
    }
    return 0;
  });
  return sortedArray;
}
