const formatNameToCamelCase = (name) => {
  let capitalIndices = [];
  for (let i = 0; i < name.length; i++) {
    if (name[i] >= "A" && name[i] <= "Z") {
      capitalIndices.push(i);
    }
  }
  if (capitalIndices[0] == 0)
    name = name.charAt(0).toLowerCase() + name.slice(1);
  const formattedName = name.replace(/-\d+$/, "");
  return formattedName.replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
    chr.toUpperCase(),
  );
};

export default formatNameToCamelCase;
