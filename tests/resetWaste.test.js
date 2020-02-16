const { resetWaste } = require('../index');

describe('resetWaste', () => {
  it('moves everything from closed to open', () => {
    const closed = [];
    const open = [
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
    ];
    const output = resetWaste({ closed, open });
    expect(output.closed).toEqual([
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
    ]);
    expect(output.open).toEqual([]);
  });
});
