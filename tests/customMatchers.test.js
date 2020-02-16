describe('custom matchers', () => {
  it('has a working uniqueValue check', () => {
    expect([1, 2, 3, 1, 2, 3]).toContainUniqueValues([3, 1, 2]);
  });
});
