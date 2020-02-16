const { draw } = require('../index');

describe('draw', () => {
  it('returns new stacks with cards moved from the closed stack to the open stack', () => {
    const closed = [
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ];
    const open = [];
    const output = draw({ closed, open });
    expect(output.closed).toEqual([]);
    expect(output.open).toEqual([
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ]);
  });

  it('only draws 3 cards when no number is passed in', () => {
    const closed = [
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
      { rank: '4', suit: 'club' },
    ];
    const open = [];
    const output = draw({ closed, open });
    expect(output.closed).toEqual([
      { rank: '4', suit: 'club' },
    ]);
    expect(output.open).toEqual([
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ]);
  });

  it('only draws the amount of cards passed in when applicable', () => {
    const closed = [
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ];
    const open = [];
    const output = draw({ closed, open }, 1);
    expect(output.closed).toEqual([
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ]);
    expect(output.open).toEqual([
      { rank: 'a', suit: 'club' },
    ]);
  });

  it('keeps the cards on the open stack as they are passed in', () => {
    const closed = [
      { rank: '2', suit: 'club' },
      { rank: '3', suit: 'club' },
    ];
    const open = [
      { rank: 'a', suit: 'club' },
    ];
    const output = draw({ closed, open }, 1);
    expect(output.closed).toEqual([
      { rank: '3', suit: 'club' },
    ]);
    expect(output.open).toEqual([
      { rank: '2', suit: 'club' },
      { rank: 'a', suit: 'club' },
    ]);
  });

  it('draws what\'s available when the passed stack is almost empty', () => {
    const closed = [
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
    ];
    const open = [];
    const output = draw({ closed, open });
    expect(output.closed).toEqual([]);
    expect(output.open).toEqual([
      { rank: 'a', suit: 'club' },
      { rank: '2', suit: 'club' },
    ]);
  });
});
