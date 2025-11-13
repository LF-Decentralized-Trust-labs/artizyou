export const toUnderscore = (string) => {
  return string.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`);
};