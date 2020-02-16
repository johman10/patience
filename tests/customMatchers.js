expect.extend({
  toContainUniqueValues(array, matchArray) {
    const uniqueArray = array.filter((v, i, s) => s.indexOf(v) === i);
    const pass = uniqueArray.every((i) => (matchArray.indexOf(i) > -1));
    return {
      pass,
      message: () => 'The unique values of the array does not match the other one.',
    };
  },
});
