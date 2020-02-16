const { mockRandomForEach } = require('jest-mock-random');
const { shuffle } = require('../index');

describe('shuffle', () => {
  mockRandomForEach([0.89834387398269646, 0.1300896288518993, 0.3116289985569476]);

  it('returns the input array in a different order', () => {
    const input = [1, 2, 3];
    const output = shuffle(input);
    expect(output).toEqual([1, 3, 2]);
  });
});
