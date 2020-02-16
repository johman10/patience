const {
  SUITS,
  RANKS,
  openClosed,
  deepClone,
  rankIndex,
  areSequential,
  areDifferentColour,
  isKing,
  isAce,
  amountMoveableCards,
} = require('../helpers');

describe('SUITS', () => {
  it('exports all suits', () => {
    expect(SUITS).toEqual(['club', 'spade', 'diamond', 'heart']);
  });
});

describe('RANKS', () => {
  it('exports all ranks', () => {
    expect(RANKS).toEqual(['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k']);
  });
});

describe('openClosed', () => {
  it('doesn\'t do anything when the open stack is not empty', () => {
    const input = { open: [{ rank: '2', suit: 'diamond' }], closed: [] };
    const output = { open: [{ rank: '2', suit: 'diamond' }], closed: [] };
    expect(openClosed(input)).toEqual(output);
  });

  it('doesn\'t do anything when the closed stack is empty', () => {
    const input = { open: [], closed: [] };
    const output = { open: [], closed: [] };
    expect(openClosed(input)).toEqual(output);
  });

  it('moves one card from the closed stack to the open stack when the open one is empty', () => {
    const input = { open: [], closed: [{ rank: '2', suit: 'diamond' }] };
    const output = { open: [{ rank: '2', suit: 'diamond' }], closed: [] };
    expect(openClosed(input)).toEqual(output);
  });
});

describe('deepClone', () => {
  it('changes the memory reference to an object while maintaining the keys and values', () => {
    const input = { test: 1 };

    const output = deepClone(input);

    expect(output).toEqual(input);
    expect(output).not.toBe(input);
  });

  it('changes the memory reference to an array while maintaining values', () => {
    const input = ['test'];

    const output = deepClone(input);

    expect(output).toEqual(input);
    expect(output).not.toBe(input);
  });

  it('changes the memory reference to an nested array inside an object', () => {
    const input = { test: [1, 2, 3] };

    const output = deepClone(input);

    expect(output).toEqual(input);
    expect(output).not.toBe(input);
    expect(output.test).toEqual(input.test);
    expect(output.test).not.toBe(input.test);
  });

  it('changes the memory reference to an nested object inside an array', () => {
    const input = [{ test: 1 }];

    const output = deepClone(input);

    expect(output).toEqual(input);
    expect(output).not.toBe(input);
    expect(output[0]).toEqual(input[0]);
    expect(output[0]).not.toBe(input[0]);
  });
});

describe('rankIndex', () => {
  it('returns -1 when not passing a card', () => {
    expect(rankIndex()).toBe(-1);
  });

  it('returns -1 when an non existing card is passed', () => {
    expect(rankIndex({ rank: 'king' })).toBe(-1);
  });

  it('returns the index when card is passed', () => {
    expect(rankIndex({ rank: 'a' })).toBe(0);
    expect(rankIndex({ rank: '2' })).toBe(1);
    expect(rankIndex({ rank: '3' })).toBe(2);
    expect(rankIndex({ rank: '4' })).toBe(3);
    expect(rankIndex({ rank: '5' })).toBe(4);
    expect(rankIndex({ rank: '6' })).toBe(5);
    expect(rankIndex({ rank: '7' })).toBe(6);
    expect(rankIndex({ rank: '8' })).toBe(7);
    expect(rankIndex({ rank: '9' })).toBe(8);
    expect(rankIndex({ rank: '10' })).toBe(9);
    expect(rankIndex({ rank: 'j' })).toBe(10);
    expect(rankIndex({ rank: 'q' })).toBe(11);
    expect(rankIndex({ rank: 'k' })).toBe(12);
  });
});

describe('areSequential', () => {
  it('returns false when no cards are passed', () => {
    expect(areSequential()).toBe(false);
  });

  it('returns false when only one card is passed', () => {
    expect(areSequential({ rank: 'a' })).toBe(false);
  });

  it('returns false when passed cards are not sequential in rank', () => {
    expect(areSequential({ rank: 'a' }, { rank: 'k' })).toBe(false);
  });

  it('returns false when passed cards are sequential but in reverse order', () => {
    expect(areSequential({ rank: '2' }, { rank: 'a' })).toBe(false);
  });

  it('returns true when passed cards are sequential in rank', () => {
    expect(areSequential({ rank: 'a' }, { rank: '2' })).toBe(true);
  });
});

