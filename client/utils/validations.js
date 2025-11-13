export const hasError = (fields) => (
  Object.keys(fields).some((key) => fields[key])
);

export const isBlank = (value) => (
  !value || value.trim() === ''
);

export const isEmpty = (value) => (
  !value || !value.length
);

export const isEmptyObject = (value) => (
  !value || !Object.keys(value).length
);

export const isFalse = (value) => (
  !value
);
