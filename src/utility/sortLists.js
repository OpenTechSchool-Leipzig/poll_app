export const sortNewest = array => {
  return array.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) {
      return 0;
    } else if (!b.createdAt) {
      return -1;
    } else if (!a.createdAt) {
      return 1;
    } else {
      return b.createdAt.toMillis() - a.createdAt.toMillis();
    }
  });
};

export const sortOldest = array => {
  return array.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) {
      return 0;
    } else if (!a.createdAt) {
      return -1;
    } else if (!b.createdAt) {
      return 1;
    } else {
      return a.createdAt.toMillis() - b.createdAt.toMillis();
    }
  });
};

// tried to generalize sortFunction but couldn't get it to work...
/* export const sortTimestamp = (array, field, invert) => {
  return array.sort((a, b) => {
    if (!a[field] && !b[field]) {
      return 0;
    } else if ((!invert && !b[field]) || (invert && !a[field])) {
      return -1;
    } else if ((!invert && !a[field]) || (invert && !b[field])) {
      return 1;
    } else if (a[field] && b[field] && invert) {
      return a[field].toMillis() - b[field].toMillis();
    } else {
      return b[field].toMillis() - a[field].toMillis();
    }
  });
}; */

export const sortAphabetical = (array, field, invert) => {
  console.log(array + field + invert);
};
