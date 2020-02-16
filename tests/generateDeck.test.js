const { generateDeck } = require('../index');

describe('generateDeck', () => {
  it('returns 52 items in an array', () => {
    expect(generateDeck()).toHaveLength(52);
  });

  it('contains 4 unique card suits', () => {
    expect(generateDeck().map((card) => card.suit)).toContainUniqueValues(['club', 'spade', 'diamond', 'heart']);
  });

  it('contains 4 cards of each rank', () => {
    const deck = generateDeck();
    expect(deck.filter((card) => card.rank === 'a')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '2')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '3')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '4')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '5')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '6')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '7')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '8')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '9')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === '10')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === 'j')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === 'q')).toHaveLength(4);
    expect(deck.filter((card) => card.rank === 'k')).toHaveLength(4);
  });
});
