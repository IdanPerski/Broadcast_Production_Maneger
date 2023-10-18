export const makeFirstLetterCapital = (text) => {
  const term = text.toLowerCase().trim();
  return term.charAt(0).toUpperCase() + term.slice(1);
};
