export const flatternList = (array) => {
  const flattened = [];
  array.map((a) => {
    flattened.push(a);
    if (a.children) {
      a.children.map((c) => flattened.push(c));
    }
  });

  return flattened;
};
