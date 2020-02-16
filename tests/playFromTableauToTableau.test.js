const { playFromTableauToTableau } = require('../index');

describe('playFromTableauToTableau', () => {
  it('doesn\'t do anything when moving from an empty stack', () => {
    const tableau = [
      { open: [], closed: [] },
      { open: [{ rank: 'a', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(playFromTableauToTableau(tableau, 0, 1).tableau).toEqual(tableau);
  });

  it('doesn\'t do anything when moving a non king card to an empty stack', () => {
    const tableau = [
      { open: [{ rank: 'a', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(playFromTableauToTableau(tableau, 0, 1).tableau).toEqual(tableau);
  });

  it('doesn\'t do anything when moving a card to an stack that doesn\'t fit rank', () => {
    const tableau = [
      { open: [{ rank: '3', suit: 'spade' }], closed: [] },
      { open: [{ rank: '2', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(playFromTableauToTableau(tableau, 0, 1).tableau).toEqual(tableau);
  });

  it('doesn\'t do anything when moving a card to an stack that doesn\'t fit suit', () => {
    const tableau = [
      { open: [{ rank: 'a', suit: 'spade' }], closed: [] },
      { open: [{ rank: '2', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];
    expect(playFromTableauToTableau(tableau, 0, 1).tableau).toEqual(tableau);
  });

  it('does move a king from one stack to another', () => {
    const tableau = [
      { open: [{ rank: 'k', suit: 'spade' }], closed: [] },
      { open: [{ rank: '2', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 2).tableau;

    const expectation = [
      { open: [], closed: [] },
      { open: [{ rank: '2', suit: 'spade' }], closed: [] },
      { open: [{ rank: 'k', suit: 'spade' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });

  it('does move a whole stack when possible', () => {
    const tableau = [
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
          { rank: '5', suit: 'spade' },
          { rank: '6', suit: 'diamond' },
          { rank: '7', suit: 'spade' },
          { rank: '8', suit: 'diamond' },
          { rank: '9', suit: 'spade' },
          { rank: '10', suit: 'diamond' },
          { rank: 'j', suit: 'spade' },
          { rank: 'q', suit: 'diamond' },
          { rank: 'k', suit: 'spade' },
        ],
        closed: [],
      },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 1).tableau;

    const expectation = [
      { open: [], closed: [] },
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
          { rank: '5', suit: 'spade' },
          { rank: '6', suit: 'diamond' },
          { rank: '7', suit: 'spade' },
          { rank: '8', suit: 'diamond' },
          { rank: '9', suit: 'spade' },
          { rank: '10', suit: 'diamond' },
          { rank: 'j', suit: 'spade' },
          { rank: 'q', suit: 'diamond' },
          { rank: 'k', suit: 'spade' },
        ],
        closed: [],
      },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });

  it('doens\'t move more than the stack based on suit', () => {
    const tableau = [
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'spade' },
        ],
        closed: [],
      },
      { open: [{ rank: '4', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 1).tableau;

    const expectation = [
      {
        open: [
          { rank: '4', suit: 'spade' },
        ],
        closed: [],
      },
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
        ],
        closed: [],
      },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });

  it('doens\'t move more than the stack based on rank', () => {
    const tableau = [
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '5', suit: 'diamond' },
        ],
        closed: [],
      },
      { open: [{ rank: '4', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 1).tableau;

    const expectation = [
      {
        open: [
          { rank: '5', suit: 'diamond' },
        ],
        closed: [],
      },
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
        ],
        closed: [],
      },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });

  it('moves the amount of cards based on the position it\'s moving to', () => {
    const tableau = [
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
          { rank: '5', suit: 'spade' },
          { rank: '6', suit: 'diamond' },
          { rank: '7', suit: 'spade' },
          { rank: '8', suit: 'diamond' },
          { rank: '9', suit: 'spade' },
          { rank: '10', suit: 'diamond' },
          { rank: 'j', suit: 'spade' },
          { rank: 'q', suit: 'diamond' },
          { rank: 'k', suit: 'spade' },
        ],
        closed: [],
      },
      { open: [{ rank: '5', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 1).tableau;

    const expectation = [
      {
        open: [
          { rank: '5', suit: 'spade' },
          { rank: '6', suit: 'diamond' },
          { rank: '7', suit: 'spade' },
          { rank: '8', suit: 'diamond' },
          { rank: '9', suit: 'spade' },
          { rank: '10', suit: 'diamond' },
          { rank: 'j', suit: 'spade' },
          { rank: 'q', suit: 'diamond' },
          { rank: 'k', suit: 'spade' },
        ],
        closed: [],
      },
      {
        open: [
          { rank: 'a', suit: 'spade' },
          { rank: '2', suit: 'diamond' },
          { rank: '3', suit: 'spade' },
          { rank: '4', suit: 'diamond' },
          { rank: '5', suit: 'club' },
        ],
        closed: [],
      },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });

  it('opens a closed card when moving the last card in the stack', () => {
    const tableau = [
      { open: [{ rank: 'a', suit: 'club' }], closed: [{ rank: '2', suit: 'club' }] },
      { open: [{ rank: '2', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToTableau(tableau, 0, 1).tableau;

    const expectation = [
      { open: [{ rank: '2', suit: 'club' }], closed: [] },
      { open: [{ rank: 'a', suit: 'club' }, { rank: '2', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output).toEqual(expectation);
  });
});
