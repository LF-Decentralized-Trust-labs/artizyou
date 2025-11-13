export const yearOptions = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const range = currentYear - 1969;
  const indexes = Array(range).keys();

  const years = Array.from(indexes).map((index) => (
    currentYear - index
  ));

  return years.reverse().reduce(
    (newYears, value) => {
      return {...newYears, [value]: value};
    }
    , {});
};