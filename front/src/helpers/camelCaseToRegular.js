function camelCaseToRegular(input) {
  if (typeof input === "string") {
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before capital letters preceded by lowercase
      .replace(/^[A-Z]+/, (str) => str.toLowerCase()) // Convert the first letter(s) to lowercase
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
}

export default camelCaseToRegular;
