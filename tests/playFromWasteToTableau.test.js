const { playFromWasteToTableau } = require('../index');

describe('playFromWasteToTableau', () => {
  it('doesn\'t do anything when there is no open waste card', () => {
    const waste = {
      open: [],
      closed: [{ rank: 'a', suit: 'club' }],
    };
    const tableau = [
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 0);
    expect(output).toEqual({ waste, tableau });
  });

  it('doesn\'t do anything when  moving to an empty stack with a non-king card', () => {
    const waste = {
      open: [
        { rank: '2', suit: 'club' },
      ],
      closed: [],
    };
    const tableau = [
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 0);
    expect(output).toEqual({ waste, tableau });
  });

  it('doesn\'t do anything when attempting to move to the wrong color', () => {
    const waste = {
      open: [
        { rank: '2', suit: 'club' },
      ],
      closed: [],
    };
    const tableau = [
      { open: [{ rank: 'a', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 0);
    expect(output).toEqual({ waste, tableau });
  });

  it('doesn\'t do anything when attempting to move non sequential cards', () => {
    const waste = {
      open: [
        { rank: '3', suit: 'heart' },
      ],
      closed: [],
    };
    const tableau = [
      { open: [{ rank: 'a', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 0);
    expect(output).toEqual({ waste, tableau });
  });

  it('moves the card to an empty stack when it\'s a king', () => {
    const waste = {
      open: [
        { rank: 'k', suit: 'club' },
      ],
      closed: [],
    };
    const tableau = [
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 1);
    const expectedWaste = { open: [], closed: [] };
    const expectedTableau = [
      { open: [], closed: [] },
      { open: [{ rank: 'k', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(output).toEqual({ waste: expectedWaste, tableau: expectedTableau });
  });

  it('moves the card to an already filled foundation stack when sequential and different colour', () => {
    const waste = {
      open: [{ rank: 'q', suit: 'heart' }],
      closed: [{ rank: 'k', suit: 'spade' }],
    };
    const tableau = [
      { open: [{ rank: 'k', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromWasteToTableau(waste, tableau, 0);
    const expectedWaste = { open: [], closed: [{ rank: 'k', suit: 'spade' }] };
    const expectedTableau = [
      { open: [{ rank: 'q', suit: 'heart' }, { rank: 'k', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(output).toEqual({ waste: expectedWaste, tableau: expectedTableau });
  });
});
