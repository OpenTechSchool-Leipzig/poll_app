export const sortTimestamp = (array, key, invert) => {
  return array.sort((a, b) => {
    if (!a[key] && !b[key]) {
      return 0;
    } else if ((!invert && !b[key]) || (invert && !a[key])) {
      return -1;
    } else if ((!invert && !a[key]) || (invert && !b[key])) {
      return 1;
    } else {
      const calc = invert
        ? a[key].toMillis() - b[key].toMillis()
        : b[key].toMillis() - a[key].toMillis();
      return calc;
    }
  });
};

export const sortAphabetical = (array, key, invert) => {
  console.log(array + key + invert);
  array.sort((a, b) => {
    const nameA = a[key].toUpperCase();
    const nameB = b[key].toUpperCase();
    if ((!invert && nameA < nameB) || (invert && nameA > nameB)) {
      return -1;
    }
    if ((!invert && nameA > nameB) || (invert && nameA < nameB)) {
      return 1;
    }
    return 0;
  });
};