describe('areDifferentColour', () => {
  it('returns false when no cards are passed', () => {
    expect(areDifferentColour()).toBe(false);
  });

  it('returns false when only one card is passed', () => {
    expect(areDifferentColour({ suit: 'heart' })).toBe(false);
  });

  it('returns false when suits are the same', () => {
    expect(areDifferentColour({ suit: 'heart' }, { suit: 'heart' })).toBe(false);
    expect(areDifferentColour({ suit: 'spade' }, { suit: 'spade' })).toBe(false);
    expect(areDifferentColour({ suit: 'club' }, { suit: 'club' })).toBe(false);
    expect(areDifferentColour({ suit: 'diamond' }, { suit: 'diamond' })).toBe(false);
  });

  it('returns false when suits are the same colour but different', () => {
    expect(areDifferentColour({ suit: 'heart' }, { suit: 'diamond' })).toBe(false);
    expect(areDifferentColour({ suit: 'spade' }, { suit: 'club' })).toBe(false);
  });

  it('returns true when suits are a different colour', () => {
    expect(areDifferentColour({ suit: 'heart' }, { suit: 'club' })).toBe(true);
    expect(areDifferentColour({ suit: 'diamond' }, { suit: 'club' })).toBe(true);
    expect(areDifferentColour({ suit: 'spade' }, { suit: 'diamond' })).toBe(true);
    expect(areDifferentColour({ suit: 'spade' }, { suit: 'heart' })).toBe(true);
  });
});

describe('isKing', () => {
  it('returns false when no card is passed', () => {
    expect(isKing()).toBe(false);
  });

  it('returns only returns true when passing a king', () => {
    expect(isKing({ rank: 'a' })).toBe(false);
    expect(isKing({ rank: '2' })).toBe(false);
    expect(isKing({ rank: '3' })).toBe(false);
    expect(isKing({ rank: '4' })).toBe(false);
    expect(isKing({ rank: '5' })).toBe(false);
    expect(isKing({ rank: '6' })).toBe(false);
    expect(isKing({ rank: '7' })).toBe(false);
    expect(isKing({ rank: '8' })).toBe(false);
    expect(isKing({ rank: '9' })).toBe(false);
    expect(isKing({ rank: '10' })).toBe(false);
    expect(isKing({ rank: 'j' })).toBe(false);
    expect(isKing({ rank: 'q' })).toBe(false);
    expect(isKing({ rank: 'k' })).toBe(true);
  });
});

describe('isAce', () => {
  it('returns false when no card is passed', () => {
    expect(isAce()).toBe(false);
  });

  it('returns only returns true when passing a king', () => {
    expect(isAce({ rank: 'a' })).toBe(true);
    expect(isAce({ rank: '2' })).toBe(false);
    expect(isAce({ rank: '3' })).toBe(false);
    expect(isAce({ rank: '4' })).toBe(false);
    expect(isAce({ rank: '5' })).toBe(false);
    expect(isAce({ rank: '6' })).toBe(false);
    expect(isAce({ rank: '7' })).toBe(false);
    expect(isAce({ rank: '8' })).toBe(false);
    expect(isAce({ rank: '9' })).toBe(false);
    expect(isAce({ rank: '10' })).toBe(false);
    expect(isAce({ rank: 'j' })).toBe(false);
    expect(isAce({ rank: 'q' })).toBe(false);
    expect(isAce({ rank: 'k' })).toBe(false);
  });
});

describe('amountMoveableCards', () => {
  it('returns 0 if the passed list is empty', () => {
    expect(amountMoveableCards([])).toBe(0);
  });

  it('returns 1 if there is only one card in the stack', () => {
    expect(amountMoveableCards([{ rank: 'a', suit: 'spade' }])).toBe(1);
  });

  it('returns 1 if there is two cards, but they are not sequential', () => {
    expect(amountMoveableCards([{ rank: 'a', suit: 'spade' }, { rank: '3', suit: 'diamond' }])).toBe(1);
  });

  it('returns 1 if there is two cards, but they are the same colour', () => {
    expect(amountMoveableCards([{ rank: 'a', suit: 'spade' }, { rank: '2', suit: 'club' }])).toBe(1);
  });

  it('returns 2 if there are two cards that are sequential and a different colour', () => {
    expect(amountMoveableCards([{ rank: 'a', suit: 'spade' }, { rank: '2', suit: 'diamond' }])).toBe(2);
  });

  it('returns one if the cards are in the wrong order', () => {
    expect(amountMoveableCards([{ rank: '2', suit: 'club' }, { rank: 'a', suit: 'diamond' }])).toBe(1);
  });
});
