const { playFromTableauToFoundation } = require('../index');

describe('playFromTableauToFoundation', () => {
  it('doesn\'t do anything when the suit doesn\'t match', () => {
    const foundation = [[{ rank: 'a', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [{ rank: '2', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToFoundation(tableau, foundation, 0, 0);

    expect(output.tableau).toEqual(tableau);
    expect(output.foundation).toEqual(foundation);
  });

  it('doesn\'t do anything when the rank is not incremental', () => {
    const foundation = [[{ rank: 'a', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [{ rank: '3', suit: 'heart' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToFoundation(tableau, foundation, 0, 0);

    expect(output.tableau).toEqual(tableau);
    expect(output.foundation).toEqual(foundation);
  });

  it('opens a closed card when moving the last card in the stack', () => {
    const foundation = [[], [], [], []];
    const tableau = [
      { open: [{ rank: 'a', suit: 'club' }], closed: [{ rank: '2', suit: 'club' }] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToFoundation(tableau, foundation, 0, 0);

    const expectedFoundation = [[{ rank: 'a', suit: 'club' }], [], [], []];
    const expectedTableau = [
      { open: [{ rank: '2', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output.tableau).toEqual(expectedTableau);
    expect(output.foundation).toEqual(expectedFoundation);
  });

  it('moves an rank a card to an empty spot', () => {
    const foundation = [[{ rank: 'a', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [{ rank: 'a', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToFoundation(tableau, foundation, 0, 1);

    const expectedFoundation = [[{ rank: 'a', suit: 'heart' }], [{ rank: 'a', suit: 'club' }], [], []];
    const expectedTableau = [
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output.tableau).toEqual(expectedTableau);
    expect(output.foundation).toEqual(expectedFoundation);
  });

  it('moves a card when the card is of the same suit and sequential', () => {
    const foundation = [[{ rank: 'a', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [], closed: [] },
      { open: [{ rank: '2', suit: 'heart' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromTableauToFoundation(tableau, foundation, 1, 0);

    const expectedFoundation = [[{ rank: '2', suit: 'heart' }, { rank: 'a', suit: 'heart' }], [], [], []];
    const expectedTableau = [
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output.tableau).toEqual(expectedTableau);
    expect(output.foundation).toEqual(expectedFoundation);
  });
});
