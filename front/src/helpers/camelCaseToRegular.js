function camelCaseToRegular(input) {
  if (typeof input === "string") {
    return (
      input
        // .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before capital letters followed by lowercase
        .replace(/(?!^)([A-Z][a-z])/g, " $1") // Add a space before capital letters followed by lowercase, except at the start of the string
        .replace(/^./, (str) => str.toUpperCase())
    ); // Capitalize the first letter
  }
}

export default camelCaseToRegular;
