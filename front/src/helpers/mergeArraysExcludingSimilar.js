function mergeArraysExcludingSimilar(array1, array2) {
  return array1
    .concat(array2)
    .filter((value) => !array1.includes(value) || !array2.includes(value));
}

export default mergeArraysExcludingSimilar;
