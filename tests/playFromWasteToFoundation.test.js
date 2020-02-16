const { playFromWasteToFoundation } = require('../index');

describe('playFromWasteToFoundation', () => {
  it('doesn\'t do anything when there is no open waste card', () => {
    const waste = {
      open: [],
      closed: [{ rank: 'a', suit: 'club' }],
    };
    const foundation = [[], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 0);
    expect(output).toEqual({ waste, foundation });
  });

  it('doesn\'t do anything when  moving to an empty stack with a non-ace card', () => {
    const waste = {
      open: [
        { rank: '2', suit: 'club' },
      ],
      closed: [],
    };
    const foundation = [[], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 0);
    expect(output).toEqual({ waste, foundation });
  });

  it('doesn\'t do anything when attempting to move to the wrong suit', () => {
    const waste = {
      open: [
        { rank: '2', suit: 'club' },
      ],
      closed: [],
    };
    const foundation = [[{ rank: 'a', suit: 'spade' }], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 0);
    expect(output).toEqual({ waste, foundation });
  });

  it('doesn\'t do anything when attempting to move non sequential cards', () => {
    const waste = {
      open: [
        { rank: '3', suit: 'club' },
      ],
      closed: [],
    };
    const foundation = [[{ rank: 'a', suit: 'club' }], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 0);
    expect(output).toEqual({ waste, foundation });
  });

  it('moves the card to an empty stack when it\'s an ace', () => {
    const waste = {
      open: [
        { rank: 'a', suit: 'club' },
      ],
      closed: [],
    };
    const foundation = [[], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 1);
    const expectedWaste = { open: [], closed: [] };
    const expectedFoundation = [[], [{ rank: 'a', suit: 'club' }], [], []];
    expect(output).toEqual({ waste: expectedWaste, foundation: expectedFoundation });
  });

  it('moves the card to an already filled foundation stack when sequential', () => {
    const waste = {
      open: [
        { rank: 'k', suit: 'club' },
      ],
      closed: [{ rank: 'k', suit: 'spade' }],
    };
    const foundation = [[{ rank: 'q', suit: 'club' }], [], [], []];

    const output = playFromWasteToFoundation(waste, foundation, 0);
    const expectedWaste = { open: [], closed: [{ rank: 'k', suit: 'spade' }] };
    const expectedFoundation = [[{ rank: 'k', suit: 'club' }, { rank: 'q', suit: 'club' }], [], [], []];
    expect(output).toEqual({ waste: expectedWaste, foundation: expectedFoundation });
  });
});
