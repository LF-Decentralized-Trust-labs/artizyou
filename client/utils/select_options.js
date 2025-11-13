export const findOption = (requestedValue, options) => {
  if (typeof requestedValue === "string") {
    return options.find(({value}) => value === requestedValue);
  } else {
    return requestedValue;
  }
};

export const collectOptions = (options, sortFunc=undefined) => {
  let keys = Object.keys(options);
  if (sortFunc) {
    keys = keys.sort(sortFunc);
  }
  return keys.map((obj) => {
    return {value: obj, label: options[obj]};
  })
};

export const domainValuesToOptions = (domainValues) => {
  return domainValues.reduce(
    (optionValues, {value, description}) => {
      return {...optionValues, [value]: description};
    }
    , {});
};
