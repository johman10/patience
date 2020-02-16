const { playFromFoundationToTableau } = require('../index');

describe('playFromFoundationToTableau', () => {
  it('doesn\'t do anything when the colour is the same', () => {
    const foundation = [[{ rank: 'a', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [{ rank: '2', suit: 'diamond' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromFoundationToTableau(foundation, tableau, 0, 0);

    expect(output.tableau).toEqual(tableau);
    expect(output.foundation).toEqual(foundation);
  });

  it('doesn\'t do anything when the rank is not incremental', () => {
    const foundation = [[{ rank: 'a', suit: 'spade' }], [], [], []];
    const tableau = [
      { open: [{ rank: '3', suit: 'heart' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromFoundationToTableau(foundation, tableau, 0, 0);

    expect(output.tableau).toEqual(tableau);
    expect(output.foundation).toEqual(foundation);
  });

  it('moves a king to an empty spot', () => {
    const foundation = [[{ rank: 'k', suit: 'heart' }], [], [], []];
    const tableau = [
      { open: [{ rank: 'a', suit: 'club' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromFoundationToTableau(foundation, tableau, 0, 1);

    const expectedFoundation = [[], [], [], []];
    const expectedTableau = [
      { open: [{ rank: 'a', suit: 'club' }], closed: [] },
      { open: [{ rank: 'k', suit: 'heart' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    expect(output.tableau).toEqual(expectedTableau);
    expect(output.foundation).toEqual(expectedFoundation);
  });

  it.only('moves a card when the card is a different colour and sequential', () => {
    const foundation = [[{ rank: '5', suit: 'spade' }], [], [], []];
    const tableau = [
      { open: [], closed: [] },
      { open: [{ rank: '6', suit: 'heart' }], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
      { open: [], closed: [] },
    ];

    const output = playFromFoundationToTableau(foundation, tableau, 0, 1);

    const expectedFoundation = [[], [], [], []];
    const expectedTableau = [
      { open: [], closed: [] },
      { open: [{ rank: '5', suit: 'spade' }, { rank: '6', suit: 'heart' }], closed: [] },
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
