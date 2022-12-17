export const createGetStyles = (styles) => (styleNames) => {
  const res = [];

  for (const [key, value] of Object.entries(styleNames)) {
    if (value) {
      res.push([styles[key]]);
    }
  }

  return res;
};
